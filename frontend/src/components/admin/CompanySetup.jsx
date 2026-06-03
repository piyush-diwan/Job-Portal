import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    
    const {singleCompany} = useSelector(store=>store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    },[singleCompany]);

    // Brutalist class variables
    const inputClass = "rounded-none border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0 focus-visible:ring-offset-0 p-3 font-bold uppercase text-xs text-black bg-white placeholder-gray-500 w-full";
    const labelClass = "font-black uppercase text-sm mb-2 block";

    return (
        <div className="min-h-screen bg-[#f0f0f0] pb-10">
            <Navbar />
            <div className='max-w-3xl mx-auto my-10 px-4'>
                <form onSubmit={submitHandler} className="border-[3px] border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-10 rounded-none">
                    
                    <div className='flex flex-col sm:flex-row sm:items-center gap-5 border-b-[3px] border-black pb-6 mb-8'>
                        <button 
                            type="button" 
                            onClick={() => navigate("/admin/companies")} 
                            className="w-fit rounded-none border-[3px] border-black bg-white text-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-none px-4 py-2 flex items-center gap-2"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back</span>
                        </button>
                        <h1 className='font-black uppercase text-2xl md:text-3xl tracking-tighter'>Company Setup</h1>
                    </div>
                    
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                            <Label className={labelClass}>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
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
                            <Label className={labelClass}>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
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
                        <div className="md:col-span-2">
                            <Label className={labelClass}>Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="cursor-pointer rounded-none border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-0 font-bold uppercase text-[10px] file:mr-2 file:py-3 file:px-4 file:border-0 file:border-r-[3px] file:border-black file:bg-[#F83002] file:text-white file:font-black file:uppercase file:cursor-pointer hover:file:bg-black transition-none w-full"
                            />
                        </div>
                    </div>
                    
                    <div className="mt-10 border-t-[3px] border-black pt-6">
                        {
                            loading ? (
                                <button disabled className="w-full flex items-center justify-center rounded-none border-[3px] border-black bg-gray-300 text-black font-black uppercase py-4 opacity-100 text-base shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"> 
                                    <Loader2 className='mr-2 h-5 w-5 animate-spin' /> 
                                    WAIT... 
                                </button>
                            ) : (
                                <button type="submit" className="w-full rounded-none border-[3px] border-black bg-black text-white font-black uppercase shadow-[6px_6px_0px_0px_rgba(248,48,2,1)] hover:bg-[#F83002] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-none py-4 text-xl tracking-widest">
                                    Update
                                </button>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompanySetup