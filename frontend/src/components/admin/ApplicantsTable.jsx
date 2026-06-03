import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    }

    return (
        <div className="w-full">
            <Table className="border-collapse w-full min-w-[800px]">
                <TableHeader className="bg-black">
                    <TableRow className="border-b-[3px] border-black hover:bg-black">
                        <TableHead className="font-black uppercase text-white h-12">FullName</TableHead>
                        <TableHead className="font-black uppercase text-white h-12">Email</TableHead>
                        <TableHead className="font-black uppercase text-white h-12">Contact</TableHead>
                        <TableHead className="font-black uppercase text-white h-12">Resume</TableHead>
                        <TableHead className="font-black uppercase text-white h-12">Date</TableHead>
                        <TableHead className="text-right font-black uppercase text-white h-12">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        !applicants || applicants?.applications?.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="font-black uppercase text-center py-8 border-b-[2px] border-black bg-[#f0f0f0] text-lg">
                                    No applicants found.
                                </TableCell>
                            </TableRow>
                        ) : applicants?.applications?.map((item) => (
                            <TableRow key={item._id} className="border-b-[2px] border-black hover:bg-yellow-50 transition-none font-bold uppercase text-sm">
                                <TableCell className="py-4 text-base">{item?.applicant?.fullname}</TableCell>
                                <TableCell className="py-4">{item?.applicant?.email}</TableCell>
                                <TableCell className="py-4">{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell className="py-4">
                                    {
                                        item.applicant?.profile?.resume ? (
                                            <a 
                                                className="bg-black text-white border-[2px] border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(248,48,2,1)] hover:bg-[#F83002] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-none text-xs w-max inline-block truncate max-w-[150px]" 
                                                href={item?.applicant?.profile?.resume} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                            >
                                                {item?.applicant?.profile?.resumeOriginalName}
                                            </a>
                                        ) : <span className="bg-gray-200 border-2 border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs">NA</span>
                                    }
                                </TableCell>
                                <TableCell className="py-4">{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right py-4 cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <div className="p-2 inline-block border-[2px] border-transparent hover:border-black hover:bg-black hover:text-white transition-none">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 rounded-none border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-0 bg-white right-0">
                                            {
                                                shortlistingStatus.map((status, index) => {
                                                    return (
                                                        <div 
                                                            onClick={() => statusHandler(status, item?._id)} 
                                                            key={index} 
                                                            className={`flex items-center w-full p-3 cursor-pointer hover:bg-black hover:text-white transition-none font-black uppercase text-sm ${index === 0 ? 'border-b-[2px] border-black' : ''}`}
                                                        >
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
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

export default ApplicantsTable