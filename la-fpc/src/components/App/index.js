import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Homepage from '../Homepage'
import SignIn from '../SignIn';


class App extends Component {
    render() {
        return (
            <div>
                <h1>Hi</h1>
                <Homepage />
                <SignIn />
            </div>
        )
    }
}

export default App