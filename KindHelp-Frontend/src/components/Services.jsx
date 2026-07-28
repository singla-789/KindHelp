// Enhanced Services section customized for medicine donation platform
import React, { useState, useEffect, useRef } from 'react';
import { Gift, HandHeart, BarChart3, ArrowRight, Heart, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

const Services = () => {
  const [servicesRef, servicesInView] = useInView({ once: true });
  const navigate = useNavigate();

  const handleDonateClick = () => navigate("/login");
  const handleSearchClick = () => navigate("/login");

  const services = [
    {
      title: "Donate Unused Medicines",
      desc: "Donors can contribute unused or unexpired medicines to help those in need. Your contribution might just save a life.",
      icon: Gift,
      emoji: "💊",
      color: "from-[#5B3FFF] to-indigo-600",
      bgGradient: "from-purple-50 to-indigo-50",
      features: ["Upload medicine details", "Select type & quantity", "Secure donor listing"]
    },
    {
      title: "Find Required Medicines",
      desc: "Needy individuals can search for specific medicines in their city and contact donors directly for assistance.",
      icon: Search,
      emoji: "🔍",
      color: "from-indigo-500 to-blue-600",
      bgGradient: "from-indigo-50 to-blue-50",
      features: ["Search by city & medicine name", "Access donor contact info", "Quick availability updates"]
    },
    {
      title: "Track Impact",
      desc: "Monitor how your donations helped others with insightful stats and shared success stories.",
      icon: BarChart3,
      emoji: "📈",
      color: "from-blue-500 to-[#5B3FFF]",
      bgGradient: "from-blue-50 to-purple-50",
      features: ["Impact reports", "Engagement analytics", "Verified donation logs"]
    },
  ];

  return (
    <section ref={servicesRef} className="py-20 px-6 md:px-20 bg-white relative overflow-hidden" id="services">
      <div className="absolute top-10 left-10 w-20 h-20 bg-purple-100 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-indigo-100 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-100 rounded-full opacity-40 animate-ping"></div>

      <div className={`text-center mb-20 transform transition-all duration-700 ${servicesInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>        
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-6 h-6 text-[#5B3FFF] animate-pulse" />
          <span className="text-[#5B3FFF] font-medium">How KindHelp Works</span>
        </div>
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#5B3FFF] to-[#a18aff] drop-shadow-xl">
          Core Services
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
          We bridge the gap between donors and those in need of medical aid.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-3 max-w-7xl mx-auto relative z-10">
        {services.map((item, i) => (
          <div
            key={i}
            className={`group relative bg-gradient-to-br ${item.bgGradient} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 backdrop-blur-sm ${servicesInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionDelay: `${i * 200}ms` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
            <div className="relative z-10">
              <div className="relative mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl absolute -top-2 -right-2 animate-bounce">{item.emoji}</div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#5B3FFF] transition-colors">{item.title}</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">{item.desc}</p>
              <ul className="space-y-2 mb-6">
                {item.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-[#5B3FFF] rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
            </div>
            <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity delay-200"></div>
          </div>
        ))}
      </div>

      <div className={`text-center mt-20 transform transition-all duration-700 delay-600 ${servicesInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="bg-gradient-to-r from-[#5B3FFF] to-indigo-600 p-8 rounded-2xl shadow-xl max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-16 h-16 border border-white rounded-full animate-spin"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 border border-white rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white rounded-full animate-pulse"></div>
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Be the Lifeline Someone Needs</h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">Join KindHelp and turn your unused medicines into someone's second chance at life.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                className="px-8 py-3 bg-white text-[#5B3FFF] font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={handleDonateClick}
              >
                Donate Medicines
              </button>
              <button
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-[#5B3FFF] transition-all duration-300 transform hover:scale-105"
                onClick={handleSearchClick}
              >
                Search Medicines
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;