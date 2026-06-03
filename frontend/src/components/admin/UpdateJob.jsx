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
import { ArrowLeft, Loader2 } from "lucide-react";

export const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { companies } = useSelector((store) => store.company);
  const { allAdminJobs, singleJob } = useSelector((store) => store.job);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: "", description: "", requirements: "", salary: "", location: "", jobType: "", experience: "", position: "", companyId: "",
    }
  });
  const selectedCompanyId = watch("companyId");

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
      const res = await axios.put(`${JOB_API_END_POINT}/update/${id}`, updatedData, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message || "Job Updated Successfully");
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const currentCompany = companies.find(c => c._id === selectedCompanyId);
  
  const inputClass = "rounded-none border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none p-3 font-bold uppercase text-xs text-black bg-white w-full mt-2";
  const labelClass = "font-black uppercase text-sm block";

  return (
    <div className="min-h-screen bg-[#f0f0f0] pb-10">
      <Navbar />
      <div className="max-w-4xl mx-auto my-10 px-4">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-10 border-[3px] border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none">
          <div className='flex flex-col sm:flex-row sm:items-center gap-5 border-b-[3px] border-black pb-6 mb-8'>
              <button 
                  type="button" 
                  onClick={() => navigate("/admin/jobs")} 
                  className="w-fit rounded-none border-[3px] border-black bg-white text-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-none px-4 py-2 flex items-center gap-2"
              >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
              </button>
              <h1 className='font-black uppercase text-2xl md:text-3xl tracking-tighter'>Update Job</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Job Title</label>
              <input type="text" {...register("title", { required: "Title is required" })} className={inputClass} />
              {errors.title && <p className="text-white bg-[#F83002] border-[2px] border-black font-bold uppercase text-[10px] p-1 mt-1 w-fit">{errors.title.message}</p>}
            </div>
            
            <div className="md:col-span-2">
              <label className={labelClass}>Description</label>
              <textarea rows={4} {...register("description", { required: "Description is required" })} className={`${inputClass} resize-none`} />
              {errors.description && <p className="text-white bg-[#F83002] border-[2px] border-black font-bold uppercase text-[10px] p-1 mt-1 w-fit">{errors.description.message}</p>}
            </div>

            <div>
              <label className={labelClass}>Requirements</label>
              <input type="text" placeholder="REACT, NODE.JS, MONGODB" {...register("requirements", { required: "Requirements are required" })} className={inputClass} />
              {errors.requirements && <p className="text-white bg-[#F83002] border-[2px] border-black font-bold uppercase text-[10px] p-1 mt-1 w-fit">{errors.requirements.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Salary</label>
              <input type="number" {...register("salary", { required: "Salary is required" })} className={inputClass} />
              {errors.salary && <p className="text-white bg-[#F83002] border-[2px] border-black font-bold uppercase text-[10px] p-1 mt-1 w-fit">{errors.salary.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input type="text" {...register("location", { required: "Location is required" })} className={inputClass} />
              {errors.location && <p className="text-white bg-[#F83002] border-[2px] border-black font-bold uppercase text-[10px] p-1 mt-1 w-fit">{errors.location.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Job Type</label>
              <select {...register("jobType", { required: "Job type is required" })} className={inputClass}>
                <option value="">SELECT JOB TYPE</option>
                <option value="Full-Time">FULL-TIME</option>
                <option value="Part-Time">PART-TIME</option>
                <option value="Internship">INTERNSHIP</option>
                <option value="Remote">REMOTE</option>
              </select>
              {errors.jobType && <p className="text-white bg-[#F83002] border-[2px] border-black font-bold uppercase text-[10px] p-1 mt-1 w-fit">{errors.jobType.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Experience Level (in years)</label>
              <input type="number" {...register("experience", { required: "Experience is required" })} className={inputClass} />
              {errors.experience && <p className="text-white bg-[#F83002] border-[2px] border-black font-bold uppercase text-[10px] p-1 mt-1 w-fit">{errors.experience.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Number of Positions</label>
              <input type="number" {...register("position", { required: "Position is required" })} className={inputClass} />
              {errors.position && <p className="text-white bg-[#F83002] border-[2px] border-black font-bold uppercase text-[10px] p-1 mt-1 w-fit">{errors.position.message}</p>}
            </div>
            
            <div className="md:col-span-2">
              <label className={labelClass}>Select Company</label>
              {companies.length > 0 ? (
                <div className="mt-2">
                    <Select onValueChange={selectChangeHandler} value={currentCompany ? currentCompany.name.toLowerCase() : ""}>
                        <SelectTrigger className="w-full h-12 rounded-none border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold uppercase text-xs focus:ring-0 bg-white">
                            <SelectValue placeholder="SELECT A COMPANY" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                            <SelectGroup>
                            {companies.map((company) => (
                                <SelectItem key={company._id} value={company?.name?.toLowerCase()} className="font-bold uppercase text-xs focus:bg-black focus:text-white rounded-none cursor-pointer">
                                {company.name}
                                </SelectItem>
                            ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
              ) : (
                <p className="text-white bg-[#F83002] border-[2px] border-black font-bold uppercase text-[10px] p-1 mt-1 w-fit">*Please register a company first.</p>
              )}
              <input type="hidden" {...register("companyId", { required: "Company is required" })} />
              {errors.companyId && <p className="text-white bg-[#F83002] border-[2px] border-black font-bold uppercase text-[10px] p-1 mt-1 w-fit">{errors.companyId.message}</p>}
            </div>
          </div>

          <div className="mt-10 border-t-[3px] border-black pt-6">
            {loading ? (
                <button disabled className="w-full flex items-center justify-center rounded-none border-[3px] border-black bg-gray-300 text-black font-black uppercase py-4 opacity-100 text-base shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"> 
                    <Loader2 className='mr-2 h-5 w-5 animate-spin' /> 
                    WAIT... 
                </button>
            ) : (
                <button type="submit" className="w-full rounded-none border-[3px] border-black bg-black text-white font-black uppercase shadow-[6px_6px_0px_0px_rgba(248,48,2,1)] hover:bg-[#F83002] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-none py-4 text-xl tracking-widest">
                    Update Job
                </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};