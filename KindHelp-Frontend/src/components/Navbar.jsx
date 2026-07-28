// import React, { useState, useEffect } from "react";
// import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { pathname } = useLocation();
//   const navg = useNavigate();

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navLinks = [
//     { name: "About", path: "#about" },
//     { name: "Services", path: "#services" },
//     { name: "Blog", path: "#Blog" },
//     { name: "Team", path: "#team" },
//     { name: "Contact", path: "#Footer" },
//   ];

//   const doNavigate = (url) => {
//     navg("/" + url);
//   };

//   return (
//     <>
//       <header
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//           scrolled
//             ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100"
//             : "bg-white/90 backdrop-blur-lg shadow-sm"
//         }`}
//       >
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="flex h-16 items-center justify-between">
//             {/* Brand */}
//             <Link
//               to="/"
//               className="group flex items-center gap-2.5 text-2xl font-black text-gray-900 tracking-tight"
//             >
//               <div className="relative">
//                 <div className="absolute -inset-1 bg-gradient-to-r from-[#5B3FFF] to-[#8B5CF6] rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
//                 <svg
//                   className="relative h-9 w-9 text-[#5B3FFF] group-hover:text-[#472aff] transition-colors duration-200"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M12 2L2 7l10 5 10-5-10-5zm0 6l10 5v6l-10 5-10-5v-6l10-5z" />
//                 </svg>
//               </div>
//               <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-[#5B3FFF] group-hover:to-[#472aff] transition-all duration-200">
//                 KindHelp
//               </span>
//             </Link>

//             {/* Desktop Nav Links */}
//             <nav className="hidden md:flex items-center gap-1">
//               {navLinks.map((link) => (
//                 <a
//                   key={link.name}
//                   href={link.path}
//                   className="group relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-[#5B3FFF]"
//                 >
//                   {link.name}
//                   <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-[#5B3FFF] to-[#8B5CF6] transition-all duration-200 group-hover:w-8 -translate-x-1/2"></span>
//                 </a>
//               ))}
//             </nav>

//             {/* Auth Buttons */}
//             <div className="flex items-center gap-3">
//               <button
//                 className="group relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#5B3FFF] transition-all duration-200 rounded-lg hover:bg-gray-50"
//                 onClick={() => doNavigate("login")}
//               >
//                 Login
//               </button>

//               <button
//                 type="button"
//                 className="group relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5B3FFF] shadow-lg hover:shadow-xl"
//                 onClick={() => doNavigate("signup")}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-[#5B3FFF] to-[#8B5CF6] transition-all duration-200 group-hover:from-[#472aff] group-hover:to-[#7C3AED]"></div>
//                 <div className="absolute inset-0 bg-gradient-to-r from-[#5B3FFF] to-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-sm"></div>
//                 <span className="relative z-10 flex items-center gap-2">
//                   Register
//                   <svg
//                     className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M13 7l5 5m0 0l-5 5m5-5H6"
//                     />
//                   </svg>
//                 </span>
//               </button>

//               {/* Mobile Menu Button */}
//               <button
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                 className="md:hidden p-2 text-gray-700 hover:text-[#5B3FFF] transition-colors duration-200"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d={
//                       mobileMenuOpen
//                         ? "M6 18L18 6M6 6l12 12"
//                         : "M4 6h16M4 12h16M4 18h16"
//                     }
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu */}
//           <div
//             className={`md:hidden overflow-hidden transition-all duration-300 ${
//               mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//             }`}
//           >
//             <div className="py-4 space-y-2 border-t border-gray-100">
//               {navLinks.map((link) => (
//                 <a
//                   key={link.name}
//                   href={link.path}
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-[#5B3FFF] hover:bg-gray-50 rounded-lg transition"
//                 >
//                   {link.name}
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </header>

//       <Outlet />
//     </>
//   );
// };

// export default Navbar;



import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navg = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", section: "about" },
    { name: "Services", section: "services" },
    { name: "Blog", section: "Blog" },
    { name: "Team", section: "team" },
    { name: "Contact", section: "Footer" },
  ];

  const doNavigate = (url) => {
    navg("/" + url);
  };

  const handleNavClick = (sectionId) => {
    if (pathname !== "/") {
      navg(`/?scrollTo=${sectionId}`);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100"
            : "bg-white/90 backdrop-blur-lg shadow-sm"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Brand */}
            <Link
              to="/"
              className="group flex items-center gap-2.5 text-2xl font-black text-gray-900 tracking-tight"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#5B3FFF] to-[#8B5CF6] rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <svg
                  className="relative h-9 w-9 text-[#5B3FFF] group-hover:text-[#472aff] transition-colors duration-200"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zm0 6l10 5v6l-10 5-10-5v-6l10-5z" />
                </svg>
              </div>
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-[#5B3FFF] group-hover:to-[#472aff] transition-all duration-200">
                KindHelp
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.section)}
                  className="group relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-[#5B3FFF]"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-[#5B3FFF] to-[#8B5CF6] transition-all duration-200 group-hover:w-8 -translate-x-1/2"></span>
                </button>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <button
                className="group relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#5B3FFF] transition-all duration-200 rounded-lg hover:bg-gray-50"
                onClick={() => doNavigate("login")}
              >
                Login
              </button>

              <button
                type="button"
                className="group relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5B3FFF] shadow-lg hover:shadow-xl"
                onClick={() => doNavigate("signup")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#5B3FFF] to-[#8B5CF6] transition-all duration-200 group-hover:from-[#472aff] group-hover:to-[#7C3AED]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#5B3FFF] to-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-sm"></div>
                <span className="relative z-10 flex items-center gap-2">
                  Register
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-[#5B3FFF] transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      mobileMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-4 space-y-2 border-t border-gray-100">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.section)}
                  className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-[#5B3FFF] hover:bg-gray-50 rounded-lg transition"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <Outlet />
    </>
  );
};

export default Navbar;
