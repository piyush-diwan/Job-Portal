import React, { useState } from 'react'
import { Bookmark, Loader2 } from 'lucide-react' // Loader2 add kiya hai
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '@/redux/authSlice' // Redux update ke liye

const Job = ({job}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    // Initial check
    const initiallySaved = user?.profile?.savedJobs?.some(savedJob => 
        savedJob === job?._id || savedJob?._id === job?._id
    ) || false;

    const [isSaved, setIsSaved] = useState(initiallySaved);
    const [loading, setLoading] = useState(false); // Double click roklega

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
   
    const saveJobHandler = async (e) => {
        e.stopPropagation(); // Agar kisi parent par click laga ho toh use rokne ke liye
        if(loading) return; // Agar already API call chal rahi h toh dusri roko

        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/save/${job?._id}`, {}, {
                withCredentials: true
            });
            
            if (res.data.success) {
                // Backend se mili hui accurate state use karo
                setIsSaved(res.data.isSaved); 
                
                // Redux store ko immediately update kardo
                if(user){
                    dispatch(setUser({
                        ...user,
                        profile: {
                            ...user.profile,
                            savedJobs: res.data.savedJobs
                        }
                    }));
                }

                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to save job");
        } finally {
            setLoading(false); // API complete hone par loading hata do
        }
    };
    
    return (
        <div className='p-4 bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-none flex flex-col justify-between h-full'>
            <div className='flex items-center justify-between mb-3'>
                <p className='text-[10px] font-bold uppercase bg-yellow-300 border-2 border-black px-1.5 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'>
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <button 
                    onClick={saveJobHandler} 
                    disabled={loading}
                    className="p-1.5 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-black' : ''}`} />}
                </button>
            </div>

            <div className='flex items-center gap-3 my-2 border-b-[3px] border-black pb-3'>
                <div className="w-12 h-12 border-[3px] border-black bg-white flex-shrink-0 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Avatar className="w-full h-full rounded-none">
                        <AvatarImage src={job?.company?.logo} alt="Logo" className="object-contain p-0.5" />
                        <AvatarFallback className="rounded-none font-black text-lg uppercase bg-yellow-300 text-black">
                            {job?.company?.name?.charAt(0) || "C"}
                        </AvatarFallback>
                    </Avatar>
                </div>

                <div>
                    <h1 className='font-black uppercase text-base leading-tight'>{job?.company?.name}</h1>
                    <p className='text-[10px] font-bold uppercase'>India</p>
                </div>
            </div>

            <div className='mt-2'>
                <h1 className='font-black uppercase text-lg mb-1 leading-tight'>{job?.title}</h1>
                <p className='text-xs font-bold uppercase line-clamp-2'>{job?.description}</p>
            </div>
            
            <div className='flex flex-wrap items-center gap-1.5 mt-3 mb-4'>
                <Badge className='rounded-none border-2 border-black bg-blue-300 text-black font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[10px] px-1.5 py-0.5 hover:bg-blue-300'>
                    {job?.position} POS
                </Badge>
                <Badge className='rounded-none border-2 border-black bg-[#F83002] text-white font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[10px] px-1.5 py-0.5 hover:bg-[#F83002]'>
                    {job?.jobType}
                </Badge>
                <Badge className='rounded-none border-2 border-black bg-yellow-300 text-black font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[10px] px-1.5 py-0.5 hover:bg-yellow-300'>
                    {job?.salary} / Month
                </Badge>
            </div>
            
            <div className='flex items-center gap-3 mt-auto pt-2'>
                <button 
                    onClick={() => navigate(`/description/${job?._id}`)} 
                    className="flex-1 border-[3px] border-black bg-white font-black uppercase py-1.5 text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-none"
                >
                    Details
                </button>
                <button 
                    onClick={saveJobHandler}
                    disabled={loading}
                    className={`flex-1 border-[3px] border-black font-black uppercase py-1.5 text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-none flex items-center justify-center gap-1 disabled:opacity-80 disabled:cursor-wait ${isSaved ? 'bg-gray-300 text-gray-500 shadow-none translate-x-[2px] translate-y-[2px]' : 'bg-[#6A38C2] text-white hover:bg-[#5f32ad] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none'}`}
                >
                    {loading && <Loader2 className="w-3 h-3 animate-spin" />}
                    {isSaved ? 'Saved' : 'Save'}
                </button>
            </div>
        </div>
    )
}

export default Job