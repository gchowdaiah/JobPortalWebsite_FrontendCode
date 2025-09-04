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
    // Sync to localStorage
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [registeredUsers, currentUser]);

  const register = (user) => {
    // Check if already exists
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
    // Update user if exists
    let updatedUsers = registeredUsers.map((u) => {
      if (u.email === user.email) {
        return { ...u, lastLogin: new Date(), loggedIn: true, role: user.role };
      }
      return u;
    });

    // If not exists (e.g., from API), add user
    const userExists = updatedUsers.some((u) => u.email === user.email);
    if (!userExists) {
      updatedUsers = [
        ...updatedUsers,
        { ...user, registeredAt: new Date(), lastLogin: new Date(), loggedIn: true },
      ];
    }

    setRegisteredUsers(updatedUsers);
    setCurrentUser(user); // ✅ Save full user object
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
