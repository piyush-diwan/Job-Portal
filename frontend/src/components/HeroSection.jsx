import { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (e) => {
    e.preventDefault(); // Default form submit ko rokne ke liye
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center py-8 bg-white border-b-4 border-black">
      <div className="flex flex-col gap-5 my-6 px-4">
        <span className="mx-auto px-4 py-2 border-4 border-black bg-[#F83002] text-white font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          No. 1 Job Hunt Website
        </span>

        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
          <p className="mb-5">Search, Apply &</p> Get Your{" "}
          <span className="bg-[#F83002] mt-5 text-white px-2 border-4 border-black">
            Dream Jobs
          </span>
        </h1>

        <p className="max-w-3xl mx-auto font-bold uppercase text-xs border-l-4 border-black pl-4 text-left md:text-center md:border-l-0">
          Explore thousands of active, verified vacancies from top-tier tech
          companies, innovative startups, and industry leaders. Filter
          opportunities tailored precisely to your tech stack and fast-track
          your career today.
        </p>

        {/* Input ko form mein wrap kiya gaya hai */}
        <form 
          onSubmit={searchJobHandler} 
          className="flex w-full md:w-[50%] border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] items-stretch mx-auto mt-6"
        >
          <input
            type="text"
            placeholder="FIND YOUR DREAM JOBS"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full p-3 font-black uppercase placeholder-gray-500"
          />
          <Button
            type="submit"
            className="rounded-none border-l-4 border-black bg-black text-white hover:bg-[#F83002] transition-none px-8 h-auto"
          >
            <Search className="h-6 w-6" strokeWidth={3} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;