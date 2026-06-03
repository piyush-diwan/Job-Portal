import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate])

    // Scaled down Brutalist classes
    const inputClass = "border-[3px] border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0 focus-visible:ring-offset-0 p-2 font-bold uppercase text-xs text-black bg-white w-full placeholder-gray-500";
    const labelClass = "font-black uppercase text-sm mb-1 block";

    return (
        <div className="min-h-screen bg-blue-300 flex flex-col">
            <Navbar />
            <div className='flex-1 flex items-center justify-center max-w-7xl mx-auto px-4 py-4 w-full'>
                <form onSubmit={submitHandler} className='w-full max-w-2xl border-[3px] border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none p-6 md:p-8'>
                    <h1 className='font-black uppercase text-3xl mb-5 border-b-[3px] border-black pb-2 tracking-tighter'>
                        Sign<span className="bg-black text-white px-2 border-[3px] border-black ml-1">Up</span>
                    </h1>
                    
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                            <Label className={labelClass}>Full Name</Label>
                            <Input
                                type="text"
                                value={input.fullname}
                                name="fullname"
                                onChange={changeEventHandler}
                                placeholder="JOHN DOE"
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <Label className={labelClass}>Email</Label>
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="USER@EXAMPLE.COM"
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <Label className={labelClass}>Phone Number</Label>
                            <Input
                                type="text"
                                value={input.phoneNumber}
                                name="phoneNumber"
                                onChange={changeEventHandler}
                                placeholder="8080808080"
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <Label className={labelClass}>Password</Label>
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="******"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mt-5 gap-4'>
                        <div className="flex-1 p-3 border-[3px] border-black bg-yellow-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full flex items-center justify-between">
                            <Label className="font-black uppercase text-sm mb-0">Role:</Label>
                            <RadioGroup className="flex items-center gap-4">
                                <div className="flex items-center space-x-1.5">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer w-4 h-4 border-[2px] border-black rounded-none shadow-none accent-black"
                                    />
                                    <Label htmlFor="r1" className="font-black uppercase text-xs cursor-pointer pt-1">Student</Label>
                                </div>
                                <div className="flex items-center space-x-1.5">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer w-4 h-4 border-[2px] border-black rounded-none shadow-none accent-black"
                                    />
                                    <Label htmlFor="r2" className="font-black uppercase text-xs cursor-pointer pt-1">Recruiter</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        
                        <div className='flex-1 w-full'>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer rounded-none border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-0 font-bold uppercase text-xs file:mr-2 file:py-2.5 file:px-3 file:border-0 file:border-r-[3px] file:border-black file:bg-[#F83002] file:text-white file:font-black file:uppercase file:cursor-pointer hover:file:bg-black transition-none w-full"
                            />
                        </div>
                    </div>

                    {
                        loading ? (
                            <Button disabled className="w-full mt-6 rounded-none border-[3px] border-black bg-gray-300 text-black font-black uppercase py-4 opacity-100 text-base"> 
                                <Loader2 className='mr-2 h-5 w-5 animate-spin' /> 
                                WAIT... 
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full mt-6 rounded-none border-[3px] border-black bg-black text-white font-black uppercase shadow-[4px_4px_0px_0px_rgba(248,48,2,1)] hover:bg-[#F83002] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-none py-3 text-lg tracking-widest">
                                Create Account
                            </Button>
                        )
                    }
                    
                    <div className='mt-5 border-t-[3px] border-black pt-4 text-center'>
                        <span className='font-bold uppercase text-xs'>
                            Already have an account? <Link to="/login" className='text-black underline decoration-[2px] underline-offset-2 hover:bg-black hover:text-white px-2 py-1 transition-none'>Log In</Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup