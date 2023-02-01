import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./pages/Layout"
import Home from "./pages/Home"
import About from "./pages/About"
import Train from "./pages/Train"
import Learn from "./pages/Learn"
import Contact from "./pages/Contact"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Logout from "./pages/Logout"
import './index.css'

import useToken from './components/useToken'

export default function App() {
    const { token, removeToken, setToken } = useToken()
    
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout token={token}/>}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="profile" element={<Profile />} />
            <Route path="contact" element={<Contact />} />
            <Route path="train" element={<Train />} />
            <Route path="learn" element={<Learn token={token}/>} />
            <Route path="login" element={<Login setToken={setToken}/>} />
            <Route path="signup" element={<Signup setToken={setToken}/>} />
            <Route path="logout" element={<Logout removeToken={removeToken}/>} />
            <Route path='*' element={<Navigate to='/'/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }
  