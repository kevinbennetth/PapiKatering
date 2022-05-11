import React from "react";
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-primary flex flex-col items-center py-10 gap-6">
      <div className="flex flex-row gap-4">
        <FaTwitter className="text-primary cursor-pointer bg-white bg-opacity-50 w-10 h-10 p-2 rounded-full hover:opacity-80" />
        <FaFacebookF className="text-primary cursor-pointer bg-white bg-opacity-50 w-10 h-10 p-2 rounded-full hover:opacity-80" />
        <FaInstagram className="text-primary cursor-pointer bg-white bg-opacity-50 w-10 h-10 p-2 rounded-full hover:opacity-80" />
        <FaYoutube className="text-primary cursor-pointer bg-white bg-opacity-50 w-10 h-10 p-2 rounded-full hover:opacity-80" />
      </div>
      <div className="flex flex-row gap-4 text-white">
        <div className="hover:underline cursor-pointer">Privacy Policy</div>
        <div className="hover:underline cursor-pointer">Terms of Service</div>
        <div className="hover:underline cursor-pointer">Contact Us</div>
        <div className="hover:underline cursor-pointer">About Us</div>
      </div>
      <p className="text-white opacity-75">Copyright &#169; 2020, Papi Katering</p>
    </footer>
  );
}
