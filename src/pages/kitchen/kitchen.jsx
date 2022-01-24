import React, { useEffect, useState } from "react"
import "./kitchen.css"
import { getOrders, finishOrder } from "../../helpers/dbControllers/ordersDTO"
import Swal from "sweetalert2"

const Kitchen = () => {
    const [dishesData, setDishesData] = useState([
        {
            id: 1, name: "Arroz cantones", elements: [
                { id: 1, name: "Arroz cantones", price: "₡ 1000.00" },
                { id: 2, name: "Ensalada de caracolitos", price: "₡ 1500.00" },
                { id: 3, name: "Papas fritas", price: "₡ 1000.00" }],
            notes: ["Sin salsas"]
        },
        {
            id: 2, name: "Casado", elements: [
                { id: 4, name: "Arroz", price: "₡ 1000.00" },
                { id: 5, name: "Ensalada rusa", price: "₡ 1500.00" },
                { id: 3, name: "Papas fritas", price: "₡ 1000.00" }],
            notes: ["Sin salsas", "Papas sin sal", "Sin salsas", "Papas sin sal", "Sin salsas", "Papas sin sal", "Sin salsas", "Papas sin sal", "Sin salsas", "Papas sin sal", "Sin salsas", "Papas sin sal", "Sin salsas", "Papas sin sal", "Sin salsas", "Papas sin sal", "Sin salsas", "Papas sin sal", "Sin salsas", "Papas sin sal"]
        },
        {
            id: 3, name: "Pollo en salsa blanca", elements: [
                { id: 4, name: "Arroz", price: "₡ 1000.00" },
                { id: 6, name: "Pollo en salsa blanca", price: "₡ 1000.00" },
                { id: 2, name: "Ensalada de caracolitos", price: "₡ 1500.00" },
                { id: 3, name: "Papas fritas", price: "₡ 1000.00" }],
            notes: ["Sin salsas"]
        },
        {
            id: 4, name: "Res en salsa de la casa", elements: [
                { id: 4, name: "Arroz", price: "₡ 1000.00" },
                { id: 2, name: "Ensalada de caracolitos", price: "₡ 1500.00" },
                { id: 7, name: "Res en salsa de la casa", price: "₡ 1000.00" }],
            notes: []
        },
    ])

    const [showMode, setShowMode] = useState(false)

    const [currentDish, setCurrentDish] = useState({})

    //orders actions
    //Read
    async function getOrdersInfo() {
        var ordersResponse = await getOrders()
        console.log(ordersResponse)

        if (ordersResponse.status == 200 && ordersResponse.data) {
            if (ordersResponse.data.length > 0) {
                var dishes = []
                ordersResponse.data[0].forEach(order => {
                    order.tab.forEach(table => {
                        table.plat.forEach(dish => {
                            dishes.push({
                                dishId: dish.Id,
                                dishName: dish.Nombre,
                                dishPrice: dish.Precio,
                                orderId: order.Id,
                                tableId: table.Id,
                                tableName: table.Nombre,
                                date: order.Fecha,
                                elements: dish.elementos.map((element) => {
                                    return { id: element.Id, name: element.Nombre }
                                }),
                                notes: ''
                            })
                        });

                    });
                });
                console.log(dishes)
                setDishesData(dishes)
                return
            } else {
                setDishesData([])
                return
            }
        }
        Swal.fire("¡Error al obtener los elementos!", "Ocurrio un error al obtener la respuesta del servidor", "error")
    }

    //finish
    async function finishOrderFunction() {
        var response = await finishOrder(currentDish.orderId)
        if (response.status == 200) {
            Swal.fire("¡Orden finalizada correctamente!", "", "success")
        } else {
            Swal.fire("¡Error al finalizar la orden!", "Ocurrio un error al obtener la respuesta del servidor", "error")
            console.log(response)
        }
        getOrdersInfo()
        setShowMode(false)
    }

    function setCurrentShow(element) {
        setCurrentDish(element)
        setShowMode(true)
    }

    function getNotesStr(notes) {
        var str = notes[0]
        for (let i = 1; i < notes.length; i++) {
            str = str + ", " + notes[i];
        }
        return str
    }

    useEffect(() => {
        getOrdersInfo()
    }, [])

    return (
        <div style={{ display: "flex", height: "100%", width: "100%" }}>
            <div className="kitchen-general-div">
                <h1 className="kitchen-title">Opciones Cocina</h1>


                <div style={{ display: "flex", height: "73%" }}>
                    <div className="kitchen-column">
                        <h2 className="kitchen-subtitle">Pedidos de mesas</h2>

                        <div className="kitchen-card-container" style={{ marginRight: "15%" }}>
                            <div className="kitchen-container">
                                {dishesData.map((element) => {
                                    return (
                                        <div key={element.id} className="kitchen-element-container"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => { setCurrentShow(Object.create(element)) }}
                                        >
                                            <h4 className="kitchen-text">{element.tableName}</h4>
                                            <h4 className="kitchen-text">{element.dishName}</h4>
                                        </div>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="kitchen-column">
                        {showMode ?
                            (
                                <div>
                                    <h2 className="kitchen-subtitle">{currentDish.tableName + ": " + currentDish.dishName}</h2>

                                    <div className="kitchen-card-container" style={{ height: "90%" }}>
                                        <h2 className="kitchen-subtitle" style={{ fontSize: "18px" }}>Elementos</h2>
                                        <div className="kitchen-container" style={{ maxHeight: "16vh", margin: "0px" }}>
                                            {currentDish.elements.map((element) => {
                                                return (
                                                    <div key={element.id} className="elements-element-container">
                                                        <h4 className="elements-text">{element.name}</h4>

                                                        <div style={{ display: "flex" }}>
                                                            <h4 className="elements-text" style={{ whiteSpace: "nowrap" }}>{element.price}</h4>

                                                        </div>
                                                    </div>
                                                )
                                            })
                                            }

                                        </div>
                                        <h2 className="kitchen-subtitle" style={{ fontSize: "18px" }}>Notas</h2>
                                        <div className="kitchen-element-container">
                                            <h4 className="elements-text">{getNotesStr(currentDish.notes)}</h4>
                                        </div>

                                        <div className="kitchen-buttons-row">
                                            <button className="kitchen-button-2"
                                                onClick={() => { finishOrderFunction() }}>
                                                Finalizar {currentDish.tableName}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div></div>
                            )
                        }

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Kitchen