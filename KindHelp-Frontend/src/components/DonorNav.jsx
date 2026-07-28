

// import React, { useState, useEffect } from "react";
// import { Link, Outlet, useLocation } from "react-router-dom";
// import { 
//   Menu, 
//   LogOut, 
//   LayoutDashboard, 
//   ClipboardList, 
//   PlusCircle, 
//   X,
//   Heart,
//   User,
//   ChevronRight
// } from "lucide-react";

// import { jwtDecode } from "jwt-decode";
// import {server_url} from '../config/url'
// import { useNavigate } from "react-router-dom";
// import axios from 'axios'


// const DonorNav = () => {
//   const { pathname } = useLocation();
//   const [open, setOpen] = useState(true);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const navigate = useNavigate();
//   const navLinks = [
//     { 
//       name: "Dashboard", 
//       path: "/ddash", 
//       icon: <LayoutDashboard size={18} />,
//     },
//     { 
//       name: "Donor Registration", 
//       path: "/ddash/donorForm", 
//       icon: <Heart size={18} />,
      
//     },
//     { 
//       name: "Donate Medicine",
//       path: "/ddash/AvailMed",
//       icon: <PlusCircle size={18} />, 
      
//     },
//     { 
//       name: "My Donations", 
//       path: "/ddash/donorMedList", 
//       icon: <ClipboardList size={18} />,
//     },
//   ];

//   // Inside DonorNav component
//   const handleLogout = () => {
//     // Clear localStorage or sessionStorage if you're storing token/info
//     localStorage.removeItem("token");  // Adjust if using a different key
//     // You may also want to clear user info
//     // localStorage.removeItem("user");

//     navigate("/login");
//   };

//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         const uid = decoded.uid;
//         const type = decoded.usertype;

//         setEmail(uid);
//         axios
//           .get(server_url + "/user/getNameByEmail", {
//             params: { email: uid, type },
//           })
//           .then((res) => {
//             if (res.data.status) {
//               setName(res.data.name);
//             }
//           })
//           .catch((err) => console.error("Name fetch failed:", err.message));
//       } catch (err) {
//         console.error("Token error:", err.message);
//       }
//     }
//   }, []);



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
//                 <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//                   <Heart className="w-4 h-4 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-lg font-bold text-gray-900">KindHelp</h2>
//                   <p className="text-xs text-gray-500">Donor Portal</p>
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
//                     ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
//                     : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
//                 }`}
//               >
//                 <div className={`p-2 rounded-lg transition-all duration-200 ${
//                   isActive 
//                     ? "bg-blue-100 text-blue-600" 
//                     : "bg-gray-100 group-hover:bg-gray-200 text-gray-600"
//                 }`}>
//                   {link.icon}
//                 </div>
                
//                 {open && (
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center justify-between">
//                       <div className="min-w-0">
//                         <p className={`font-medium truncate ${
//                           isActive ? "text-blue-700" : "text-gray-900"
//                         }`}>
//                           {link.name}
//                         </p>
//                         <p className={`text-sm truncate ${
//                           isActive ? "text-blue-600" : "text-gray-500"
//                         }`}>
//                           {link.description}
//                         </p>
//                       </div>
//                       {isActive && (
//                         <ChevronRight className="w-4 h-4 text-blue-600 flex-shrink-0" />
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
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
//                 <User className="w-5 h-5 text-white" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="font-sm text-gray-900 truncate">{name || "..."}</p>
//                 <h2 className="text-lg font-semibold text-gray-600">{email}</h2>
//               </div>
//             </div>
//           )}
          
//           {/* Logout Button */}
//           <button onClick={handleLogout} className={`flex items-center gap-3 w-full px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 ${
//             !open ? "justify-center" : ""
//           }`} >
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

// export default DonorNav;

import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  Menu, 
  LogOut, 
  LayoutDashboard, 
  ClipboardList, 
  PlusCircle, 
  X,
  Heart,
  User,
  ChevronRight
} from "lucide-react";

import { jwtDecode } from "jwt-decode";
import {server_url} from '../config/url'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const DonorNav = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const navLinks = [
    { name: "Dashboard", path: "/ddash", icon: <LayoutDashboard size={18} /> },
    { name: "Donor Registration", path: "/ddash/donorForm", icon: <Heart size={18} /> },
    { name: "Donate Medicine", path: "/ddash/AvailMed", icon: <PlusCircle size={18} /> },
    { name: "My Donations", path: "/ddash/donorMedList", icon: <ClipboardList size={18} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
      {/* Mobile top bar (hamburger) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-semibold text-gray-900">KindHelp</span>
        </div>
        {/* Right spacer to balance layout */}
        <div className="w-10" />
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
              aria-label="Toggle collapse"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            {open && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">KindHelp</h2>
                  <p className="text-xs text-gray-500">Donor Portal</p>
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
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                    : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                }`}
              >
                <div
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
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
                            isActive ? "text-blue-700" : "text-gray-900"
                          }`}
                        >
                          {link.name}
                        </p>
                        <p
                          className={`text-sm truncate ${
                            isActive ? "text-blue-600" : "text-gray-500"
                          }`}
                        >
                          {link.description}
                        </p>
                      </div>
                      {isActive && (
                        <ChevronRight className="w-4 h-4 text-blue-600 flex-shrink-0" />
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
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 truncate">{name || "..."}</p>
                <h2 className="text-xs sm:text-sm lg:text-lg font-semibold text-gray-600 truncate">{email}</h2>
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
          {/* top padding on mobile so content clears the fixed top bar */}
          <div className="h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DonorNav;
