import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Link as LinkRoute } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import logo from "./img/FPC-Logo.jpg"


class AdminButton extends Component {

  render() {
      return (
          <div>
            <Grid container spacing={3} style={{alignItems:'center'}}>
              <Grid item xs={12} sm={6}>
                <div style={{display:'flex'}}>
                  <img src={logo} width={100} height={100} alt={"logo"}/> 
                  <div style={{display: 'inline-flex', alignItems: 'center'}}>
                    LAFPC Food System Dashboard
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} style={{textAlign:"right"}}>
                <Button 
                component={ LinkRoute } 
                to='/SignIn' 
                color="inherit"
                variant="outlined"
                style={{margin:'20px'}}
                >
                  Admin
                </Button>
              </Grid>
            </Grid>
          </div>
      )
  }
}

export default AdminButton;