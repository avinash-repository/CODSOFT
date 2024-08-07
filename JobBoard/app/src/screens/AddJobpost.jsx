import React, { useState } from 'react';

export default function AddJobPost() {
  const [details, setDetails] = useState({
    roleName: "",
    companyName: "",
    location: "",
    startDate: "",
    endDate: "",
    duration: "",
    stipend: "",
    numberOfOpenings: "",
    description: "",
    skillsRequired: []  
  });

  const [newSkill, setNewSkill] = useState("");
  const [validated, setValidated] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const onSkillChange = (e) => {
    setNewSkill(e.target.value);
  };

  const addSkill = () => {
    if (newSkill && !details.skillsRequired.includes(newSkill)) {
      setDetails(prevDetails => ({
        ...prevDetails,
        skillsRequired: [...prevDetails.skillsRequired, newSkill]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    setDetails(prevDetails => ({
      ...prevDetails,
      skillsRequired: prevDetails.skillsRequired.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity()) {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:3000/api/employers/jobpost', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(details)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAlertMessage('Job post added successfully!');
        setAlertType('success');
        setTimeout(() => {
          window.location.href = '/employer/dashboard';
        }, 2000);
      } catch (error) {
        console.error('Error:', error);
        setAlertMessage('Error during job post creation. Please try again.');
        setAlertType('danger');
      }
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

      <div className='p-4'>
        <form className={`needs-validation ${validated ? 'was-validated' : ''}`} noValidate onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="validationRoleName" className="form-label">Role Name</label>
            <input type="text" name='roleName' className="form-control" id="validationRoleName" onChange={onChange} value={details.roleName} required />
            <div className="invalid-feedback">Provide the role name</div>
          </div>
          <div className="mb-3">
            <label htmlFor="validationCompanyName" className="form-label">Company Name</label>
            <input type="text" name='companyName' className="form-control" id="validationCompanyName" onChange={onChange} value={details.companyName} required />
            <div className="invalid-feedback">Provide the company name</div>
          </div>
          <div className="mb-3">
            <label htmlFor="validationLocation" className="form-label">Location</label>
            <input type="text" name='location' className="form-control" id="validationLocation" onChange={onChange} value={details.location} required />
            <div className="invalid-feedback">Provide the job location</div>
          </div>
          <div className="mb-3">
            <label htmlFor="validationStartDate" className="form-label">Start Date</label>
            <input type="date" name='startDate' className="form-control" id="validationStartDate" onChange={onChange} value={details.startDate} required />
            <div className="invalid-feedback">Provide the start date</div>
          </div>
          <div className="mb-3">
            <label htmlFor="validationEndDate" className="form-label">End Date</label>
            <input type="date" name='endDate' className="form-control" id="validationEndDate" onChange={onChange} value={details.endDate} required />
            <div className="invalid-feedback">Provide the end date</div>
          </div>
          <div className="mb-3">
            <label htmlFor="validationDuration" className="form-label">Duration</label>
            <input type="number" name='duration' className="form-control" id="validationDuration" onChange={onChange} value={details.duration} required />
            <div className="invalid-feedback">Provide the job duration</div>
          </div>
          <div className="mb-3">
            <label htmlFor="validationStipend" className="form-label">Stipend</label>
            <input type="number" name='stipend' className="form-control" id="validationStipend" onChange={onChange} value={details.stipend} required />
            <div className="invalid-feedback">Provide the stipend</div>
          </div>
          <div className="mb-3">
            <label htmlFor="validationNumberOfOpenings" className="form-label">Number of Openings</label>
            <input type="number" name='numberOfOpenings' className="form-control" id="validationNumberOfOpenings" onChange={onChange} value={details.numberOfOpenings} required />
            <div className="invalid-feedback">Provide the number of openings</div>
          </div>
          <div className="mb-3">
            <label htmlFor="validationDescription" className="form-label">Detailed Description</label>
            <textarea name='description' className="form-control" id="validationDescription" rows="5" onChange={onChange} value={details.description} required></textarea>
            <div className="invalid-feedback">Provide a detailed description</div>
          </div>
          <div className="mb-3">
            <label htmlFor="validationSkills" className="form-label">Skills</label>
            <input type="text" name='newSkill' className="form-control" id="validationSkills" value={newSkill} onChange={onSkillChange} />
            <button type="button" className="btn btn-secondary mt-2" onClick={addSkill}>Add Skill</button>
            <div className="mt-2">
              {details.skillsRequired.map((skill, index) => (
                <div key={index} className="d-flex align-items-center">
                  <span className="badge bg-dark me-2">{skill}</span>
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => removeSkill(index)}>Remove</button>
                </div>
              ))}
            </div>
          </div>
          <button className="btn btn-success" type="submit">Add Job Post</button>
        </form>
        {alertMessage && (
          <div className={`alert alert-${alertType} alert-dismissible fade show mt-3`} role="alert">
            {alertMessage}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        )}
      </div>
    </>
  );
}
