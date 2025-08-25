import React from "react";

export default function SpeakerDetails() {
  return (
    <div className="speaker-details-page">
      {/* Header */}
      <header id="header" className="header d-flex align-items-center fixed-top">
        <div className="container-fluid container-xl position-relative d-flex align-items-center">
          <a href="/" className="logo d-flex align-items-center me-auto">
            <img src="assets/img/logo.png" alt="logo" />
          </a>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#speakers">Speakers</a></li>
              <li><a href="#schedule">Schedule</a></li>
              <li><a href="#venue">Venue</a></li>
              <li><a href="#hotels">Hotels</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li className="dropdown">
                <a href="#"><span>Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                <ul>
                  <li><a href="#">Dropdown 1</a></li>
                  <li className="dropdown">
                    <a href="#"><span>Deep Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                    <ul>
                      <li><a href="#">Deep Dropdown 1</a></li>
                      <li><a href="#">Deep Dropdown 2</a></li>
                      <li><a href="#">Deep Dropdown 3</a></li>
                      <li><a href="#">Deep Dropdown 4</a></li>
                      <li><a href="#">Deep Dropdown 5</a></li>
                    </ul>
                  </li>
                  <li><a href="#">Dropdown 2</a></li>
                  <li><a href="#">Dropdown 3</a></li>
                  <li><a href="#">Dropdown 4</a></li>
                </ul>
              </li>
              <li><a href="#contact">Contact</a></li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

          <a className="cta-btn d-none d-sm-block" href="#buy-tickets">Buy Tickets</a>
        </div>
      </header>

      {/* Main */}
      <main className="main">
        {/* Page Title */}
        <div
          className="page-title"
          data-aos="fade"
          style={{ backgroundImage: "url(assets/img/page-title-bg.webp)" }}
        >
          <div className="container position-relative">
            <h1>Speaker Details</h1>
            <p>
              Esse dolorum voluptatum ullam est sint nemo et est ipsa porro
              placeat quibusdam quia assumenda numquam molestias.
            </p>
            <nav className="breadcrumbs">
              <ol>
                <li><a href="/">Home</a></li>
                <li className="current">Speaker Details</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Events Section */}
        <section id="events" className="events section">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row">
              <div className="col-md-6">
                <img
                  src="assets/img/speaker.jpg"
                  alt="Speaker"
                  className="img-fluid"
                />
              </div>

              <div className="col-md-6">
                <div className="details">
                  <h2>Brenden Legros</h2>
                  <div className="social">
                    <a href="#"><i className="bi bi-twitter"></i></a>
                    <a href="#"><i className="bi bi-facebook"></i></a>
                    <a href="#"><i className="bi bi-instagram"></i></a>
                    <a href="#"><i className="bi bi-linkedin"></i></a>
                  </div>
                  <p>
                    Voluptatem perferendis sed assumenda voluptatibus. Laudantium
                    molestiae sint. Doloremque odio dolore dolore sit. Quae labore
                    alias ea omnis ex expedita sapiente molestias atque. Optio
                    voluptas et.
                  </p>
                  <p>
                    Aboriosam inventore dolorem inventore nam est esse. Aperiam
                    voluptatem nisi molestias laborum ut. Porro dignissimos eum.
                    Tempore dolores minus unde est voluptatum incidunt ut aperiam.
                  </p>
                  <p>
                    Et dolore blanditiis officiis non quod id possimus. Optio non
                    commodi alias sint culpa sapiente nihil ipsa magnam. Qui eum
                    alias provident omnis incidunt aut. Eius et officia corrupti
                    omnis error vel quia omnis velit. In qui debitis autem aperiam
                    voluptates unde sunt et facilis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
