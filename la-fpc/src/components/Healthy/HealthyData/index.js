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

class HealthyData extends Component{

  state = {
    category: 'healthy',
    group: '',
    subgroup: '',
    indicator: '',
    sources: '',
    baseline: '',
    firstUpdate: '',
    secondUpdate: '',
    trend: '',
    notes: '',
    error: ''
  }

  onInputChange = (e) => { this.setState({ [e.target.name]: e.target.value }) 
  };

  validate = () => {
    if(
      (this.state.indicator.length < 1) ||
      (this.state.baseline.length < 1) ||
      (this.state.firstUpdate.length < 1) ||
      (this.state.secondUpdate.length < 1) ||
      (this.state.trend.length < 1)
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
          this.props.history.push('/healthy')
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
              placeholder="group"
              name="group"
              onChange={this.onInputChange}
            />
          </DivInput>
          <DivInput>
            <Input
              type="text"
              placeholder="subgroup"
              name="subgroup"
              onChange={this.onInputChange}
            />
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
              placeholder="2013 value"
              name="baseline"
              onChange={this.onInputChange}
            />
          </DivInput>
          <DivInput>
            <Input
              type="text"
              placeholder="2017 value"
              name="firstUpdate"
              onChange={this.onInputChange}
            />
          </DivInput>
          <DivInput>
            <Input
              type="text"
              placeholder="2020 value"
              name="secondUpdate"
              onChange={this.onInputChange}
            />
          </DivInput>
          <DivInput>
            <Input
              type="text"
              placeholder="trend"
              name="trend"
              onChange={this.onInputChange}
            />
          </DivInput>
        </Form>
      </Container>
    )
  }
}

export default withRouter(HealthyData);