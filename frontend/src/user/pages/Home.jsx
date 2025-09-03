import React from "react";
import Navbar from "../components/Navbar";
import AttendeeFooter from "../pages/AttendeeFooter"; // ✅ fixed here
import HeroCarousel from "../pages/Carousel";

export default function Home() {
  return (
    <div className="index-page">
      {/* Navbar at top */}
      <Navbar />
    
{/* <HeroCarousel/>      Main Content */}
      <main className="main">
        {/* Hero Section Example */}
        <section id="hero" className="hero section dark-background">
          <img src="/assets/img/hero-bg.jpg" alt="hero" data-aos="fade-in" />
          <div className="container d-flex flex-column align-items-center text-center mt-auto">
            <h2 data-aos="fade-up" data-aos-delay="100">
              THE ANNUAL <br />
              <span>MARKETING</span> CONFERENCE
            </h2>
            <p data-aos="fade-up" data-aos-delay="200">
              10-12 December, Downtown Conference Center, New York
            </p>
          </div>
        </section>
      </main>

      {/* Footer at bottom */}
      <AttendeeFooter />
    </div>
  );
}
