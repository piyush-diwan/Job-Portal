import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className="min-h-screen bg-[#f0f0f0] pb-10">
            <Navbar />
            
            <div className='max-w-4xl mx-auto bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mt-8 p-6 md:p-8 rounded-none'>
                <div className='flex flex-col md:flex-row justify-between gap-4'>
                    <div className='flex items-center gap-5'>
                        {/* Brutalist Avatar */}
                        <div className="w-24 h-24 border-[3px] border-black bg-white flex-shrink-0 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <Avatar className="w-full h-full rounded-none">
                                <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" className="object-cover rounded-none" />
                                <AvatarFallback className="rounded-none font-black text-3xl uppercase bg-yellow-300 text-black">
                                    {user?.fullname?.charAt(0) || "U"}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div>
                            <h1 className='font-black uppercase text-2xl md:text-3xl leading-none'>{user?.fullname}</h1>
                            <p className='text-sm font-bold uppercase text-gray-700 mt-1'>{user?.profile?.bio || "NO BIO AVAILABLE"}</p>
                        </div>
                    </div>
                    <Button 
                        onClick={() => setOpen(true)} 
                        className="rounded-none border-[3px] border-black bg-[#F83002] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-none h-fit px-4 py-2"
                    >
                        <Pen className="w-4 h-4 mr-2" /> <span className="font-black uppercase">Edit</span>
                    </Button>
                </div>
                
                <div className='my-6 border-y-[3px] border-black py-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='flex items-center gap-3 font-bold uppercase text-sm border-[2px] border-black p-2 bg-yellow-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'>
                        <Mail className="w-5 h-5" />
                        <span className="truncate">{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 font-bold uppercase text-sm border-[2px] border-black p-2 bg-yellow-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'>
                        <Contact className="w-5 h-5" />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                <div className='my-6'>
                    <h1 className='font-black uppercase text-lg mb-3'>Skills</h1>
                    <div className='flex flex-wrap items-center gap-2'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => (
                                <Badge key={index} className='rounded-none border-2 border-black bg-blue-300 text-black font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-2 py-1 hover:bg-blue-300 text-xs'>
                                    {item}
                                </Badge>
                            )) : <span className="font-bold uppercase text-sm bg-gray-200 border-2 border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">NA</span>
                        }
                    </div>
                </div>

                <div className='grid w-full max-w-sm items-center gap-2'>
                    <Label className="text-lg font-black uppercase">Resume</Label>
                    {
                        isResume ? (
                            <a target='blank' href={user?.profile?.resume} className='font-bold uppercase text-sm bg-black text-white px-3 py-2 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(248,48,2,1)] hover:bg-[#F83002] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-none w-fit truncate max-w-full'>
                                {user?.profile?.resumeOriginalName || "DOWNLOAD RESUME"}
                            </a>
                        ) : (
                            <span className="font-bold uppercase text-sm bg-gray-200 border-2 border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] w-fit">NA</span>
                        )
                    }
                </div>
            </div>

            <div className='max-w-4xl mx-auto bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mt-8 p-0 rounded-none overflow-hidden'>
                <h1 className='font-black uppercase text-xl p-5 border-b-[3px] border-black bg-yellow-300 m-0'>
                    Applied Jobs
                </h1>
                <div className="p-0 sm:p-4">
                    <AppliedJobTable />
                </div>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile