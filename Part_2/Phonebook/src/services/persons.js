import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseURL).then(response => response.data)
}

const create = (newPerson) => {
    return axios.post(baseURL, newPerson).then(response => response.data)
}

const forget = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

const update = (id, person) => {
    axios.put(`${baseURL}/${id}`, person).then(response => response.data)
}

export default {getAll, create, forget, update}