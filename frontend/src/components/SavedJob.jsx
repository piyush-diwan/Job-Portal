import { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const SavedJob = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getsavedjobs`, {
                    withCredentials: true
                });
                
                if (res.data.success) {
                    setSavedJobs(res.data.savedJobs);
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to load saved jobs");
            } finally {
                setLoading(false);
            }
        };

        fetchSavedJobs();
    }, []);

    return (
        <div className="min-h-screen bg-[#f0f0f0]">
            <Navbar />
            <div className='max-w-7xl mx-auto my-6 px-4'>
                <h1 className='font-black uppercase text-2xl md:text-3xl mb-6 border-b-[3px] border-black pb-2'>
                    My Saved Jobs
                    <span className="bg-[#F83002] text-white px-2 border-[3px] border-black ml-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xl align-middle">
                        {savedJobs.length}
                    </span>
                </h1>
                
                {loading ? (
                    <div className="font-black uppercase text-lg p-4 border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
                        LOADING YOUR SAVED JOBS...
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                        {
                            savedJobs.length <= 0 ? (
                                <div className="col-span-full font-black uppercase text-lg p-4 border-[3px] border-black bg-yellow-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
                                    You haven't saved any jobs yet.
                                </div>
                            ) : (
                                savedJobs.map((job) => {
                                    return (
                                        <Job key={job._id} job={job}/>
                                    )
                                })
                            )
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default SavedJob