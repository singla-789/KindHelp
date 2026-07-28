import React, { useState, useEffect, useRef } from 'react';
import { Users, Award, Code, Heart } from 'lucide-react';

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

const MeetTheTeam = () => {
  const [teamRef, teamInView] = useInView({ once: true });

  const teamMembers = [
    
    {
      name: "Premal Goyal",
      role: "Lead Developer", 
      category: "Developed By",
      image: "/avi.png", // Replace with your actual image path
      bgGradient: "from-indigo-50 to-blue-50",
      borderColor: "border-indigo-200",
      roleColor: "text-indigo-600",
      icon: Code
    }
  ];

  return (
    <section ref={teamRef} className="py-20 px-6 md:px-20 bg-white relative overflow-hidden" id="team">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-purple-100 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-indigo-100 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-100 rounded-full opacity-40 animate-ping"></div>

      {/* Header */}
      <div className={`text-center mb-20 transform transition-all duration-700 ${teamInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>        
        <div className="flex items-center justify-center gap-2 mb-4">
          <Users className="w-6 h-6 text-[#5B3FFF] animate-pulse" />
          <span className="text-[#5B3FFF] font-medium">Our Amazing Team</span>
        </div>
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#5B3FFF] to-[#a18aff] drop-shadow-xl">
          Meet The Team
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
          The passionate individuals behind KindHelp who make medical aid accessible to everyone.
        </p>
      </div>

      {/* Team Members Grid */}
      <div className="grid gap-0 md:grid-cols-2 max-w-5xl mx-auto relative z-10 ">
        {teamMembers.map((member, i) => (
          <div
            key={i}
            className={`group relative bg-gradient-to-br ${member.bgGradient} p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 ${member.borderColor} backdrop-blur-sm ${teamInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionDelay: `${i * 300}ms` }}
          >
            {/* Decorative border pattern */}
            <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-gray-300 opacity-20 m-4"></div>
            
            {/* Category Label */}
            <div className="text-center mb-6">
              <span className="text-gray-500 text-sm font-medium tracking-wide uppercase">
                {member.category}
              </span>
            </div>

            {/* Profile Image */}
            <div className="relative mb-6 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Icon badge */}
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-[#5B3FFF] to-indigo-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <member.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Member Info */}
            <div className="text-center relative z-10">
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#5B3FFF] transition-colors">
                {member.name}
              </h3>
              <p className={`${member.roleColor} font-semibold text-base mb-4`}>
                {member.role}
              </p>
              
              {/* Decorative line */}
              <div className="w-16 h-1 bg-gradient-to-r from-[#5B3FFF] to-indigo-600 rounded-full mx-auto opacity-70 group-hover:opacity-100 group-hover:w-24 transition-all duration-300"></div>
            </div>

            {/* Hover effects */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity delay-200"></div>
          </div>
        ))}
      </div>

      {/* Bottom CTA Section */}
      <div className={`text-center mt-20 transform transition-all duration-700 delay-600 ${teamInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="bg-gradient-to-r from-[#5B3FFF] to-indigo-600 p-8 rounded-2xl shadow-xl max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-16 h-16 border border-white rounded-full animate-spin"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 border border-white rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white rounded-full animate-pulse"></div>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-white animate-pulse" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Together We Make a Difference
            </h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Our dedicated team works tirelessly to ensure that no one goes without essential medicines. Join us in this noble mission.
            </p>
            <button className="px-8 py-3 bg-white text-[#5B3FFF] font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Join Our Mission
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;