import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-red-600 to-orange-500 text-white mt-10">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand / Title */}
        <p className="text-lg font-bold text-center md:text-left">
          🍲 African Caribbean Fusion <br className="md:hidden" />
          <span className="text-yellow-300">at Granny's Original Takeaway</span>
        </p>

        {/* Contact Info */}
        <div className="text-center md:text-right text-sm space-y-1">
          <p>
            📍 220 St Vincent STREET, B16 8RP, Lady Wood, BIRMINGHAM. UK
          </p>
           <a
              href="tel:+4401214546562"
              className=" hover:text-red-800"
            >
             📞+44 0121 454 6562
            </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black text-gray-300 text-center py-3 text-sm">
        © {new Date().getFullYear()} African Caribbean Fusion. All rights reserved.
      </div>
    </footer>
  );
}
