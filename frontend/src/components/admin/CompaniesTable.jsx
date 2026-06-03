import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(()=>{
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    },[companies, searchCompanyByText])

    return (
        <div className="w-full">
            <Table className="border-collapse w-full min-w-[600px]">
                <TableHeader className="bg-black">
                    <TableRow className="border-b-[3px] border-black hover:bg-black">
                        <TableHead className="font-black uppercase text-white h-12 w-24">Logo</TableHead>
                        <TableHead className="font-black uppercase text-white h-12">Name</TableHead>
                        <TableHead className="font-black uppercase text-white h-12">Date</TableHead>
                        <TableHead className="text-right font-black uppercase text-white h-12">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="font-black uppercase text-center py-8 border-b-[2px] border-black bg-[#f0f0f0] text-lg">
                                    No companies registered yet.
                                </TableCell>
                            </TableRow>
                        ) : filterCompany?.map((company) => (
                            <TableRow key={company._id} className="border-b-[2px] border-black hover:bg-yellow-50 transition-none font-bold uppercase text-sm">
                                <TableCell className="py-3">
                                    <div className="w-12 h-12 border-[2px] border-black bg-white flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        <Avatar className="w-full h-full rounded-none">
                                            <AvatarImage src={company.logo} className="object-contain p-0.5" />
                                            <AvatarFallback className="rounded-none font-black text-lg uppercase bg-yellow-300 text-black">
                                                {company.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 text-base">{company.name}</TableCell>
                                <TableCell className="py-4">{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right py-4 cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <div className="p-2 inline-block border-[2px] border-transparent hover:border-black hover:bg-black hover:text-white transition-none">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 rounded-none border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-0 bg-white right-0">
                                            <div 
                                                onClick={()=> navigate(`/admin/companies/${company._id}`)} 
                                                className='flex items-center gap-2 w-full p-3 cursor-pointer hover:bg-black hover:text-white transition-none font-black uppercase text-sm'
                                            >
                                                <Edit2 className='w-4 h-4' />
                                                <span>Edit</span>
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

export default CompaniesTable