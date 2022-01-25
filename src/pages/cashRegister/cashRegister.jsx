import React, { useEffect, useState } from "react"
import "./cashRegister.css"
import reloadIcon from '../../assets/imgs/reload.svg'
import editPen from '../../assets/imgs/editPen.svg'
import cancelIcon from '../../assets/imgs/cancel.svg'
import trashIcon from '../../assets/imgs/trash.svg'
import { getTableOrders, payOrder } from "../../helpers/dbControllers/tableOrdersDTO"
import { getDishes, createDish, deleteDish, updateDish } from "../../helpers/dbControllers/cashRegisterDTO"
import Swal from "sweetalert2"

const CashRegister = () => {
    const [tablesData, setTablesData] = useState([
        {
            id: 1, 
            name: "Mesa 1",
            total: "15000",
            dishes: [
                { id: 1, name: "Arroz cantones",total: "₡ 3500.00" },
                { id: 2, name: "Casado", total: "₡ 3500.00" },
                { id: 3, name: "Pollo en salsa blanca", total: "₡ 4500.00" },
                { id: 4, name: "Res en salsa de la casa", total: "₡ 3500.00" }
            ]
        },
        {
            id: 2, 
            name: "Mesa 2",
            total: "15000",
            dishes: [
                { id: 1, name: "Arroz cantones",total: "₡ 3500.00" },
                { id: 2, name: "Casado", total: "₡ 3500.00" },
                { id: 3, name: "Pollo en salsa blanca", total: "₡ 4500.00" },
                { id: 4, name: "Res en salsa de la casa", total: "₡ 3500.00" }
            ]
        },
        {
            id: 3, 
            name: "Mesa 3",
            total: "15000",
            dishes: [
                { id: 1, name: "Arroz cantones",total: "₡ 3500.00" },
                { id: 2, name: "Casado", total: "₡ 3500.00" },
                { id: 3, name: "Pollo en salsa blanca", total: "₡ 4500.00" },
                { id: 4, name: "Res en salsa de la casa", total: "₡ 3500.00" }
            ]
        },
    ])
    const [dishesData, setDishesData] = useState([
        {
            id: 1, name: "Arroz cantones", elements: [
                { id: 1, name: "Arroz cantones", price: "₡ 1000.00" },
                { id: 2, name: "Ensalada de caracolitos", price: "₡ 1500.00" },
                { id: 3, name: "Papas fritas", price: "₡ 1000.00" }],
            total: "₡ 3500.00"
        },
        {
            id: 2, name: "Casado", elements: [
                { id: 4, name: "Arroz", price: "₡ 1000.00" },
                { id: 5, name: "Ensalada rusa", price: "₡ 1500.00" },
                { id: 3, name: "Papas fritas", price: "₡ 1000.00" }],
            total: "₡ 3500.00"
        },
        {
            id: 3, name: "Pollo en salsa blanca", elements: [
                { id: 4, name: "Arroz", price: "₡ 1000.00" },
                { id: 6, name: "Pollo en salsa blanca", price: "₡ 1000.00" },
                { id: 2, name: "Ensalada de caracolitos", price: "₡ 1500.00" },
                { id: 3, name: "Papas fritas", price: "₡ 1000.00" }],
            total: "₡ 4500.00"
        },
        {
            id: 4, name: "Res en salsa de la casa", elements: [
                { id: 4, name: "Arroz", price: "₡ 1000.00" },
                { id: 2, name: "Ensalada de caracolitos", price: "₡ 1500.00" },
                { id: 7, name: "Res en salsa de la casa", price: "₡ 1000.00" }],
            total: "₡ 3500.00"
        },
    ])

    const [deleteDishMode, setDeleteDishMode] = useState(false)
    const [editPriceMode, setEditPriceMode] = useState(false)
    const [deleteMode, setDeleteMode] = useState(false)
    const [addMode, setAddMode] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [showMode, setShowMode] = useState(false)
    const [selectMode , setSelectMode] = useState(false)

    const [currentDishesSelect, setCurrentDishesSelect] = useState([])

    const [currentTable, setCurrentTable] = useState({})

    const [currentDishId, setCurrentDishId] = useState("")
    const [currentDishPriceEdit, setCurrentDishPriceEdit] = useState("")

    const [currentDishesEdit, setCurrentDishesEdit] = useState([])
    const [currentTotalEdit, setCurrentTotalEdit] = useState("")

    const [showAddElementContainer, setShowAddElementContainer] = useState(false)

    function closeAddPanel() {
        setAddMode(!addMode)
    }

    function inputOnKeyDown(event) {
        if (event.key === 'Enter' && editMode) {
            //update
        }
    }

    function clearCurrentEdit() {
        setCurrentNameEdit("")
        setCurrentDishesEdit([])
        setCurrentTotalEdit("")
    }

    async function setCurrentShow(element) {
        setCurrentTable(element)
        setEditMode(false)
        setShowMode(true)
        setSelectMode(false)
    }

    function setEditVariables(element) {
        setCurrentDishesEdit(Object.create(element.dishes))
        setCurrentTotalEdit(element.total)
    }

    //CRUD
    //Create
    async function createDishFunction() {
        var elementsId = currentElementsEdit.map((element) => {
            return { id: element.id }
        })
        var response = await createDish(elementsId, currentNameEdit, currentTotalEdit)
        if (response.status == 200) {
            getDishesInfo()
            Swal.fire("¡Platillo creado correctamente!", "", "success")
        } else {
            Swal.fire("¡Error al crear el Platillo!", "Ocurrio un error al obtener la respuesta del servidor", "error")
            console.log(response)
        }
        closeAddPanel(!addMode)
    }

    //Read
    async function getDishesInfo() {
        var dishesResponse = await getDishes()
        if (dishesResponse.status == 200 && dishesResponse.data) {
            if (dishesResponse.data.length > 0) {
                var dishes = dishesResponse.data[0].map((element) => {
                    var elements = element.elementos.map((elemento) => {
                        return { id: elemento.Id, name: elemento.Nombre, price: elemento.Precio }
                    })
                    return { id: element.Id, name: element.Nombre, total: element.Precio, elements }
                })
                await setDishesData(dishes)
                return
            } else {
                setDishesData([])
                return
            }
        }
        Swal.fire("¡Error al obtener los platillos!", "Ocurrio un error al obtener la respuesta del servidor", "error")
    }

    async function getTableOrdersInfo() {
        var response = await getTableOrders()

        if (response.status == 200 && response.data) {
            if (response.data.length > 0) {
                var orders = response.data[0].map((element) => {
                    var total = 0
                    var table = element.tab[0]
                    var dishes = table.plat.map((elemento) => {
                        total=total=elemento.Precio
                        return { id: elemento.Id, name: elemento.Nombre, total: elemento.Precio }
                    })
                    return { id: element.Id, name: table.Nombre, total, dishes }
                })
                console.log(orders)
                await setTablesData(orders)
                return
            } else {
                setTablesData([])
                return
            }
        }
        Swal.fire("¡Error al obtener las ordenes!", "Ocurrio un error al obtener la respuesta del servidor", "error")
    }

    //Update
    async function payOrderFuction() {
        var response = await payOrder(currentTable.id)
        if (response.status == 200) {
            await getTableOrdersInfo()
            Swal.fire("¡Orden pagada correctamente!", "", "success")
        } else {
            Swal.fire("¡Error al pagar la orden!", "Ocurrio un error al obtener la respuesta del servidor", "error")
            console.log(response)
        }
    }

    //Delete
    async function deleteDishFunction(id) {
        let currentDishes = Object.create(currentDishesEdit)
        currentDishes.splice(currentDishes.findIndex(e => e.id === id), 1);
        setCurrentDishesEdit(currentDishes)
    }
    //-------------------------------

    async function editSaveAction() {
        var newTable = Object.create(currentTable)
        newTable.total = currentTotalEdit
        newTable.dishes = currentDishesEdit
        setCurrentTable(newTable)
        setEditMode(false)
        setShowMode(true)
    }

    function inputOnKeyDownPriceEdit(event) {
        if (event.key === 'Enter' && editPriceMode) {
            var index = currentDishesEdit.findIndex(elem => elem.id === currentDishId)
            var newObj = Object.create(currentDishesEdit[index])
            newObj.total = currentDishPriceEdit
            currentDishesEdit[index] = newObj
            setEditPriceMode(false)
        }
        //var newCurrentTable = Object.create(currentTable)
        //newCurrentTable.dishes = Object.create(currentDishesEdit)
        //setCurrentDishesEdit(newCurrentTable)
    }

    function showEditMode(element){
        setEditVariables(element)
        setEditMode(true)
        setShowMode(false)
        setDeleteDishMode(false)
    }

    function initSelection() {
        var dishes = []
        currentTable.dishes.forEach(element => {
            dishes.push({...element, selected: false})
        });
        setCurrentDishesSelect(dishes)
        setSelectMode(true)
    }
    
    function handleSelectDish(id) {
        var dishes = Object.create(currentDishesSelect)
        dishes.forEach(element => {
            if(element.id == id){
                element.selected = !element.selected
            }
        });
        setCurrentDishesSelect(dishes)
    }

    function paySelect(){
        var newTable = Object.create(currentTable)
        var newDishes = []
        currentDishesSelect.forEach(element => {
            if(!element.selected){
                newDishes.push({id: element.id, name: element.name, total: element.total})
            }
        });
        newTable.dishes = newDishes
        setCurrentTable(newTable)
        setSelectMode(false)
    }

    useEffect(() => {
        getTableOrdersInfo()
        getDishesInfo()
    }, [])

    return (
        <div style={{ display: "flex", height: "100%", width: "100%" }}>
            <div className="cashRegister-general-div">
                <h1 className="cashRegister-title">Opciones Caja</h1>


                <div style={{ display: "flex", height: "73%" }}>
                    <div className="cashRegister-column">
                        <div className="cashRegister-subtitle-container">
                            <h2 className="cashRegister-subtitle">Mesas</h2>
                            <h2 className="cashRegister-subtitle" style={{ fontSize: "18px", cursor: "pointer" }} onClick={() => { getTableOrdersInfo }}>
                                Refrescar mesas 
                                <img src={reloadIcon} style={{width: "14px", margin: "0px 8px"}}></img>
                            </h2>
                        </div>

                        <div className="cashRegister-card-container" style={{ marginRight: "15%" }}>
                            <div className="cashRegister-container">
                                {tablesData.map((element) => {
                                    return (
                                        <div key={element.id} className="cashRegister-element-container" 
                                            style={{ cursor: deleteMode ? "" : "pointer" }} 
                                            onClick={() => { if(!deleteMode) { setCurrentShow(Object.create(element)) } }}>
                                                <h4 className="cashRegister-text">{element.name}</h4>
                                                <div style={{ display: "flex" }}>
                                                    <div style={{ display: "flex" }}>
                                                        <h4 className="cashRegister-text" style={{ marginRight: "10%" }}>{element.total}</h4>
                                                        <img src={trashIcon} disabled={!deleteMode}
                                                            style={{
                                                                marginLeft: "15px", width: "24px",
                                                                marginBottom: "5px", cursor: deleteMode ? "pointer" : "",
                                                                opacity: deleteMode ? "100%" : "0%"
                                                            }}
                                                            onClick={() => { deleteTableFunction(element.id) }}>
                                                        </img>
                                                    </div>
                                                </div>
                                        </div>
                                    )
                                })
                                }
                            </div>
                            <div className="cashRegister-buttons-row">
                                {deleteMode ?
                                    (
                                        <button className={addMode ? "cashRegister-button-disabled" : "cashRegister-button"}
                                            disabled={addMode}
                                            onClick={() => {
                                                setDeleteMode(!deleteMode)
                                            }}>
                                                Cancelar
                                        </button>
                                    ) :
                                    (
                                        <button className={addMode ? "cashRegister-button-disabled" : "cashRegister-button"}
                                            disabled={addMode}
                                            onClick={() => {
                                                setDeleteMode(!deleteMode)
                                                setEditMode(false)
                                                setShowMode(false)
                                            }}>
                                                Cancelar mesa
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="cashRegister-column">

                        {editMode ?
                            (
                                <div>
                                    <h2 className="cashRegister-subtitle">{currentTable.name}</h2>
                                    <div className="cashRegister-card-container" style={{ height: "80%" }}>
                                        <h2 className="cashRegister-subtitle" style={{ fontSize: "18px" }}>Platillos</h2>
                                        <div className="cashRegister-edit-container" style={{ maxHeight: "26vh", margin: "0px" }}>
                                            <div className="cashRegister-dishes-container">
                                                {currentDishesEdit.map((element) => {
                                                        return (
                                                            <div key={element.id} className="cashRegister-element-container" style={{backgroundColor:"#FFFFFF"}}>
                                                                <h4 className="cashRegister-text">{element.name}</h4>
                                                                <div style={{ display: "flex", width: "min-content" }}>
                                                                    <h4 className="cashRegister-text" style={{ whiteSpace: "nowrap" }}>{element.price}</h4>
                                                                    {editPriceMode && currentDishId == element.id ?
                                                                        (
                                                                            <input type="text"
                                                                                className="cashRegister-input"
                                                                                style={{width: "100px"}}
                                                                                value={currentDishPriceEdit}
                                                                                onKeyDown={inputOnKeyDownPriceEdit}
                                                                                onChange={(evt) => { setCurrentDishPriceEdit(evt.target.value) }}
                                                                            />
                                                                        ) :
                                                                        (
                                                                            <h4 className="cashRegister-text">{element.total}</h4>
                                                                        )
                                                                    }
                                                                    {editPriceMode && currentDishId == element.id ? 
                                                                        (
                                                                            <img src={cancelIcon}
                                                                                style={{
                                                                                    marginLeft: "15px", width: "24px",
                                                                                    marginBottom: "5px", cursor: "pointer",
                                                                                    opacity: "100%"
                                                                                }}
                                                                                onClick={() => { setEditPriceMode(!editPriceMode) }}>
                                                                            </img>
                                                                        ) :
                                                                        (
                                                                            deleteDishMode ? 
                                                                                (
                                                                                    <img src={trashIcon}
                                                                                        style={{
                                                                                            marginLeft: "15px", width: "24px",
                                                                                            marginBottom: "5px", cursor: "pointer",
                                                                                            opacity: "100%"
                                                                                        }}
                                                                                        onClick={() => { deleteDishFunction(element.id) }}>
                                                                                    </img>

                                                                                ) : 
                                                                                (
                                                                                    <img src={editPen}
                                                                                        style={{
                                                                                            marginLeft: "15px", width: "24px",
                                                                                            marginBottom: "5px", cursor: "pointer",
                                                                                            opacity: "100%"
                                                                                        }}
                                                                                        onClick={() => {
                                                                                            setEditPriceMode(true)
                                                                                            setCurrentDishId(element.id)
                                                                                            setCurrentDishPriceEdit(element.total)
                                                                                        }}>
                                                                                    </img>
                                                                                )
                                                                            
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>

                                            <div className="cashRegister-buttons-row">
                                                <button className="cashRegister-button-2"
                                                    onClick={() => { setShowAddElementContainer(true) }}>
                                                    Añadir platillo
                                                </button>
                                                <button className="cashRegister-button-2"
                                                    onClick={() => { setDeleteDishMode(!deleteDishMode) }}>
                                                    Eliminar Platillo
                                                </button>
                                            </div>
                                        </div>
                                        <div style={{display:"flex", justifyContent: "center"}}>
                                            <div className="cashRegister-element-container" style={{width:"50%"}}>
                                                <h4 className="cashRegister-text" style={{ whiteSpace: "nowrap" }}>Total</h4>
                                                <input type="text"
                                                    className="cashRegister-input"
                                                    style={{width: "100px"}}
                                                    value={currentTotalEdit}
                                                    onChange={(evt) => { setCurrentTotalEdit(evt.target.value) }}
                                                />
                                            </div>
                                        </div>

                                        <div className="cashRegister-buttons-row">
                                            <button className="cashRegister-button-2"
                                                onClick={() => { editSaveAction() }}>
                                                Guardar
                                            </button>
                                            <button className="cashRegister-button-2"
                                                onClick={() => { 
                                                    setEditMode(false) 
                                                    setShowMode(true)
                                                }}>
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div></div>
                            )
                        }
                        {showMode ?
                            (
                                <div>
                                    <div className="cashRegister-subtitle-edit-container">
                                        <h2 className="cashRegister-subtitle">{currentTable.name}</h2>

                                        {selectMode ?
                                            (
                                                <button className="cashRegister-button-2"
                                                    style={{height: "30px"}}
                                                    onClick={() => { setSelectMode(false) }}>
                                                    Cancelar
                                                </button>
                                            ) :
                                            (
                                                <button className="cashRegister-button-2"
                                                    style={{height: "30px"}}
                                                    onClick={() => { initSelection() }}>
                                                    Seleccionar
                                                </button>
                                            )
                                        }
                                    </div>
                                    <div className="cashRegister-card-container" style={{ height: "80%" }}>
                                        <h2 className="cashRegister-subtitle" style={{ fontSize: "18px" }}>Platillos</h2>
                                        <div className="cashRegister-container" style={{ maxHeight: "26vh", margin: "0px" }}>
                                            <div className="cashRegister-dishes-container">
                                                { selectMode ?
                                                    (
                                                        currentDishesSelect.map((element) => {
                                                            return (
                                                                <div key={element.id} 
                                                                    className={element.selected ? "cashRegister-element-container-select" : "cashRegister-element-container-unselect"}
                                                                    onClick={() => {handleSelectDish(element.id)}}>
                                                                        <h4 className="cashRegister-text">{element.name}</h4>

                                                                        <div style={{ display: "flex" }}>
                                                                            <h4 className="cashRegister-text" style={{ whiteSpace: "nowrap" }}>{element.total}</h4>
                                                                            <img src={trashIcon} disabled={true}
                                                                                style={{
                                                                                    marginLeft: "15px", width: "24px",
                                                                                    marginBottom: "5px", cursor: "",
                                                                                    opacity: "0%"
                                                                                }}>
                                                                            </img>
                                                                        </div>
                                                                </div>
                                                            )
                                                        })
                                                    ) : 
                                                    (
                                                        currentTable.dishes.map((element) => {
                                                            return (
                                                                <div key={element.id} className="cashRegister-element-container" style={{backgroundColor:"#FFFFFF"}}>
                                                                    <h4 className="cashRegister-text">{element.name}</h4>

                                                                    <div style={{ display: "flex" }}>
                                                                        <h4 className="cashRegister-text" style={{ whiteSpace: "nowrap" }}>{element.total}</h4>
                                                                        <img src={trashIcon} disabled={true}
                                                                            style={{
                                                                                marginLeft: "15px", width: "24px",
                                                                                marginBottom: "5px", cursor: "",
                                                                                opacity: "0%"
                                                                            }}>
                                                                        </img>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    )
                                                }
                                            </div>
                                            <div className="cashRegister-buttons-row">
                                                    <button className= {selectMode ? "cashRegister-button-disabled-2" : "cashRegister-button-2"}
                                                        disabled = {selectMode}
                                                        onClick={() => { showEditMode(Object.create(currentTable)) }}>
                                                        Editar
                                                    </button>
                                                </div>
                                        </div>
                                        <div style={{display:"flex", justifyContent: "center"}}>
                                            <div className="cashRegister-element-container" style={{width:"50%"}}>
                                                <h4 className="cashRegister-text" style={{ whiteSpace: "nowrap" }}>Total</h4>
                                                <h4 className="cashRegister-text" style={{ whiteSpace: "nowrap" }}>{currentTable.total}</h4>
                                            </div>
                                        </div>

                                        <div className="cashRegister-buttons-row">
                                            <button className = {selectMode ? "cashRegister-button-disabled-2" : "cashRegister-button-2"} disabled={selectMode}
                                                onClick={() => {
                                                    setEditMode(false)
                                                    setShowMode(false)
                                                    payOrderFuction()
                                                }}>
                                                Pagar Total
                                            </button>
                                            <button className = {selectMode ? "cashRegister-button-2" : "cashRegister-button-disabled-2"} disabled={!selectMode}
                                                onClick={() => {
                                                    paySelect()
                                                }}>
                                                Pagar Seleccion
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
            {showAddElementContainer ?
                (
                    <div className="cashRegister-add-element-modal">
                        <div className="cashRegister-add-element-container">
                            <div>
                                <h2 className="cashRegister-subtitle" style={{ fontSize: "18px" }}>Añadir Elemento</h2>
                                <div className="cashRegister-container" style={{ margin: "0px", maxHeight: "35vh" }}>
                                    {dishesData.map((element) => {
                                        return (
                                            <div key={element.id} className="elements-element-container"
                                                style={{ cursor: "pointer" }} 
                                                onClick={() => {
                                                    var elements = currentDishesEdit
                                                    elements.push(element)
                                                    setCurrentDishesEdit(elements)
                                                    setShowAddElementContainer(false)
                                                }}>
                                                <h4 className="cashRegister-text">{element.name}</h4>
                                                <h4 className="cashRegister-text" style={{ whiteSpace: "nowrap" }}>{element.price}</h4>
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                            </div>
                            <button className="cashRegister-button"
                                onClick={() => { setShowAddElementContainer(false) }}>
                                Cerrar
                            </button>
                        </div>
                    </div>

                ) :
                (
                    <div></div>
                )

            }
        </div>
    )
}

export default CashRegister