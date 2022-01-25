import React, { useEffect, useState } from "react"
import "./login.css"
import loginImg from '../../assets/imgs/loginImg.svg'



const Login = () => {
    const [password, setPassword] = useState("")
    const [user, setUser] = useState("")

    return (
        <div className="login-general-div">
            <div className="login-column" style={{ backgroundImage: `url(${loginImg})` }}>
                <h1 className="login-banner-title">Soda Gallitos</h1>
                <h2 className="login-banner-subtitle">Administrativo</h2>
            </div>

            <div className="login-column">
                <div className="login-form-container">
                    <div className="login-form-container-inputs">
                        <div className="login-form-column">
                            <h2 className="login-form-text">Nombre de usuario:</h2>
                            <h2 className="login-form-text">Contraseña:</h2>
                        </div>
                        <div className="login-form-column">
                            <input type="text"
                                className="login-input"
                                value={password}
                                onChange={(evt) => { setPassword(evt.target.value) }}
                            />
                            <input type="password"
                                className="login-input"
                                value={user}
                                onChange={(evt) => { setUser(evt.target.value) }}
                            />
                        </div>
                    </div>
                    
                    <a href="/home">
                        <button className="login-button">
                            Iniciar sesión
                        </button>
                    </a>

                </div>
            </div>

        </div>
    )
}

export default Login

