import axios from 'axios'
import {API_ROOT} from 'utilities/constants'

export const fetchBoardDetail = async (id) => {
    const request = await axios.get(`${API_ROOT}/v1/board/${id}`)
    return request.data
}

export const createNewColumn = async (data) => {
    const request = await axios.post(`${API_ROOT}/v1/column`, data)
    return request.data
}

export const updateColumn = async (id, data) => {
    const request = await axios.put(`${API_ROOT}/v1/column/${id}`, data)
    return request.data
}

export const createNewCard = async (data) => {
    const request = await axios.post(`${API_ROOT}/v1/card`, data)
    return request.data
}
