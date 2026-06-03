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
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
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
    const inputClass = "border-[3px] border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0 focus-visible:ring-offset-0 p-2.5 font-bold uppercase text-sm text-black bg-white placeholder-gray-500 w-full";
    const labelClass = "font-black uppercase text-sm mb-1.5 block";

    return (
        <div className="min-h-screen bg-[#f0f0f0] flex flex-col">
            <Navbar />
            <div className='flex-1 flex items-center justify-center max-w-7xl mx-auto px-4 py-6 w-full'>
                <form onSubmit={submitHandler} className='w-full max-w-md border-[3px] border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none p-6 md:p-8'>
                    <h1 className='font-black uppercase text-3xl mb-5 border-b-[3px] border-black pb-2 tracking-tighter'>
                        Log<span className="bg-[#F83002] text-white px-2 border-[3px] border-black ml-1">in</span>
                    </h1>
                    
                    <div className='my-4'>
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
                    
                    <div className='my-4'>
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
                    
                    <div className='flex items-center justify-between my-5 p-3 border-[3px] border-black bg-yellow-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
                        <Label className="font-black uppercase text-sm">Role:</Label>
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
                    
                    {
                        loading ? (
                            <Button disabled className="w-full my-4 rounded-none border-[3px] border-black bg-gray-300 text-black font-black uppercase py-3 opacity-100 text-base"> 
                                <Loader2 className='mr-2 h-5 w-5 animate-spin' /> 
                                WAIT... 
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4 rounded-none border-[3px] border-black bg-black text-white font-black uppercase shadow-[4px_4px_0px_0px_rgba(248,48,2,1)] hover:bg-[#F83002] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-none py-3 text-lg tracking-widest">
                                Enter
                            </Button>
                        )
                    }
                    
                    <div className='mt-5 border-t-[3px] border-black pt-4 text-center'>
                        <span className='font-bold uppercase text-xs'>
                            No account yet? <Link to="/signup" className='text-black underline decoration-[2px] underline-offset-2 hover:bg-black hover:text-white px-2 py-1 transition-none'>Sign Up</Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login