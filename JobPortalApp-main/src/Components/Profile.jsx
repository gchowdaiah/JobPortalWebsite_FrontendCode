import React, { useState, useEffect } from "react";

function Profile() {
  // const storedUser = localStorage.getItem({ id: users.id });
  const [error, setError] = useState("");
  const [users, setUser] = useState({});
  useEffect(() => {
    // const storedUser = localStorage.getItem({ id: users.id });
    console.log(storedUser);
    if (!storedUser) return;
    const { id } = JSON.parse(storedUser);
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `https://localhost:7125/api/Auth/users/${id}`
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        console.log(data);
        setUser(data);
      } catch (error) {
        setError("Error fetching user");
      }
    };

    fetchProfile();
  }, []);

  if (error)
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  if (!users) return <div className="text-center mt-4">Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-8">
      <h5 className="text-2xl font-bold mb-6 text-blue-600 text-center">
        {users.firstName}
        {users.lastName} Profile
      </h5>
      <p>
        <strong>Name:</strong>
        {users.firstName}
        {users.lastName}
      </p>
    </div>
  );
}

export default Profile;
