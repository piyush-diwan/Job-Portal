import { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import { Button } from './ui/button';
import { ArrowLeftIcon } from 'lucide-react';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); 
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); 
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) 
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    return (
        <div className="min-h-screen bg-[#f0f0f0]">
            <Navbar />
            
            <div className='max-w-4xl mx-auto my-6 px-4'>
                 <div>
                    <Button className='mb-4' onClick={() => window.history.back()}> <ArrowLeftIcon className='mr-1 h-4 w-4'/> Back </Button>
                </div>
                <div className='flex flex-col md:flex-row md:items-center justify-between border-[3px] border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 mb-6 gap-4'>
                    <div>
                        <h1 className='font-black uppercase text-2xl md:text-3xl tracking-tighter mb-2 leading-tight'>{singleJob?.title}</h1>
                        <div className='flex flex-wrap items-center gap-2 mt-2'>
                            <Badge className='rounded-none border-2 border-black bg-blue-300 text-black font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] py-0.5 px-2 text-xs'>
                                {singleJob?.position} POSITIONS
                            </Badge>
                            <Badge className='rounded-none border-2 border-black bg-[#F83002] text-white font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] py-0.5 px-2 text-xs'>
                                {singleJob?.jobType}
                            </Badge>
                            <Badge className='rounded-none border-2 border-black bg-yellow-300 text-black font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] py-0.5 px-2 text-xs'>
                                Rs. {singleJob?.salary} / MONTH
                            </Badge>
                        </div>
                    </div>
                    <button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-none border-[3px] border-black font-black uppercase py-2.5 px-6 text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-none whitespace-nowrap w-full md:w-auto ${isApplied ? 'bg-gray-400 text-black shadow-none translate-x-[2px] translate-y-[2px] cursor-not-allowed' : 'bg-black text-white hover:bg-[#F83002] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none'}`}
                    >
                        {isApplied ? 'ALREADY APPLIED' : 'APPLY NOW'}
                    </button>
                </div>

                <div className="border-[3px] border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5">
                    <h1 className='border-b-[3px] border-black font-black uppercase text-xl pb-2 mb-4 tracking-tighter'>
                        Job Description
                    </h1>
                    
                    {/* Compact Brutalist Data Grid */}
                    <div className='grid grid-cols-1 gap-2 font-bold uppercase text-xs md:text-sm'>
                        <div className='grid grid-cols-1 md:grid-cols-[150px_1fr] border-b-2 border-black pb-2'>
                            <span className='font-black'>Company:</span> 
                            <span className='text-gray-800'>{singleJob?.company?.name}</span>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-[150px_1fr] border-b-2 border-black pb-2'>
                            <span className='font-black'>Role:</span> 
                            <span className='text-gray-800'>{singleJob?.title}</span>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-[150px_1fr] border-b-2 border-black pb-2'>
                            <span className='font-black'>Location:</span> 
                            <span className='text-gray-800'>{singleJob?.location}</span>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-[150px_1fr] border-b-2 border-black pb-2'>
                            <span className='font-black'>Description:</span> 
                            <span className='text-gray-800 normal-case'>{singleJob?.description}</span>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-[150px_1fr] border-b-2 border-black pb-2'>
                            <span className='font-black'>Experience:</span> 
                            <span className='text-gray-800'>{singleJob?.experienceLevel} YRS</span>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-[150px_1fr] border-b-2 border-black pb-2'>
                            <span className='font-black'>Salary:</span> 
                            <span className='text-gray-800'>RS. {singleJob?.salary} PER MONTH</span>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-[150px_1fr] border-b-2 border-black pb-2'>
                            <span className='font-black'>Requirements:</span> 
                            <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-gray-800'>
                                {singleJob?.requirements?.map((requirement, index) => (
                                    <li key={index} className='list-disc list-inside break-words'>
                                        {requirement}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-[150px_1fr] border-b-2 border-black pb-2'>
                            <span className='font-black'>Applicants:</span> 
                            <span className='text-gray-800'>{singleJob?.applications?.length}</span>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-[150px_1fr]'>
                            <span className='font-black'>Posted Date:</span> 
                            <span className='text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription