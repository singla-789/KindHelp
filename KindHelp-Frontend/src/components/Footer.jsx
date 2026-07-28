import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Home, 
  Search, 
  BarChart3, 
  MessageCircle,
  Twitter,
  Instagram,
  Linkedin,
  ExternalLink,
  Gift
} from 'lucide-react';

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

const Footer = () => {
  const [footerRef, footerInView] = useInView({ once: true });

  const quickLinks = [
    { name: 'Home', href: '#', icon: Home },
    { name: 'Our Services', href: '#services', icon: Gift },
    // { name: 'How It Works', href: '#how-it-works', icon: Search },
    { name: 'Impact Stories', href: '#Blog', icon: BarChart3 },
    { name: 'Contact Us', href: '#Footer', icon: MessageCircle }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/premalgoyal/', color: 'hover:text-pink-400' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/premal-goyal-0a6511287/', color: 'hover:text-blue-600' }
  ];

  return (
    <footer id="Footer" ref={footerRef} className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/10 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-indigo-500/10 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-500/10 rounded-full opacity-40 animate-ping"></div>
      
      {/* Main footer content */}
      <div className="relative z-10 py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            
            {/* About Section */}
            <div className={`transform transition-all duration-700 ${footerInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#5B3FFF] to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5B3FFF] to-[#a18aff]">
                  KindHelp
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                We are committed to creating a society where everyone has access to essential medicines and healthcare support through community-driven donations.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    className={`w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className={`transform transition-all duration-700 delay-200 ${footerInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <a 
                      href={link.href}
                      className="group flex items-center gap-3 text-gray-300 hover:text-[#5B3FFF] transition-all duration-300"
                    >
                      <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-[#5B3FFF] transition-colors duration-300">
                        <link.icon className="w-4 h-4" />
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className={`transform transition-all duration-700 delay-400 ${footerInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h4 className="text-xl font-bold mb-6 text-white">Contact Us</h4>
              <div className="space-y-4">
                <div className="group flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#5B3FFF] to-indigo-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <a href="mailto:contact@kindhelp.com" className="text-gray-300 hover:text-[#5B3FFF] transition-colors">
                      contact@kindhelp.com
                    </a>
                  </div>
                </div>
                
                <div className="group flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <a href="tel:+919878369000" className="text-gray-300 hover:text-[#5B3FFF] transition-colors">
                      +91 9878369000
                    </a>
                  </div>
                </div>
                
                <div className="group flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-[#5B3FFF] rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-gray-300">Bathinda, Punjab</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className={`transform transition-all duration-700 delay-600 ${footerInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h4 className="text-xl font-bold mb-6 text-white">Reach Us</h4>
              <div className="relative group">
                <div className="w-full h-48 bg-gray-700 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109552.52143072128!2d74.8947384!3d30.2109613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391733e7f88000b7%3A0x47cb9e8effa67df6!2sBathinda%2C%20Punjab!5e0!3m2!1sen!2sin!4v1643789012345!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale group-hover:grayscale-0 transition-all duration-500"
                  ></iframe>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
                <a 
                  href="https://maps.google.com/?q=Bathinda,Punjab" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                >
                  <ExternalLink className="w-4 h-4 text-gray-700" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      

      {/* Copyright */}
      <div className="relative z-10 bg-gray-900 border-t border-gray-700 py-6 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className={`flex flex-col md:flex-row items-center justify-between gap-4 transform transition-all duration-700 delay-1000 ${footerInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <p className="text-gray-400 text-sm">
              © 2024 KindHelp. All Rights Reserved. Made with ❤️ for humanity.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="/privacy" className="hover:text-[#5B3FFF] transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-[#5B3FFF] transition-colors">Terms of Service</a>
              <a href="/support" className="hover:text-[#5B3FFF] transition-colors">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;