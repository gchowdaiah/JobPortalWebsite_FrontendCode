import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Companies() {
  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // ✅ Use relative API path (works with Vite proxy or CORS-fixed backend)
        const res = await axios.get("/api/Company");

        const grouped = {};
        res.data.forEach((company) => {
          const name = company.name;

          if (
            [
              "TCS",
              "Capgemini",
              "Tech Mahindra",
              "Cognizant",
              "Mindtree",
              "L&T",
              "HCL",
              "Accenture",
              "Infosys",
              "Wipro",
            ].includes(name)
          ) {
            grouped["MNCs"] = [...(grouped["MNCs"] || []), company];
          } else if (
            [
              "Zerodha",
              "CRED",
              "Razorpay",
              "Meesho",
              "Groww",
              "Swiggy",
              "Upstox",
              "Slice",
              "Instamojo",
              "UrbanClap (now Urban Company)",
              "Notion",
              "Figma",
            ].includes(name)
          ) {
            grouped["Startups"] = [...(grouped["Startups"] || []), company];
          } else if (
            ["Google", "Microsoft", "Adobe", "Oracle", "Ford"].includes(name)
          ) {
            grouped["Product"] = [...(grouped["Product"] || []), company];
          } else if (["Apollo", "Fortis", "Sun Pharma"].includes(name)) {
            grouped["Healthcare"] = [...(grouped["Healthcare"] || []), company];
          } else if (["Tata Steel", "JSW", "L&T"].includes(name)) {
            grouped["Manufacturing"] = [
              ...(grouped["Manufacturing"] || []),
              company,
            ];
          } else {
            grouped["Finance & Banking"] = [
              ...(grouped["Finance & Banking"] || []),
              company,
            ];
          }
        });

        setCategories(grouped);
        setError(null);
      } catch (err) {
        console.error("Error fetching companies", err);
        setError("Failed to load companies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleViewCompanies = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
  };

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 250, behavior: "smooth" });
  };

  return (
    <div>
      <section className="container bg-light py-5">
        <h2 className="text-center fw-bold mb-5">Top Companies Hiring Now</h2>

        {loading && <p className="text-center">Loading companies...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        {!loading && !error && (
          <div className="d-flex justify-content-between align-items-center mb-3">
            <button
              className="btn btn-outline-secondary rounded-circle shadow-sm"
              onClick={scrollLeft}
            >
              &lt;
            </button>

            <div
              className="top-companies-scroll d-flex overflow-auto gap-4 px-2 py-2"
              style={{ scrollBehavior: "smooth" }}
              ref={scrollContainerRef}
            >
              {Object.keys(categories).map((category) => (
                <div
                  key={category}
                  className="card flex-shrink-0 text-center shadow-sm border-0"
                  style={{ width: "240px", borderRadius: "15px" }}
                >
                  <div className="card-body">
                    <h5 className="card-title fw-semibold">{category}</h5>
                    <p className="text-muted mb-3">
                      {categories[category].length} companies listed
                    </p>
                    <button
                      className="btn btn-outline-primary btn-sm rounded-pill"
                      onClick={() => handleViewCompanies(category)}
                    >
                      View Companies
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="btn btn-outline-secondary rounded-circle shadow-sm"
              onClick={scrollRight}
            >
              &gt;
            </button>
          </div>
        )}
      </section>

      {selectedCategory && (
        <div className="container py-5">
          <h4 className="text-center mb-4 fw-bold">
            {selectedCategory} Companies
          </h4>
          <div className="row justify-content-center mb-4">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control form-control-lg rounded-pill shadow-sm"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="row justify-content-center g-4">
            {categories[selectedCategory]
              ?.filter((company) =>
                company.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((company, index) => (
                <div key={index} className="col-md-3">
                  <div
                    className="card h-100 text-center shadow-sm border-0 p-3"
                    style={{ borderRadius: "20px" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{company.name}</h5>
                      <Link to={`/companydetails/${company.name}`}>
                        <button className="btn btn-sm btn-primary rounded-pill mt-3 px-4">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Companies;
