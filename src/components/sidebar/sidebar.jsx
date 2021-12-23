import React from "react"
import {Link} from "react-router-dom"
import "./sidebar.css"

const Sidebar = () => {
    function logOut(){
        console.log("sesion cerrada")
    }
    return (
        <div className="topbar-general-div">
            <div>
                <Link to="/home" className="topbar-title">SODA GALLITOS</Link>
                <div className="topbar-buttons-div">
                    <Link to="admin" className="topbar-button">Administrador</Link>
                    <Link to="kitchen" className="topbar-button">Cocina</Link>
                    <Link to="cashier" className="topbar-button">Caja</Link>
                </div>
            </div>
            <Link to="/" className="topbar-logOut" onClick={logOut}>Cerrar Sesión</Link>
        </div>
    )
}

export default Sidebar