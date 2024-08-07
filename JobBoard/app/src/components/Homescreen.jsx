import React  from 'react';
import {Link} from "react-router-dom";


export default function Homescreen() {
  return (
    <div className="container my-5">
    <div className="row">
      <div className="col-lg-7">
        <img
          src="https://img.freepik.com/premium-vector/simple-search-job-poster_6731-5.jpg"
          alt="Descriptive Alt Text"
          className="w-100"
        />
      </div>
      <div className="col-lg-5 d-flex align-items-center">
        <div className='mt-4 '>
          <h1 className='text-3xl font-bold'>Land Your Dream JOb !!</h1>
          <p>
        Find the Most suitable job that fits your role and skills . <br />
        People applying through our website lands an average package of 15 LPA .
          </p>
          <Link to='signup-student'>
          <button className="btn btn-primary">Get Started </button>

          </Link>
        </div>
      </div>
    </div>
  </div>
  )
}
