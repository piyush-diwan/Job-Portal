import { setAllJobs } from '@/redux/jobSlice'
import { setUser } from '@/redux/authSlice' // setUser इम्पोर्ट करें
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
                // CRITICAL FIX: अगर टोकन नहीं है या एक्सपायर हो गया (401 Error), तो Redux से यूजर और जॉब्स हटाओ
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    dispatch(setUser(null));
                    dispatch(setAllJobs([]));
                }
            }
        }
        fetchAllJobs();
    }, [searchedQuery, dispatch]) // डिपेंडेंसी ऐरे सही करें
}

export default useGetAllJobs