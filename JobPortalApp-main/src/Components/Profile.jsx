import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import ProfileLogo from "./../assets/Images/profilelogo.jpg";

function Profile() {
  const { currentUser } = useAuth();
  
  const designations = [
    { id: 1, name: "Software Engineer" },
    { id: 2, name: "Senior Software Engineer" },
    { id: 3, name: "Tech Lead" },
    { id: 4, name: "Project Manager" },
    { id: 5, name: "QA Engineer" },
    { id: 6, name: "DevOps Engineer" },
  ];

  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Load saved designation for logged-in user
  useEffect(() => {
    if (currentUser?.email) {
      const savedDesignation = localStorage.getItem(
        `designation_${currentUser.email}`
      );
      if (savedDesignation) {
        setSelectedDesignation(savedDesignation);
      }
    }
  }, [currentUser]);

  // Save designation
  const handleDesignationChange = (e) => {
    const value = e.target.value;
    setSelectedDesignation(value);
    localStorage.setItem(`designation_${currentUser.email}`, value);
    setIsEditing(false); // close edit mode after saving
  };

  const isAdmin = currentUser.role === "admin";

  return (
    <div className="container mt-4">
      {isAdmin && (
        <div className="alert alert-info">
          
          <h5>Admin Profile</h5>
            <div>
               <img
                src={ProfileLogo}
                alt="profile"
                width="50"
                height="50"
                className="rounded-circle me-3"
              />
          <p>
            <strong>Name:</strong> Admin
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <p>
            <strong>Role:</strong> {currentUser.role}
          </p>
            </div>
          </div>
      )}

      {currentUser && !isAdmin && (
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
                {selectedDesignation && !isEditing && (
                  <p className="mb-1 d-flex align-items-center">
                    <strong>{selectedDesignation}</strong>
                    <button
                      className="btn btn-sm btn-outline-secondary ms-2"
                      onClick={() => setIsEditing(true)}
                    >
                     <i className="bi bi-pencil"></i>
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Designation Section → only if not saved OR if editing */}
          {(!selectedDesignation || isEditing) && (
            <div className="card">
              <div className="card-body">
                <h6 className="mb-3">
                  {isEditing ? "Edit Designation" : "Your Designation"}
                </h6>
                <select
                  className="form-select"
                  value={selectedDesignation}
                  onChange={handleDesignationChange}
                >
                  <option value="">-- Select Designation --</option>
                  {designations.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Profile;
