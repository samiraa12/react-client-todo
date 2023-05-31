import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className='h-96 pt-80 flex items-center justify-center'>
        <div className='text-2xl font-semibold text-gray-700 text-center'>
          <h1>Opps this page dose not exist</h1>
          <h2 className='text-3xl mt-5 '>404</h2>
        </div>
      </div>
      <div className="text-center mt-10 pb-60">
        <Link className="bg-gray-800 text-white font-semibold py-2 px-3 rounded" to='/'>Back To Homepage</Link>
      </div>
    </>
  );
};

export default NotFound;
