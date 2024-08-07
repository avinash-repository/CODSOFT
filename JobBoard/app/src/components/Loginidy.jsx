import React, { useState } from 'react';

export default function Loginidy() {
  const [details, setDetails] = useState({
    email: "",
    password: ""
  });

  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  }

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault(); 
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity()) {
      try {
        const response = await fetch('http://localhost:3000/api/employers/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: details.email,
            password: details.password
          })
        });
        const result = await response.json();

        if (response.ok) {
          setSuccess('Login successful!');
          setError('');
          localStorage.setItem("authToken", result.authToken);
          console.log(localStorage.getItem("authToken"));

          setTimeout(() => {
            window.location.href = '/employer/dashboard';
          }, 2000);
        } else {
          setError(result.message || 'Login failed. Please check your credentials.');
          setSuccess('');
        }
      } catch (err) {
        setError('Something went wrong. Please try again later.');
        setSuccess('');
      }
    }
  }

  return (
    <>
      <div>
        <nav className="bg-dark text-white">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center py-4">
              <h1 className="h2">
                <a href='/' className='text-white text-decoration-none'>Job Hunt</a>
              </h1>
            </div>
          </div>
        </nav>
      </div>

      <div className='m-5 p-[2rem]'>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        {success && <div className="alert alert-success" role="alert">{success}</div>}
        <form className={`needs-validation ${validated ? 'was-validated' : ''}`} noValidate onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email Id</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              autoComplete="email"
              onChange={onChange}
              value={details.email}
              required
            />
            <div className="invalid-feedback">Enter a valid email</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              autoComplete="current-password"
              onChange={onChange}
              value={details.password}
              required
            />
            <div className="invalid-feedback">Enter your password</div>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  );
}
