import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-red-600 to-orange-500 text-white mt-10">
      {/* Top Section */}
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Brand / Title */}
        <div>
          <p className="text-lg font-bold leading-snug">
            🍲 African Caribbean Fusion <br className="md:hidden" />
            <span className="text-yellow-300">
              at Granny&apos;s Original Takeaway
            </span>
          </p>
        </div>

        {/* Contact Info */}
        <div className="text-sm space-y-1">
          <p>📍 220 St Vincent STREET, B16 8RP, Lady Wood, BIRMINGHAM. UK</p>
          <a
            href="tel:+4401214546562"
            className="hover:text-yellow-200 transition"
          >
            📞 +44 0121 454 6562
          </a>
        </div>
      </div>

      {/* 🌐 Social Links */}
      <div className="flex flex-wrap justify-center md:justify-center gap-5 py-5 border-t border-white/20">
        {/* Facebook */}
        <a
          href="https://www.facebook.com/profile.php?id=61582075294586"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-blue-600 transition duration-300"
        >
          <FaFacebookF className="text-white text-xl sm:text-2xl group-hover:scale-110 transition-transform" />
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/african_caribbean_fusion?igsh=bjBtanBkbXZoaXFr"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-400 transition duration-300"
        >
          <FaInstagram className="text-white text-xl sm:text-2xl group-hover:scale-110 transition-transform" />
        </a>

        {/* Twitter */}
        <a
          href="https://x.com/Afro_Caribb?t=4w2fwruduTR6TYH4wNe6LA&s=09"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-sky-500 transition duration-300"
        >
          <FaTwitter className="text-white text-xl sm:text-2xl group-hover:scale-110 transition-transform" />
        </a>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black text-gray-300 text-center py-3 text-sm px-3">
        © {new Date().getFullYear()} African Caribbean Fusion. All rights reserved.{" "}
        <a
    href="https://x.com/dev_fortunei?t=CsxJ2g5zOZ8xE-ib_SpoPw&s=09"  // 👈 Replace with your actual Twitter link if different
    target="_blank"
    rel="noopener noreferrer"
    className="text-yellow-400 font-medium hover:text-yellow-300 transition"
  >
    @Dev_fortunei
  </a>
      </div>
    </footer>
  );
}
