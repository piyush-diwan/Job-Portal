import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => { 
    const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(()=>{ 
        const filteredJobs = allAdminJobs.filter((job)=>{
            if(!searchJobByText){
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    },[allAdminJobs, searchJobByText])

    return (
        <div className="w-full">
            <Table className="border-collapse w-full min-w-[600px]">
                <TableHeader className="bg-black">
                    <TableRow className="border-b-[3px] border-black hover:bg-black">
                        <TableHead className="font-black uppercase text-white h-12">Company Name</TableHead>
                        <TableHead className="font-black uppercase text-white h-12">Role</TableHead>
                        <TableHead className="font-black uppercase text-white h-12">Date</TableHead>
                        <TableHead className="text-right font-black uppercase text-white h-12">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="font-black uppercase text-center py-8 border-b-[2px] border-black bg-[#f0f0f0] text-lg">
                                    No jobs posted yet.
                                </TableCell>
                            </TableRow>
                        ) : filterJobs?.map((job) => (
                            <TableRow key={job._id} className="border-b-[2px] border-black hover:bg-yellow-50 transition-none font-bold uppercase text-sm">
                                <TableCell className="py-4 text-base">{job?.company?.name}</TableCell>
                                <TableCell className="py-4">{job?.title}</TableCell>
                                <TableCell className="py-4">{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right py-4 cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <div className="p-2 inline-block border-[2px] border-transparent hover:border-black hover:bg-black hover:text-white transition-none">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-36 rounded-none border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-0 bg-white right-0">
                                            <div 
                                                onClick={()=> navigate(`/admin/jobs/${job._id}`)} 
                                                className='flex items-center gap-2 w-full p-3 cursor-pointer hover:bg-black hover:text-white border-b-[2px] border-black transition-none font-black uppercase text-sm'
                                            >
                                                <Edit2 className='w-4 h-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div 
                                                onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} 
                                                className='flex items-center gap-2 w-full p-3 cursor-pointer hover:bg-black hover:text-white transition-none font-black uppercase text-sm'
                                            >
                                                <Eye className='w-4 h-4'/>
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable