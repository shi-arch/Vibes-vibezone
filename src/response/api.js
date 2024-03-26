import axios from 'axios'

export const getApi = async (url) => {
    const response = await axios.get(process.env.NEXT_PUBLIC_LOCAL_BASEURL +'/api'+url)
    return response.data
}

export const postApi = async (url, data) => {
    const response = await axios.post(process.env.NEXT_PUBLIC_LOCAL_BASEURL +'/api'+url, data)
    return response.data
}