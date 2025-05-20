import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import logo from "./../assets/Images/joblogo.jpg";
import profileLogo from "./../assets/Images/Profilelogo.avif";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownref = useRef(null);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/home");
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownref.current && !dropdownref.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isAdmin = currentUser?.role === "admin";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow sticky-top">
      <div className="container-fluid">
        <Link
          className="navbar-brand fw-bold d-flex align-items-center"
          to="/home"
        >
          <img
            src={logo}
            alt="logo"
            width="35"
            height="35"
            className="me-2 rounded-circle"
          />
          <span>Job Portal</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!isAdmin && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/jobs">
                    Jobs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/companies">
                    Companies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/services">
                    Services
                  </Link>
                </li>
              </>
            )}

            {isAdmin && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link text-danger fw-semibold"
                    to="/admin"
                  >
                    Admin Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-danger fw-semibold"
                    to="/admin/applications"
                  >
                    Job Applications
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-danger fw-semibold"
                    to="/admin/jobpost"
                  >
                    Job Post
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-danger fw-semibold"
                    to="/admin/postedJob"
                  >
                    Posted Job
                  </Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {currentUser ? (
              <li className="nav-item d-flex align-items-center">
                <img
                  src={profileLogo}
                  alt="Profile"
                  width="32"
                  height="32"
                  className="rounded-circle me-2"
                  style={{ cursor: "pointer" }}
                  onClick={toggleDropdown}
                />
                {showDropdown && (
                  <div
                    className="dropdown-menu show position-absolute"
                    style={{ right: 0, top: "50px" }}
                    ref={dropdownref}
                  >
                    <div className="px-3 py-2">
                      <Link
                        className="nav-link text-danger fw-semibold"
                        to="/profile"
                      >
                        Profile
                      </Link>

                      <button
                        className="btn btn-danger btn-sm w-100"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ) : (
              <>
                <li
                  className="nav-item me-2 btn btn-primary rounded-pill px-4 d-flex justify-content-center align-items-center"
                  style={{
                    width: "100px",
                    height: "40px",
                    border: "2px solid #000",
                    borderRadius: "20px",
                  }}
                >
                  <Link className="nav-link text-white" to="/login">
                    Login
                  </Link>
                </li>
                <li
                  className="nav-item me-2 rounded-pill px-4 btn btn-warning d-flex justify-content-center align-items-center"
                  style={{
                    width: "100px",
                    height: "40px",
                    border: "2px solid #000",
                    borderRadius: "20px",
                  }}
                >
                  <Link className="nav-link text-dark" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
