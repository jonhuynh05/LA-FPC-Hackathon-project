import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CancelIcon from '@material-ui/icons/Cancel';

import {
  Container,
  Form,
  H1,
  Cancel
} from './style'

class EditFair extends Component{
  render(){
    return(
      <Container>
        <Form onSubmit={this.props.closeAndEdit}>
          <Cancel onClick={this.props.cancelEdit}><CancelIcon /></Cancel>
          <H1>Edit Fairness</H1>
          <div>
            <TextField 
              label='Group'
              type="text" 
              placeholder="Group" 
              name="group" 
              value={this.props.editData.group}
              onChange={this.props.handleFormChange} 
              margin="normal"
              variant="outlined"
              style={{margin: "10px"}}
            />
          </div>
          <div>
            <TextField 
              label='subgroup'
              type="text" 
              placeholder="subgroup" 
              name="subgroup"
              value={this.props.editData.subgroup}
              onChange={this.props.handleFormChange}
              margin="normal"
              variant="outlined"
              style={{margin: "10px"}}
            />
          </div>
          <div>
            <TextField
              label='indicator'
              type="text" 
              placeholder="indicator" 
              name="indicator" 
              value={this.props.editData.indicator}
              onChange={this.props.handleFormChange}
              margin="normal"
              variant="outlined"
              style={{margin: "10px"}}
            />
            <div>
            <div>
            <TextField 
              label='sources'
              type="text" 
              placeholder="sources" 
              name="sources"
              value={this.props.editData.sources} 
              onChange={this.props.handleFormChange} 
              margin="normal"
              variant="outlined"
              style={{margin: "10px"}}
            />
          </div>
          <div>
            <TextField 
              label='2013'
              type="text" 
              placeholder="2013" 
              name="baseline" 
              value={this.props.editData.baseline}
              onChange={this.props.handleFormChange}
              margin="normal"
              variant="outlined"
              style={{margin: "10px"}}
            />
          </div>
          <div>
            <TextField 
              label='2017'
              type="text" 
              placeholder="2017" 
              name="firstUpdate" 
              value={this.props.editData.firstUpdate}
              onChange={this.props.handleFormChange}
              margin="normal"
              variant="outlined"
              style={{margin: "10px"}}
            />
          </div>
          <div>
            <TextField 
              label='2020'
              type="text" 
              placeholder="2020" 
              name="secondUpdate" 
              value={this.props.editData.secondUpdate}
              onChange={this.props.handleFormChange} 
              margin="normal"
              variant="outlined"
              style={{margin: "10px"}}
            />
          </div>
          <div>
            <TextField 
              label='notes'
              type="text" 
              placeholder="notes" 
              name="notes" 
              value={this.props.editData.notes}
              onChange={this.props.handleFormChange} 
              margin="normal"
              variant="outlined"
              style={{margin: "10px"}}
            />
          </div>
          <div>
            <TextField 
              label='trend'
              type="text" 
              placeholder="trend" 
              name="trend"
              value={this.props.editData.trend} 
              onChange={this.props.handleFormChange} 
              margin="normal"
              variant="outlined"
              style={{margin: "10px"}}
            />
          </div>
              <small>{this.props.error}</small>
            </div>
          </div>
          <Button type="submit" variant="outlined" style={{margin: "10px"}}>update</Button>
        </Form>
      </Container>
    )
  }
}

export default withRouter(EditFair);