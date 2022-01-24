import axios from 'axios';

const PATH = 'http://localhost:4000/'

export async function getDishes() {
    try {
        return await axios.get(PATH + 'getDishes').then(resp => {
            return resp
        })
    } catch {
        return { status: 500 }
    }
}

export async function deleteDish(dishId) {
    try {
        return await axios.delete(PATH + 'deleteDish/' + dishId).then(resp => {
            return resp
        })
    } catch {
        return { status: 500 }
    }
}

export async function updateDish(dishId, elementsId, name, total) {
    return await axios.post(PATH + 'updateDish/' + dishId + "&" + JSON.stringify(elementsId) + "&" + name + "&" + total).then(resp => {
        return resp
    })
}

export async function createDish(elementsId, name, total) {
    try {
        console.log(JSON.stringify(elementsId))
        return await axios.post(PATH + 'createDish/' + JSON.stringify(elementsId) + "&" + name + "&" + total).then(resp => {
            return resp
        })
    } catch {
        return { status: 500 }
    }
}