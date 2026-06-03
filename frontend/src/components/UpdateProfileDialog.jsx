import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(', ') || "", 
        file: user?.profile?.resume || ""
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        
        try {
            setLoading(true); 
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false); 
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false); 
        }
    }

    // Brutalist utility classes for inputs and labels
    const inputClass = "col-span-3 border-[3px] border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0 focus-visible:ring-offset-0 p-2 font-bold uppercase text-xs text-black bg-white";
    const labelClass = "text-right font-black uppercase text-xs md:text-sm";

    return (
        <Dialog open={open} onOpenChange={setOpen}> 
            <DialogContent className="sm:max-w-[450px] rounded-none border-[4px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-[#f0f0f0] p-0 overflow-hidden" onInteractOutside={() => setOpen(false)}>
                <DialogHeader className="bg-yellow-300 border-b-[3px] border-black p-5">
                    <DialogTitle className="font-black uppercase text-2xl tracking-tighter">Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler} className="p-5 bg-white">
                    <div className='grid gap-5 py-2'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="fullname" className={labelClass}>Name</Label>
                            <Input
                                id="fullname"
                                name="fullname" 
                                type="text"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                className={inputClass}
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="email" className={labelClass}>Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className={inputClass}
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="phoneNumber" className={labelClass}>Number</Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber" 
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                className={inputClass}
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="bio" className={labelClass}>Bio</Label>
                            <Input
                                id="bio"
                                name="bio"
                                value={input.bio}
                                onChange={changeEventHandler}
                                className={inputClass}
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="skills" className={labelClass}>Skills</Label>
                            <Input
                                id="skills"
                                name="skills"
                                value={input.skills}
                                onChange={changeEventHandler}
                                className={inputClass}
                                placeholder="E.g. React, Node.js"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="file" className={labelClass}>Resume</Label>
                            <Input
                                id="file"
                                type="file"
                                accept="application/pdf"
                                onChange={fileChangeHandler}
                                className="col-span-3 cursor-pointer rounded-none border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-0 font-bold uppercase text-[10px] file:mr-2 file:py-2 file:px-2 file:border-0 file:border-r-[3px] file:border-black file:bg-[#F83002] file:text-white file:font-black file:uppercase file:cursor-pointer hover:file:bg-black transition-none w-full"
                            />
                        </div>
                    </div>
                    <DialogFooter className="mt-6 border-t-[3px] border-black pt-4">
                        {loading ? (
                            <Button disabled className="w-full rounded-none border-[3px] border-black bg-gray-300 text-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] py-6 text-lg transition-none"> 
                                <Loader2 className='mr-2 h-5 w-5 animate-spin' /> 
                                WAIT... 
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full rounded-none border-[3px] border-black bg-black text-white font-black uppercase shadow-[6px_6px_0px_0px_rgba(248,48,2,1)] hover:bg-[#F83002] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-none py-6 text-lg tracking-widest">
                                Update
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog;