import axios from "./../axios.js"

const SIGN_IN_URL = process.env.REACT_APP_SIGN_IN_URL
const SIGN_UP_URL = process.env.REACT_APP_SIGN_UP_URL
const LOG_OUT_URL = process.env.REACT_APP_LOG_OUT_URL

const sendLoginRequest = async(loginForm) => {
    try {
        const res = await axios.post(SIGN_IN_URL, {
            'email': loginForm.email,
            'password': loginForm.password,
        })
        return {"status": 200, "token": res.data.access_token}
    } catch(error) {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            return {"status": error.response.status}
        }
        return {"status": "unknown"}
    }
}

const sendSignupRequest = async(signupForm) => {
    try {
        const res = await axios.post(SIGN_UP_URL, {
            'email': signupForm.email,
            'password': signupForm.password1,
        })
        return {"status": 200, "token": res.data.access_token}
    } catch(error) {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            return {"status": error.response.status}
        }
        return {"status": "unknown"}
    }
}

const sendLogoutRequest = async() => {
    try {
        const res = await axios.post(LOG_OUT_URL, {

        })
        return {"status": 200}
    } catch (error) {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            return {"status": error.response.status}
        }
        return {"status": "unknown"}
    }
}

export { sendLoginRequest, sendSignupRequest, sendLogoutRequest }