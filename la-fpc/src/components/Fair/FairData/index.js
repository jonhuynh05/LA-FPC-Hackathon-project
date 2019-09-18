import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { display } from '@material-ui/system';

class FairData extends Component{

  state = {
    value: 'fair',
    indicator: '',
    baseline: '',
    update: '',
    sources: '',
    change: '',
    notes: '',
    dataStatus: '',
    group: ''
  }

  onInputChange = (e) => { this.setState({ [e.target.name]: e.target.value }) 
  };

  validate = () => {
    if(
      (this.state.indicator.length < 1) ||
      (this.state.baseline.length < 1) ||
      (this.state.update.length < 1) ||
      (this.state.sources.length < 1) ||
      (this.state.change.length < 1) ||
      (this.state.notes.length < 1) ||
      (this.state.dataStatus.length < 1) ||
      (this.state.group.length < 1) 
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
    console.log(' add data hitting')
    e.preventDefault();
    const isValid = this.validate();
    if(isValid) {
        console.log(this.props)
        const dataCall = this.props.addData(this.state);
        dataCall.then((data) => {
          console.log(data, 'this is data from register')
          this.props.history.push('/fair')
        })
    }
  }

  render(){
    return(
      <div>
        <h1>Fair form</h1>
        <form onSubmit={this.submit}>
          <div>
            <TextField 
              label='indicator'
              type="text" 
              placeholder="indicatoer" 
              name="indicator" 
              onChange={this.onInputChange} 
              margin="normal"
              variant="outlined"
              style={{margin: "10px"}}
            />
          </div>
          <div>
            <TextField 
              label='baseline'
              type="text" 
              placeholder="baseline" 
              name="baseline" 
              onChange={this.onInputChange}
              margin="normal"
              variant="outlined"
              style={{margin: "10px"}}
            />
          </div>
          <div>
            <TextField
              label='update'
              type="text" 
              placeholder="update" 
              name="update" 
              onChange={this.onInputChange}
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
              onChange={this.onInputChange} 
              margin="normal"
              variant="outlined"
              style={{margin: "10px"}}
            />
          </div>
          <div>
            <TextField 
              label='change'
              type="text" 
              placeholder="change" 
              name="change" 
              onChange={this.onInputChange} 
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
              onChange={this.onInputChange} 
              margin="normal"
              variant="outlined"
              style={{margin: "10px"}}
            />
          </div>
          <div>
            <TextField 
              label='data status'
              type="text" 
              placeholder="data status" 
              name="dataStatus" 
              onChange={this.onInputChange} 
              margin="normal"
              variant="outlined"
              style={{margin: "10px"}}
            />
          </div>
          <div>
            <TextField 
              label='group'
              type="text" 
              placeholder="group" 
              name="group" 
              onChange={this.onInputChange} 
              margin="normal"
              variant="outlined"
              style={{margin: "10px"}}
            />
          </div>
              <small>{this.state.error}</small>
            </div>
          </div>
          <Button type="submit" variant="outlined" style={{margin: "10px"}}>Submit</Button>
        </form>
      </div>
    )
  }
}

export default withRouter(FairData);