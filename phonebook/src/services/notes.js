import axios from "axios"

const url = "/api/persons"

const getAll = () => {
	return axios.get(url).then(response => response.data)
}

const create = (newPerson) => {
	return axios.post(url, newPerson).then(response => response.data)
}

const deleteAll = (id) => {
	return axios.delete(`${url}/${id}`).then(response => response.data)
}

const update = (newPerson) => {
	return axios.put(`${url}/${newPerson.id}`, newPerson).then(response => response.data)
}

export default { getAll, deleteAll, update, create }
