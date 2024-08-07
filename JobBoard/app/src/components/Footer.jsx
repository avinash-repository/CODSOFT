
import React from 'react';


export default function Footer() {
  return (
    <>
    
    <footer className="bg-green-700 text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>Some information about the company.</p>
          </div>
          <div className="col-md-4">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li>Email: example@example.com</li>
              <li>Phone: (123) 456-7890</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Facebook</a></li>
              <li><a href="#" className="text-white">Twitter</a></li>
              <li><a href="#" className="text-white">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}

 