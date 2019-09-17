import React, { Component } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import { Link as LinkRoute } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class Navbar extends Component {
    render() {
        return (
          <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ButtonGroup fullWidth aria-label="full width outlined button group">
                        <Button component={ LinkRoute } to='/sustainable' color="inherit">
                            Sustainable
                        </Button>
                        <Button component={ LinkRoute } to='/healthy' color="inherit">
                            Health
                        </Button>
                        <Button component={ LinkRoute } to='/affordable' color="inherit">
                            Affordability
                        </Button>
                        <Button component={ LinkRoute } to='/fair' color="inherit">
                            Fairness
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
          </div>
        )
    }
}


export default Navbar