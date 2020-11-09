import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Content from './pages/Content'
import NavBar from './components/navbar'

const router = (
    <BrowserRouter>
        <NavBar />
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/content">
                <Content />
            </Route>
        </Switch>
    </BrowserRouter>
)

render(router, document.getElementById('root'))
