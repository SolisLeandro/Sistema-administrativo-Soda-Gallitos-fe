import React, { useEffect, useState } from "react"
import "./elements.css"
import editPenIcon from '../../assets/imgs/editPen.svg'
import cancelIcon from '../../assets/imgs/cancel.svg'
import trashIcon from '../../assets/imgs/trash.svg'
import { createElement, updateElement, deleteElement, getElements } from "../../helpers/dbControllers/elementsDTO"
import Swal from "sweetalert2"

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

    //CRUD
    //Create
    async function createElementFunction() {
        var response = await createElement(currentNameAdd, 0, currentPriceAdd)
        if (response.status == 200) {
            getElementsInfo()
            Swal.fire("¡Elemento creado correctamente!", "", "success")
        } else {
            Swal.fire("¡Error al crear el elemento!", "Ocurrio un error al obtener la respuesta del servidor", "error")
            console.log(response)
        }
        closeAddPanel(!addMode)
    }

    //Read
    async function getElementsInfo() {
        var elementsResponse = await getElements()
        if(elementsResponse.status == 200){
            if (elementsResponse.data) {
                var elements = elementsResponse.data.map((element) => {
                    return { id: element.Id, name: element.Nombre, price: element.Precio }
                })
                setElementsData(elements)
                return
            }
        }
        Swal.fire("¡Error al obtener los elementos!", "Ocurrio un error al obtener la respuesta del servidor", "error")
    }

    //Update
    async function updateElementFunction() {
        var response = await updateElement(currentElementEdit.id, currentNameEdit, 0, currentPriceEdit)
        if (response.status == 200) {
            getElementsInfo()
            Swal.fire("¡Elemento actualizado correctamente!", "", "success")
        } else {
            Swal.fire("¡Error al actualizar el elemento!", "Ocurrio un error al obtener la respuesta del servidor", "error")
            console.log(response)
        }
        setEditMode(!editMode)
    }

    //Delete
    async function deleteElementFunction(element){
        var response = await deleteElement(element.id)
        if (response.status == 200) {
            getElementsInfo()
            Swal.fire("¡Elemento eliminado correctamente!", "", "success")
        } else {
            Swal.fire("¡Error al eliminar el elemento!", "Ocurrio un error al obtener la respuesta del servidor", "error")
            console.log(response)
        }
        setDeleteMode(!deleteMode)
    }

    //------------------------

    function closeAddPanel() {
        setAddMode(!addMode)
        setCurrentNameAdd("")
        setCurrentPriceAdd("")
    }

    async function inputOnKeyDown(event) {
        if (event.key === 'Enter' && editMode) {
            await updateElementFunction()
        }
    }

    useEffect(() => {
        getElementsInfo()
    }, [])
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
                                    <div key={element.id} className="elements-element-container">
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
                                                    <img src={trashIcon} style={{ marginLeft: "10px", width: "24px", cursor: "pointer" }}
                                                        onClick={async() => { deleteElementFunction(element) }}>
                                                    </img>
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
                                Añadir elemento
                            </button>
                            <button className={addMode ? "elements-button-disabled" : "elements-button"}
                                disabled={addMode}
                                onClick={() => {
                                    setDeleteMode(!deleteMode)
                                    setEditMode(false)
                                }}>
                                Eliminar elemento
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
                                            onClick={async () => { createElementFunction() }}>
                                            Añadir
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