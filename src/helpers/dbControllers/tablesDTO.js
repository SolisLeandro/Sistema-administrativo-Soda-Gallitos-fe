import axios from 'axios';

const PATH = 'http://localhost:4000/'

export async function getTables() {
    return await axios.get(PATH + 'getTables').then(resp => {
        return resp
    })
}

export async function deleteTable(tableId) {
    return await axios.delete(PATH + 'deleteTable/' + tableId).then(resp => {
        return resp
    })
}

export async function updateTable(tableId, title) {
    return await axios.post(PATH + 'updateTable/' + (tableId) + "&" + (title)).then(resp => {
        return resp
    })
}

export async function createTable(title) {
    return await axios.post(PATH + 'createTable/' + (title)).then(resp => {
        return resp
    })
}