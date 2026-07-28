// import React, { useState, useEffect } from "react";
// import { Link, Outlet, useLocation } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import axios from 'axios'
// import { useNavigate } from "react-router-dom";
// import {server_url} from '../config/url'
// import { 
//   Menu, 
//   LogOut, 
//   LayoutDashboard, 
//   Search, 
//   ClipboardList, 
//   X,
//   Heart,
//   User,
//   ChevronRight,
//   MessageSquare
// } from "lucide-react";


// const NeedyNav = () => {
//   const { pathname } = useLocation();
//   const [open, setOpen] = useState(true);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();


//   const handleLogout = () => {
//     // Clear localStorage or sessionStorage if you're storing token/info
//     localStorage.removeItem("token");  // Adjust if using a different key
//     // You may also want to clear user info
//     // localStorage.removeItem("user");

//     navigate("/login");
//   };
//   const navLinks = [
//     { 
//       name: "Dashboard", 
//       path: "/ndash", 
//       icon: <LayoutDashboard size={18} />,
//     },
//     { 
//       name: "Profile", 
//       path: "/ndash/needyForm", 
//       icon: <ClipboardList size={18} />,
//     },
//     { 
//       name: "Find Medicines", 
//       path: "/ndash/medFinder", 
//       icon: <Search size={18} />,
//     },

//   ];

  
//     const [email, setEmail] = useState("");
//     const [name, setName] = useState("");

//     useEffect(() => {
//       const token = localStorage.getItem("token");

//       if (token) {
//         try {
//           const decoded = jwtDecode(token);
//           const uid = decoded.uid;
//           const type = decoded.usertype;

//           setEmail(uid);
//           axios
//             .get(server_url + "/user/getNameByEmail", {
//               params: { email: uid, type },
//             })
//             .then((res) => {
//               if (res.data.status) {
//                 setName(res.data.name);
//               }
//             })
//             .catch((err) => console.error("Name fetch failed:", err.message));
//         } catch (err) {
//           console.error("Token error:", err.message);
//         }
//       }
//     }, []);


//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Mobile Menu Overlay */}
//       {mobileMenuOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setMobileMenuOpen(false)}
//         />
//       )}

//       {/* Professional Sidebar */}
//       <aside
//         className={`fixed lg:relative inset-y-0 left-0 z-50 transition-all duration-300 bg-white shadow-lg border-r border-gray-200 flex flex-col ${
//           open ? "w-72" : "w-16"
//         } ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
//           <div className="flex items-center gap-3">
//             <button 
//               onClick={() => setOpen(!open)} 
//               className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
//             >
//               <Menu className="w-5 h-5 text-gray-600" />
//             </button>
//             {open && (
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
//                   <Heart className="w-4 h-4 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-lg font-bold text-gray-900">KindHelp</h2>
//                   <p className="text-xs text-gray-500">Patient Portal</p>
//                 </div>
//               </div>
//             )}
//           </div>
//           {open && (
//             <button
//               onClick={() => setMobileMenuOpen(false)}
//               className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
//             >
//               <X className="w-4 h-4 text-gray-600" />
//             </button>
//           )}
//         </div>

//         {/* Navigation Links */}
//         <nav className="flex-1 px-3 py-4 space-y-1">
//           {navLinks.map((link) => {
//             const isActive = pathname === link.path;
//             return (
//               <Link
//                 key={link.name}
//                 to={link.path}
//                 onClick={() => setMobileMenuOpen(false)}
//                 className={`group flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
//                   isActive
//                     ? "bg-emerald-50 text-emerald-700 border-l-4 border-emerald-600"
//                     : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
//                 }`}
//               >
//                 <div className={`p-2 rounded-lg transition-all duration-200 ${
//                   isActive 
//                     ? "bg-emerald-100 text-emerald-600" 
//                     : "bg-gray-100 group-hover:bg-gray-200 text-gray-600"
//                 }`}>
//                   {link.icon}
//                 </div>
                
//                 {open && (
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center justify-between">
//                       <div className="min-w-0">
//                         <p className={`font-medium truncate ${
//                           isActive ? "text-emerald-700" : "text-gray-900"
//                         }`}>
//                           {link.name}
//                         </p>
//                         <p className={`text-sm truncate ${
//                           isActive ? "text-emerald-600" : "text-gray-500"
//                         }`}>
//                           {link.description}
//                         </p>
//                       </div>
//                       {isActive && (
//                         <ChevronRight className="w-4 h-4 text-emerald-600 flex-shrink-0" />
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Bottom Section */}
//         <div className="p-3 border-t border-gray-200 space-y-2 bg-white">
//           {/* User Profile */}
//           {open && (
//             <div className="flex items-center gap-3 px-3 py-3 bg-gray-50 rounded-lg mb-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
//                 <User className="w-5 h-5 text-white" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="font-sm text-gray-900 truncate">{name || "..."}</p>
//                 <p className="text-sm text-gray-500 truncate">{email}</p>
//               </div>
//             </div>
//           )}
          
//           {/* Logout Button */}
//           <button onClick={handleLogout} className={`flex items-center gap-3 w-full px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 ${
//             !open ? "justify-center" : ""
//           }`}>
//             <div className="p-2 bg-red-100 rounded-lg">
//               <LogOut className="w-4 h-4" />
//             </div>
//             {open && (
//               <div className="flex-1 text-left">
//                 <p className="font-medium">Sign Out</p>
//               </div>
//             )}
//           </button>
//         </div>
//       </aside>

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Main Content */}
//         <main className="flex-1 overflow-y-auto bg-gray-50">
//           <div className="h-full">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default NeedyNav;

import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { server_url } from "../config/url";
import { 
  Menu, 
  LogOut, 
  LayoutDashboard, 
  Search, 
  ClipboardList, 
  X,
  Heart,
  User,
  ChevronRight
} from "lucide-react";

const NeedyNav = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinks = [
    { name: "Dashboard", path: "/ndash", icon: <LayoutDashboard size={18} /> },
    { name: "Profile", path: "/ndash/needyForm", icon: <ClipboardList size={18} /> },
    { name: "Find Medicines", path: "/ndash/medFinder", icon: <Search size={18} /> },
  ];

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const uid = decoded.uid;
        const type = decoded.usertype;
        setEmail(uid);
        axios
          .get(server_url + "/user/getNameByEmail", { params: { email: uid, type } })
          .then((res) => {
            if (res.data.status) setName(res.data.name);
          })
          .catch((err) => console.error("Name fetch failed:", err.message));
      } catch (err) {
        console.error("Token error:", err.message);
      }
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-semibold text-gray-900">KindHelp</span>
        </div>
        <div className="w-10" /> {/* spacer */}
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative inset-y-0 left-0 z-50 transition-all duration-300 bg-white shadow-lg border-r border-gray-200 flex flex-col overflow-y-auto
          ${open ? "w-72" : "w-16"}
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            {open && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">KindHelp</h2>
                  <p className="text-xs text-gray-500">Patient Portal</p>
                </div>
              </div>
            )}
          </div>
          {open && (
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Close menu"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`group flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 border-l-4 border-emerald-600"
                    : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                }`}
              >
                <div
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-gray-100 group-hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  {link.icon}
                </div>

                {open && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <p
                          className={`font-medium truncate ${
                            isActive ? "text-emerald-700" : "text-gray-900"
                          }`}
                        >
                          {link.name}
                        </p>
                      </div>
                      {isActive && (
                        <ChevronRight className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-3 border-t border-gray-200 space-y-2 bg-white">
          {open && (
            <div className="flex items-center gap-3 px-3 py-3 bg-gray-50 rounded-lg mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 truncate">{name || "..."}</p>
                <p className="text-xs sm:text-sm text-gray-500 truncate">{email}</p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 ${
              !open ? "justify-center" : ""
            }`}
          >
            <div className="p-2 bg-red-100 rounded-lg">
              <LogOut className="w-4 h-4" />
            </div>
            {open && (
              <div className="flex-1 text-left">
                <p className="font-medium">Sign Out</p>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-gray-50 pt-14 lg:pt-0">
          {/* padding top on mobile so content isn’t hidden under fixed bar */}
          <div className="h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default NeedyNav;
