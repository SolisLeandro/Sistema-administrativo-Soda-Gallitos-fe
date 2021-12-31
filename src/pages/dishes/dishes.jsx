import React, { useEffect, useState } from "react"
import "./dishes.css"
import editPenIcon from '../../assets/imgs/editPen.svg'
import cancelIcon from '../../assets/imgs/cancel.svg'
import trashIcon from '../../assets/imgs/trash.svg'
import { getElements } from "../../helpers/dbControllers/elementsDTO"

const Dishes = () => {
    const [dishesData, setDishesData] = useState([
        {
            id: 1, name: "Arroz cantones", elements: [
                { id: 1, name: "Arroz cantones", price: "₡ 1000.00" },
                { id: 2, name: "Ensalada de caracolitos", price: "₡ 1500.00" },
                { id: 3, name: "Papas fritas", price: "₡ 1000.00" }],
            preparationPrice: "₡ 0.00", total: "₡ 3500.00"
        },
        {
            id: 2, name: "Casado", elements: [
                { id: 4, name: "Arroz", price: "₡ 1000.00" },
                { id: 5, name: "Ensalada rusa", price: "₡ 1500.00" },
                { id: 3, name: "Papas fritas", price: "₡ 1000.00" }],
            preparationPrice: "₡ 0.00", total: "₡ 3500.00"
        },
        {
            id: 3, name: "Pollo en salsa blanca", elements: [
                { id: 4, name: "Arroz", price: "₡ 1000.00" },
                { id: 6, name: "Pollo en salsa blanca", price: "₡ 1000.00" },
                { id: 2, name: "Ensalada de caracolitos", price: "₡ 1500.00" },
                { id: 3, name: "Papas fritas", price: "₡ 1000.00" }],
            preparationPrice: "₡ 0.00", total: "₡ 4500.00"
        },
        {
            id: 4, name: "Res en salsa de la casa", elements: [
                { id: 4, name: "Arroz", price: "₡ 1000.00" },
                { id: 2, name: "Ensalada de caracolitos", price: "₡ 1500.00" },
                { id: 7, name: "Res en salsa de la casa", price: "₡ 1000.00" }],
            preparationPrice: "₡ 0.00", total: "₡ 3500.00"
        },
    ])
    const [elementsData, setElementsData] = useState([
        { id: 1, name: "Arroz", price: "₡ 1000.00" },
        { id: 2, name: "Ensalada de caracolitos", price: "₡ 1500.00" },
        { id: 3, name: "Papas fritas", price: "₡ 1000.00" },
        { id: 4, name: "Puré de papas", price: "₡ 1600.00" },
        { id: 5, name: "Arroz", price: "₡ 1000.00" },
        { id: 6, name: "Ensalada de caracolitos", price: "₡ 1500.00" },
        { id: 7, name: "Papas fritas", price: "₡ 1000.00" },
        { id: 8, name: "Puré de papas", price: "₡ 1600.00" }
    ])

    const [deleteMode, setDeleteMode] = useState(false)
    const [addMode, setAddMode] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [showMode, setShowMode] = useState(false)

    const [currentDish, setCurrentDish] = useState({})

    const [currentNameEdit, setCurrentNameEdit] = useState("")
    const [currentElementsEdit, setCurrentElementsEdit] = useState([])
    const [currentPreparationPriceEdit, setCurrentPreparationPriceEdit] = useState("")
    const [currentTotalEdit, setCurrentTotalEdit] = useState("")

    const [currentNameUpsert, setCurrentNameUpsert] = useState("")
    const [currentElementsUpsert, setCurrentElementsUpsert] = useState([])
    const [currentPreparationPriceUpsert, setCurrentPreparationPriceUpsert] = useState("")
    const [currentTotalUpsert, setCurrentTotalUpsert] = useState("")

    const [showAddElementContainer, setShowAddElementContainer] = useState(false)

    function closeAddPanel() {
        setAddMode(!addMode)
    }

    function inputOnKeyDown(event) {
        if (event.key === 'Enter' && editMode) {
            //update
        }
    }

    function setCurrentShow(element) {
        setCurrentDish(element)
        setAddMode(false)
        setEditMode(false)
        setShowMode(true)
    }

    function setEditVariables(element) {
        setCurrentNameEdit(element.name)
        setCurrentElementsEdit(element.elements)
        setCurrentPreparationPriceEdit(element.preparationPrice)
        setCurrentTotalEdit(element.total)
    }

    function cleanUpsertConst() {
        setCurrentDishUpsert({})
        setCurrentNameUpsert("")
        setCurrentElementsUpsert([])
        setCurrentPreparationPriceUpsert("")
        setCurrentTotalUpsert("")
    }

    async function getElementsInfo() {
        var elementsResponse = await getElements()
        var elements = elementsResponse.map((element) => {
            return { id: element.Id, name: element.Nombre, price: element.Precio }
        })
        setElementsData(elements)
    }

    useEffect(() => {
        getElementsInfo()
    }, [])

    return (
        <div style={{ display: "flex", height: "100%", width: "100%" }}>
            <div className="dishes-general-div">
                <h1 className="dishes-title">Opciones Platillos</h1>


                <div style={{ display: "flex", height: "73%" }}>
                    <div className="dishes-column">
                        <div className="dishes-subtitle-container">
                            <h2 className="dishes-subtitle">Platillos</h2>
                            <h2 className="dishes-subtitle" style={{ fontSize: "18px" }}>Cantidad de elementos</h2>
                        </div>

                        <div className="dishes-card-container" style={{ marginRight: "15%" }}>
                            <div className="dishes-container">
                                {dishesData.map((element) => {
                                    return (
                                        <div key={element.id} className="dishes-element-container" style={{ cursor: deleteMode ? "" : "pointer" }} onClick={() => { setCurrentShow(Object.create(element)) }}>
                                            <h4 className="dishes-text">{element.name}</h4>
                                            <div style={{ display: "flex" }}>
                                                <div style={{ display: "flex" }}>
                                                    <h4 className="dishes-text" style={{ marginRight: "10%" }}>{element.elements.length}</h4>
                                                    <img src={trashIcon} disabled={!deleteMode}
                                                        style={{
                                                            marginLeft: "15px", width: "24px",
                                                            marginBottom: "5px", cursor: deleteMode ? "pointer" : "",
                                                            opacity: deleteMode ? "100%" : "0%"
                                                        }}>
                                                    </img>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                }
                            </div>
                            <div className="dishes-buttons-row">
                                <button className={deleteMode ? "dishes-button-disabled" : "dishes-button"}
                                    disabled={deleteMode}
                                    onClick={() => {
                                        setAddMode(true)
                                        setEditMode(true)
                                        cleanUpsertConst()
                                    }}>
                                    Añadir platillo
                                </button>
                                <button className={addMode ? "dishes-button-disabled" : "dishes-button"}
                                    disabled={addMode}
                                    onClick={() => {
                                        setDeleteMode(!deleteMode)
                                        setEditMode(false)
                                    }}>
                                    Eliminar platillo
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="dishes-column">
                        
                        {editMode ?
                            (
                                <div>
                                    <input type="text"
                                        className="dishes-input-subtitle"
                                        value={currentNameEdit}
                                        onKeyDown={inputOnKeyDown}
                                        onChange={(evt) => { setCurrentNameEdit(evt.target.value) }}
                                    />

                                    <div className="dishes-card-container" style={{ height: "80%" }}>
                                        <h2 className="dishes-subtitle" style={{ fontSize: "18px" }}>Elementos</h2>
                                        <div className="dishes-container" style={{ maxHeight: "16vh", margin: "0px" }}>
                                            {currentElementsEdit.map((element) => {
                                                    return (
                                                        <div key={element.id} className="elements-element-container">
                                                            <h4 className="elements-text">{element.name}</h4>
                                                            {console.log("e",element)}
                                                            <div style={{ display: "flex" }}>
                                                                <h4 className="elements-text" style={{ whiteSpace: "nowrap" }}>{element.price}</h4>
                                                                <img src={trashIcon}
                                                                    style={{
                                                                        marginLeft: "15px", width: "24px",
                                                                        marginBottom: "5px", cursor: "pointer",
                                                                        opacity: "100%"
                                                                    }}
                                                                    onClick={() => {
                                                                        let currentElements = Object.create(currentElementsEdit)
                                                                        currentElements.splice(currentElements.findIndex(e => e.id === element.id), 1);
                                                                        setCurrentElementsEdit(currentElements)
                                                                    }}>
                                                                </img>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="dishes-element-container">
                                            <h4 className="dishes-text" style={{ whiteSpace: "nowrap" }}>Preparación</h4>
                                            <input type="text"
                                                className="dishes-input"
                                                style={{ width: "200px" }}
                                                value={currentPreparationPriceEdit}
                                                onKeyDown={inputOnKeyDown}
                                                onChange={(evt) => { setCurrentPreparationPriceEdit(evt.target.value) }}
                                            />
                                        </div>
                                        <div className="dishes-element-container">
                                            <h4 className="dishes-text" style={{ whiteSpace: "nowrap" }}>Total</h4>
                                            <h4 className="dishes-text" style={{ whiteSpace: "nowrap" }}>{currentTotalEdit}</h4>
                                        </div>

                                        <div className="dishes-buttons-row">
                                            <button className="dishes-button-2"
                                                onClick={() => { setShowAddElementContainer(true) }}>
                                                Añadir Platillo
                                            </button>
                                            <button className="dishes-button-2"
                                                onClick={() => { 
                                                    setEditMode(false) 
                                                    setCurrentElementsUpsert( Object.create(currentElementsEdit))
                                                }}>
                                                Guardar
                                            </button>
                                            <button className="dishes-button-2"
                                                onClick={() => { setEditMode(false) }}>
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
                                    <h2 className="dishes-subtitle">{currentDish.name}</h2>

                                    <div className="dishes-card-container" style={{ height: "80%" }}>
                                        <h2 className="dishes-subtitle" style={{ fontSize: "18px" }}>Elementos</h2>
                                        <div className="dishes-container" style={{ maxHeight: "16vh", margin: "0px" }}>
                                            {currentDish.elements.map((element) => {
                                                    return (
                                                        <div key={element.id} className="elements-element-container">
                                                            <h4 className="elements-text">{element.name}</h4>

                                                            <div style={{ display: "flex" }}>
                                                                <h4 className="elements-text" style={{ whiteSpace: "nowrap" }}>{element.price}</h4>
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
                                        <div className="dishes-element-container">
                                            <h4 className="dishes-text" style={{ whiteSpace: "nowrap" }}>Preparación</h4>
                                            <h4 className="dishes-text" style={{ whiteSpace: "nowrap" }}>{currentDish.preparationPrice}</h4>
                                        </div>
                                        <div className="dishes-element-container">
                                            <h4 className="dishes-text" style={{ whiteSpace: "nowrap" }}>Total</h4>
                                            <h4 className="dishes-text" style={{ whiteSpace: "nowrap" }}>{currentDish.total}</h4>
                                        </div>

                                        <div className="dishes-buttons-row">
                                            <button className="dishes-button-2"
                                                onClick={() => { 
                                                    setEditMode(true)
                                                    setShowMode(false)
                                                    setEditVariables(Object.create(currentDish))
                                                }}>
                                                Editar
                                            </button>
                                            <button className="dishes-button-2"
                                                onClick={() => { 
                                                    setShowMode(false)
                                                }}>
                                                Cerrar
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
                    <div className="dishes-add-element-modal">
                        <div className="dishes-add-element-container">
                            <div>
                                <h2 className="dishes-subtitle" style={{ fontSize: "18px" }}>Añadir Elemento</h2>
                                <div className="dishes-container" style={{ margin: "0px", maxHeight: "35vh"}}>
                                    {elementsData.map((element) => {
                                            return (
                                                <div key={element.id} className="elements-element-container"
                                                    style={{cursor:"pointer"}} onClick={() => {
                                                        var elements = currentElementsEdit
                                                        elements.push(element)
                                                        setCurrentElementsEdit(elements)
                                                        setShowAddElementContainer(false)
                                                    }}>
                                                    <h4 className="elements-text">{element.name}</h4>
                                                    <h4 className="elements-text" style={{ whiteSpace: "nowrap" }}>{element.price}</h4>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <button className="dishes-button"
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

export default Dishes