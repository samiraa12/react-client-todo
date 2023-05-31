import React, { useEffect, useRef, useState } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import auth from "../firebase.init";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import axios from '../axiosConfig'


const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isToken, setIsToken] = useState(false)

  const email = useRef("");
  const password1 = useRef("");
  const password2 = useRef("");
  const fname = useRef("");

  const createToken = async(email)=>{
    const {data} = await axios.post("/auth/signin",{email})
    localStorage.setItem('accessToken',data)
    setIsToken(true)
  }

  const [signInWithGoogle, googleAuthUser, googleAuthLoading, googleAuthError] =
    useSignInWithGoogle(auth);
  const [
    createUserWithEmailAndPassword,
    passwordAuthUser,
    passowrdAuthLoading,
    passwordAuthError,
  ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile, updating, errorUpdating] = useUpdateProfile(auth);
  /*eslint-disable */
  useEffect(() => {
    let from = location.state?.from?.pathname || "/";
    if (googleAuthUser || passwordAuthUser|| isToken) {
      if(googleAuthUser){
        createToken(googleAuthUser.user.email)
      }
      if(!updating){
        navigate(from, { replace: true });
      }
    }
  }, [googleAuthUser, passwordAuthUser,updating,isToken]);
 
  /*eslint-enable */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: email.current.value,
      passowrd1: password1.current.value,
      password2: password2.current.value,
      fullName: fname.current.value,
    };
    if (userData.passowrd1 === userData.password2) {
      if (userData.passowrd1.length > 5) {
        if (userData.fullName.length > 0) {
          try {
            createUserWithEmailAndPassword(userData.email, userData.passowrd1).then(()=>{
              console.log(userData);
              updateProfile({
              displayName:userData.fullName,
            });
            createToken(userData.email)
            })
            
          } catch (err) {
            console.log(err);
            //handle error
          }
        } else {
          toast.error("Enter your full name");
        }
      } else {
        toast.error("Password should be at least 6 charecter");
      }
    } else {
      toast.error("Use same passowrd in both field");
    }
  };

  const googleSignUpClickHandle = () => {
    signInWithGoogle();
  };
  useEffect(() => {
    if (googleAuthError) {
      toast.error(googleAuthError?.message);
    } else if (passwordAuthError) {
      toast.error(passwordAuthError?.message);
    }else if (errorUpdating) {
      toast.error(errorUpdating?.message);
    }
  }, [googleAuthError, passwordAuthError,errorUpdating]);

  return (
    <div className='flex flex-col md:flex-row py-10 my-10'>
      <div className='lg:w-6/12 mx-auto text-gray-700 mt-10 md:mt-0 p-3 md:p-0'>
        <div className='lg:w-6/12 mx-auto'>
          <form onSubmit={handleSubmit}>
            <div className='mb-6'>
              <input
                required
                type='text'
                className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-700 focus:outline-none'
                placeholder='Full Name'
                ref={fname}
              />
            </div>
            <div className='mb-6'>
              <input
                required
                type='text'
                className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-700 focus:outline-none'
                placeholder='Email address'
                ref={email}
              />
            </div>
            <div className='mb-6'>
              <input
                required
                type='password'
                className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-700 focus:outline-none'
                placeholder='Password'
                ref={password1}
              />
            </div>
            <div className='mb-6'>
              <input
                required
                type='password'
                className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-700 focus:outline-none'
                placeholder='Password'
                ref={password2}
              />
            </div>
            <div className='flex justify-between items-center'>
              <div className='form-group form-check'>
                <input
                  required
                  type='checkbox'
                  className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-gray-700  focus:outline-none  mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                  id='forgetPassId'
                />
                <label
                  className='form-check-label inline-block text-gray-800'
                  htmlFor='forgetPassId'
                >
                  I agree with the terms and conditions
                </label>
              </div>
            </div>
            {googleAuthLoading || passowrdAuthLoading ? (
              <button className='btn  text-white loading flex gap-3 justify-center items-center px-7 my-3 py-3 bg-gray-700 font-semibold text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg  w-full'>
                <span>processing</span>
              </button>
            ) : (
              <button className='text-white inline-block px-7 my-3 py-3 bg-gray-700 font-semibold text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg  w-full'>
                Sign up
              </button>
            )}

            <div className='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5'>
              <p className='text-center font-semibold mx-4 mb-0'>OR</p>
            </div>

            <div className='flex flex-row items-center justify-center lg:justify-start'>
              <p className='text-lg mb-0 mr-4'>Register With</p>
              <div
                onClick={googleSignUpClickHandle}
                className='text-white cursor-pointer inline-block p-3 bg-gray-700 font-medium text-2xl leading-tight uppercase rounded-full shadow-md hover:bg-gray-700 hover:shadow-lg  mx-1'
              >
                <AiOutlineGoogle />
              </div>
            </div>

            <div className='w-full border-t mt-5 py-4'>
              <span className='text-sm'>Already have an account? </span>
              <Link
                to='/login'
                className='text-gray-700 text-sm font-semibold hover:text-gray-700'
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
