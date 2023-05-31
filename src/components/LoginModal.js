import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import axios from "../axiosConfig";
import { AiOutlineGoogle } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../firebase.init";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";

const LoginModal = ({ pid, refetch }) => {
  const [showModal, setShowModal] = useState(false);
  const outsideClickRef = useRef("");
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
      refetch();
      toast.success("Product Deleted");
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }
  };
  const [isToken, setIsToken] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  //email login
  const [
    signInWithEmailAndPassword,
    passwordAuthUser,
    passwordAuthLoading,
    passwordAuthError,
  ] = useSignInWithEmailAndPassword(auth);
  //google login
  /*eslint-disable */
  const [signInWithGoogle, googleAuthUser, googleAuthLoading, googleAuthError] =
    useSignInWithGoogle(auth);

  //password reset
  const [sendPasswordResetEmail, passwordResetLoading, passwordResetError] =
    useSendPasswordResetEmail(auth);
  /*eslint-enable */

  const createToken = async (email) => {
    const { data } = await axios.post("/auth/signin", { email });
    localStorage.setItem("accessToken", data);
    setIsToken(true);
  };

  const handleSingin = async (e) => {
    e.preventDefault();
    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (userData.password.length < 6) {
      toast.error("passowrd should be more then 6 charecter");
    } else {
      await signInWithEmailAndPassword(userData.email, userData.password);
      createToken(userData.email);
    }
  };

  const passwordResetHandle = async () => {
    const email = emailRef.current.value;
    if (email) {
      const toastId = toast.loading("please wait...");
      await sendPasswordResetEmail(email);
      toast.dismiss(toastId);
      toast.success("Sent email", { id: "email" });
    } else {
      toast.error("please enter your email address");
    }
  };
  
  //🌻 check if clicked outside login modal
  const handleClickOutside = (event) => {
    if (!outsideClickRef?.current?.contains(event.target)) {
      console.log("clocl");
      setShowModal(!showModal);
    }
  };

  /*eslint-disable */
  useEffect(() => {
    let from = location.state?.from?.pathname || "/";
    if (googleAuthUser) {
      console.log(googleAuthUser);
      createToken(googleAuthUser.user.email);
    }
    if (googleAuthUser || passwordAuthUser || isToken) {
      navigate(from, { replace: true });
    }
  }, [googleAuthUser, passwordAuthUser, isToken]);
  /*eslint-enable */

  useEffect(() => {
    if (passwordResetError) {
      toast.error(passwordResetError?.message);
    }
    if (googleAuthError) {
      toast.error(googleAuthError?.message);
    }
    if (passwordAuthError) {
      toast.error(passwordAuthError?.message);
    }
  }, [passwordResetError, googleAuthError, passwordAuthError]);
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
        <div className='overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full'>
          <div onClick={handleClickOutside} className=' bg-opacity-40 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 bg-black'>
            <div
              ref={outsideClickRef}
              className='flex flex-col md:flex-row py-10 my-10 bg-white p-7 rounded-lg shadow-lg'
            >
              <div className='mx-auto text-gray-700 mt-10 md:mt-0 p-3 md:p-0'>
                <div className='mx-auto'>
                  <form onSubmit={handleSingin}>
                    <div className='mb-6'>
                      <input
                        type='text'
                        className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-700 focus:outline-none'
                        placeholder='Email address'
                        required
                        autoFocus
                        ref={emailRef}
                      />
                    </div>
                    <div className='mb-6'>
                      <input
                        type='password'
                        className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-700 focus:outline-none'
                        placeholder='Password'
                        required
                        ref={passwordRef}
                      />
                    </div>
                    <div className='flex justify-between items-center'>
                      <div className='form-group form-check'>
                        <input
                          type='checkbox'
                          className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-gray-700  focus:outline-none  mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                          id='agreeTermsAndCondition'
                          required
                        />
                        <label
                          className='form-check-label inline-block text-gray-800'
                          htmlFor='agreeTermsAndCondition'
                        >
                          I agree with the terms and conditions
                        </label>
                      </div>
                    </div>
                    <div
                      onClick={passwordResetHandle}
                      className='text-gray-500 hover:text-gray-700 my-3 cursor-pointer'
                    >
                      Forgot password?
                    </div>
                    {passwordAuthLoading ? (
                      <button className='btn  text-white loading flex gap-3 justify-center items-center px-7 my-3 py-3 bg-gray-700 font-semibold text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg  w-full'>
                        <span>processing</span>
                      </button>
                    ) : (
                      <button className='text-white inline-block px-7 py-3 bg-gray-700 font-semibold text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg  w-full'>
                        Sign in
                      </button>
                    )}

                    <div className='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5'>
                      <p className='text-center font-semibold mx-4 mb-0'>OR</p>
                    </div>

                    <div className='flex flex-row items-center justify-center lg:justify-start'>
                      <p className='text-lg mb-0 mr-4'>Sign in with</p>
                      <div
                        onClick={() => {
                          signInWithGoogle();
                        }}
                        className='cursor-pointer inline-block p-3 bg-gray-700 font-medium text-2xl leading-tight uppercase rounded-full shadow-md hover:bg-gray-700 hover:shadow-lg  mx-1 text-white'
                      >
                        <AiOutlineGoogle />
                      </div>
                    </div>

                    <div className='w-full border-t mt-5 py-4'>
                      <span className='text-sm'>Don't have an account? </span>
                      <Link
                        to='/register'
                        className='text-gray-700 text-sm font-semibold hover:text-gray-700'
                      >
                        Sign up
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LoginModal;
