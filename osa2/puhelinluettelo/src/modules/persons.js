import axios from "axios"

const baseURL = 'http://localhost:3001/persons'

const getAll = () => (
    axios.get(baseURL).then(response => response.data)
)

const create = newContact => (
    axios.post(baseURL, newContact)
        .then(response => response.data)
)

const deleteResource = id => (
    axios.delete(`${baseURL}/${id}`)
        .then(response => response.data) 
)

const update = (newItem) => (
    axios.put(`${baseURL}/${newItem.id}`, newItem)
    .then(response => response.data)
)

const restcommands = {
    getAll,
    create,
    deleteResource,
    update
}

export default restcommands