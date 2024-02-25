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
import { BeatLoader } from 'react-spinners'
import { useState, useEffect} from 'react'
import { requestConfirmation } from './classes/AccountServerRequests'
import ReactSpoiler from 'react-spoiler'
import './index.css'
import './Loading.css'

import useToken from './components/useToken'

export default function App() {
    const { token, removeToken, setToken } = useToken()
    const [ flag, setFlag] = useState(false)

    useEffect(() => {
        async function fetchData() {
          const res = await requestConfirmation();
          const p = (res.status == 200)
          const flagCopy = flag ^ p
          setFlag(flagCopy)
        }
        fetchData()
    }, [])
    
    if (!flag) {
      return (
        <div className="bar-body">
          <BeatLoader color='white' className='bar-loader'/>
          <p className='loader-text'>This website is run on a free hosting. The servers will take approximately 45 seconds to boot up. </p>
        </div>
      )
    } else {
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
  }
  