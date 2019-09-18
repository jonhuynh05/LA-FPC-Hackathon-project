import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Link as LinkRoute } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import logo from "./img/FPC-Logo.jpg"


class AdminButton extends Component {

  render() {
      return (
          <div style={{marginLeft: '30px', marginRight: '30px'}}>
            <Grid container spacing={3} style={{alignItems:'center'}}>
              <Grid item xs>
                <div style={{display:'flex'}}>
                  <a href='https://www.goodfoodla.org/'><img src={logo} width={100} height={100} alt={"logo"} /></a> 
                </div>
              </Grid>
              <Grid item xs>
                <div>
                  <div style={{textAlign:'center', alignItems: 'center'}}>
                    <Button size='large' component={ LinkRoute } to='/home'>
                      LAFPC Food System Dashboard
                    </Button>
                  </div>
                </div>
              </Grid>
              <Grid item xs style={{textAlign:"right"}}>
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