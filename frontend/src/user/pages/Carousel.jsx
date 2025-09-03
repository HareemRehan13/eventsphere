import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const HeroCarousel = () => {
  return (
    <Carousel fade interval={3000}>
      {/* Slide 1 */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/assets/img/slide1.jpg"
          alt="First slide"
          style={{ height: "600px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Welcome to EventSphere Expo 2025</h3>
          <p>Join the biggest marketing and tech conference of the year.</p>
          <Link
            to="/register"
            className="btn btn-primary me-2"
            style={{ borderRadius: "30px", padding: "10px 20px" }}
          >
            Register Now
          </Link>
          <Link
            to="/book-booth"
            className="btn btn-outline-light"
            style={{ borderRadius: "30px", padding: "10px 20px" }}
          >
            Book Booth
          </Link>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Slide 2 */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/assets/img/slide2.jpg"
          alt="Second slide"
          style={{ height: "600px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Connect With Global Exhibitors</h3>
          <p>Showcase your brand to thousands of attendees.</p>
          <Link
            to="/register"
            className="btn btn-primary me-2"
            style={{ borderRadius: "30px", padding: "10px 20px" }}
          >
            Register Now
          </Link>
          <Link
            to="/book-booth"
            className="btn btn-outline-light"
            style={{ borderRadius: "30px", padding: "10px 20px" }}
          >
            Book Booth
          </Link>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Slide 3 */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/assets/img/slide3.jpg"
          alt="Third slide"
          style={{ height: "600px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Learn. Network. Grow.</h3>
          <p>Attend workshops, sessions, and meet industry leaders.</p>
          <Link
            to="/register"
            className="btn btn-primary me-2"
            style={{ borderRadius: "30px", padding: "10px 20px" }}
          >
            Register Now
          </Link>
          <Link
            to="/book-booth"
            className="btn btn-outline-light"
            style={{ borderRadius: "30px", padding: "10px 20px" }}
          >
            Book Booth
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default HeroCarousel;
