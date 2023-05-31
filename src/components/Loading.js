import React from 'react';
import spinnerImg from "../assets/spinner.svg";

const Loading = () => {
  return (
    <>
    <div className='h-96 py-80 flex items-center justify-center'>
      <div className='text-2xl font-semibold text-gray-700 text-center'>
        <img className='h-20 w-20' src={spinnerImg} alt="spinn" />
      </div>
    </div>
    
  </>
  );
};

export default Loading;