import React from "react"
import {Link} from "react-router-dom"
import "./sidebar.css"

const Sidebar = () => {
    function logOut(){
        console.log("sesion cerrada")
    }
    return (
        <div className="sidebar-general-div">
            <div>
                <Link to="/home" className="sidebar-title">SODA GALLITOS</Link>
                <div className="sidebar-buttons-div">
                    <Link to="admin" className="sidebar-button">Administrador</Link>
                    <Link to="kitchen" className="sidebar-button">Cocina</Link>
                    <Link to="cashier" className="sidebar-button">Caja</Link>
                </div>
            </div>
            <Link to="/" className="sidebar-logOut" onClick={logOut}>Cerrar Sesión</Link>
        </div>
    )
}

export default Sidebar