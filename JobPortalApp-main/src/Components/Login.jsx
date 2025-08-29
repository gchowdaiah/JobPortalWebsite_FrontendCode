import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hardcoded Admin credentials (for testing purposes)
    const adminCredentials = {
      email: "admin@jobportal.com",
      password: "Admin@123",
    };

    // Check for admin credentials first
    if (
      formData.email === adminCredentials.email &&
      formData.password === adminCredentials.password
    ) {
      login({ email: formData.email, role: "admin" });

      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/admin");
      }, 1500);
      return;
    }

    // Make an API call if it's not the admin login
    try {
      const response = await fetch("/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const user = data.user || data;
        login({ email: user.email, role: user.role });
        localStorage.setItem("user", JSON.stringify(formData));
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          if (user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/home");
          }
        }, 1500);
      } else {
        const errorText = await response.text();
        setError(errorText || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="d-grid gap-2 col-10 mx-auto">
      {showPopup && (
        <div className="popup">
          <div className="alert alert-success" role="alert">
            <p>Login Successful!</p>
          </div>
        </div>
      )}
      <div className="card d-grid gap-2 col-6 mx-auto">
        <div className="card-header d-flex justify-content-center">Login</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email ID"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>

            <div className="d-flex justify-content-center mt-2">
              <p>
                Don’t have an account?{" "}
                <a
                  href="/register"
                  className="text-decoration-none fw-semibold"
                >
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
