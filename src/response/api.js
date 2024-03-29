import axios from 'axios'

export const getApi = async (url) => {
    const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_BASEURL + '/api' + url)
    return response.data
}

export const postApi = async (url, data, token) =>  {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }
    const response = await axios.post(process.env.NEXT_PUBLIC_SERVER_BASEURL + '/api' + url, data, {headers})
    return response.data
}