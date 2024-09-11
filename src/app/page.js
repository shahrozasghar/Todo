"use client";

import { FaPlus, FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'; // Correct import for Next.js 13+
import Modal from "../component/Modal";
import toast from "react-hot-toast";  // Ensure toast for success/error messages
import Link from "next/link";

export default function Home() {
  const [todo, setTodo] = useState([]);
  const [todoID, setTodoID] = useState(null);  // Initialize to null
  const [showModal, setShowModal] = useState(false);  // Modal visibility state
  const [edit, setEdit] = useState("");  // Initialize to null
  console.log(edit);
  const router = useRouter();

  const getTodo = async () => {
    try {
      const request = await axios.get('/api');
      const response = request.data;
      setTodo(response.todos);
      console.log('Todo', response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTodo();
  }, []);

  const handleNavigate = () => {
    router.push('/add');
  };

  // const handleUpdate = (data) => {

  //   setEdit(data)
  //   if (!router) {
  //     console.error('Router is not available');
  //     return;
  //   }
  //   router.push({
  //     pathname: `/edit/${data._id}`,
  //     query: { title: data.title, desc: data.desc },
  //   });
  // };

  // Handle the deletion of a todo
  const handleDeleteTodo = async (id) => {
    try {
      const request = await axios.delete(`/api/todo/${id}`);  // Send DELETE request to the correct API endpoint
      const response = request.data;
      if (request.status === 200) {
        getTodo();
        toast.success(response.message);
      }
    } catch (error) {
      console.log("Error deleting todo:", error);
      toast.error("Failed to delete the todo.");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-yellow-30 w-full h-screen">
        <div className="bg-yellow-200 w-2/4 flex flex-col gap-5 rounded-lg shadow-xl p-5">
          <div className="flex justify-between items-center w-full">
            <button
              className="rounded flex items-center bg-purple-600 px-4 py-2 text-white"
              onClick={handleNavigate}
            >
              ADD <FaPlus className="ml-2" />
            </button>
          </div>

          {todo?.length > 0 ? (
            todo.map((item) => (
              <div key={item._id} className="bg-white p-4 rounded-lg shadow-md flex-col gap-5 mt-5">
                <h2 className="font-bold text-xl">{item.title}</h2>
                <p className="text-sm">{item.desc}</p>
                <div className="flex justify-between mt-2">
                  <MdDelete size={23} onClick={() => handleDeleteTodo(item._id)} color="red" cursor="pointer" />
                  <Link
                    href={{
                      pathname: `/edit/${item._id}`, 
                    }}
                    passHref
                  >
                    <FaPen size={23} cursor="pointer" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="mt-10 text-center">No Todos found.</p>
          )}
        </div>
      </div>
    </>
  );
}
