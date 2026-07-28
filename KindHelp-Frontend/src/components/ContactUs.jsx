import React, { useState, useEffect, useRef } from "react";
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Heart, 
  Clock,
  CheckCircle,
  User,
  MessageSquare
} from "lucide-react";

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

const ContactUs = () => {
  const [contactRef, contactInView] = useInView({ once: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "contact@kindhelp.com",
      subtext: "We'll respond within 24 hours",
      color: "from-[#5B3FFF] to-indigo-600",
      bgGradient: "from-purple-50 to-indigo-50",
      emoji: "📧"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+91 9878369000",
      subtext: "Available Mon-Fri, 9AM-6PM",
      color: "from-indigo-500 to-blue-600",
      bgGradient: "from-indigo-50 to-blue-50",
      emoji: "📞"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Bathinda, Punjab",
      subtext: "Schedule an appointment",
      color: "from-blue-500 to-[#5B3FFF]",
      bgGradient: "from-blue-50 to-purple-50",
      emoji: "📍"
    }
  ];

  return (
    <section ref={contactRef} className="py-32 px-6 md:px-20 bg-gradient-to-br from-gray-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-purple-100 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-indigo-100 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-100 rounded-full opacity-40 animate-ping"></div>

      <div className={`text-center mb-20 transform transition-all duration-700 ${contactInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="flex items-center justify-center gap-2 mb-4">
          <MessageCircle className="w-6 h-6 text-[#5B3FFF] animate-pulse" />
          <span className="text-[#5B3FFF] font-medium">Connect With Us</span>
        </div>
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#5B3FFF] to-[#a18aff] drop-shadow-xl">
          Get in Touch
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
          Have questions or want to partner with us? We're here to help make healthcare accessible for everyone.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-2">
          
          {/* Contact Form */}
          <div className={`transform transition-all duration-700 delay-200 ${contactInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden border border-white/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 opacity-50"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#5B3FFF] to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Send Message</h3>
                    <p className="text-gray-600 text-sm">We'd love to hear from you</p>
                  </div>
                </div>

                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 font-medium">Message sent successfully! We'll get back to you soon.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-1" />
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#5B3FFF] focus:border-transparent outline-none transition-all duration-300 group-hover:border-[#5B3FFF]"
                        required
                      />
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-1" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#5B3FFF] focus:border-transparent outline-none transition-all duration-300 group-hover:border-[#5B3FFF]"
                        required
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-1" />
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#5B3FFF] focus:border-transparent outline-none transition-all duration-300 group-hover:border-[#5B3FFF]"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MessageCircle className="w-4 h-4 inline mr-1" />
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help you..."
                      rows="6"
                      className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#5B3FFF] focus:border-transparent outline-none transition-all duration-300 group-hover:border-[#5B3FFF] resize-none"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#5B3FFF] to-indigo-600 hover:from-[#472aff] hover:to-indigo-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className={`space-y-8 transform transition-all duration-700 delay-400 ${contactInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Let's Start a Conversation</h3>
              <p className="text-gray-600">
                We're here to answer your questions and help you make a difference in someone's life.
              </p>
            </div>

            {contactInfo.map((info, i) => (
              <div
                key={i}
                className={`group relative bg-gradient-to-br ${info.bgGradient} p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 backdrop-blur-sm`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
                
                <div className="relative z-10 flex items-start gap-4">
                  <div className="relative">
                    <div className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-2xl absolute -top-1 -right-1 animate-bounce">{info.emoji}</div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#5B3FFF] transition-colors">
                      {info.title}
                    </h4>
                    <p className="text-lg text-gray-700 font-semibold mb-1">{info.content}</p>
                    <p className="text-sm text-gray-600">{info.subtext}</p>
                  </div>
                </div>

                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity"></div>
              </div>
            ))}

            {/* Additional CTA */}
            
          </div>
        </div>
      </div>

      {/* Response Time Info */}
      <div className={`text-center mt-16 transform transition-all duration-700 delay-800 ${contactInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#5B3FFF]" />
              <span className="font-medium">Response Time: 24 hours</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium">99% Customer Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;