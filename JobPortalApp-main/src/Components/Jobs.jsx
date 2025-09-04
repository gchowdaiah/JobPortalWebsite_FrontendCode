import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ViewDetails from "./JobDetails";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    designation: "",
    location: "",
  });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch jobs from JobPost API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/api/JobPost"); // ✅ Correct API URL
       // console.log("API response:", res.data);

        if (Array.isArray(res.data)) {
          setJobs(res.data);
        } else {
          console.warn("Unexpected API response structure");
          setJobs([]);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Handle search navigation
  const handleSearch = () => {
    if (searchKeyword.trim()) {
      navigate(`/search?keyword=${searchKeyword}`);
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Filter jobs safely (only by designation + location, since API doesn’t have skills/experience)
  const filteredJobs = jobs.filter((job) => {
    const title = job.title || "";
    const location = job.location || "";

    return (
      title.toLowerCase().includes(filters.designation.toLowerCase()) &&
      location.toLowerCase().includes(filters.location.toLowerCase())
    );
  });

  return (
    <div>
      {/* Search Section */}
      <section className="bg-primary text-white py-5 text-center">
        <div className="container">
          <h1 className="mb-3 fw-bold">Find your dream job now</h1>
          <p className="mb-4">Latest job postings for you to explore</p>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="input-group shadow-lg">
                <input
                  type="text"
                  className="form-control from-control-lg rounded-start-pill"
                  placeholder="Enter job title or company..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                  className="btn btn-dark btn-lg rounded-end-pill px-4"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container py-4">
        <h4 className="fw-bold mb-3">Filter Jobs</h4>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              name="designation"
              className="form-control"
              placeholder="Designation"
              value={filters.designation}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="location"
              className="form-control"
              placeholder="Location"
              value={filters.location}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </section>

      {/* Jobs Listing */}
      <section className="container py-5">
        <h4 className="fw-bold mb-4">Available Jobs</h4>
        {loading && <p>Loading jobs...</p>}
        {error && <p className="text-danger">{error}</p>}
        <div className="row g-4">
          {filteredJobs.length === 0 && !loading && (
            <p className="text-center text-muted">No jobs found.</p>
          )}
          {filteredJobs.map((job) => (
            <div className="col-md-4" key={job.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <p className="card-text">
                    <strong>Company:</strong> {job.companyName}
                  </p>
                  <p className="card-text">
                    <strong>Description:</strong>{" "}
                    {job.description.length > 100
                      ? job.description.substring(0, 10) + "..."
                      : job.description}
                  </p>
                  <p className="card-text">
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p className="card-text">
                    <strong>Posted At:</strong>{" "}
                    {new Date(job.postedAt).toLocaleString()}
                  </p>
                 <Link to={`/jobs/${job.id}`} className="btn btn-outline-primary btn-sm">View Details</Link>

                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Jobs;
