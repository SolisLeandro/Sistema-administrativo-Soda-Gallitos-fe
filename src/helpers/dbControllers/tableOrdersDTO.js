import axios from 'axios';

const PATH = 'http://localhost:4000/'

export async function getTableOrders() {
    try {
        return await axios.get(PATH + 'getTableOrders').then(resp => {
            return resp
        })
    } catch {
        return { status: 500 }
    }
}

export async function payOrder(orderId) {
    return await axios.post(PATH + 'payOrder/' + orderId ).then(resp => {
        return resp
    })
}
