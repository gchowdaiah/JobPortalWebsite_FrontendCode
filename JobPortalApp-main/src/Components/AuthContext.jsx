import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const savedUsers = localStorage.getItem("registeredUsers");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // Sync the registeredUsers and currentUser to localStorage
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [registeredUsers, currentUser]);

  const register = (user) => {
    // Check if the user already exists by email
    const userExists = registeredUsers.some((u) => u.email === user.email);
    if (userExists) {
      console.log("User already registered");
      return;
    }

    const newUser = {
      ...user,
      registeredAt: new Date(),
      lastLogin: null,
      loggedIn: false,
    };

    setRegisteredUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const login = (user) => {
    // Find and update the logged-in user
    const updatedUsers = registeredUsers.map((u) => {
      if (u.email === user.email) {
        return { ...u, lastLogin: new Date(), loggedIn: true };
      }
      return u;
    });

    setRegisteredUsers(updatedUsers);
    setCurrentUser(user);
  };

  const logout = () => {
    if (currentUser) {
      const updatedUsers = registeredUsers.map((u) => {
        if (u.email === currentUser.email) {
          return { ...u, loggedIn: false };
        }
        return u;
      });

      setRegisteredUsers(updatedUsers);
    }

    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ registeredUsers, register, login, logout, currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
