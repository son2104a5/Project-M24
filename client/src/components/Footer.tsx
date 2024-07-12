import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 pl-5 pr-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="col-span-1">
          <h3 className="font-bold text-xl mb-4">About Us</h3>
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="col-span-1">
          <h3 className="font-bold text-xl mb-4">Customer Service</h3>
          <ul>
            <li className="mb-2"><a href="/help" className="text-gray-400 hover:underline">Help & Contact</a></li>
            <li className="mb-2"><a href="/returns" className="text-gray-400 hover:underline">Returns & Refunds</a></li>
            <li className="mb-2"><a href="/shipping" className="text-gray-400 hover:underline">Shipping Info</a></li>
          </ul>
        </div>

        <div className="col-span-1">
          <h3 className="font-bold text-xl mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2"><a href="/shop" className="text-gray-400 hover:underline">Shop</a></li>
            <li className="mb-2"><a href="/about" className="text-gray-400 hover:underline">About Us</a></li>
            <li className="mb-2"><a href="/contact" className="text-gray-400 hover:underline">Contact</a></li>
          </ul>
        </div>

        <div className="col-span-1">
          <h3 className="font-bold text-xl mb-4">Stay Connected</h3>
          <form className="flex flex-col">
            <input type="email" placeholder="Email Address" className="mb-3 p-2 rounded bg-gray-700 text-white border border-gray-600" />
            <button type="submit" className="p-2 rounded bg-blue-500 hover:bg-blue-700 transition duration-300">Subscribe</button>
          </form>
          <div className="flex space-x-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        
      </div>
      <div className="container mx-auto text-center text-gray-500 mt-8">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
