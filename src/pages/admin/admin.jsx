import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./admin.css"

const Admin = () => {

    return (
        <div className="admin-general-div">
            <h1 className="admin-title">Opciones administrador</h1>
            <h2 className="admin-subtitle">Configuración</h2>
            <div style={{display:"flex"}}>
                <div className="admin-column" style={{marginRight:"5%"}}>
                    <h3 className="admin-text" style={{marginTop:"0%"}}>Platillos del menú:</h3>
                    <h3 className="admin-text">Elementos de platillos:</h3>
                    <h3 className="admin-text">Mesas del local:</h3>
                </div>
                <div className="admin-column">
                    <Link to="/home/dishes" style={{marginBottom: "25%"}}>
                        <button className="admin-button"> Editar platillos </button>
                    </Link>
                    
                    <Link to="/home/elements" style={{margin: "25% 0%"}}>
                        <button className="admin-button"> Editar elementos </button>
                    </Link>

                    <Link to="/home/tables" style={{margin: "25% 0%"}}>
                        <button className="admin-button"> Editar mesas </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Admin