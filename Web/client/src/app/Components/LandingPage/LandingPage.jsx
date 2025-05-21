import React from 'react';
import "@/app/style.css";
import { useRouter } from 'next/navigation';
import Image from '../../../Images/cyber-illustration.jpg'
export const LandingPage = () => {
  const router = useRouter()
  return (
    <div className="bg-[#0b1120] min-h-screen text-white font-sans">
      <nav className="flex items-center justify-between px-10 py-6">
        <div className="text-2xl font-bold text-white">AnAcad</div>
        <ul className="hidden md:flex space-x-6 text-sm">
          <li className="hover:text-cyan-400 cursor-pointer">Home</li>
          <li className="hover:text-cyan-400 cursor-pointer">About Us</li>
          <li className="hover:text-cyan-400 cursor-pointer">Services</li>
          <li className="hover:text-cyan-400 cursor-pointer">Pages</li>
          <li className="hover:text-cyan-400 cursor-pointer">Blog</li>
          <li className="hover:text-cyan-400 cursor-pointer">Contact</li>
        </ul>
        <button className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-5 py-2 rounded-full text-sm font-medium">
          Get Free Quotes
        </button>
      </nav>

      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-10 py-20">
  
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            We Provide Best <br /> <span className="text-cyan-400">CyberSecurity Solutions</span>
          </h1>
          <p className="text-gray-300 text-base mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <button className="bg-white text-gray-900 font-semibold px-6 py-2 rounded-full hover:bg-gray-200" onClick={()=>{
              router.push("/pages/Auth")
            }}>
              login
            </button>
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-full font-semibold">
              Contact Us
            </button>
          </div>
        </div>

        <div className="md:w-1/2 mb-10 md:mb-0">
          <img
            src={Image.src}
            alt="Cybersecurity Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </div>
  );
};
