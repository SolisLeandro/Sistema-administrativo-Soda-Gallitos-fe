import React from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import Sidebar from "../../components/sidebar/sidebar"
import Admin from "../admin/admin"
import Dishes from "../dishes/dishes"
import Elements from "../elements/elements"
import Tables from "../tables/tables"
import Kitchen from "../kitchen/kitchen"

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
                    <Route path="/home/dishes"> <Dishes></Dishes></Route>
                    <Route path="/home/elements"> <Elements></Elements></Route>
                    <Route path="/home/tables"> <Tables></Tables></Route>
                    <Route path="/home/kitchen"><Kitchen></Kitchen></Route>
                </Switch>
            </div>
        </div>
    )
}

export default Home