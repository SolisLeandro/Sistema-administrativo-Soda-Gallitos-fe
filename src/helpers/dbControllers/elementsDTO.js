import axios from 'axios';

const PATH = 'http://localhost:4000/'

export async function getElements() {
    try {
        return await axios.get(PATH + 'getElements').then(resp => {
            return resp
        })
    } catch {
        return { status: 500 }
    }

}

export async function deleteElement(elementId) {
    try {
        return await axios.delete(PATH + 'deleteElement/' + elementId).then(resp => {
            return resp
        })
    } catch {
        return { status: 500 }
    }
}

export async function updateElement(elementId, title, aditional, price) {
    try {
        return await axios.post(PATH + 'updateElement/' + elementId + "&" + title + "&" + aditional + "&" + price).then(resp => {
            return resp
        })
    } catch {
        return { status: 500 }
    }
}

export async function createElement(title, aditional, price) {
    try {
        return await axios.post(PATH + 'createElement/' + title + "&" + aditional + "&" + price).then(resp => {
            return resp
        })
    } catch {
        return { status: 500 }
    }
}