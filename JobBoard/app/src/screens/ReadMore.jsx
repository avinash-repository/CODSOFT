import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ReadMore() {
  const { id } = useParams(); // Extract the ID from the URL parameter
  const [jobPost, setJobPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/jobpost/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setJobPost(data);
      } catch (error) {
        setError('Failed to fetch job post details.');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobPost();
  }, [id]);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!jobPost) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-warning" role="alert">
          Job post not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3 className="card-title">{jobPost.roleName}</h3>
        </div>
        <div className="card-body">
          <h5 className="card-title">{jobPost.companyName}</h5>
          <p className="card-text"><strong>Location:</strong> {jobPost.location}</p>
          <p className="card-text"><strong>Description:</strong> {jobPost.description}</p>
          <p className="card-text">
            <strong>Skills:</strong> 
            {Array.isArray(jobPost.skills) && jobPost.skills.length > 0
              ? jobPost.skills.join(', ')
              : 'No skills listed'}
          </p>
          <p className="card-text"><strong>Start Date:</strong> {new Date(jobPost.startDate).toLocaleDateString()}</p>
          <p className="card-text"><strong>End Date:</strong> {new Date(jobPost.endDate).toLocaleDateString()}</p>
          <p className="card-text"><strong>Duration:</strong> {jobPost.duration} months</p>
          <p className="card-text"><strong>Stipend:</strong> Rs {jobPost.stipend}</p>
          <p className="card-text"><strong>Number of Openings:</strong> {jobPost.numberOfOpenings}</p>
        </div>
        <div className="card-footer text-center">
          <button className="btn btn-secondary" onClick={() => window.history.back()}>Back</button>
        </div>
      </div>
    </div>
  );
}
