import axios from 'axios';

const PATH = 'http://localhost:4000/'

export async function getTables() {
    try {
        return await axios.get(PATH + 'getTables').then(resp => {
            return resp
        })
    } catch {
        return { status: 500 }
    }
}

export async function deleteTable(tableId) {
    try {
        return await axios.delete(PATH + 'deleteTable/' + tableId).then(resp => {
            return resp
        })
    } catch {
        return { status: 500 }
    }
}

export async function updateTable(tableId, title) {
    try {
        return await axios.post(PATH + 'updateTable/' + (tableId) + "&" + (title)).then(resp => {
            return resp
        })
    } catch {
        return { status: 500 }
    }
}

export async function createTable(title) {
    try {
        return await axios.post(PATH + 'createTable/' + (title)).then(resp => {
            return resp
        })
    } catch {
        return { status: 500 }
    }
}