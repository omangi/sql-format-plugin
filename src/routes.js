import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Format from './pages/Format/index';
import Query from './pages/Query/index';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path = "/" component={Format} />
            <Route exact path = "/query" component={Query} />

            {/*<Route exact path = "/script" component={Script} />*/}
        </Switch>
    </BrowserRouter>
)

export default Routes;