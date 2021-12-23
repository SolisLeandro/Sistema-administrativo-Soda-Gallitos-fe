import React from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import Admin from "../admin/admin"
import Sidebar from "../../components/sidebar/sidebar"

const Home = () => {
    return (
        <div style={{display: "flex", width: "100%"}}>
            <div style={{ display: "flex", flex: "1" }}>
                <Sidebar></Sidebar>
            </div>
            <div style={{ display: "flex", flex: "4" }}>
                <Switch>
                    <Redirect exact from="/home" to="/home/admin" />
                    <Route path="/home/admin"> <Admin></Admin></Route>
                </Switch>
            </div>
        </div>
    )
}

export default Home