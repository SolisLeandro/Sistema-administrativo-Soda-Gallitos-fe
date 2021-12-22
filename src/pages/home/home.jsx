import React from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import Admin from "../admin/admin"

const Home = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact from="/home" to="/home/admin" />
                <Route path="/home/admin"> <Admin></Admin></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Home