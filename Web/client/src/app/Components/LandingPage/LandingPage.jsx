import React from 'react';
import "@/app/style.css";
import { useRouter } from 'next/navigation';
import Image from '../../../Images/cyber-illustration.jpg';

export const LandingPage = () => {
  const router = useRouter();
  
  return (
    <div className="relative bg-[#0b1120] min-h-screen text-white font-sans overflow-hidden">
      {/* Animated gradient background mesh */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 -right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Glassmorphic navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-10 py-6 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          AnAcad
        </div>
        
        <button className="relative bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 bg-[length:200%_100%] text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:bg-right transition-all duration-500 hover:scale-105">
          Get Free Quotes
        </button>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-10 py-12 md:py-20 gap-8 md:gap-12">
        
        {/* Left content */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 backdrop-blur-sm">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-cyan-300 font-medium">Trusted by 500+ Companies</span>
          </div>

          {/* Headline with gradient */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            We Provide Best{' '}
            <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
              CyberSecurity Solutions
            </span>
          </h1>
          
          <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
            Protect your digital assets with enterprise-grade security solutions. We deliver cutting-edge cybersecurity services to safeguard your business from evolving threats.
          </p>

          {/* CTA buttons with enhanced styling */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
            <button 
              className="group relative bg-white text-gray-900 font-semibold px-8 py-3.5 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 overflow-hidden"
              onClick={() => router.push("/pages/Auth")}
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
            
            <button className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:scale-105 border border-cyan-400/30">
              <span className="flex items-center justify-center gap-2">
                Contact Us
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-8 pt-8 border-t border-white/10">
            <div className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400">99.9%</div>
              <div className="text-xs md:text-sm text-gray-400">Uptime SLA</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400">24/7</div>
              <div className="text-xs md:text-sm text-gray-400">Support</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400">500+</div>
              <div className="text-xs md:text-sm text-gray-400">Clients</div>
            </div>
          </div>
        </div>

        {/* Right image with glassmorphic card */}
        <div className="md:w-1/2 relative">
          {/* Floating glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl animate-pulse"></div>
          
          <div className="relative group">
            {/* Glassmorphic frame */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl backdrop-blur-sm border border-white/10 group-hover:border-cyan-400/30 transition-all duration-500"></div>
            
            <img
              src={Image.src}
              alt="Cybersecurity Illustration"
              className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Floating badges */}
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-cyan-500/90 to-blue-600/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-cyan-400/30 animate-float">
              <div className="text-2xl font-bold">256-bit</div>
              <div className="text-xs text-cyan-100">Encryption</div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-purple-500/90 to-blue-600/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-purple-400/30 animate-float-delayed">
              <div className="text-2xl font-bold">AI-Powered</div>
              <div className="text-xs text-purple-100">Protection</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
