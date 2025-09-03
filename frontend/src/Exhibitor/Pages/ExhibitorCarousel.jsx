import React, { useState, useEffect } from "react";
import "./ExhibitorCarousel.css"; // optional for extra styling

const ExhibitorCarousel = () => {
  const slides = [
    {
      id: 1,
      title: "Welcome to Your Expo Booth",
      description: "Manage your booth and track visitors effectively.",
      image: "https://via.placeholder.com/1200x400?text=Booth+Management",
      cta: "View Booth",
    },
    {
      id: 2,
      title: "Check Your Schedule",
      description: "Stay updated with all scheduled events and meetings.",
      image: "https://via.placeholder.com/1200x400?text=Schedule",
      cta: "View Schedule",
    },
    {
      id: 3,
      title: "Tickets & Registrations",
      description: "Track your registrations and ticket status in real-time.",
      image: "https://via.placeholder.com/1200x400?text=Tickets",
      cta: "View Tickets",
    },
    {
      id: 4,
      title: "Feedback & Notifications",
      description: "Receive feedback and notifications directly in your panel.",
      image: "https://via.placeholder.com/1200x400?text=Feedback+Notifications",
      cta: "View Feedback",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); // auto-slide every 5 sec
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: "relative", maxWidth: "1200px", margin: "20px auto", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 15px rgba(0,0,0,0.3)" }}>
      {/* Slide Image */}
      <img
        src={slides[currentIndex].image}
        alt={slides[currentIndex].title}
        style={{ width: "100%", height: "400px", objectFit: "cover" }}
      />

      {/* Slide Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.45)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <h2 style={{ fontSize: "32px", marginBottom: "12px" }}>{slides[currentIndex].title}</h2>
        <p style={{ fontSize: "18px", marginBottom: "20px" }}>{slides[currentIndex].description}</p>
        <button
          style={{
            background: "#ff6b35",
            color: "#fff",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "0.3s",
          }}
        >
          {slides[currentIndex].cta}
        </button>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          border: "none",
          padding: "8px 12px",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          border: "none",
          padding: "8px 12px",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      >
        &#10095;
      </button>

      {/* Dots */}
      <div style={{ position: "absolute", bottom: "15px", width: "100%", textAlign: "center" }}>
        {slides.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              height: "12px",
              width: "12px",
              margin: "0 5px",
              display: "inline-block",
              borderRadius: "50%",
              background: currentIndex === idx ? "#ff6b35" : "#fff",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ExhibitorCarousel;
