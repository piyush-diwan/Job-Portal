import { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Search, X } from 'lucide-react';

const Browse = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const dispatch = useDispatch();
    
    // Local state for the search input box
    const [query, setQuery] = useState("");

    // Jaise hi Redux mein searchedQuery aaye (from Home), usko input mein set kardo
    useEffect(() => {
        setQuery(searchedQuery || "");
    }, [searchedQuery]);

    // Client-side filtering logic
    const filterJobs = allJobs.filter((job) => {
        if (!searchedQuery) return true;
        return job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
               job?.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
               job?.company?.name?.toLowerCase().includes(searchedQuery.toLowerCase());
    });

    // Form submit handler
    const searchHandler = (e) => {
        e.preventDefault();
        dispatch(setSearchedQuery(query));
    };

    // Clear search handler
    const clearSearchHandler = () => {
        setQuery("");
        dispatch(setSearchedQuery(""));
    };

    return (
        <div className="min-h-screen bg-[#f0f0f0]">
            <Navbar />
            <div className='max-w-7xl mx-auto my-6 px-4'>
                
                {/* Compact Brutalist Search Bar */}
                <form onSubmit={searchHandler} className="flex w-full md:w-[60%] border-[3px] border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] items-stretch mb-6">
                    <input
                        type="text"
                        value={query}
                        placeholder="SEARCH JOBS OR COMPANIES..."
                        onChange={(e) => setQuery(e.target.value)}
                        className="outline-none border-none w-full p-3 font-black uppercase text-sm placeholder-gray-500 text-black"
                    />
                    
                    {query && (
                        <button
                            type="button"
                            onClick={clearSearchHandler}
                            className="border-l-[3px] border-black bg-yellow-300 text-black hover:bg-black hover:text-white transition-none px-3 flex items-center justify-center"
                        >
                            <X className="h-5 w-5" strokeWidth={3} />
                        </button>
                    )}

                    <button
                        type="submit"
                        className="border-l-[3px] border-black bg-black text-white hover:bg-[#F83002] transition-none px-5 flex items-center justify-center"
                    >
                        <Search className="h-5 w-5" strokeWidth={3} />
                    </button>
                </form>

                <h1 className='font-black uppercase text-2xl md:text-3xl mb-5 border-b-[3px] border-black pb-2'>
                    Search Results 
                    <span className="bg-[#F83002] text-white px-2 border-[3px] border-black ml-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xl align-middle">
                        {filterJobs.length}
                    </span>
                </h1>
                
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {
                        filterJobs.length <= 0 ? (
                            <div className="col-span-full font-black uppercase text-lg p-4 border-[3px] border-black bg-yellow-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
                                No Jobs Found matching "{searchedQuery}"
                            </div>
                        ) : (
                            filterJobs.map((job) => {
                                return (
                                    <Job key={job._id} job={job}/>
                                )
                            })
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse;