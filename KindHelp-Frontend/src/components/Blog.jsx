import React, { useState, useEffect, useRef } from "react";
import { BookOpen, Calendar, User, ArrowRight, Heart, TrendingUp } from "lucide-react";

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

const posts = [
  { 
    title: "How Kindness Changes Lives", 
    img: "/kindness-word-written-in-wooden-cube-free-photo.jpg", 
    excerpt: "Discover the journey of a single donation that made a huge difference.",
    author: "Sarah Johnson",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    category: "Impact Stories",
    icon: Heart,
    emoji: "❤️",
    color: "from-[#5B3FFF] to-indigo-600",
    bgGradient: "from-purple-50 to-indigo-50"
  },
  { 
    title: "Top Donor Stories", 
    img: "/abc.jpg", 
    excerpt: "Meet our top donors and learn what inspires them.",
    author: "Dr. Michael Chen",
    date: "Dec 10, 2024",
    readTime: "7 min read",
    category: "Community",
    icon: TrendingUp,
    emoji: "🌟",
    color: "from-indigo-500 to-blue-600",
    bgGradient: "from-indigo-50 to-blue-50"
  },
  { 
    title: "How to Get Help", 
    img: "/support.jpg", 
    excerpt: "A guide for recipients to register and request items.",
    author: "Emma Rodriguez",
    date: "Dec 5, 2024",
    readTime: "4 min read",
    category: "Guide",
    icon: BookOpen,
    emoji: "📖",
    color: "from-blue-500 to-[#5B3FFF]",
    bgGradient: "from-blue-50 to-purple-50"
  },
];

const Blog = () => {
  const [blogRef, blogInView] = useInView({ once: true });

  return (
    <section id="Blog" ref={blogRef} className="py-32 px-6 md:px-20 bg-gradient-to-br from-[#f3f0ff] to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-purple-100 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-indigo-100 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-100 rounded-full opacity-40 animate-ping"></div>
      
      <div className={`text-center mb-20 transform transition-all duration-700 ${blogInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="flex items-center justify-center gap-2 mb-4">
          <BookOpen className="w-6 h-6 text-[#5B3FFF] animate-pulse" />
          <span className="text-[#5B3FFF] font-medium">Stories & Insights</span>
        </div>
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#5B3FFF] to-[#a18aff] drop-shadow-xl">
          From Our Blog
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
          Stories and updates to inspire you on your journey of giving and receiving.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-3 max-w-7xl mx-auto relative z-10">
        {posts.map((post, i) => (
          <div
            key={i}
            className={`group relative bg-gradient-to-br ${post.bgGradient} rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 backdrop-blur-sm ${blogInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionDelay: `${i * 200}ms` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${post.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
            
            {/* Image container with overlay */}
            <div className="relative overflow-hidden">
              <img 
                src={post.img} 
                alt={post.title} 
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Category badge */}
              <div className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${post.color} text-white text-xs font-semibold rounded-full shadow-lg`}>
                {post.category}
              </div>
              
              {/* Icon with emoji */}
              <div className="absolute top-4 right-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${post.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <post.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-xl absolute -top-1 -right-1 animate-bounce">{post.emoji}</div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 relative z-10">
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#5B3FFF] transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                {post.excerpt}
              </p>
              
              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {post.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </div>
                <span>{post.readTime}</span>
              </div>

              {/* Read more button */}
              <button className="group/btn flex items-center gap-2 text-[#5B3FFF] font-semibold hover:text-indigo-600 transition-colors">
                Read More
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-16 w-8 h-8 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity delay-200"></div>
          </div>
        ))}
      </div>

    
    </section>
  );
};

export default Blog;