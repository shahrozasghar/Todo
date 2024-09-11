"use client";

import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Fixed import
import toast from 'react-hot-toast'; // Added missing import

export default function Page() {
    const [value, setValue] = useState({
        title: "",
        desc: "",
    });
    
    const { push } = useRouter(); // Fixed destructuring

    const handleOnChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            const request = await axios.post('/api/', value);
            const response = request.data;
            if (request.status === 200) {  // Fixed typo: reques => request
                toast.success(response.message);  // Fixed typo: respone => response
                push('/');
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <div className='h-screen flex justify-center'>
            <div className='mt-5 flex flex-col p-10 bg-blue-700 h-80 rounded-lg gap-1'>
                <h1 className='text-black font-bold text-2xl'>Enter todo</h1>
                
                <label htmlFor="title">Title:</label>
                <input onChange={handleOnChange} id="title" required name="title" value={value.title} /><br />
                
                <label htmlFor="desc">Description:</label>
                <input name='desc' onChange={handleOnChange} required id="desc" value={value.desc} /><br />

                <button className='bg-green-500 rounded-lg px-4 py-2 font-bold hover:bg-red-600' onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}
