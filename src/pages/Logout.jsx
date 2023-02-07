import { React, useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { sendLogoutRequest } from './../classes/AccountServerRequests.js'
import './../index.css'
import './Logout.css'

function Logout({removeToken}) {

    const navigate = useNavigate()

    const logoutPressed = (event) => {
        handleLogout(event, removeToken)
    }

    const handleLogout = async(event, removeToken) => {
        const res = await sendLogoutRequest()
        removeToken()
        event.preventDefault()
        navigate('/login')
    }

    return (
        <div className='main-body'>
            <div className='about-text'>
            <div className='logout-form'>
            <p>Are you sure you want to log out?</p>
            <Button className='logout-button' variant="danger" type="submit" onClick={logoutPressed}>
                Log out
            </Button>
            </div>
            </div>
        </div>
    )
}

export default Logout