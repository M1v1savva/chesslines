import { React, useState, useEffect} from 'react'
import './../index.css'
import useToken from './../components/useToken'
import axios from "axios"

function Profile() {
    const [loginForm, setLogin] = useState("")
    const [passwordForm, setPassword] = useState("")

    const handleLogin = (event) => {
        setLogin(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const [currentTime, setCurrentTime] = useState(0)

    useEffect(() => {
        fetch("http://localhost:5000/time")
        .then(res => res.json())
        .then(data => setCurrentTime(data.time))
      },[])

    const { token, removeToken, setToken } = useToken()

    function logMeIn(event) {
       const res = axios({
            method: "POST",
            url:"http://localhost:5000/login",
            data:{
              email: loginForm,
              password: passwordForm
            }
        })
        .catch((error) => {
            if (error.response) {
              console.log(error.response)
              console.log(error.response.status)
              console.log(error.response.headers)
            }  
            event.preventDefault()
            return 
        })
        .then((response) => {
            setToken(response.data.access_token)
        })
        setLogin("")
        setPassword("")

        event.preventDefault()
    }

    function regMeIn(event) {
        const res = axios({
             method: "POST",
             url:"http://localhost:5000/register",
             data:{
               email: loginForm,
               password: passwordForm
             }
         })
         .catch((error) => {
             if (error.response) {
               console.log(error.response)
               console.log(error.response.status)
               console.log(error.response.headers)
             }  
             event.preventDefault()
             return 
         })
         setLogin("")
         setPassword("")
 
         event.preventDefault()
     }
    
    function logMeOut(event) {
        removeToken()

        event.preventDefault()
    }

    return (
        <div className='main-body'>
            <div className='about-text'>
                <h1>Your profile. </h1>
                <h4>Login</h4>
                <input value={loginForm} onChange={handleLogin}/>
                <h4>Password</h4>
                <input value={passwordForm} onChange={handlePassword}/>
                <button onClick={logMeIn}>sign in</button>
                <button onClick={regMeIn}>sign up</button>
                <h1>Current time is {currentTime}.</h1>
                {!token && token!=="" &&token!== undefined ? (
                    <p>You have not logged in yet</p>
                ) : ( 
                    <p>You have logged in!</p>
                )}
                <button onClick={logMeOut}>Log out</button>
            </div>
        </div>
    )
}

export default Profile