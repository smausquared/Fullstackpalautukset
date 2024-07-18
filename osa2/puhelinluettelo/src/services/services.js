import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
        return response.data
    })
}

const newPerson = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => {
        return response.data
    })
}

const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    request.then(response => 
        console.log(`Deleted ${id}`)
    )
}

const updateExisting = (person, newNumber) => {
    const personChanged = {...person, number: newNumber}
    const request = axios.put(`${baseUrl}/${person.id}`, personChanged)
    return request.then(response => {
        console.log(`updated ${person.id}`)
        return response.data
    })
}

export default { getAll, newPerson, deletePerson, updateExisting }
