import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Homepage from '../Homepage'


class App extends Component {
    render() {
        return (
            <div>
                <h1>Hi</h1>
                <Homepage />
            </div>
        )
    }
}

export default App