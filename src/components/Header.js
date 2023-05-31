import { Link } from "react-router-dom";
import CustomLink from "./CustomLink";

import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const Header = () => {
  const [user] = useAuthState(auth);
  return (
    <div className=' bg-gray-50'>
      <nav className='container mx-auto text-gray-700 '>
        <div className='justify-between py-4 hidden md:flex'>
          <div className='font-semibold text-xl flex items-center'>
            <Link to='/'>MY TODO</Link>
          </div>
          <div className='flex justify-center items-center'>
            <CustomLink className='mx-1 px-1' to='/'>
              Home
            </CustomLink>
            {user ? (
              <button
                onClick={() => {
                  signOut(auth);
                }}
                className='mx-1 px-1'
              >
                logout{" "}
              </button>
            ) : (
              <CustomLink className='mx-1 px-1' to='/login'>
                login
              </CustomLink>
            )}
          </div>
        </div>

        <div className='navbar bg-gray-50 md:hidden '>
          <div className='flex-1'>
            <Link to={"/"} className='btn btn-ghost normal-case text-xl'>
              MY TODO
            </Link>
          </div>
          <div className='flex-none'>
            <div className='dropdown dropdown-end'>
              <label tabIndex='0' className='btn btn-ghost btn-circle'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h7'
                  />
                </svg>
              </label>
              <ul
                tabIndex='0'
                className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
              >
                <div className='m-2 '>
                  <Link to={"/"}>Home</Link>
                </div>
                {user ? (
                  <div className='m-2 '>
                    <button
                      onClick={() => {
                        signOut(auth);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className='m-2 '>
                    <Link to={"/login"}>Login</Link>
                  </div>
                )}

                {/* <CustomLink>Logout</CustomLink> */}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
