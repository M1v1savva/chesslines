import { React, useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import { sendLoginRequest } from './../classes/AccountServerRequests.js'
import './../index.css'
import './styles/Login.css'

function Login({ setToken }) {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
        alert: false,
        alert_message: ''
    })
    const navigate = useNavigate()
    
    const handleSignIn = async(event) => {
        const res = await sendLoginRequest(loginForm)
        if (res.status == 401) {
            const loginCopy = {...loginForm}
            loginCopy.alert = true
            loginCopy.alert_message = 'Wrong username or password.'
            setLoginForm(loginCopy)
        } else if (res.status == 200) {
            setToken(res.token)
            setLoginForm({email: '', password: '', alert: false, alert_message: ''})
            navigate('/learn')
        } else {
            setLoginForm({email: '', password: '', alert: true, alert_message: 'Unexpected website error.'})
        }
        event.preventDefault()
    }

    const handleChange = (event) => { 
        const {value, name} = event.target
        setLoginForm(prevNote => ({
            ...prevNote, [name]: value})
        )
    }

    return (
        <div className='main-body'>
            <div className='about-text'>
            <div className='login-form'>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control onChange={handleChange} name='email' value={loginForm.email} type="text" placeholder="Enter username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={handleChange} name='password' value={loginForm.password} type="password" placeholder="Password" />
            </Form.Group>
            { loginForm.alert == true ? 
            <Alert className='alert' variant='danger'>{loginForm.alert_message}</Alert> : <div/>}
            </Form>
            <Button className='signin-button' variant="info" type="submit" onClick={handleSignIn}>
                Sign in
            </Button>
            </div>
            </div>
        </div>
    )
}

export default Login