import { React, useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import { sendSignupRequest } from './../classes/AccountServerRequests.js'
import './../index.css'
import './Signup.css'

function Signup({setToken}) {
    const [signupForm, setSignupForm] = useState({
        email: '',
        password1: '',
        password2: '',
        alert: false,
        alert_message: ''
    })
    const navigate = useNavigate()

    const handleSignUp = async(event) => {
        if (signupForm.password1 !== signupForm.password2) {
            const signupCopy = {...signupForm}
            signupCopy.alert = true
            signupCopy.alert_message = 'Passwords don\'t match each other.'
            setSignupForm(signupCopy)
            event.preventDefault()
            return
        }

        const res = await sendSignupRequest(signupForm)
        if (res.status == 409) {
            const signupCopy = {...signupForm}
            signupCopy.alert = true
            signupCopy.alert_message = 'User already exists.'
            setSignupForm(signupCopy)
        } else if (res.status == 200) {
            setToken(res.token)
            setSignupForm({email: '', password1: '', password2: '', alert: false, alert_message: ''})
            navigate('/learn')
        } else {
            setSignupForm({email: '', password1: '', password2: '', alert: true, alert_message: 'Unexpected website error.'})
        }
        event.preventDefault()
    }

    const handleChange = (event) => { 
        const {value, name} = event.target
        setSignupForm(prevNote => ({
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
                <Form.Control onChange={handleChange} name='email' value={signupForm.email} type="text" placeholder="Enter username" />
                {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text> */}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={handleChange} name='password1' value={signupForm.password1} type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Repeat password</Form.Label>
                <Form.Control onChange={handleChange} name='password2' value={signupForm.password2} type="password" placeholder="Password" />
            </Form.Group>
            { signupForm.alert == true ? 
            <Alert className='alert' variant='danger'>{signupForm.alert_message}</Alert> : <div/>}
            </Form>
            <Button className='signin-button' variant="success" type="submit" onClick={handleSignUp}>
                Sign up
            </Button>
            </div>
            </div>
        </div>
    )
}

export default Signup