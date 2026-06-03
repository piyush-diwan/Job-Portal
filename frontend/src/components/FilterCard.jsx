import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    const clearFilterHandler = () => {
        setSelectedValue('');
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='w-full bg-white p-3 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none'>
            <div className='flex items-center justify-between mb-3'>
                <h1 className='font-black uppercase text-base'>Filter Jobs</h1>
                {selectedValue && (
                    <button 
                        onClick={clearFilterHandler} 
                        className="text-[10px] font-bold uppercase border-2 border-black bg-[#F83002] text-white px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-none"
                    >
                        Clear
                    </button>
                )}
            </div>
            
            <div className='border-b-2 border-black mb-4'></div>
            
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    fitlerData.map((data, index) => (
                        <div key={index} className="mb-4">
                            <h1 className='font-black uppercase text-sm mb-2 bg-yellow-300 border-2 border-black px-1.5 py-0.5 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'>
                                {data.fitlerType}
                            </h1>
                            <div className="flex flex-col gap-1.5">
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`
                                        return (
                                            <div className='flex items-center space-x-2 cursor-pointer group' key={idx}>
                                                <RadioGroupItem 
                                                    value={item} 
                                                    id={itemId} 
                                                    className="w-4 h-4 border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[#F83002] transition-none focus-visible:ring-0" 
                                                />
                                                <Label 
                                                    htmlFor={itemId} 
                                                    className="font-bold uppercase text-xs cursor-pointer group-hover:bg-black group-hover:text-white px-1 transition-none"
                                                >
                                                    {item}
                                                </Label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard;