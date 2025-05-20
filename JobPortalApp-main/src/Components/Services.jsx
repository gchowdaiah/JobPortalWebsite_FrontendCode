import React from "react";

function Services() {
  const services = [
    {
      title: "Resume Building",
      description:
        "Create a professional resume with our easy-to-use resume builder.",
      icon: "📝",
    },
    {
      title: "Career Counseling",
      description: "Get expert advice to plan and grow your career path.",
      icon: "🎯",
    },
    {
      title: "Job Alerts",
      description:
        "Receive instant notifications for jobs that match your profile.",
      icon: "🔔",
    },
    {
      title: "Mock Interviews",
      description: "Practice with mock interviews to boost your confidence.",
      icon: "🎤",
    },
    {
      title: "Skill Assessments",
      description:
        "Test your skills and get certified to stand out to employers.",
      icon: "📊",
    },
    {
      title: "Internship Programs",
      description:
        "Explore internship opportunities to gain real-world experience.",
      icon: "💼",
    },
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Our Services</h2>
      <div className="row">
        {services.map((service, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <div style={{ fontSize: "2rem" }}>{service.icon}</div>
                <h5 className="card-title mt-3">{service.title}</h5>
                <p className="card-text">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
