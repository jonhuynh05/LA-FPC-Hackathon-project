import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Homepage from '../Homepage'
import SignIn from '../SignIn';
import AddAdmin from '../addAdmin'


class App extends Component {

  state = {
    user: null,
    laoding: true,
    isLogged: false
  }

  register = async (data) => {
    try {
      const registerResponse = await fetch(`http://localhost3030/admin/register-admin`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const parsedResponse = await registerResponse.json()

      this.setState({
        user: parsedResponse.data,
        laoding: false
      })

    } catch(err) {
      console.log(err, 'this is error from register')
    }
  }



    render() {
      const { register } = this.register
        return (
          <div>
            <div>NAV BAR</div>
            <Switch>
              <Route exact path='/' render={(props) =>  <AddAdmin register={register}  {...props} />} />
              <Route exact path='/home' render={(props) =>  <Homepage {...props} />} />
            </Switch>
          </div>
        )
    }
}

export default App