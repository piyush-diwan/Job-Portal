import { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { ArrowLeft } from 'lucide-react';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {applicants} = useSelector(store=>store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, [params.id, dispatch]);

    return (
        <div className="min-h-screen bg-[#f0f0f0] pb-10">
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4'>
                <div className='flex flex-col sm:flex-row sm:items-center gap-5 mb-8'>
                    <button 
                        type="button" 
                        onClick={() => navigate("/admin/jobs")} 
                        className="w-fit rounded-none border-[3px] border-black bg-white text-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-none px-4 py-2 flex items-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back</span>
                    </button>
                    <h1 className='font-black uppercase text-2xl md:text-3xl tracking-tighter'>
                        Applicants 
                        <span className="bg-[#F83002] text-white px-2 border-[3px] border-black ml-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] align-middle">
                            {applicants?.applications?.length || 0}
                        </span>
                    </h1>
                </div>

                <div className="border-[3px] border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-0 rounded-none overflow-hidden mt-8">
                    <div className="p-0 sm:p-4 overflow-x-auto">
                        <ApplicantsTable />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Applicants