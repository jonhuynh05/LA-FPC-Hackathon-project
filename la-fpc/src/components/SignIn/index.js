import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'


class SignIn extends Component {

  state = {
    name: '',
    password: '',
  }

  onInputChange = (e) => { this.setState({ [e.target.name]: e.target.value }) 
  };

  render() {
      return (
          <div>
              <h1>SignIn</h1>
              <form onSubmit={this.submit}>
                <div>
                  <input type="text" placeholder="name" name="name" onChange={this.onInputChange} />
                  <div>
                    <small></small>
                  </div>
                </div>
                <div>
                  <input type="password" placeholder="password" name="password" onChange={this.onInputChange} />
                  <div>
                    <small></small>
                  </div>
                </div>
                <button>SignIn</button>
              </form>
          </div>
      )
  }
}

export default SignIn