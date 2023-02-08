import axios from "./../axios.js"

const UPDATE_COMMENT_URL = process.env.REACT_APP_UPDATE_COMMENT_URL;
const UPDATE_MOVE_URL = process.env.REACT_APP_UPDATE_MOVE_URL;
const GET_COMMENT_URL = process.env.REACT_APP_GET_COMMENT_URL;
const GET_MOVE_URL = process.env.REACT_APP_GET_MOVE_URL;

const sendCommentRequest = async(position, comment, token) => {
    try {
        const res = await axios.post(UPDATE_COMMENT_URL, {
            position,
            comment,
        }, {headers: {Authorization: `Bearer ${token}`}})
    } catch(error) {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        }  
    }
}

const sendMovesRequest = async(move_sequence, token) => {
    try {
        const res = await axios.post(UPDATE_MOVE_URL, {
            move_sequence,
        }, {headers: {Authorization: `Bearer ${token}`}})
    } catch(error) {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        }  
    }
}

const getCommentRequest = async(token) => {
    try {
        const res = await axios.post(GET_COMMENT_URL, {
        }, {headers: {Authorization: `Bearer ${token}`}})
        const comment_data = res.data.comment_data
        return comment_data
    } catch(error) {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        }  
    }
}

const getMovesRequest = async(token) => {
    try {
        const res = await axios.post(GET_MOVE_URL, {
        }, {headers: {Authorization: `Bearer ${token}`}})
        const move_data = res.data.move_data
        return move_data
    } catch(error) {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        }  
    }
}

export {sendCommentRequest, sendMovesRequest,
        getCommentRequest, getMovesRequest}