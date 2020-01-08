import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import { display } from '@material-ui/system';

import {
  Container,
  Form,
  Input,
  DivInput,
} from './style'

class AffordableData extends Component{

  state = {
    value: '',
    indicator: '',
    // baseline: '',
    // update: '',
    sources: '',
    // change: '',
    // notes: '',
    // dataStatus: '',
    group: '',
    year: "",
    category: "affordable",
    error: ''
  }

  onInputChange = (e) => { this.setState({ [e.target.name]: e.target.value }) 
  };

  validate = () => {
    if(
      (this.state.indicator.length < 1) ||
      // (this.state.baseline.length < 1) ||
      // (this.state.update.length < 1) ||
      (this.state.sources.length < 1) ||
      // (this.state.change.length < 1) ||
      // (this.state.notes.length < 1) ||
      // (this.state.dataStatus.length < 1) ||
      (this.state.group.length < 1) ||
      (this.state.value.length < 1) ||
      (this.state.year.length < 1)
      ) {
      this.setState({
        error: 'must fill out form, put N/A in empty spaces'
      })
        return false
      } else {
        return true
      }
  };

  submit = async (e) => {
    e.preventDefault();
    const isValid = this.validate();
    if(isValid) {
        console.log(this.props)
        const dataCall = this.props.addData(this.state);
        dataCall.then((data) => {
          this.props.history.push('/affordable')
        })
    }
  }

  render(){
    return(
      <Container>
        <Form>
          <DivInput>
            <Button onClick={this.submit} style={{width: '100%'}}><PublishIcon /></Button>
          </DivInput>
          <DivInput>
            <Input 
              type="text" 
              placeholder="indicator" 
              name="indicator" 
              onChange={this.onInputChange} 
            />
          </DivInput>
          <DivInput>
            <Input
              type="text" 
              placeholder="sources" 
              name="sources" 
              onChange={this.onInputChange} 
            />
          </DivInput>
          <DivInput>
            <Input 
              type="text" 
              placeholder="group" 
              name="group" 
              onChange={this.onInputChange} 
            />
          </DivInput>
          <DivInput>
            <Input 
              type="text" 
              placeholder="year" 
              name="year" 
              onChange={this.onInputChange} 
            />
          </DivInput>
          <DivInput>
            <Input 
              type="text" 
              placeholder="value" 
              name="value" 
              onChange={this.onInputChange} 
            />
          </DivInput>
        </Form>
      </Container>
    )
  }
}

export default withRouter(AffordableData);