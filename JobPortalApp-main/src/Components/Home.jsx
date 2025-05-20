import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import News1 from "./../assets/Images/News1.jpg";
import carrerAdive from "../assets/Images/CareerAdvice.jpg";
import sucessstories from "../assets/Images/successstories.jpg";
const Home = () => {
  const [SearchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (SearchKeyword.trim()) {
      navigate(`/search?keyword=${SearchKeyword}`);
    }
  };

  return (
    <div>
      {/* Main Search Section */}
      <section className="bg-primary text-white py-5 text-center">
        <div className="container">
          <h1 className="mb-3 fw-bold">Find your dream job now</h1>
          <p className="mb-4">5 lakh + jobs for you to explore</p>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="input-group shadow-lg">
                <input
                  type="text"
                  className="form-control from-control-lg rounded-start-pill"
                  placeholder="Enter skills, designation, or company...."
                  value={SearchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                  className="btn btn-dark btn-lg rounded-end-pill px-4"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-4">Explore job categories</h2>
        <div className="row g-4">
          {[
            { title: "Software Development", path: "Software-development" },
            { title: "Marketing", path: "Marketing" },
            { title: "Finance & Bamking", path: "finance" },
            { title: "Data Science", path: "data-science" },
          ].map((cat, i) => (
            <div className="col-md-3" key={i}>
              <div className="card h-100 shadow-sm hover-zoom">
                <div className="card-body text-center">
                  <h5 className="card-title">{cat.title}</h5>
                  <p className="card-text">Explore jobs in {cat.title}.</p>
                  <Link
                    to={`/jobs/${cat.title}`}
                    className="btn btn-outline-primary"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="container py-5">
        <div className="contianer">
          <h2 className="text-center fw-bold mb-4">Featured Jobs</h2>
          <div className="row g-4">
            {[
              {
                title: "Software Engineer",
                company: "Tech Innovators",
                location: "Hyderabad",
                id: 1,
              },
              {
                title: "Data Scientist",
                company: "Data Analytics",
                location: "Bangalore",
                id: 2,
              },
              {
                title: "Marketing",
                company: "Marketing Agency",
                location: "Mumbai",
                id: 3,
              },
              {
                title: "Finance Manager",
                company: "Finance Firm",
                location: "Delhi",
                id: 4,
              },
              {
                title: "HR Manager",
                company: "HR Services",
                location: "Chennai",
                id: 5,
              },
              {
                title: "Product Manager",
                company: "Product Development",
                location: "Pune",
                id: 6,
              },
            ].map((job, i) => (
              <div className="col-md-4" key={i}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{job.title}</h5>
                    <p className="card-text">Company: {job.company}</p>
                    <p className="card-text">Location: {job.location}</p>
                    <Link
                      to={`/jobs/${job.id}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Companies */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-4">Top Companies</h2>
        <div className="row g-4">
          {[
            "MNCs",
            "Startups",
            "Product",
            "Healthcare",
            "Manufacturing",
            "Banking & Finance",
          ].map((name, i) => (
            <div className="col-md-4" key={i}>
              <div className="card h-100 text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <p className="card-text">
                    {Math.floor(Math.random() * 2000 + 200)}+ actively hirirng
                  </p>
                  <Link
                    to="/companies"
                    className="btn btn-outline-primary btn-sm"
                  >
                    View Company
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section className="container py-5">
        <h2 className="text-center mb-5 fw-bold text-primary">Latest News</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow news-card border-0">
              <img
                src={News1}
                className="card-img-top"
                alt="Job Market Trends"
              />
              <div className="card-body">
                <h5 className="card-title">Job Market Trends</h5>
                <p className="card-text">
                  Stay updated with the latest trends in the job market.
                </p>
                <Link
                  to="https://varthana.com/student/top-major-trends-the-job-market-will-see"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-sm"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow news-card border-0">
              <img
                src={carrerAdive}
                className="card-img-top"
                alt="Job Market Trends"
              />
              <div className="card-body">
                <h5 className="card-title">Carrer Adivce</h5>
                <p className="card-text">
                  Get expert advice on how to advance your carrer.
                </p>
                <Link
                  to="https://www.janbasktraining.com/blog/top-10-professional-career-tips/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-sm"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow news-card border-0">
              <img
                src={sucessstories}
                className="card-img-top"
                alt="Job Market Trends"
              />
              <div className="card-body">
                <h5 className="card-title">Success Stories</h5>
                <p className="card-text">
                  Read inspiring success stories from our users.
                </p>
                <Link
                  to="https://dailyinspiredlife.com/real-life-inspirational-stories-of-success-from-around-the-world/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-sm"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
