import axios from 'axios';

const PATH = 'http://localhost:4000/'

export async function getOrders() {
    try {
        return await axios.get(PATH + 'getOrders').then(resp => {
            return resp
        })
    } catch {
        return { status: 500 }
    }

}

export async function finishOrder(orderId) {
    try {
        return await axios.post(PATH + 'finishOrder/' + orderId ).then(resp => {
            return resp
        })
    } catch {
        return { status: 500 }
    }
}