import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams(); // get jobId from URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(`/api/JobPost/${id}`); // API call for single job
        setJob(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Failed to fetch job details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) return <p className="text-center">Loading job details...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;
  if (!job) return <p className="text-center text-muted">No job details found.</p>;

  return (
    <div className="container py-5">
     <h2>{job.title}</h2>
<p><strong>Company:</strong> {job.companyName}</p>
<p><strong>Description:</strong> {job.description}</p>
<p><strong>Location:</strong> {job.location}</p>
<p><strong>Posted At:</strong> {new Date(job.postedAt).toLocaleString()}</p>


      <Link to="/jobs" className="btn btn-secondary mt-3">Back to Jobs</Link>
    </div>
  );
};

export default JobDetails;
