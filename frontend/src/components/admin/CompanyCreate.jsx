import { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to create company");
        }
    }

    return (
        <div className="min-h-screen bg-[#f0f0f0] pb-10">
            <Navbar />
            <div className='max-w-3xl mx-auto my-10 px-4'>
                <div className="border-[3px] border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-10 rounded-none">
                    <div className='mb-8 border-b-[3px] border-black pb-5'>
                        <h1 className='font-black uppercase text-3xl md:text-4xl tracking-tighter'>Your Company Name</h1>
                        <p className='text-sm font-bold uppercase mt-3 text-gray-700'>What would you like to give your company name? You can change this later.</p>
                    </div>
                    
                    <Label className="font-black uppercase text-sm mb-2 block">Company Name</Label>
                    <Input
                        type="text"
                        className="rounded-none border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0 focus-visible:ring-offset-0 p-4 font-bold uppercase text-sm text-black bg-white placeholder-gray-500 w-full mb-10"
                        placeholder="E.g. MICROSOFT, GOOGLE, JOBHUNT..."
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                    
                    <div className='flex flex-col sm:flex-row items-center gap-4 mt-8'>
                        <button 
                            onClick={() => navigate("/admin/companies")} 
                            className="w-full sm:w-auto rounded-none border-[3px] border-black bg-white text-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-none px-8 py-3"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={registerNewCompany} 
                            className="w-full sm:w-auto rounded-none border-[3px] border-black bg-[#6A38C2] text-white font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#5f32ad] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-none px-8 py-3"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate