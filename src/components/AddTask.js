import axios from "../axiosConfig";
import React, { useRef } from "react";
import toast from "react-hot-toast";

const AddTask = ({ user, refetchHome }) => {
  const titleRef = useRef("");
  const desRef = useRef("");

  const submitHandle = async (e) => {
    e.preventDefault();
    const data = {
      title: titleRef.current.value,
      description: desRef.current.value,
      userEmail: user?.email,
      displayName: user?.displayName,
    };

    try {
      toast.loading("Creating Product");
      const res = await axios.post("/todo", data);
      toast.dismiss();
      toast.success(res?.data?.message);
      titleRef.current.value = "";
      desRef.current.value = "";
      refetchHome();
    } catch (err) {
      toast.dismiss();
      toast.error("Something went wrong try again");
    }

    const res = await axios.post(`/todo?userEmail=${user?.email}`);
    console.log(res.data);
    return res.data;
  };
  return (
    <>
      <form onSubmit={submitHandle}>
        <h1 className='font-semibold text-xl mb-3 pl-1'>Add Task</h1>
        <div className='shadow rounded-lg p-5 bg-gray-50'>
          <input
            ref={titleRef}
            type='text'
            placeholder='Task Name'
            className='input w-full input-bordered mb-3'
          />
          <textarea
            ref={desRef}
            className='textarea textarea-bordered w-full'
            placeholder='Description'
          ></textarea>
          <div className='flex justify-end my-4'>
            <button className='btn'>Create</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddTask;
