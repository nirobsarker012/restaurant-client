import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gradient-to-r from-gray-100 to-gray-200 py-8 border-t-2 border-orange-500">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-6 md:mb-0">
          <h3 className="text-2xl font-bold text-gray-900">Kobayashi Bites</h3>
          <p className="text-gray-600 mt-3 max-w-[340px]">Experience the finest dining with our carefully crafted dishes made from the freshest ingredients.</p>
        </div>
        <div className="mb-6 md:mb-0">
          <h4 className="text-lg font-semibold text-gray-900">Contact Info</h4>
          <p className="text-gray-600 mt-3">123 Food Street, Culinary City, CC 12345</p>
          <p className="text-gray-600 mt-1">+1 (555) 123-4567</p>
          <p className="text-gray-600 mt-1">info@deliciousbites.com</p>
        </div>
        <div className="mb-6 md:mb-0">
          <h4 className="text-lg font-semibold text-gray-900">Working Hours</h4>
          <p className="text-gray-600 mt-3">Monday - Friday: 9:00 AM - 10:00 PM</p>
          <p className="text-gray-600 mt-1">Saturday: 10:00 AM - 11:00 PM</p>
          <p className="text-gray-600 mt-1">Sunday: 11:00 AM - 9:00 PM</p>
        </div>
        <div className="mb-6 md:mb-0">
          <h4 className="text-lg font-semibold text-gray-900">Follow Us</h4>
          <div className="flex justify-center md:justify-start space-x-6 mt-3">
            <Link to="#" className="text-orange-500 hover:text-orange-700 text-2xl transition duration-300"><FaFacebookF /></Link>
            <Link to="#" className="text-orange-500 hover:text-orange-700 text-2xl transition duration-300"><FaTwitter /></Link>
            <Link to="#" className="text-orange-500 hover:text-orange-700 text-2xl transition duration-300"><FaInstagram /></Link>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-700 mt-6">
        &copy; {currentYear} Delicious Bites. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;