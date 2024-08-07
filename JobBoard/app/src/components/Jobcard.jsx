import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Jobcard({ searchTerm }) {
    const [jobPosts, setJobPosts] = useState([]);
    const [filteredJobPosts, setFilteredJobPosts] = useState([]);
    const [error, setError] = useState('');
    const [selectedJobPost, setSelectedJobPost] = useState(null);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        const fetchJobPosts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/all-job-posts');
                if (response.ok) {
                    const data = await response.json();
                    setJobPosts(data);
                    setFilteredJobPosts(data);
                } else {
                    setError('Failed to fetch job posts.');
                }
            } catch (err) {
                setError('Something went wrong. Please try again later.');
            }
        };

        fetchJobPosts();
    }, []);

    useEffect(() => {
        const filtered = jobPosts.filter(jobPost =>
            jobPost.roleName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredJobPosts(filtered);
    }, [searchTerm, jobPosts]);

    const handleShow = (jobPost) => {
        setSelectedJobPost(jobPost);
        setModalShow(true);
    };

    const handleClose = () => {
        setModalShow(false);
        setSelectedJobPost(null);
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Job Listings</h2>
            {filteredJobPosts.length === 0 ? (
                <p>No jobs found.</p>
            ) : (
                <div className="row">
                    {filteredJobPosts.map((jobPost, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">{jobPost.roleName}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{jobPost.companyName}</h6>
                                    <p className="card-text">
                                        <strong>Location:</strong> {jobPost.location}<br />
                                        <strong>Start Date:</strong> {new Date(jobPost.startDate).toLocaleDateString()}<br />
                                        <strong>End Date:</strong> {new Date(jobPost.endDate).toLocaleDateString()}<br />
                                        <strong>Duration:</strong> {jobPost.duration} months<br />
                                        <strong>Stipend:</strong> ${jobPost.stipend}
                                    </p>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleShow(jobPost)}
                                    >
                                        More Details
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedJobPost && (
                <Modal show={modalShow} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedJobPost.roleName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Company:</strong> {selectedJobPost.companyName}</p>
                        <p><strong>Location:</strong> {selectedJobPost.location}</p>
                        <p><strong>Start Date:</strong> {new Date(selectedJobPost.startDate).toLocaleDateString()}</p>
                        <p><strong>End Date:</strong> {new Date(selectedJobPost.endDate).toLocaleDateString()}</p>
                        <p><strong>Duration:</strong> {selectedJobPost.duration} months</p>
                        <p><strong>Stipend:</strong> ${selectedJobPost.stipend}</p>
                        <p><strong>Description:</strong> {selectedJobPost.description}</p>
                        <p><strong>Skills Required:</strong> {selectedJobPost.skillsRequired.join(', ')}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Link to='/student/apply'>
                            <Button variant="primary" onClick={() => alert('Apply button clicked')}>
                                Apply
                            </Button>
                        </Link>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}
