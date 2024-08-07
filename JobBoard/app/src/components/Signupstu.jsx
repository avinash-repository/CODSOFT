import React, { useState } from 'react';

export default function Signupstu() {
  const [details, setDetails] = useState({
    fullName: "", 
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    postalcode: ""
  });

  const [validated, setValidated] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phoneNumber' && value.length > 10) {
      return;
    }
    setDetails({ ...details, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity()) {
      try {
        const response = await fetch('http://localhost:3000/api/students/signup', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(details)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);

        setAlertMessage('Sign up successful!');
        setAlertType('success');

        setTimeout(() => {
          window.location.href = '/login-student'; 
        }, 2000);
      } catch (error) {
        console.error('Error:', error);
        setAlertMessage('Error during sign up. Please try again.');
        setAlertType('danger');
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

      <div className='p-4'>
        <form className={`needs-validation ${validated ? 'was-validated' : ''}`} noValidate onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="validationFullname" className="form-label">Full Name</label>
            <input type="text" name='fullName' className="form-control" id="validationFullname" autoComplete="name" onChange={onChange} value={details.fullName} required />
            <div className="invalid-feedback">Provide your Full Name</div>
          </div>
          <div className="mb-3">
            <label htmlFor="validationEmail" className="form-label">Email</label>
            <input type="email" name='email' className="form-control" id="validationEmail" autoComplete="email" placeholder='e.g. abc@gmail.com' onChange={onChange} value={details.email} required />
            <div className="invalid-feedback">Enter a valid email</div>
          </div>
          <div className="mb-3">
            <label htmlFor="validationPhone" className="form-label">Phone Number</label>
            <input type="text" name='phoneNumber' className="form-control" id="validationPhone" autoComplete="tel" maxLength="10" onChange={onChange} value={details.phoneNumber} required />
            <div className="invalid-feedback">Enter a valid Phone Number</div>
          </div>
          <div className="mb-3">
            <label htmlFor="validationAddress" className="form-label">Address</label>
            <textarea name='address' className="form-control" id="validationAddress" autoComplete="street-address" placeholder='e.g. A-123, A Block, Park Street, Delhi' rows="3" onChange={onChange} value={details.address} required></textarea>
            <div className="invalid-feedback">Enter your address</div>
          </div>
          <div className="mb-3">
            <label htmlFor="validationPassword" className="form-label">Password</label>
            <input type="password" name='password' className="form-control" id="validationPassword" autoComplete="current-password" onChange={onChange} value={details.password} required />
            <div className="invalid-feedback">Enter a password</div>
          </div>
          <div className="mb-3">
            <label htmlFor="validationPostalcode" className="form-label">Postal Code</label>
            <input type="text" name='postalcode' className="form-control" id="validationPostalcode" autoComplete="postal-code" onChange={onChange} value={details.postalcode} required />
            <div className="invalid-feedback">Please provide a valid Postal Code</div>
          </div>
          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
            <label className="form-check-label" htmlFor="invalidCheck">
              Agree to terms and conditions
            </label>
            <div className="invalid-feedback">You must agree before submitting</div>
          </div>
          <button className="btn btn-primary" type="submit">Submit form</button>
        </form>
        {alertMessage && (
          <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
            {alertMessage}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        )}
      </div>
    </>
  );
}
