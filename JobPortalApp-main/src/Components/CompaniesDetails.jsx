import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CompanyDetails() {
  const { companyName } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    experience: "",
    baselocation: "",
    skills: [],
  });

  const [skillInput, setskillInput] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch(
          `https://localhost:7125/api/Company/${companyName}`
        );
        if (!response.ok) throw new Error("Company not found");

        const data = await response.json();
        setCompany({
          ...data,
          roles: data.roles || [],
          experience: data.experience || [],
        });
      } catch (error) {
        console.error("Error fetching company:", error);
        setCompany(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchJobPosts = async () => {
      try {
        const response = await fetch(
          `https://localhost:7125/api/JobPost/${companyName}`
        );
        if (!response.ok) throw new Error("Job posts not found");
        const data = await response.json();
        setJobPosts(data || []);
      } catch (error) {
        console.error("Error fetching job posts:", error);
      }
    };

    fetchCompany();
    fetchJobPosts();
  }, [companyName]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newApplication = {
      ...formData,
      companyName,
      appliedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("https://localhost:7125/api/Application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newApplication),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      console.log("Application submitted:", newApplication);
      setSubmitted(true);

      setTimeout(() => {
        navigate("/companies");
      }, 2000);
    } catch (error) {
      console.error("Error submitting application:", error);
      alert(
        "There was an error submitting your application. Please try again."
      );
    }
  };

  const handleSkillInput = (e) => {
    setskillInput(e.target.value);
  };

  const handleAddSkill = (skill) => {
    if (!formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
      setskillInput("");
    }
  };

  const availableSkills =
    company?.skills?.filter(
      (skill) =>
        !formData.skills.includes(skill) &&
        skill.toLowerCase().includes(skillInput.toLowerCase())
    ) || [];

  if (loading)
    return (
      <div className="container mt-5 text-center">
        Loading company details...
      </div>
    );

  if (!company) {
    return (
      <div className="container mt-5 text-center">
        <h2>Company Not Found</h2>
        <p>We couldn't find details for {companyName}.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Column */}
        <div className="col-md-4">
          <div className="card p-4 mb-4">
            <h3>{company.name}</h3>
            <p className="text-muted">{company.location}</p>
            <p>{company.description}</p>
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-info mt-3"
            >
              Visit Website
            </a>
          </div>

          <div className="card p-4">
            <h5>Open Roles at {company.name}</h5>
            {jobPosts.length === 0 ? (
              <p className="text-muted">No job posts available yet.</p>
            ) : (
              <ul className="list-group">
                {jobPosts.map((job, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action"
                    onClick={() => setSelectedRole(job)}
                    style={{ cursor: "pointer" }}
                  >
                    <strong>{job.title}</strong>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="col-md-8">
          <div className="card p-4">
            <h5>Apply for a Role</h5>
            {submitted ? (
              <div className="alert alert-success mt-3">
                Thank you for applying! We’ll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
                    name="role"
                    className="form-select"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Role</option>
                    {jobPosts.map((job, index) => (
                      <option key={index} value={job.title}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Experience</label>
                  <select
                    name="experience"
                    className="form-select"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Experience</option>
                    {company.experience.map((exp, i) => (
                      <option key={i} value={exp}>
                        {exp}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Enter Skills (press Enter to add)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type a skill and press enter"
                    value={skillInput}
                    onChange={handleSkillInput}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        availableSkills.includes(skillInput.trim())
                      ) {
                        e.preventDefault();
                        handleAddSkill(skillInput.trim());
                      }
                    }}
                  />
                  {skillInput && availableSkills.length > 0 && (
                    <ul className="list-group mt-2">
                      {availableSkills.map((skill, index) => (
                        <li
                          key={index}
                          className="list-group-item list-group-item-action"
                          onClick={() => handleAddSkill(skill)}
                          style={{ cursor: "pointer" }}
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {formData.skills.length > 0 && (
                  <div className="mb-3">
                    <strong>Selected Skills:</strong>
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      {formData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="badge bg-primary"
                          style={{ padding: "0.5em 1em", fontSize: "0.9em" }}
                        >
                          {skill}
                          <button
                            type="button"
                            className="btn-close btn-close-white ms-2"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                skills: prev.skills.filter((s) => s !== skill),
                              }))
                            }
                            aria-label="Remove"
                          ></button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <button type="submit" className="btn btn-success">
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>

        {selectedRole && (
          <div
            className="modal d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={() => setSelectedRole(null)}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              role="document"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedRole.title}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSelectedRole(null)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    <strong>Description:</strong> {selectedRole.description}
                  </p>
                  <p>
                    <strong>Location:</strong> {selectedRole.location}
                  </p>
                  <p>
                    <strong>Posted At:</strong>{" "}
                    {new Date(selectedRole.postedAt).toLocaleString()}
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setSelectedRole(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default CompanyDetails;
