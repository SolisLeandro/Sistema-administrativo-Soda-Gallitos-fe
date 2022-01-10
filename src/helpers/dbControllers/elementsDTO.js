import axios from 'axios';

const PATH = 'http://localhost:4000/'

export async function getElements() {
    return await axios.get(PATH + 'getElements').then(resp => {
        return resp
    })
}

export async function deleteElement(elementId) {
    return await axios.delete(PATH + 'deleteElement/' + elementId).then(resp => {
        return resp
    })
}

export async function updateElement(elementId, title, aditional, price) {
    return await axios.post(PATH + 'updateElement/' + elementId + "&" + title + "&" + aditional + "&" + price).then(resp => {
        return resp
    })
}

export async function createElement(title, aditional, price) {
    return await axios.post(PATH + 'createElement/' + title + "&" + aditional + "&" + price).then(resp => {
        return resp
    })
}