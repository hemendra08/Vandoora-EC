import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-300 py-16 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Col */}
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-violet-500/30">
                V
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-violet-400 transition-colors">
                Vandoora
              </span>
            </Link>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed font-light">
              Elevating your lifestyle with premium electronics, carefully curated for excellence and style.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-violet-600 hover:border-violet-600 hover:text-white transition-all duration-300">
                <FaFacebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-violet-600 hover:border-violet-600 hover:text-white transition-all duration-300">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-violet-600 hover:border-violet-600 hover:text-white transition-all duration-300">
                <FaTwitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Shop</h3>
            <ul className="space-y-3 text-sm font-light text-zinc-400">
              <li><Link to="/products" className="hover:text-violet-400 transition-colors">New Arrivals</Link></li>
              <li><Link to="/products" className="hover:text-violet-400 transition-colors">Trending Now</Link></li>
              <li><Link to="/products" className="hover:text-violet-400 transition-colors">Electronics</Link></li>
              <li><Link to="/products" className="hover:text-violet-400 transition-colors">Accessories</Link></li>
              <li><Link to="/products" className="hover:text-violet-400 transition-colors">Sale & Clearance</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Support</h3>
            <ul className="space-y-3 text-sm font-light text-zinc-400">
              <li><a href="#" className="hover:text-violet-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Stay Updated</h3>
            <p className="text-sm text-zinc-400 font-light mb-4">
              Join our newsletter for exclusive offers and fresh releases.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm rounded-lg px-4 py-3 pb-3 pr-28 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 bg-violet-600 text-white px-4 text-sm font-medium rounded-md hover:bg-violet-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-light">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-violet-500 font-medium tracking-wide">Vandoora</span>. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
