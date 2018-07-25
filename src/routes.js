import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Year from './Components/Scheduler/Year'

const routes = (
    <Switch>
        <Route path='/scheduler' component={Year} />
    </Switch>
)

export default routes