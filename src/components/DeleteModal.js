import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "../axiosConfig";
const DeleteModal = ({ pid, refetch }) => {
  const [showModal, setShowModal] = useState(false);
  const onDelete = async (e) => {
    e.preventDefault();
    setShowModal(false);
    const data = {
      todoId: pid,
    };
    try {
      await axios.delete("/todo/one", {
        data: data,
      });
      refetch()
      toast.success("Product Deleted");
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }
  };
  return (
    <>
      <button
        className='btn btn-xs btn-circle bg-red-500 border-none hover:bg-red-600 hover:shadow'
        onClick={() => setShowModal(true)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-4 w-4'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </button>
      {showModal ? (
        <div className=' overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full'>
          <div className=' bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0'>
            <div className='bg-gray-50 px-16 py-14 rounded-md text-center shadow-2xl border border-gray-50'>
              <h1 className='text-lg mb-4 font-bold text-gray-700'>
                Do you Want Delete ?
              </h1>
              <button
                onClick={() => setShowModal(false)}
                className='bg-green-400 font-semibold px-3 text-black py-2 rounded-md text-md'
              >
                Cancle
              </button>
              <button
                onClick={onDelete}
                className='bg-red-400 font-semibold px-3 text-black py-2 rounded-md text-md ml-2'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DeleteModal;
