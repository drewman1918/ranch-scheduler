import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Year from './Components/Scheduler/Year'
import AddUser from './Components/AddUser/AddUser'

const routes = (
    <Switch>
        <Route path='/scheduler' component={Year} />
        <Route path='/addUser' component={AddUser} />
    </Switch>
)

export default routes