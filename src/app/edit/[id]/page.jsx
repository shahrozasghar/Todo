"use client"

import axios from 'axios';

import React, { useState , useEffect  } from 'react';
import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';


export default function Page({ params }) {
  const  id  = params.id; 
  const [value, setValue] = useState({
    title: "",
    desc: "",
  });
  const { push , query} = useRouter();
  const router = useRouter();
  // const {title,desc} = router.query;
  // console.log(router.query);
  const handleOnChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  };
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`/api/todo/${id}`);  // Fetch data from the API
        console.log(response);
        setValue({
          title: response.data.todo.title,
          desc: response.data.todo.desc,
        });
      } catch (error) {
        console.error("Error fetching todo:", error);
      }
    };

    fetchTodo();
  }, [id]);  // Dependency array to re-fetch if id changes
  const handleSubmit = async () => {
    try {
      if (id) {
        const request = await axios.put(`/api/todo/${id}`, value);
        const response = request.data;
        if (request.status === 200) {  // Fixed the typo here
          toast.success(response.message);  // Fixed the typo here
          push('/');
        }
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
