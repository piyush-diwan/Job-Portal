import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input, dispatch]);

    return (
        <div className="min-h-screen bg-[#f0f0f0] pb-10">
            <Navbar />
            <div className='max-w-6xl mx-auto my-10 px-4'>
                <div className='flex flex-col md:flex-row items-center justify-between my-5 gap-4'>
                    <Input
                        className="w-full md:w-[300px] rounded-none border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold uppercase p-3 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
                        placeholder="FILTER BY NAME"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button 
                        onClick={() => navigate("/admin/companies/create")} 
                        className="w-full md:w-auto rounded-none border-[3px] border-black bg-[#F83002] text-white font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-none px-6 py-3"
                    >
                        New Company
                    </button>
                </div>
                
                {/* Brutalist Table Container */}
                <div className="border-[3px] border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-0 rounded-none overflow-hidden mt-8">
                    <h1 className='font-black uppercase text-xl p-5 border-b-[3px] border-black bg-yellow-300 m-0'>
                        Registered Companies
                    </h1>
                    <div className="p-0 sm:p-4 overflow-x-auto">
                        <CompaniesTable/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Companies