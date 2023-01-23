import React, { StrictMode } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Train from "./pages/Train";
import Learn from "./pages/Learn";
import Support from "./pages/Support";
import Profile from "./pages/Profile";
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="profile" element={<Profile />} />
          <Route path="support" element={<Support />} />
          <Route path="train" element={<Train />} />
          <Route path="learn" element={<Learn />} />
          <Route path='*' element={<Navigate to='/'/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
  <App />
  </StrictMode>
);