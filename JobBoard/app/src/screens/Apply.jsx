import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';

export default function Apply() {
  const formRef = useRef(null);
  const { roleName } = useParams(); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);

    try {
      const response = await fetch('http://localhost:3000/api/apply', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        formRef.current.reset(); 
      } else {
        alert('Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('An error occurred while submitting your application.');
    }
  };

  return (
    <>
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center py-4">
              <h1 className="h2">
                <a href='/' className='text-white text-decoration-none'>Job Hunt</a>
              </h1>
            </div>
          </div>
        </nav>
      </div>

      <div className="container my-5">
        <h2 className="text-center mb-4">Apply for the Job</h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Role</label>
            <input type="text" className="form-control" name="role" value={roleName || ''} readOnly />
          </div>
          <div className="form-group mb-3">
            <label>Name</label>
            <input type="text" className="form-control" name="name" placeholder="Enter your name" required />
          </div>
          <div className="form-group mb-3">
            <label>Email</label>
            <input type="email" className="form-control" name="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group mb-3">
            <label>Phone Number</label>
            <input type="tel" className="form-control" name="phoneNumber" placeholder="Enter your phone number" required />
          </div>
          <div className="form-group mb-3">
            <label>Why do you want to join the company?</label>
            <textarea className="form-control" name="motivation" rows="4" placeholder="Your answer" required></textarea>
          </div>
          <div className="form-group mb-3">
            <label>Upload Resume (PDF)</label>
            <input type="file" className="form-control" name="resume" accept=".pdf" required />
          </div>
          <div className="form-group mb-3">
            <label>Class 10 Percentage</label>
            <input type="number" className="form-control" name="class10Percentage" placeholder="Enter Class 10 percentage" required />
          </div>
          <div className="form-group mb-3">
            <label>Class 10 Education Board</label>
            <input type="text" className="form-control" name="class10Board" placeholder="Enter Class 10 education board" required />
          </div>
          <div className="form-group mb-3">
            <label>Class 12 Percentage</label>
            <input type="number" className="form-control" name="class12Percentage" placeholder="Enter Class 12 percentage" required />
          </div>
          <div className="form-group mb-3">
            <label>Class 12 Education Board</label>
            <input type="text" className="form-control" name="class12Board" placeholder="Enter Class 12 education board" required />
          </div>
          <div className="form-group mb-3">
            <label>Current Education</label>
            <input type="text" className="form-control" name="currentEducation" placeholder="Enter your current education" required />
          </div>
          <div className="form-group mb-3">
            <label>College Name</label>
            <input type="text" className="form-control" name="collegeName" placeholder="Enter your college name" required />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  );
}
