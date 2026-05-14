import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";
import { setSingleJob } from "@/redux/jobSlice"; 

export const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { companies } = useSelector((store) => store.company);
  const { allAdminJobs, singleJob } = useSelector((store) => store.job);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      requirements: "",
      salary: "",
      location: "",
      jobType: "",
      experience: "",
      position: "",
      companyId: "",
    }
  });

  const selectedCompanyId = watch("companyId");

  // 2. सुरक्षा के लिए: अगर singleJob में इस वक्त डेटा नहीं है या कोई दूसरा पुराना जॉब है,
  // तो हम 'allAdminJobs' में से इस ID वाली जॉब को ढूंढकर 'singleJob' में सेट कर देंगे।
  useEffect(() => {
    if (!singleJob || singleJob._id !== id) {
      const currentJob = allAdminJobs?.find((item) => item._id === id);
      if (currentJob) {
        dispatch(setSingleJob(currentJob));
      }
    }
  }, [id, allAdminJobs, singleJob, dispatch]);

  useEffect(() => {
    if (singleJob) {
      reset({
        title: singleJob.title || "",
        description: singleJob.description || "",
        requirements: Array.isArray(singleJob.requirements) ? singleJob.requirements.join(", ") : singleJob.requirements || "",
        salary: singleJob.salary || "",
        location: singleJob.location || "",
        jobType: singleJob.jobType || "",
        experience: singleJob.experienceLevel || "",
        position: singleJob.position || "",
        companyId: singleJob.company?._id || singleJob.company || "",
      });
    }
  }, [singleJob, reset]);

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
    if (selectedCompany) {
      setValue("companyId", selectedCompany._id, { shouldValidate: true });
    }
  };

  // Submit Updated Data
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const updatedData = {
        title: data.title,
        description: data.description,
        requirements: data.requirements.split(",").map((item) => item.trim()),
        salary: Number(data.salary),
        location: data.location,
        jobType: data.jobType,
        experience: Number(data.experience),
        position: Number(data.position),
        companyId: data.companyId,
      };

      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message || "Job Updated Successfully");
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const currentCompany = companies.find(c => c._id === selectedCompanyId);

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl font-bold mb-6">Update Job</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Job Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full border p-3 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              rows={5}
              {...register("description", { required: "Description is required" })}
              className="w-full border p-3 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* Requirements */}
          <div>
            <label className="block mb-1 font-medium">Requirements</label>
            <input
              type="text"
              placeholder="React, Node.js, MongoDB"
              {...register("requirements", { required: "Requirements are required" })}
              className="w-full border p-3 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            {errors.requirements && <p className="text-red-500 text-sm">{errors.requirements.message}</p>}
          </div>

          {/* Salary */}
          <div>
            <label className="block mb-1 font-medium">Salary</label>
            <input
              type="number"
              {...register("salary", { required: "Salary is required" })}
              className="w-full border p-3 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              className="w-full border p-3 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
          </div>

          {/* Job Type */}
          <div>
            <label className="block mb-1 font-medium">Job Type</label>
            <select
              {...register("jobType", { required: "Job type is required" })}
              className="w-full border p-3 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
            >
              <option value="">Select Job Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
            {errors.jobType && <p className="text-red-500 text-sm">{errors.jobType.message}</p>}
          </div>

          {/* Experience */}
          <div>
            <label className="block mb-1 font-medium">Experience Level (in years)</label>
            <input
              type="number"
              {...register("experience", { required: "Experience is required" })}
              className="w-full border p-3 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
          </div>

          {/* Position */}
          <div>
            <label className="block mb-1 font-medium">Number of Positions</label>
            <input
              type="number"
              {...register("position", { required: "Position is required" })}
              className="w-full border p-3 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
          </div>

          {/* Company Dropdown list */}
          <div>
            <label className="block mb-2 font-medium">Select Company</label>
            {companies.length > 0 ? (
              <Select 
                onValueChange={selectChangeHandler} 
                value={currentCompany ? currentCompany.name.toLowerCase() : ""}
              >
                <SelectTrigger className="w-full border p-3 h-12 rounded focus:ring-1 focus:ring-gray-400 bg-white">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-xs text-red-600 font-bold">*Please register a company first.</p>
            )}
            
            <input 
              type="hidden" 
              {...register("companyId", { required: "Company is required" })} 
            />
            {errors.companyId && <p className="text-red-500 text-sm mt-1">{errors.companyId.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors w-full sm:w-auto flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Please wait
              </>
            ) : (
              "Update Job"
            )}
          </button>
        </form>
      </div>
    </>
  );
};