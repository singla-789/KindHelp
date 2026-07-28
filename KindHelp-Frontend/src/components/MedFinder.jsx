
// import React, { useState } from "react";
// import axios from "axios";
// import {server_url} from '../config/url'

// const MedFinder = () => {
//   const [city, setCity] = useState("");
//   const [medName, setMedName] = useState("");
//   const [results, setResults] = useState([]);

//   const handleFind = async () => {
//     if (!city || !medName) return alert("Please enter both fields");

//     try {
//       const res = await axios.post(server_url + "/needy/med-finder", {
//         city,
//         medName,
//       });
//       setResults(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch data");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-6">
//       <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-3xl p-10">
//         <h2 className="text-3xl font-bold text-center text-emerald-600 mb-10">
//           Find Available Medicines
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
//           <input
//             type="text"
//             value={medName}
//             onChange={(e) => setMedName(e.target.value)}
//             placeholder="Enter Medicine Name"
//             className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
//           />

//           <input
//             type="text"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             placeholder="Enter City"
//             className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
//           />

//           <button
//             onClick={handleFind}
//             className="bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-emerald-700 transition"
//           >
//             Search
//           </button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {results.length === 0 ? (
//             <p className="col-span-full text-center text-gray-600">
//               No results found.
//             </p>
//           ) : (
//             results.map((med, index) => (
//               <div
//                 key={index}
//                 className="bg-white border border-gray-200 rounded-xl shadow p-6 hover:shadow-lg transition"
//               >
//                 <h3 className="text-lg font-semibold text-emerald-600 mb-2">
//                   {med.medName}
//                 </h3>
//                 <p className="text-gray-700 mb-1">
//                   <span className="font-medium">Email:</span> {med.emailid}
//                 </p>
//                 <p className="text-gray-700 mb-1">
//                   <span className="font-medium">Quantity:</span> {med.qty}
//                 </p>
//                 <p className="text-gray-700 mb-1">
//                   <span className="font-medium">Packaging:</span> {med.packing}
//                 </p>
//                 <p className="text-gray-700 mb-1">
//                   <span className="font-medium">Expiry Date:</span>{" "}
//                   {new Date(med.expdate).toLocaleDateString("en-GB", {
//                     day: "2-digit",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </p>
//                 <p className="text-gray-700">
//                   <span className="font-medium">Company:</span> {med.company}
//                 </p>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedFinder;

import React, { useState } from "react";
import axios from "axios";
import { server_url } from '../config/url';

const MedFinder = () => {
  const [city, setCity] = useState("");
  const [medName, setMedName] = useState("");
  const [results, setResults] = useState([]);
  const [loadingContact, setLoadingContact] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleFind = async () => {
    if (!city || !medName) return alert("Please enter both fields");

    try {
      const res = await axios.post(server_url + "/needy/med-finder", {
        city,
        medName,
      });
      setResults(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch data");
    }
  };

  const handleCallNow = async (medicineId, emailid, medicineName) => {
    setLoadingContact(medicineId);
    
    try {
      const res = await axios.get(server_url + `/needy/contact-details/${emailid}`);
      const contactData = res.data;
      
      // Set contact data for modal
      setSelectedContact({
        ...contactData,
        medicineName,
        email: contactData.email || emailid
      });
      setShowModal(true);
      
    } catch (err) {
      console.error('Error fetching contact details:', err);
      // You can replace this alert with a toast notification
      alert('Failed to fetch contact details. Please try again.');
    } finally {
      setLoadingContact(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedContact(null);
  };

  const initiateCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const sendEmail = (email) => {
    window.location.href = `mailto:${email}?subject=Inquiry about ${selectedContact?.medicineName}`;
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      // You can replace this with a toast notification
      alert(`${type} copied to clipboard!`);
    });
  };

  const getExpiryStatus = (expdate) => {
    const today = new Date();
    const expiryDate = new Date(expdate);
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { status: 'expired', color: 'bg-red-500', text: 'EXPIRED', textColor: 'text-red-600' };
    if (diffDays <= 30) return { status: 'expiring', color: 'bg-orange-500', text: `${diffDays}D LEFT`, textColor: 'text-orange-600' };
    return { status: 'fresh', color: 'bg-green-500', text: 'FRESH', textColor: 'text-green-600' };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-3xl p-10">
        <h2 className="text-3xl font-bold text-center text-emerald-600 mb-10">
          Find Available Medicines
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <input
            type="text"
            value={medName}
            onChange={(e) => setMedName(e.target.value)}
            placeholder="Enter Medicine Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button
            onClick={handleFind}
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-emerald-700 transition"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.length === 0 ? (
            <p className="col-span-full text-center text-gray-600 py-12 text-lg">
              No results found.
            </p>
          ) : (
            results.map((med, index) => {
              const expiryInfo = getExpiryStatus(med.expdate);
              return (
                <div
                  key={index}
                  className="relative bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`${expiryInfo.color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                      {expiryInfo.text}
                    </span>
                  </div>

                  {/* Medicine Header */}
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 border-b border-emerald-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-4">
                        <h3 className="text-xl font-bold text-emerald-800 mb-2 leading-tight">
                          Company
                          {med.medName}
                        </h3>
                        <div className="flex items-center text-emerald-600 text-sm font-medium">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                          {med.company}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Medicine Details */}
                  <div className="p-6 space-y-4">
                    {/* Quantity and Packing */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                        <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                          Quantity
                        </div>
                        <div className="text-lg font-bold text-blue-800">
                          {med.qty}
                        </div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                        <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">
                          Packing
                        </div>
                        <div className="text-sm font-bold text-purple-800">
                          {med.packing}
                        </div>
                      </div>
                    </div>

                    {/* Expiry Date */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                            Expiry Date
                          </div>
                          <div className="text-sm font-bold text-gray-800">
                            {new Date(med.expdate).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                        <div className={`text-2xl ${expiryInfo.textColor}`}>
                          {expiryInfo.status === 'expired' ? '⚠️' : 
                           expiryInfo.status === 'expiring' ? '⏰' : '✅'}
                        </div>
                      </div>
                    </div>

                    {/* Contact Email */}
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                        Contact Email
                      </div>
                      <div className="text-sm text-slate-700 font-medium break-all">
                        {med.emailid}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="p-6 pt-0">
                    <button
                      onClick={() => handleCallNow(index, med.emailid, med.medName)}
                      disabled={loadingContact === index}
                      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {loadingContact === index ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Getting Contact...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                          Call Now
                        </div>
                      )}
                    </button>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-600/0 group-hover:from-emerald-500/5 group-hover:to-emerald-600/5 transition-all duration-300 pointer-events-none rounded-2xl"></div>
                </div>
              );
            })
          )}
        </div>

        {/* Enhanced Contact Modal with Transparent Background */}
        {showModal && selectedContact && (
          <div 
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)', // Very light transparent overlay
              backdropFilter: 'blur(2px)', // Minimal blur to maintain visibility
              WebkitBackdropFilter: 'blur(2px)'
            }}
            onClick={closeModal} // Close modal when clicking outside
          >
            <div 
              className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/20"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-emerald-600/95 to-emerald-700/95 backdrop-blur-sm text-white p-6 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">Contact Details</h3>
                    <p className="text-emerald-100 text-sm mt-1">{selectedContact.medicineName}</p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-white hover:text-emerald-200 transition-colors p-1 rounded-full hover:bg-white/10"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                {/* Name */}
                <div className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-600 mb-1">Name</p>
                      <p className="text-lg font-bold text-gray-800">{selectedContact.name || 'N/A'}</p>
                    </div>
                    <div className="text-2xl">👤</div>
                  </div>
                </div>

                {/* Phone */}
                {selectedContact.phone && (
                  <div className="bg-green-50/80 backdrop-blur-sm rounded-xl p-4 border border-green-200/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-green-600 mb-1">Phone Number</p>
                        <p className="text-lg font-bold text-green-800">{selectedContact.phone}</p>
                      </div>
                      <div className="text-2xl">📞</div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => initiateCall(selectedContact.phone)}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                      >
                        📞 Call Now
                      </button>
                      <button
                        onClick={() => copyToClipboard(selectedContact.phone, 'Phone number')}
                        className="bg-green-100 text-green-700 py-2 px-4 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        📋
                      </button>
                    </div>
                  </div>
                )}

                {/* Email */}
                <div className="bg-blue-50/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-blue-600 mb-1">Email Address</p>
                      <p className="text-sm font-bold text-blue-800 break-all">{selectedContact.email}</p>
                    </div>
                    <div className="text-2xl">📧</div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => sendEmail(selectedContact.email)}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      📧 Send Email
                    </button>
                    <button
                      onClick={() => copyToClipboard(selectedContact.email, 'Email')}
                      className="bg-blue-100 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      📋
                    </button>
                  </div>
                </div>

                {/* Address */}
                {selectedContact.address && (
                  <div className="bg-purple-50/80 backdrop-blur-sm rounded-xl p-4 border border-purple-200/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-purple-600 mb-1">Address</p>
                        <p className="text-sm font-bold text-purple-800">{selectedContact.address}</p>
                      </div>
                      <div className="text-2xl">📍</div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(selectedContact.address, 'Address')}
                      className="w-full bg-purple-100 text-purple-700 py-2 px-4 rounded-lg hover:bg-purple-200 transition-colors font-semibold"
                    >
                      📋 Copy Address
                    </button>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 pt-0">
                <button
                  onClick={closeModal}
                  className="w-full bg-gray-200/80 backdrop-blur-sm text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-300/80 transition-colors font-semibold border border-gray-300/50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedFinder;