import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-8 px-4">
      <div className="border-b-4 border-black pb-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
          <span className="bg-black text-white px-2 border-4 border-black">
            Latest
          </span>{" "}
          Job Openings
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
        {allJobs.length <= 0 ? (
          <span className="font-black uppercase text-xl p-4 border-4 border-black bg-yellow-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            No Job Available
          </span>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
