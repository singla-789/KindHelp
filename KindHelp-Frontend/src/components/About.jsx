
// export default About;
import React, { useState, useEffect, useRef } from 'react';
import { Heart, Users, Gift, TrendingUp } from 'lucide-react';
import axios from 'axios'
import {server_url} from '../config/url'

// Custom hook to detect when element is in view
const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef();
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (options.once) observer.disconnect();
        } else if (!options.once) {
          setIsInView(false);
        }
      },
      { threshold: 0.1, ...options }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options.once]);

  return [ref, isInView];



};

const About = () => {
  const [aboutRef, aboutInView] = useInView({ once: true });

  const [noofmed,countmed] = useState(0);
  const [noofcities,cities] = useState(0);
  const [noofneedies,needies] = useState(0);

  useEffect(() => {
    if (aboutInView) {
      medonated();
      citiescount();
      neediescount();
    }
  }, [aboutInView]);

  const medonated = async () =>{
    try {
      const url = server_url + "/user/meddonated";
      const resp = await axios.get(url); // GET requests should not pass data in body

      if (resp.data.status) {
        countmed(resp.data.count);
      } else {
        alert("⚠️ Error: " + resp.data.msg);
      }
    } catch (error) {
      console.error("Update failed:", error.message);
      alert("⚠️ Server error occurred.");
    }
  }

  const citiescount = async () =>{
    try {
      const url = server_url + "/user/countcities";
      const resp = await axios.get(url); // GET requests should not pass data in body

      if (resp.data.status) {
        cities(resp.data.count);
      } else {
        alert("⚠️ Error: " + resp.data.msg);
      }
    } catch (error) {
      console.error("Update failed:", error.message);
      alert("⚠️ Server error occurred.");
    }
  }

  const neediescount = async () =>{
    try {
      const url = server_url + "/user/countneedies";
      const resp = await axios.get(url); // GET requests should not pass data in body

      if (resp.data.status) {
        needies(resp.data.count);
      } else {
        alert("⚠️ Error: " + resp.data.msg);
      }
    } catch (error) {
      console.error("Update failed:", error.message);
      alert("⚠️ Server error occurred.");
    }
  }

  return (
    <section
      ref={aboutRef}
      id="about"
      className="relative overflow-hidden py-32 px-6 md:px-20 min-h-screen bg-gradient-to-br from-[#ece9ff] via-white to-[#f5f5ff]"
    >
      {/* Animated SVG Background */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-40" viewBox="0 0 1440 320" fill="none">
        <path 
          fill="url(#gradient)" 
          d="M0,64L60,74.7C120,85,240,107,360,133.3C480,160,600,192,720,181.3C840,171,960,117,1080,101.3C1200,85,1320,107,1380,117.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ede9fe" />
            <stop offset="50%" stopColor="#e0e7ff" />
            <stop offset="100%" stopColor="#f3e8ff" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-[#5B3FFF] rounded-full animate-ping opacity-60"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-indigo-400 rounded-full animate-bounce delay-300"></div>
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-700"></div>

      {/* Glassmorphism Card */}
      <div className={`relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center backdrop-blur-md bg-white/30 p-12 rounded-3xl shadow-xl border border-white/40 transform transition-all duration-1000 ${aboutInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        
        {/* Left Content */}
        <div className="space-y-6 relative">
          <div className={`transform transition-all duration-700 delay-200 ${aboutInView ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#5B3FFF] leading-tight drop-shadow flex items-center gap-3 mb-6">
              <span className="text-4xl animate-wiggle">💜</span>
              Medicine Access,
              <br /> Made Simple
            </h2>
          </div>

          <p className={`text-gray-700 text-lg md:text-xl leading-relaxed transform transition-all duration-700 delay-400 ${aboutInView ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
            KindHelp connects donors with unused medicines to those in urgent need. Just enter a medicine name and city, and we'll help you find help—or be the help.
          </p>

          {/* Mission Points */}
          <div className={`space-y-4 transform transition-all duration-700 delay-600 ${aboutInView ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
            <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg backdrop-blur-sm">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-gray-700">Powered by people who care</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg backdrop-blur-sm">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700">Enabling faster access to medicines</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg backdrop-blur-sm">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Creating healthier communities together</span>
            </div>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-2 gap-4 pt-4 transform transition-all duration-700 delay-800 ${aboutInView ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
            <div className="text-center p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-white/50 hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-[#5B3FFF] mb-1 counter" data-target="10000" >{noofmed}</div>
              <div className="text-sm text-gray-600 font-medium">Medicines Donated</div>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-white/50 hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-[#5B3FFF] mb-1 counter" data-target="5000">{noofneedies}</div>
              <div className="text-sm text-gray-600 font-medium">Requests Fulfilled</div>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-white/50 hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-[#5B3FFF] mb-1 counter" data-target="50">{noofcities}</div>
              <div className="text-sm text-gray-600 font-medium">Cities Reached</div>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-white/50 hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-[#5B3FFF] mb-1">24/7</div>
              <div className="text-sm text-gray-600 font-medium">Community Support</div>
            </div>
          </div>
        </div>

        {/* Right Illustration */}
        <div className={`flex justify-center transform transition-all duration-1000 delay-600 ${aboutInView ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          <div className="relative w-full max-w-md">
            <div className="relative w-full aspect-square bg-gradient-to-br from-purple-200 to-indigo-200 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
              <div className="w-4/5 aspect-square bg-white rounded-xl shadow-lg flex items-center justify-center relative">
                <div className="text-center relative z-10">
                  <Heart className="w-16 h-16 text-[#5B3FFF] mx-auto mb-4 animate-pulse" />
                  <div className="text-lg font-semibold text-gray-800 mb-2">Kindness Heals</div>
                  <div className="text-sm text-gray-600">Share your surplus, save a life</div>
                </div>
                <div className="absolute inset-0 rounded-xl">
                  <div className="absolute inset-4 border-2 border-[#5B3FFF]/20 rounded-lg animate-ping"></div>
                  <div className="absolute inset-8 border-2 border-purple-300/30 rounded-lg animate-ping delay-300"></div>
                </div>
              </div>

              {/* Floating Icons */}
              <div className="absolute top-4 left-4 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center animate-bounce">
                <Gift className="w-6 h-6 text-[#5B3FFF]" />
              </div>
              <div className="absolute top-4 right-4 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center animate-bounce delay-200">
                <Users className="w-6 h-6 text-indigo-500" />
              </div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center animate-bounce delay-400">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center animate-bounce delay-600">
                <Heart className="w-6 h-6 text-red-500" />
              </div>
            </div>
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#5B3FFF]/20 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-purple-400/30 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-15deg); }
        }
        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default About;
