import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export default function Dashboardemp() {
    const [employerDetails, setEmployerDetails] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch('http://localhost:3000/api/employers/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setEmployerDetails(data);
                } else {
                    const result = await response.json();
                    setError(result.message || 'Failed to fetch profile details.');
                }
            } catch (err) {
                setError('Something went wrong. Please try again later.');
            }
        };

        fetchProfile();
    }, []);

    if (!employerDetails) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>
                <nav className="navbar navbar-dark bg-dark">
                    <div className="container">
                        <div className="d-flex justify-content-between align-items-center py-4">
                            <h1 className="h2">
                                <a href='/' className='text-white text-decoration-none'>Job Hunt</a>
                            </h1>
                          
                            <button className="btn btn-primary ml-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">My Profile</button>
                           
                            <Link to="/employer/dashboard/jobpost">
                                <button className="btn btn-primary ml-3" type="button">Add Job Post</button>
                            </Link>
                        </div>

                        <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">{employerDetails.fullName}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <p><strong>Email:</strong> <br /> {employerDetails.email}</p>
                                <p><strong>Company Address:</strong> <br /> {employerDetails.companyAddress}</p>
                                <p><strong>Phone Number:</strong> <br /> {employerDetails.phoneNumber}</p>
                                <p><strong>Website:</strong> <br /> <a href={employerDetails.websiteLink} target="_blank" rel="noopener noreferrer">{employerDetails.websiteLink}</a></p>
                            </div>
                            <button className="btn btn-danger m-2" type="button" onClick={() => {
                                localStorage.removeItem('authToken');
                                window.location.href = '/';
                            }}>Log Out</button>
                        </div>
                    </div>
                </nav>
            </div>

            <div className="container mt-5">
                <h2>Your Listings</h2>
                <div className="row">
                    {employerDetails.jobPosts.map((job) => (
                        <div className="col-md-4" key={job._id}>
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{job.roleName}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{job.companyName}</h6>
                                    <p className="card-text"><strong>Location:</strong> {job.location}</p>
                                    <p className="card-text"><strong>Start Date:</strong> {new Date(job.startDate).toLocaleDateString()}</p>
                                    <p className="card-text"><strong>End Date:</strong> {new Date(job.endDate).toLocaleDateString()}</p>
                                    <p className="card-text"><strong>Duration:</strong> {job.duration} months</p>
                                    <p className="card-text"><strong>Stipend:</strong> Rs {job.stipend}</p>
                                 
                                    <Link to={`/role-description/${job._id}`}>
                                        <button className="btn btn-secondary">Read More</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
