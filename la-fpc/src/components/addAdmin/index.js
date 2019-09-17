import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



class addAdmin extends Component {

  state = {
    name: '',
    password: '',
    repassword: '',
    error: {
      name: '',
      password: '',
    }
  }

  onInputChange = (e) => { this.setState({ [e.target.name]: e.target.value }) 
  };

  validate = () => {
    if (this.state.name.length < 1) {
      this.setState({
        error: {
          name: 'please fill out name!!!'
        }
      })
      return false
    }
    if(
      (this.state.password !== this.state.repassword) || 
      (this.state.password.length < 4) ||
      (this.state.password.search(/[a-z]/) === -1) ||
      (this.state.password.search(/[0-9]/) === -1) ||
      (this.state.password.search(/[A-Z]/) === -1 )
      ) {
      this.setState({
        error: {
          password: 'passwords must match,length of 5 with a upper/lower case letter!!!' 
        }
      })
        return false
      }
    return true
  };

  submit = async (e) => {
    e.preventDefault();

    const isValid = this.validate();
    if(isValid) {
        console.log(this.props)
        const registerCall = this.props.register(this.state);
        registerCall.then((data) => {
          console.log(data, 'this is data from register')
          this.props.history.push('/home')
        })
    }
  }

  render() {
    console.log(this.state)
      return (
          <div>
              <h1>Add Admin</h1>
              <form onSubmit={this.submit}>
                <div>
                  <TextField 
                    label='Username'
                    type="text" 
                    placeholder="Username" 
                    name="username" 
                    onChange={this.onInputChange} 
                    margin="normal"
                    variant="outlined"
                    style={{margin: "10px"}}
                  />
                  <div>
                    <small>{this.state.error.name}</small>
                  </div>
                </div>
                <div>
                  <TextField 
                    label='Password'
                    type="password" 
                    placeholder="password" 
                    name="password" 
                    onChange={this.onInputChange}
                    margin="normal"
                    variant="outlined"
                    style={{margin: "10px"}}
                  />
                </div>
                <div>
                  <TextField
                    label='Retype Password'
                    type="password" 
                    placeholder="repassword" 
                    name="repassword" 
                    onChange={this.onInputChange}
                    margin="normal"
                    variant="outlined"
                    style={{margin: "10px"}}
                  />
                  <div>
                    <small>{this.state.error.password}</small>
                  </div>
                </div>
                <Button variant="outlined" style={{margin: "10px"}}>SignIn</Button>
              </form>
          </div>
      )
  }
}

export default withRouter(addAdmin)