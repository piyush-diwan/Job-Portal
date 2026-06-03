import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
    return (
        <div className="overflow-x-auto">
            <Table className="border-collapse">
                <TableCaption className="font-bold uppercase text-xs mb-4">A list of your applied jobs</TableCaption>
                <TableHeader className="bg-black">
                    <TableRow className="border-b-[3px] border-black hover:bg-black">
                        <TableHead className="font-black uppercase text-white h-12">Date</TableHead>
                        <TableHead className="font-black uppercase text-white h-12">Job Role</TableHead>
                        <TableHead className="font-black uppercase text-white h-12">Company</TableHead>
                        <TableHead className="text-right font-black uppercase text-white h-12">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="font-black uppercase text-center py-6 border-b-[2px] border-black bg-[#f0f0f0]">
                                    You haven't applied to any job yet.
                                </TableCell>
                            </TableRow>
                        ) : allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id} className="border-b-[2px] border-black hover:bg-yellow-50 transition-none font-bold uppercase text-sm">
                                <TableCell className="py-4">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className="py-4">{appliedJob.job?.title}</TableCell>
                                <TableCell className="py-4">{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right py-4">
                                    <Badge className={`rounded-none border-2 border-black font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[10px] px-2 py-1 ${
                                        appliedJob?.status === "rejected" ? 'bg-[#F83002] text-white hover:bg-[#F83002]' : 
                                        appliedJob.status === 'pending' ? 'bg-gray-300 text-black hover:bg-gray-300' : 
                                        'bg-green-400 text-black hover:bg-green-400'
                                    }`}>
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable