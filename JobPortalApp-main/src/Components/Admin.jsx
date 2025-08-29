import React, { useState, useEffect } from "react";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/auth/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
        setError("Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <div className="container mt-8 text-center text-success">
        <h3>Admin Dashboard</h3>
      </div>
      <div className="container mt-5">
        <h3>Registered Users</h3>
        {users.length === 0 ? (
          <p>No registered users found.</p>
        ) : (
          <table className="table table-bordered mt-3">
            <thead className="table-light">
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Role</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Last Login</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.mobileNo}</td>
                  <td>{user.role}</td>
                  <td>{user.gender}</td>
                  <td>{user.address}</td>
                  <td>
                    {user.lastLogin
                      ? new Date(user.lastLogin).toLocaleString()
                      : "Never"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* <div className="container mt-5">
        <h2 className="mb-4">Job Applications Received</h2>
        {applications.length === 0 ? (
          <p>No applications yet.</p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Candidate Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Company</th>
                <th>Applied At</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={index}>
                  <td>{app.name}</td>
                  <td>{app.email}</td>
                  <td>{app.role}</td>
                  <td>{app.companyName}</td>
                  <td>{new Date(app.appliedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div> */}
    </div>
  );
}

export default AdminDashboard;
