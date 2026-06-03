import React from 'react'
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-6 bg-white border-4 border-black cursor-pointer shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-none flex flex-col justify-between"
    >
      <div className="flex items-center gap-4 mb-4 border-b-4 border-black pb-4">
        {/* Brutalist Avatar Container */}
        <div className="w-16 h-16 border-4 border-black bg-white flex-shrink-0 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Avatar className="w-full h-full rounded-none">
                <AvatarImage src={job?.company?.logo} alt="Logo" className="object-contain p-1" />
                <AvatarFallback className="rounded-none font-black text-2xl uppercase bg-yellow-300 text-black">
                    {job?.company?.name?.charAt(0) || "C"}
                </AvatarFallback>
            </Avatar>
        </div>
        
        <div>
            <h1 className="font-black uppercase text-xl">{job?.company?.name}</h1>
            <p className="text-xs font-bold uppercase">India</p>
        </div>
      </div>
      
      <div>
        <h1 className="font-black uppercase text-2xl mb-2">{job?.title}</h1>
        <p className="text-sm font-bold uppercase line-clamp-3">
          {job?.description}
        </p>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 mt-6">
        <Badge className="rounded-none border-2 border-black bg-blue-300 text-black font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-300">
          {job?.position} POSITIONS
        </Badge>
        <Badge className="rounded-none border-2 border-black bg-[#F83002] text-white font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#F83002]">
          {job?.jobType}
        </Badge>
        <Badge className="rounded-none border-2 border-black bg-yellow-300 text-black font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300">
          {job?.salary} / Month
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;