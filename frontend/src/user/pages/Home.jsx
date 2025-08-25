import React from "react";

export default function Home() {
  return (
    <div className="index-page">
      {/* Header */}
      <header id="header" className="header d-flex align-items-center fixed-top">
        <div className="container-fluid container-xl position-relative d-flex align-items-center">
          <a href="/" className="logo d-flex align-items-center me-auto">
            <img src="/assets/img/logo.png" alt="logo" />
            {/* <h1 className="sitename">TheEvent</h1> */}
          </a>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <a href="#hero" className="active">
                  Home
                </a>
              </li>
              <li><a href="#speakers">Speakers</a></li>
              <li><a href="#schedule">Schedule</a></li>
              <li><a href="#venue">Venue</a></li>
              <li><a href="#hotels">Hotels</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li className="dropdown">
                <a href="#">
                  <span>Dropdown</span>{" "}
                  <i className="bi bi-chevron-down toggle-dropdown"></i>
                </a>
                <ul>
                  <li><a href="#">Dropdown 1</a></li>
                  <li className="dropdown">
                    <a href="#">
                      <span>Deep Dropdown</span>{" "}
                      <i className="bi bi-chevron-down toggle-dropdown"></i>
                    </a>
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

          <a className="cta-btn d-none d-sm-block" href="#buy-tickets">
            Buy Tickets
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="main">
        {/* Hero Section */}
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
            <div data-aos="fade-up" data-aos-delay="300">
              <a
                href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                className="glightbox pulsating-play-btn mt-3"
              ></a>
            </div>
          </div>

          <div className="about-info mt-auto position-relative">
            <div className="container position-relative" data-aos="fade-up">
              <div className="row">
                <div className="col-lg-6">
                  <h2>About The Event</h2>
                  <p>
                    Sed nam ut dolor qui repellendus iusto odit. Possimus
                    inventore eveniet accusamus error amet eius aut accusantium
                    et. Non odit consequatur repudiandae sequi ea odio
                    molestiae. Enim possimus sunt inventore in est ut optio
                    sequi unde.
                  </p>
                </div>
                <div className="col-lg-3">
                  <h3>Where</h3>
                  <p>Downtown Conference Center, New York</p>
                </div>
                <div className="col-lg-3">
                  <h3>When</h3>
                  <p>
                    Monday to Wednesday
                    <br />
                    10-12 December
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /Hero Section */}

        {/* Speakers Section */}
        <section id="speakers" className="speakers section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Event Speakers</h2>
          </div>
        </section>
      </main>
    </div>
  );
}

{/* Speakers Section */}
<section id="speakers" className="speakers section">
  <div className="container section-title" data-aos="fade-up">
    <h2>Event Speakers</h2>
  </div>

  <div className="container">
    <div className="row gy-4">
      {[
        { img: "/assets/img/speakers/speaker-1.jpg", name: "Walter White", desc: "Quas alias incidunt" },
        { img: "/assets/img/speakers/speaker-2.jpg", name: "Hubert Hirthe", desc: "Consequuntur odio aut" },
        { img: "/assets/img/speakers/speaker-3.jpg", name: "Amanda Jepson", desc: "Fugiat laborum et" },
        { img: "/assets/img/speakers/speaker-4.jpg", name: "William Anderson", desc: "Debitis iure vero" }
      ].map((spk, i) => (
        <div className="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={(i+1)*100} key={i}>
          <div className="member">
            <img src={spk.img} className="img-fluid" alt={spk.name} />
            <div className="member-info">
              <div className="member-info-content">
                <h4><a href="speaker-details.html">{spk.name}</a></h4>
                <span>{spk.desc}</span>
              </div>
              <div className="social">
                <a href="#"><i className="bi bi-twitter-x"></i></a>
                <a href="#"><i className="bi bi-facebook"></i></a>
                <a href="#"><i className="bi bi-instagram"></i></a>
                <a href="#"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Schedule Section */}
<section id="schedule" className="schedule section">
  <div className="container section-title" data-aos="fade-up">
    <h2>Event Schedule</h2>
    <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
  </div>

  <div className="container">
    <ul className="nav nav-tabs" role="tablist" data-aos="fade-up" data-aos-delay="100">
      <li className="nav-item"><a className="nav-link active" href="#day-1" role="tab" data-bs-toggle="tab">Day 1</a></li>
      <li className="nav-item"><a className="nav-link" href="#day-2" role="tab" data-bs-toggle="tab">Day 2</a></li>
      <li className="nav-item"><a className="nav-link" href="#day-3" role="tab" data-bs-toggle="tab">Day 3</a></li>
    </ul>

    <div className="tab-content row justify-content-center" data-aos="fade-up" data-aos-delay="200">
      <h3 className="sub-heading">
        Voluptatem nulla veniam soluta et corrupti consequatur neque eveniet officia.
      </h3>

      {/* Example Day-1 */}
      <div role="tabpanel" className="col-lg-9 tab-pane fade show active" id="day-1">
        <div className="row schedule-item">
          <div className="col-md-2"><time>09:30 AM</time></div>
          <div className="col-md-10">
            <h4>Registration</h4>
            <p>Fugit voluptas iusto maiores temporibus autem numquam magnam.</p>
          </div>
        </div>
        {/* baaki schedule items aapke HTML ke hisaab se same tarah se convert ho jayenge */}
      </div>
    </div>
  </div>
</section>

{/* Venue Section */}
<section id="venue" className="venue section">
  <div className="container section-title" data-aos="fade-up">
    <h2>Event Venue</h2>
    <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
  </div>

  <div className="container-fluid" data-aos="fade-up">
    <div className="row g-0">
      <div className="col-lg-6 venue-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282"
          style={{ border: 0, width: "100%", height: "100%" }}
          allowFullScreen
          title="venue-map"
        ></iframe>
      </div>
      <div className="col-lg-6 venue-info">
        <div className="row justify-content-center">
          <div className="col-11 col-lg-8 position-relative">
            <h3>Downtown Conference Center, New York</h3>
            <p>Iste nobis eum sapiente sunt enim dolores labore accusantium autem...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Hotels Section */}
<section id="hotels" className="hotels section">
  <div className="container section-title" data-aos="fade-up">
    <h2>Hotels</h2>
    <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
  </div>

  <div className="container">
    <div className="row gy-4">
      {[
        { img: "/assets/img/hotels-1.jpg", title: "Non quibusdam blanditiis", dist: "0.4 Mile" },
        { img: "/assets/img/hotels-2.jpg", title: "Aspernatur assumenda", dist: "0.5 Mile" },
        { img: "/assets/img/hotels-3.jpg", title: "Dolores ut ut voluptatibu", dist: "0.6 Mile" }
      ].map((h, i) => (
        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={(i+1)*100} key={i}>
          <div className="card h-100">
            <div className="card-img">
              <img src={h.img} alt={h.title} className="img-fluid" />
            </div>
            <h3><a href="#" className="stretched-link">{h.title}</a></h3>
            <div className="stars">
              <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
            </div>
            <p>{h.dist} from the Venue</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Gallery Section */}
<section id="gallery" className="gallery section">
  <div className="container section-title" data-aos="fade-up">
    <h2>Gallery</h2>
    <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
  </div>
  <div className="container" data-aos="fade-up" data-aos-delay="100">
    <div className="swiper-wrapper align-items-center">
      {[1,2,3,4,5,6,7,8].map(i => (
        <div className="swiper-slide" key={i}>
          <a className="glightbox" data-gallery="images-gallery" href={`/assets/img/event-gallery/event-gallery-${i}.jpg`}>
            <img src={`/assets/img/event-gallery/event-gallery-${i}.jpg`} className="img-fluid" alt={`gallery-${i}`} />
          </a>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Sponsors Section */}
<section id="sponsors" className="sponsors section light-background">
  <div className="container section-title" data-aos="fade-up">
    <h2>Sponsors</h2>
    <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
  </div>
  <div className="container" data-aos="fade-up" data-aos-delay="100">
    <div className="row g-0 clients-wrap">
      {[1,2,3,4].map(i => (
        <div className="col-xl-3 col-md-4 client-logo" key={i}>
          <img src={`/assets/img/clients/client-${i}.png`} className="img-fluid" alt={`client-${i}`} />
        </div>
      ))}
    </div>
  </div>
</section>
