import axios from 'axios'

export const getApi = async (url, token) => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
        headers['token'] = `${token}`
    }
    const response = await axios.get(process.env.REACT_APP_BASEURL + '/api' + url, {headers})
    return response.data
}

export const postApi = async (url, data, token) =>  {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
        headers['token'] = `${token}`
    }
    const response = await axios.post(process.env.REACT_APP_BASEURL + '/api' + url, data, {headers})
    return response.data
}