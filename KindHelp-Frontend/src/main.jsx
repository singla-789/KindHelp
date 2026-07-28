import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.jsx'

import Navbar from './components/Navbar.jsx'
import Login from './components/Login.jsx';
// import CTA from './components/CTA.jsx';
import Signup from './components/Signup.jsx';
import DonorForm from './components/DonorForm.jsx';
import AvailMed from './components/AvailMed.jsx';
import NeedyForm from './components/NeedyForm.jsx';
import DonorMedicineList from './components/DonorMedList.jsx';
import MedFinder from './components/MedFinder.jsx';
import DonorNav from './components/DonorNav.jsx';
import DonorDash from './components/DonorDash.jsx';
import NeedyNav from './components/NeedyNav.jsx';
import NeedyDash from './components/NeedyDash.jsx';
// import About from './components/About.jsx';
import Home from './components/Home.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>

        <Route path="/" element={<Navbar />} >
          <Route index element={<Home />}></Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup/>} />
          
        </Route>
        
        <Route path='/ddash' element={<DonorNav/>} >
          <Route index element={<DonorDash/>}></Route>
          <Route path="donorForm" element={<DonorForm />}  />
          <Route path="AvailMed" element={<AvailMed />} />
          <Route path="donorMedList" element={<DonorMedicineList />} />
        </Route>

        
        <Route path='/ndash' element={<NeedyNav />} >
          <Route index element={<NeedyDash/>}></Route>
          <Route path="needyForm" element={<NeedyForm />} />          
          <Route path="medFinder" element={<MedFinder />} />
        </Route>
        
      </Routes>

    </Router>
    
  </React.StrictMode>,
)
