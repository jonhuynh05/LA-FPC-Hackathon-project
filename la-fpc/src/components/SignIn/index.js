import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Link as LinkRoute } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class SignIn extends Component {

  state = {
    name: '',
    password: '',
  }

  onInputChange = (e) => { this.setState({ [e.target.name]: e.target.value }) 
  };

  validate = () => {
    if (this.state.username.length < 1) {
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
      }else{
        return true

      }
  };

  submit = async (e) => {
    console.log('hitting')
    e.preventDefault();
    const isValid = this.validate();
    if(isValid) {
        console.log(this.props)
        const registerCall = this.props.register(this.state);
        registerCall.then((data) => {
          console.log(data, 'this is data from register')
          this.props.history.push('/admin-home')
        })
    }
  }

  render() {
      return (
          <div>
              <h1 style={{marginLeft: "300px"}}>SignIn</h1>
              <form onSubmit={this.submit}>
                <div>
                  <TextField
                    label='Username' 
                    type="text" 
                    placeholder="username" 
                    name="username" 
                    onChange={this.onInputChange}
                    margin="normal"
                    variant="outlined"
                    style={{margin: "10px 10px 10px 300px"}}
                  />
                  <div>
                    <small></small>
                  </div>
                </div>
                <div>
                  <TextField 
                    type="Password" 
                    placeholder="password" 
                    name="password" 
                    onChange={this.onInputChange}
                    margin="normal"
                    variant="outlined"
                    style={{margin: "10px 10px 10px 300px"}} 
                  />
                  <div>
                    <small></small>
                  </div>
                </div>
                <Button
                  type="submit" 
                  variant="outlined" 
                  style={{margin: "10px 10px 10px 300px"}}>
                    SignIn
                  </Button>
              </form>
              <Button 
              component={ LinkRoute } 
              to='/AddAdmin' 
              color="inherit"
              variant="outlined" 
              style={{margin: "10px 10px 10px 300px"}}>
                SignUp
              </Button>
          </div>
      )
  }
}

export default SignIn