import axios from "axios"

const instance = axios.create({
    baseURL: (process.env.NODE_ENV === 'development' ? process.env.REACT_APP_BASE_URL : process.env.REACT_APP_PROD_BASE_URL),
});

export default instance;