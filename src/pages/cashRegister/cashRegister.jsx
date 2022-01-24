import React, { useEffect, useState } from "react"
import "./cashRegister.css"
import reloadIcon from '../../assets/imgs/reload.svg'
import editPen from '../../assets/imgs/editPen.svg'
import cancelIcon from '../../assets/imgs/cancel.svg'
import trashIcon from '../../assets/imgs/trash.svg'
import { getElements } from "../../helpers/dbControllers/elementsDTO"
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

    //Update
    async function updateDishFunction() {
        var elementsId = currentElementsEdit.map((element) => {
            return { id: element.id }
        })
        var response = await updateDish(currentDish.id, elementsId, currentNameEdit, currentTotalEdit)
        if (response.status == 200) {
            await getDishesInfo()
            var index = dishesData.findIndex(elem => elem.id === currentDish.id)
            var dish = dishesData[index]
            console.log(dish)
            setCurrentShow(Object.create(dish))
            Swal.fire("¡Platillo creado correctamente!", "", "success")
        } else {
            Swal.fire("¡Error al crear el platillo!", "Ocurrio un error al obtener la respuesta del servidor", "error")
            console.log(response)
        }
    }

    //Delete
    async function deleteDishFunction(id) {
        var response = await deleteDish(id)
        if (response.status == 200) {
            getDishesInfo()
            Swal.fire("¡Platillo eliminado correctamente!", "", "success")
        } else {
            Swal.fire("¡Error al eliminar el platillo!", "Ocurrio un error al obtener la respuesta del servidor", "error")
            console.log(response)
        }
        setDeleteMode(false)
        setShowMode(false)
        setEditMode(false)
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
    }


    useEffect(() => {
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
                            <h2 className="cashRegister-subtitle" style={{ fontSize: "18px", cursor: "pointer" }} onClick={() => {  }}>
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
                                                            onClick={() => { deleteDishFunction(element.id) }}>
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
                                                setEditMode(false)
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
                                                                                        onClick={() => {}}>
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
                                        <button className="cashRegister-button-2"
                                            style={{height: "30px"}}
                                            onClick={() => { setShowAddElementContainer(true) }}>
                                            Seleccionar
                                        </button>
                                    </div>
                                    <div className="cashRegister-card-container" style={{ height: "80%" }}>
                                        <h2 className="cashRegister-subtitle" style={{ fontSize: "18px" }}>Platillos</h2>
                                        <div className="cashRegister-container" style={{ maxHeight: "26vh", margin: "0px" }}>
                                            <div className="cashRegister-dishes-container">
                                                {currentTable.dishes.map((element) => {
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
                                                }
                                                
                                            </div>
                                            <div className="cashRegister-buttons-row">
                                                    <button className="cashRegister-button-2"
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
                                            <button className="cashRegister-button-2"
                                                onClick={() => {
                                                    setEditMode(true)
                                                    setShowMode(false)
                                                    setEditVariables(Object.create(currentTable))
                                                }}>
                                                Pagar Total
                                            </button>
                                            <button className="cashRegister-button-2"
                                                onClick={() => {
                                                    setShowMode(false)
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