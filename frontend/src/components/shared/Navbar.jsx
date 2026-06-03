import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
        setIsMobileMenuOpen(false); // Close menu on logout
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // Common class for brutalist links
  const navLinkClass = (path) => {
    const isActive = location.pathname === path;
    const baseClass = "font-black uppercase text-black border-2 border-transparent px-3 py-2 md:py-1 hover:border-black hover:bg-black hover:text-white transition-none block md:inline-block w-full md:w-auto text-center md:text-left";

    if (isActive) {
      return `${baseClass} border-black bg-black text-white`;
    }

    return baseClass;
  };

  return (
    <div className="bg-white border-b-4 border-black sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-4">
        <div>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
              Job
              <span className="bg-[#F83002] text-white px-1 border-2 border-black ml-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                Portal
              </span>
            </h1>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-none flex items-center justify-center"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-2">
            {user && user.role === "recruiter" ? (
              <>
                <li><Link to="/admin/companies" className={navLinkClass("/admin/companies")}>Companies</Link></li>
                <li><Link to="/admin/jobs" className={navLinkClass("/admin/jobs")}>Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/" className={navLinkClass("/")}>Home</Link></li>
                <li><Link to="/jobs" className={navLinkClass("/jobs")}>Jobs</Link></li>
                <li><Link to="/browse" className={navLinkClass("/browse")}>Browse</Link></li>
                <li><Link to="/saved-jobs" className={navLinkClass("/saved-jobs")}>Saved Jobs</Link></li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button className="rounded-none border-2 border-black bg-white text-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-none px-6">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="rounded-none border-2 border-black bg-[#F83002] text-white font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#d62800] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-none px-6">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <div className="cursor-pointer border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-none p-1 bg-white">
                  <Avatar className="rounded-none h-10 w-10">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="Profile"
                      className="rounded-none object-cover"
                    />
                  </Avatar>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 rounded-none border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-0 bg-white mr-4">
                <div>
                  <div className="flex gap-4 p-4 border-b-4 border-black bg-[#f0f0f0]">
                    <Avatar className="rounded-none border-2 border-black h-12 w-12">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="Profile"
                        className="rounded-none object-cover"
                      />
                    </Avatar>
                    <div className="overflow-hidden">
                      <h4 className="font-black uppercase text-lg truncate">
                        {user?.fullname}
                      </h4>
                      <p className="text-sm font-bold border-t-2 border-black pt-1 truncate">
                        {user?.profile?.bio || "NO BIO"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col p-2 bg-white">
                    {user && user.role === "student" && (
                      <Link to="/profile" className="flex w-full items-center gap-2 cursor-pointer hover:bg-black hover:text-white p-2 border-2 border-transparent hover:border-black transition-none">
                        <User2 className="w-5 h-5 min-w-[20px]" />
                        <span className="font-black uppercase w-full">View Profile</span>
                      </Link>
                    )}
                    <button
                      onClick={logoutHandler}
                      className="flex w-full items-center gap-2 cursor-pointer hover:bg-[#F83002] hover:text-white p-2 border-2 border-transparent hover:border-black transition-none text-black text-left"
                    >
                      <LogOut className="w-5 h-5 min-w-[20px]" />
                      <span className="font-black uppercase w-full">Logout</span>
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#f0f0f0] border-b-4 border-black p-4 flex flex-col gap-4 shadow-[0_8px_0px_0px_rgba(0,0,0,1)] z-40">
          <ul className="flex flex-col font-medium gap-2">  
            {user && user.role === "recruiter" ? (
              <>
                <li><Link to="/admin/companies" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass("/admin/companies")}>Companies</Link></li>
                <li><Link to="/admin/jobs" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass("/admin/jobs")}>Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass("/")}>Home</Link></li>
                <li><Link to="/jobs" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass("/jobs")}>Jobs</Link></li>
                <li><Link to="/browse" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass("/browse")}>Browse</Link></li>
                <li><Link to="/saved" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass("/saved")}>Saved</Link></li>

              </>
            )}
          </ul>

          <div className="border-t-4 border-black pt-4 flex flex-col gap-4">
            {!user ? (
              <div className="flex flex-col gap-3">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full rounded-none border-2 border-black bg-white text-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 transition-none py-6">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full rounded-none border-2 border-black bg-[#F83002] text-white font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-none py-6">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2 px-2">
                   <Avatar className="rounded-none border-2 border-black h-10 w-10">
                     <AvatarImage src={user?.profile?.profilePhoto} />
                   </Avatar>
                   <h4 className="font-black uppercase truncate">{user?.fullname}</h4>
                </div>
                {user.role === "student" && (
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 p-3 border-2 border-black bg-white font-black uppercase hover:bg-black hover:text-white transition-none">
                    <User2 className="w-5 h-5" /> View Profile
                  </Link>
                )}
                <button
                  onClick={logoutHandler}
                  className="flex items-center gap-2 p-3 border-2 border-black bg-black text-white font-black uppercase hover:bg-[#F83002] transition-none text-left w-full"
                >
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;