import React, { useEffect, useState } from 'react';
import Jobcard from '../components/Jobcard';

export default function Dashboardstu() {
    const [studentDetails, setStudentDetails] = useState(null);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch('http://localhost:3000/api/students/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setStudentDetails(data);
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

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!studentDetails) {
        return <div>Loading...</div>;
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
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
                          
                            <button className="btn btn-primary ml-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">My Profile</button>
                        </div>

                        <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">{studentDetails.fullName}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <p><strong>Email:</strong> <br /> {studentDetails.email}</p>
                                <p><strong>Address:</strong> <br /> {studentDetails.address}</p>
                                <p><strong>Phone Number:</strong> <br /> {studentDetails.phoneNumber}</p>
                                <p><strong>Postal Code:</strong> <br /> {studentDetails.postalcode}</p>
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
                <div className="mb-4">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search for a job role..." 
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <Jobcard searchTerm={searchTerm} />
            </div>
        </>
    );
}
