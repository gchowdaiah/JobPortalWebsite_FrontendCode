import React from "react";
import logo from "./../assets/Images/joblogo.jpg";

function Footer() {
  return (
    <footer className="bg-white border-top mt-5">
      <div className="container py-5">
        <div className="row">
          {/* Left - Logo + Social */}
          <div className="col-md-4 mb-4">
            <img src={logo}  alt="logo" width="35" height="35" className="me-2 rounded-circle"/>
            <span className="text-primary fw-bold">Job Portal</span>
            <p className="fw-semibold mt-3">Connect with us</p>
            <div className="d-flex gap-3 fs-5 text-secondary">
              <a href="https://www.facebook.com/Naukri" target="_blank"><i className="bi bi-facebook"></i></a>
              <a href="https://www.instagram.com/naukridotcom/" target="_blank"><i className="bi bi-instagram"></i></a>
              <a href="https://x.com/naukri" target="_blank"><i className="bi bi-twitter-x"></i></a>
              <a href="https://www.linkedin.com/" target="_blank"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          {/* Middle - Links */}
          <div className="col-md-4 mb-4">
            <div className="row">
              <div className="col-6">
                <ul className="list-unstyled small">
                  <li><a href="#" className="text-decoration-none text-dark d-block mb-2">About us</a></li>
                  <li><a href="#" className="text-decoration-none text-dark d-block mb-2">Careers</a></li>
                  <li><a href="#" className="text-decoration-none text-dark d-block mb-2">Employer home</a></li>
                  <li><a href="#" className="text-decoration-none text-dark d-block mb-2">Sitemap</a></li>
                  <li><a href="#" className="text-decoration-none text-dark d-block mb-2">Credits</a></li>
                </ul>
              </div>
              <div className="col-6">
                <ul className="list-unstyled small">
                  <li><a href="#" className="text-decoration-none text-dark d-block mb-2">Help center</a></li>
                  <li><a href="#" className="text-decoration-none text-dark d-block mb-2">Summons/Notices</a></li>
                  <li><a href="#" className="text-decoration-none text-dark d-block mb-2">Grievances</a></li>
                  <li><a href="#" className="text-decoration-none text-dark d-block mb-2">Report issue</a></li>
                  <li><a href="#" className="text-decoration-none text-dark d-block mb-2">Trust & safety</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right - Mobile App */}
          <div className="col-md-4 mb-4">
            <div className="border rounded p-3 bg-light">
              <h5 className="fw-semibold mb-2">Apply on the go</h5>
              <p className="small text-secondary mb-3">Get real-time job updates on our App</p>
              <div className="d-flex gap-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="img-fluid"
                  style={{ height: "40px" }}
                />
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                  className="img-fluid"
                  style={{ height: "40px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-top py-3 text-center small text-muted">
        <p className="mb-1">
          All trademarks are the property of their respective owners <br />
          All rights reserved © 2025 Info Edge (India) Ltd.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
