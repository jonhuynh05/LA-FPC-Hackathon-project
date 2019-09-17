import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Link as LinkRoute } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class AdminButton extends Component {

  render() {
      return (
          <div>
              <Button 
              component={ LinkRoute } 
              to='/SignIn' 
              color="inherit"
              variant="outlined" 
              style={{marginLeft: 'auto'}}>
                Admin
              </Button>
          </div>
      )
  }
}

export default AdminButton;