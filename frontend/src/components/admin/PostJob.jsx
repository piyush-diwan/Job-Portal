import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value,
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const jobData = {
        ...input,
        salary: Number(input.salary),
        experience: Number(input.experience),
        position: Number(input.position),
      };
      const res = await axios.post(`${JOB_API_END_POINT}/post`, jobData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error posting job");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "rounded-none border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0 focus-visible:ring-offset-0 p-3 font-bold uppercase text-xs text-black bg-white placeholder-gray-500 w-full mt-2";
  const labelClass = "font-black uppercase text-sm";

  return (
    <div className="min-h-screen bg-[#f0f0f0] pb-10">
      <Navbar />
      <div className="max-w-4xl mx-auto my-10 px-4">
        <form
          onSubmit={submitHandler}
          className="p-6 md:p-10 border-[3px] border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none"
        >
           <div className='flex flex-col sm:flex-row sm:items-center gap-5 border-b-[3px] border-black pb-6 mb-8'>
              <button 
                  type="button" 
                  onClick={() => navigate("/admin/jobs")} 
                  className="w-fit rounded-none border-[3px] border-black bg-white text-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-none px-4 py-2 flex items-center gap-2"
              >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
              </button>
              <h1 className='font-black uppercase text-2xl md:text-3xl tracking-tighter'>Create Job</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className={labelClass}>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className={inputClass}
              />
            </div>
            <div>
              <Label className={labelClass}>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className={inputClass}
              />
            </div>
            <div>
              <Label className={labelClass}>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder="React, Node, etc."
                className={inputClass}
              />
            </div>
            <div>
              <Label className={labelClass}>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className={inputClass}
              />
            </div>
            <div>
              <Label className={labelClass}>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className={inputClass}
              />
            </div>
            <div>
              <Label className={labelClass}>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className={inputClass}
              />
            </div>
            <div>
              <Label className={labelClass}>Experience Level (Yrs)</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className={inputClass}
              />
            </div>
            <div>
              <Label className={labelClass}>No of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2 mt-2">
              <Label className={labelClass}>Select Company</Label>
              {companies.length > 0 ? (
                <div className="mt-2">
                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger className="w-full h-12 rounded-none border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold uppercase text-xs focus:ring-0 bg-white">
                      <SelectValue placeholder="SELECT A COMPANY" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                      <SelectGroup>
                        {companies.map((company) => {
                          return (
                            <SelectItem
                              key={company._id}
                              value={company?.name?.toLowerCase()}
                              className="font-bold uppercase text-xs focus:bg-black focus:text-white rounded-none cursor-pointer"
                            >
                              {company.name}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <p className="text-xs text-white bg-[#F83002] border-2 border-black font-black uppercase p-2 w-fit mt-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  *Please register a company first.
                </p>
              )}
            </div>
          </div>

          <div className="mt-10 border-t-[3px] border-black pt-6">
            {loading ? (
              <button
                disabled
                className="w-full flex items-center justify-center rounded-none border-[3px] border-black bg-gray-300 text-black font-black uppercase py-4 opacity-100 text-base shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                WAIT...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full rounded-none border-[3px] border-black bg-black text-white font-black uppercase shadow-[6px_6px_0px_0px_rgba(248,48,2,1)] hover:bg-[#F83002] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-none py-4 text-xl tracking-widest"
              >
                Post Job
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
