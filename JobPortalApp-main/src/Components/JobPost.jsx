import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function JobPost() {
  const [job, setJob] = useState({
    title: "",
    description: "",
    companyName: "",
    location: "",
    baselocation: "",
  });
  const [companies, setCompanies] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [baseLocations, setBaseLocations] = useState([]);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("https://localhost:7125/api/Company");
        if (!response.ok) throw new Error("Failed to fetch companies");
        const data = await response.json();

        console.log("Fetched companies:", data); // Debug log

        setCompanies(data);

        const roles = [...new Set(data.flatMap((company) => company.roles))];
        const baselocation = [
          ...new Set(data.flatMap((company) => company.baseLocation)),
        ];
        setJobTitles(roles);
        setBaseLocations(baselocation);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setError("Failed to fetch companies");
      }
    };

    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleCompanyChange = (e) => {
    const selectedCompany = companies.find(
      (company) => company.name === e.target.value
    );
    if (selectedCompany) {
      setJob({
        ...job,
        companyName: selectedCompany.name,
        location: "", // Reset location
      });
      // setBaseLocations(selectedCompany.baseLocations || []); // Update base locations
      console.log("Selected company:", selectedCompany); // Debug log
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://localhost:7125/api/JobPost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    if (response.ok) {
      setShowPopup(true);
      setTimeout(() => {
        navigate("/admin/postedJob"); // Refresh the current page
      }, 2000);
    } else {
      setError("Failed to post job");
    }
  };

  return (
    <div className="d-grid gap-2 col-10 mx-auto">
      {showPopup && (
        <div className="popup">
          <div className="alert alert-success" role="alert">
            <p>Job posted successfully</p>
          </div>
        </div>
      )}
      <div className="card d-grid gap-2 col-6 mx-auto">
        <div className="card-header d-flex justify-content-center">
          Job Post
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <select
                className="form-control"
                name="title"
                onChange={handleChange}
                required
              >
                <option value="">Job Title</option>
                {jobTitles.map((title, index) => (
                  <option key={index} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                name="description"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group mb-3">
              <select
                className="form-control"
                name="companyName"
                onChange={handleCompanyChange}
                required
              >
                <option value="">Select Company</option>
                {companies.map((company) => (
                  <option key={company.id || company.name} value={company.name}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group mb-3">
              <select
                className="form-control"
                name="location"
                value={job.location}
                onChange={handleChange}
                required
              >
                <option value="">Select Location</option>
                {baseLocations.map((baselocation, index) => (
                  <option key={index} value={baselocation}>
                    {baselocation}
                  </option>
                ))}
              </select>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default JobPost;
