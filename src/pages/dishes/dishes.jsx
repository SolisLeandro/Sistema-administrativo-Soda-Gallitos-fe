import React, { useEffect, useState } from "react"
import "./dishes.css"
import editPenIcon from '../../assets/imgs/editPen.svg'
import cancelIcon from '../../assets/imgs/cancel.svg'
import trashIcon from '../../assets/imgs/trash.svg'

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

    const [deleteMode, setDeleteMode] = useState(false)
    const [addMode, setAddMode] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const [currentDishUpsert, setCurrentDishUpsert] = useState({})
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

    function setCurrentUpsert(element) {
        if (!deleteMode) {
            setCurrentDishUpsert(element)
            setCurrentNameUpsert(element.name)
            setCurrentElementsUpsert(element.elements)
            setCurrentPreparationPriceUpsert(element.preparationPrice)
            setCurrentTotalUpsert(element.total)
            setAddMode(true)
            setEditMode(false)
        }
    }

    function cleanUpsertConst() {
        setCurrentDishUpsert({})
        setCurrentNameUpsert("")
        setCurrentElementsUpsert([])
        setCurrentPreparationPriceUpsert("")
        setCurrentTotalUpsert("")
    }

    return (
        <div style={{display: "flex", height: "100%", width: "100%"}}>
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
                                        <div key={element.id} className="dishes-element-container" style={{ cursor: deleteMode ? "" : "pointer" }} onClick={() => { setCurrentUpsert(element) }}>
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
                        {addMode || editMode ?
                            (
                                <div>
                                    {editMode ?
                                        (
                                            <input type="text"
                                                className="dishes-input-subtitle"
                                                value={currentNameUpsert}
                                                onKeyDown={inputOnKeyDown}
                                                onChange={(evt) => { setCurrentNameUpsert(evt.target.value) }}
                                            />
                                        ) :
                                        (
                                            <h2 className="dishes-subtitle">{currentNameUpsert}</h2>
                                        )}

                                    <div className="dishes-card-container" style={{ height: "80%" }}>
                                        <h2 className="dishes-subtitle" style={{ fontSize: "18px" }}>Elementos</h2>
                                        <div className="dishes-container" style={{ maxHeight: "16vh", margin: "0px" }}>
                                            {currentElementsUpsert.map((element) => {
                                                return (
                                                    <div key={element.id} className="elements-element-container">
                                                        <h4 className="elements-text">{element.name}</h4>

                                                        <div style={{ display: "flex" }}>
                                                            <h4 className="elements-text" style={{ whiteSpace: "nowrap" }}>{element.price}</h4>
                                                            <img src={trashIcon} disabled={!editMode}
                                                                style={{
                                                                    marginLeft: "15px", width: "24px",
                                                                    marginBottom: "5px", cursor: "pointer",
                                                                    opacity: editMode ? "100%" : "0%"
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
                                            {editMode ?
                                                (
                                                    <input type="text"
                                                        className="dishes-input"
                                                        style={{ width: "200px" }}
                                                        value={currentPreparationPriceUpsert}
                                                        onKeyDown={inputOnKeyDown}
                                                        onChange={(evt) => { setCurrentPreparationPriceUpsert(evt.target.value) }}
                                                    />
                                                ) :
                                                (
                                                    <h4 className="dishes-text" style={{ whiteSpace: "nowrap" }}>{currentPreparationPriceUpsert}</h4>
                                                )}
                                        </div>
                                        <div className="dishes-element-container">
                                            <h4 className="dishes-text" style={{ whiteSpace: "nowrap" }}>Total</h4>
                                            <h4 className="dishes-text" style={{ whiteSpace: "nowrap" }}>{currentTotalUpsert}</h4>
                                        </div>

                                        {editMode ?
                                            (
                                                <div className="dishes-buttons-row">
                                                    <button className="dishes-button-2"
                                                        onClick={() => { setShowAddElementContainer(true) }}>
                                                        Añadir Platillo
                                                    </button>
                                                    <button className="dishes-button-2"
                                                        onClick={() => { setEditMode(false) }}>
                                                        Guardar
                                                    </button>
                                                    <button className="dishes-button-2"
                                                        onClick={() => { setEditMode(false) }}>
                                                        Cancelar
                                                    </button>
                                                </div>
                                            ) :
                                            (
                                                <div className="dishes-buttons-row">
                                                    <button className="dishes-button-2"
                                                        onClick={() => { setEditMode(!editMode) }}>
                                                        Editar
                                                    </button>
                                                    <button className="dishes-button-2"
                                                        onClick={() => { closeAddPanel(!addMode) }}>
                                                        Cerrar
                                                    </button>
                                                </div>
                                            )}
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
                    <div className="dishes-add-element-container">
                        <h2>holaaaaaaaaaaa</h2>
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