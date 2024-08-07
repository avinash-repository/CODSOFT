import React, { useState } from 'react';
import {Link} from "react-router-dom";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">
            <a href='#' className='no-underline text-white'>Job Hunt
            </a>
          </h1>

          <div className="hidden space-x-4 lg:flex">
            <a className="hover:text-gray-300  no-underline text-white" href="#">FAQs</a>
            <a className="hover:text-gray-300  no-underline  text-white" href="#">Privacy Policy </a>
          </div>

          <div className="hidden space-x-4 lg:flex">
            <Link to='/login-student'>
       
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
              Student(Login )
            </button>
            </Link>
            <Link to='/login-employer'>
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
              Employer(Login)
            </button>
            </Link>

            <Link to='/signup-student'>
         
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Student(Sign Up)
            </button>
            </Link>
            <Link to='/signup-employer'>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Employer(Sign Up)
            </button>
            </Link>
          </div>
          <div className='lg:hidden'>
            <Link to='login-employer'>
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded m-2">
              Employer (Login)
            </button>
            </Link>
            <Link to='login-student'>
           
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded m-2">
              Student (Login)
            </button>
            </Link>
          </div>



          <button
            className="lg:hidden text-gray-300 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM3 9.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM3 14.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z" />
            </svg>
          </button>
        </div>


        {isOpen && (
          <div className="lg:hidden mt-4 flex flex-col space-y-4 p-4 text-center">
            <a className="hover:text-gray-300 text-white no-underline " href="#">FAQs</a>
            <a className="hover:text-gray-300 text-white no-underline" href="#">Privacy Policy</a>
            <div className="flex flex-col">
              <Link to='signup-employer'>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded m-2">
                Employer (Sign Up)
              </button>
              </Link>
              <Link to='signup-student'>
             
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded m-2">
                Student (Sign Up)
              </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
