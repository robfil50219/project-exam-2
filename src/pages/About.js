import React from 'react';

const About = () => {
  return (
    <div className="container my-5">
      <h1 className="display-4 text-center mb-4">About Holidaze</h1>
      <p className="lead text-center">
        Holidaze is a modern accommodation booking platform designed to help you find your perfect getaway.
        Whether you're looking for a cozy cabin, a beachfront villa, or a luxury hotel, Holidaze offers a wide variety of options to suit your needs.
      </p>
      
      <div className="row mt-5">
        <div className="col-md-6">
          <h3>Our Mission</h3>
          <p>
            Our mission is to provide a seamless booking experience that connects travelers with unique and memorable accommodations.
            We strive to deliver outstanding service, user-friendly technology, and a robust selection of venues that cater to every traveler's needs.
          </p>
        </div>
        <div className="col-md-6">
          <h3>Our Vision</h3>
          <p>
            We envision a world where finding the perfect place to stay is as simple as a click of a button.
            Through continuous innovation and commitment to quality, we aim to become the go-to platform for accommodation bookings worldwide.
          </p>
        </div>
      </div>
      
      <div className="mt-5">
        <h3 className="text-center">Why Choose Holidaze?</h3>
        <ul className="list-group list-group-flush mt-3">
          <li className="list-group-item">User-friendly platform for easy booking</li>
          <li className="list-group-item">Wide variety of unique accommodations</li>
          <li className="list-group-item">Excellent customer support</li>
          <li className="list-group-item">Secure and reliable payment system</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
