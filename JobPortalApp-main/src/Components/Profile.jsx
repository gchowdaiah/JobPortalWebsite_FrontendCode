import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import ProfileLogo from "./../assets/Images/profilelogo.jpg";

function Profile() {
  const { currentUser } = useAuth();

  // Hardcoded designation list
  const designations = [
    { id: 1, name: "Software Engineer" },
    { id: 2, name: "Senior Software Engineer" },
    { id: 3, name: "Tech Lead" },
    { id: 4, name: "Project Manager" },
    { id: 5, name: "QA Engineer" },
    { id: 6, name: "DevOps Engineer" },
  ];

  const [selectedDesignation, setSelectedDesignation] = useState("");

  // Load saved designation from localStorage
  useEffect(() => {
    const savedDesignation = localStorage.getItem("designation");
    if (savedDesignation) {
      setSelectedDesignation(savedDesignation);
    }
  }, []);

  // Save designation when user selects
  const handleDesignationChange = (e) => {
    const value = e.target.value;
    setSelectedDesignation(value);
    localStorage.setItem("designation", value);
  };

  return (
    <div className="container mt-4">
      {currentUser ? (
        <>
          {/* Profile Header */}
          <div className="card mb-4">
            <div className="card-body d-flex align-items-center">
              <img
                src={ProfileLogo}
                alt="profile"
                width="50"
                height="50"
                className="rounded-circle me-3"
              />
              <div>
                <h5>
                  {currentUser.firstName} {currentUser.lastName}
                </h5>
                <p className="mb-1">{currentUser.email}</p>
                <p className="mb-1">{currentUser.role}</p>
                <p className="mb-1"><strong>{selectedDesignation}</strong></p>
              </div>
            </div>
          </div>

          {/* Designation Section */}
          <div className="card">
            <div className="card-body">
              <h6 className="mb-3">Your Designation</h6>

              {/* Show dropdown only if not saved */}
              {!selectedDesignation ? (
                <select
                  className="form-select"
                  onChange={handleDesignationChange}
                >
                  <option value="">-- Select Designation --</option>
                  {designations.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="mt-2 text-success">
                  <strong>{selectedDesignation}</strong> (saved)
                </p>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
}

export default Profile;
