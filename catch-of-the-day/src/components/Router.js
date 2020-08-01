import React from "react";
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import StorePicker from "./StorePicker";
import App from "./App";
import NotFound from "./NotFound";


const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={StorePicker}/>
            <Route exact component={NotFound}/>

        </Switch>
    </BrowserRouter>
);
export default Router;