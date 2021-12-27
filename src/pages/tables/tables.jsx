import React, { useEffect, useState } from "react"
import "./tables.css"
import editPenIcon from '../../assets/imgs/editPen.svg'
import cancelIcon from '../../assets/imgs/cancel.svg'
import trashIcon from '../../assets/imgs/trash.svg'
import { createTable, updateTable, deleteTable, getTables } from "../../helpers/dbControllers/tablesDTO"

const Tables = () => {
    const [tablesData, setTablesData] = useState([
        { id: 1, name: "Mesa 1" },
        { id: 2, name: "Mesa 2" },
        { id: 3, name: "Mesa 3" },
        { id: 4, name: "Mesa 4" },
        { id: 5, name: "Mesa 5" },
        { id: 6, name: "Exterior 1" },
        { id: 7, name: "Exterior 2" },
        { id: 8, name: "Exterior 3" }
    ])

    const [deleteMode, setDeleteMode] = useState(false)
    const [addMode, setAddMode] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const [currentTableEdit, setCurrentTableEdit] = useState({})
    const [currentNameEdit, setCurrentNameEdit] = useState("")

    const [currentNameAdd, setCurrentNameAdd] = useState("")

    function closeAddPanel() {
        setAddMode(!addMode)
        setCurrentNameAdd("")
    }

    async function inputOnKeyDown(event) {
        if (event.key === 'Enter' && editMode) {
            await updateTable(currentTableEdit.id,currentNameEdit)
            getTablesInfo()
            setEditMode(!editMode)
        }
    }

    async function getTablesInfo(){
        var tablesResponse = await getTables()
        var tables = tablesResponse.map((element) => {
            return {id: element.Id, name: element.Nombre}
        })
        setTablesData(tables)
    }

    useEffect(() => {
        getTablesInfo()
    }, [])

    return (
        <div className="tables-general-div">
            <h1 className="tables-title">Opciones Mesas</h1>


            <div style={{ display: "flex", height: "73%" }}>
                <div className="tables-column">
                    <h2 className="tables-subtitle">Mesas</h2>
                    <div className="tables-card-container" style={{ marginRight: "15%" }}>
                        <div className="tables-container">
                            {tablesData.map((element) => {
                                return (
                                    <div key={element.id} className="tables-element-container">
                                        {editMode && element.id == currentTableEdit.id ?
                                            (
                                                <input type="text"
                                                    className="tables-input"
                                                    value={currentNameEdit}
                                                    onKeyDown={inputOnKeyDown}
                                                    onChange={(evt) => { setCurrentNameEdit(evt.target.value) }}
                                                />
                                            ) :
                                            (
                                                <h4 className="tables-text">{element.name}</h4>
                                            )
                                        }

                                        <div style={{ display: "flex" }}>
                                            {deleteMode ?
                                                (
                                                    <img src={trashIcon} style={{ marginLeft: "10px", width: "24px", cursor: "pointer" }} 
                                                        onClick={async() => {
                                                            var response = await deleteTable(element.id)
                                                            getTablesInfo()
                                                            setDeleteMode(!deleteMode)
                                                        }}>
                                                    </img>
                                                ) :
                                                (
                                                    editMode && element.id == currentTableEdit.id ?
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
                                                                    setCurrentTableEdit(element)
                                                                    setCurrentNameEdit(element.name)
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
                        <div className="tables-buttons-row">
                            <button className={deleteMode ? "tables-button-disabled" : "tables-button"}
                                disabled={deleteMode}
                                onClick={() => {
                                    setAddMode(!addMode)
                                    setEditMode(false)
                                }}>
                                Añadir mesa
                            </button>
                            <button className={addMode ? "tables-button-disabled" : "tables-button"}
                                disabled={addMode}
                                onClick={() => {
                                    setDeleteMode(!deleteMode)
                                    setEditMode(false)
                                }}>
                                Eliminar mesa
                            </button>
                        </div>
                    </div>
                </div>
                <div className="tables-column">
                    {addMode ?
                        (
                            <div>
                                <h2 className="tables-subtitle">Nueva Mesa</h2>
                                <div className="tables-card-container" style={{ height: "80%" }}>
                                    <div className="tables-container">
                                        <div className="tables-element-container">
                                            <h4 className="tables-text" style={{ whiteSpace: "nowrap" }}>Nombre</h4>
                                            <input type="text"
                                                className="tables-input"
                                                style={{ width: "200px" }}
                                                value={currentNameAdd}
                                                onKeyDown={inputOnKeyDown}
                                                onChange={(evt) => { setCurrentNameAdd(evt.target.value) }}
                                            />
                                        </div>
                                    </div>
                                    <div className="tables-buttons-row">
                                        <button className="tables-button"
                                            onClick={async() => { 
                                                await createTable(currentNameAdd) 
                                                getTablesInfo()
                                                closeAddPanel(!addMode)
                                            }}>
                                            Añadir
                                        </button>
                                        <button className="tables-button"
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

export default Tables