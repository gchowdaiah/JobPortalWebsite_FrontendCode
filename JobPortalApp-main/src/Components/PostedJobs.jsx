import React, { useEffect, useState } from "react";

function PostedJobs() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("https://localhost:7125/api/JobPost");
        if (!response.ok) throw new Error("Failed to fetch job posts");
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Unable to load job posts.");
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <div className="container mt-8 text-center text-success">
        <h3>Posted Jobs</h3>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {jobs.length === 0 ? (
        <p className="text-muted">No jobs have been posted yet.</p>
      ) : (
        <table className="table table-bordered mt-0">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Company Name</th>
              <th>Description</th>
              <th>Location</th>
              <th>Posted At</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job, index) => (
              <tr key={index}>
                <td>{job.title}</td>
                <td>{job.companyName}</td>
                <td>{job.description}</td>
                <td>{job.location}</td>
                <td> {new Date(job.postedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PostedJobs;
