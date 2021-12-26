import React, { useEffect, useState } from "react"
import "./elements.css"
import editPenIcon from '../../assets/imgs/editPen.svg'
import cancelIcon from '../../assets/imgs/cancel.svg'
import trashIcon from '../../assets/imgs/trash.svg'

const Elements = () => {
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

    const [currentElementEdit, setCurrentElementEdit] = useState({})
    const [currentNameEdit, setCurrentNameEdit] = useState("")
    const [currentPriceEdit, setCurrentPriceEdit] = useState("")

    const [currentNameAdd, setCurrentNameAdd] = useState("")
    const [currentPriceAdd, setCurrentPriceAdd] = useState("")

    function closeAddPanel() {
        setAddMode(!addMode)
        setCurrentNameAdd("")
        setCurrentPriceAdd("")
    }

    function inputOnKeyDown(event) {
        if (event.key === 'Enter' && editMode) {
            //update
        }
    }
    return (
        <div className="elements-general-div">
            <h1 className="elements-title">Opciones Elementos</h1>


            <div style={{ display: "flex", height: "73%" }}>
                <div className="elements-column">
                    <h2 className="elements-subtitle">Elementos</h2>
                    <div className="elements-card-container" style={{ marginRight: "15%" }}>
                        <div className="elements-container">
                            {elementsData.map((element) => {
                                return (
                                    <div className="elements-element-container">
                                        {editMode && element.id == currentElementEdit.id ?
                                            (
                                                <input type="text"
                                                    className="elements-input"
                                                    value={currentNameEdit}
                                                    onKeyDown={inputOnKeyDown}
                                                    onChange={(evt) => { setCurrentNameEdit(evt.target.value) }}
                                                />
                                            ) :
                                            (
                                                <h4 className="elements-text">{element.name}</h4>
                                            )
                                        }

                                        <div style={{ display: "flex" }}>
                                            {editMode && element.id == currentElementEdit.id ?
                                                (
                                                    <input type="text"
                                                        className="elements-input"
                                                        style={{ width: "100px" }}
                                                        value={currentPriceEdit}
                                                        onKeyDown={inputOnKeyDown}
                                                        onChange={(evt) => { setCurrentPriceEdit(evt.target.value) }}
                                                    />
                                                ) :
                                                (
                                                    <h4 className="elements-text" style={{ whiteSpace: "nowrap" }}>{element.price}</h4>
                                                )
                                            }

                                            {deleteMode ?
                                                (
                                                    <img src={trashIcon} style={{ marginLeft: "10px", width: "24px", cursor: "pointer" }}></img>
                                                ) :
                                                (
                                                    editMode && element.id == currentElementEdit.id ?
                                                        (
                                                            <img src={cancelIcon}
                                                                style={{ marginLeft: "4px", width: "30px", cursor: "pointer" }}
                                                                onClick={() => {
                                                                    setEditMode(!editMode)
                                                                }}>

                                                            </img>
                                                        ) :
                                                        (
                                                            <img src={editPenIcon}
                                                                style={{ marginLeft: "10px", cursor: "pointer" }}
                                                                onClick={() => {
                                                                    setEditMode(!editMode)
                                                                    setCurrentElementEdit(element)
                                                                    setCurrentNameEdit(element.name)
                                                                    setCurrentPriceEdit(element.price)
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
                        <div className="elements-buttons-row">
                            <button className={deleteMode ? "elements-button-disabled" : "elements-button"}
                                disabled={deleteMode}
                                onClick={() => {
                                    setAddMode(!addMode)
                                    setEditMode(false)
                                }}>
                                Añandir elemento
                            </button>
                            <button className={addMode ? "elements-button-disabled" : "elements-button"}
                                disabled={addMode}
                                onClick={() => {
                                    setDeleteMode(!deleteMode)
                                    setEditMode(false)
                                }}>
                                Eliminar adicional
                            </button>
                        </div>
                    </div>
                </div>
                <div className="elements-column">
                    {addMode ?
                        (
                            <div>
                                <h2 className="elements-subtitle">Nuevo Elemento</h2>
                                <div className="elements-card-container" style={{ height: "80%" }}>
                                    <div className="elements-container">
                                        <div className="elements-element-container">
                                            <h4 className="elements-text" style={{ whiteSpace: "nowrap" }}>Nombre</h4>
                                            <input type="text"
                                                className="elements-input"
                                                style={{ width: "200px" }}
                                                value={currentNameAdd}
                                                onKeyDown={inputOnKeyDown}
                                                onChange={(evt) => { setCurrentNameAdd(evt.target.value) }}
                                            />
                                        </div>
                                        <div className="elements-element-container">
                                            <h4 className="elements-text" style={{ whiteSpace: "nowrap" }}>Precio</h4>
                                            <input type="text"
                                                className="elements-input"
                                                style={{ width: "200px" }}
                                                value={currentPriceAdd}
                                                onKeyDown={inputOnKeyDown}
                                                onChange={(evt) => { setCurrentPriceAdd(evt.target.value) }}
                                            />
                                        </div>
                                    </div>
                                    <div className="elements-buttons-row">
                                        <button className="elements-button"
                                            onClick={() => { closeAddPanel(!addMode) }}>
                                            Añandir
                                        </button>
                                        <button className="elements-button"
                                            onClick={() => { closeAddPanel(!addMode) }}>
                                            Cancelar
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
    )
}

export default Elements