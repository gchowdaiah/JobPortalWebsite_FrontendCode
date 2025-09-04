import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Companies from "./Components/Companies";
import Jobs from "./Components/Jobs";
import Services from "./Components/Services";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Admin from "./Components/Admin";
import CompaniesDetails from "./Components/CompaniesDetails";
import { AuthProvider } from "./Components/AuthContext";
import Applications from "./Components/Applications";
import PrivateAdminRoute from "./Components/PrivateAdminRoute";
import Profile from "./Components/Profile";
import JobPost from "./Components/JobPost";
import PostedJobs from "./Components/PostedJobs";
import Footer from "./Components/Footer";
import JobDetails from "./Components/JobDetails";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <div>
            <Navbar></Navbar>
            <br></br>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/companies" element={<Companies />} />
              <Route
                path="/companydetails/:companyName"
                element={<CompaniesDetails />}
              />
              <Route path="/services" element={<Services />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route
                path="/admin/applications"
                element={
                  <PrivateAdminRoute>
                    <Applications />
                  </PrivateAdminRoute>
                }
              />
              <Route
                path="/admin/jobpost"
                element={
                  <PrivateAdminRoute>
                    <JobPost />
                  </PrivateAdminRoute>
                }
              />
              <Route
                path="/admin/postedJob"
                element={
                  <PrivateAdminRoute>
                    <PostedJobs />
                  </PrivateAdminRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
