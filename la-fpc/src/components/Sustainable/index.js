import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import SustainableData from './SustainableData';
import EditSustainable from './EditSustainable';

import {
  DescribSec,
  DescribPar
} from './style'

class Sustainable extends Component {

  state = {
    sustainableData: [],
    showEditModal: false,
    editData: {
      _id: null,
      value:'sustainable',
      indicator: '',
      baseline: '',
      update: '',
      sources: '',
      change: '',
      notes: '',
      dataStatus: '',
      group: '',
      error: ''
    },
  }

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    try { 
      const data = await fetch(`http://localhost:3030/data/get-data`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const oldData = await data.json()
      console.log(oldData.data)
      const sustainData = oldData.data.filter(data => data.value === 'sustainable')
      console.log(sustainData, 'this is sustain data')
      this.setState({
        sustainableData: sustainData
      })

    }catch (err) {
      console.log(err)
    }
  }

  addData = async (data) => {
    console.log("add data hitting")
    try {
      const addDataResponse = await fetch(`http://localhost:3030/data/add-data`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const parsedResponse = await addDataResponse.json()

      this.setState({
        user: parsedResponse.data,
        laoding: false
      })

    } catch(err) {
      console.log(err, 'this is error from add data')
    }
  }
  
  handleFormChange = (e) => {
    this.setState({
      editData: {
        ...this.state.editData, 
        [e.target.name]: e.target.value
      }
    })
  }

  closeAndEdit = async (e) => {
    console.log(' add data hitting')
    e.preventDefault();
    console.log(this.state, 'this is edit state')
        try {
          const editRequest = await fetch(`http://localhost:3030/data/${this.state.editData._id}/update-data`, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(this.state.editData),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          if(editRequest.status !== 200){
            throw Error('editResquest not working')
          }
          const editResponse = await editRequest.json();
          console.log(editRequest, 'this is edit request')
          const editDataArray = this.state.sustainableData.map((data) => {
            if(data._id === editResponse.data._id){
              data = editResponse.data
            }
            return data
          });
          this.setState({
            sustainableData: editDataArray,
            showEditModal: false
          })
          console.log(editResponse, ' editResponse');
          this.props.history.push('/sustainable')
        } catch(err){
          console.log(err, ' error closeAndEdit');
          return err
        }
    }

  editData = (data) => {
    this.setState({
      showEditModal: !this.showEditModal,
      editData: data
    })
  }

  delete = async (id) => {
    console.log(id, ' delete data ID')
    try {
      const deleteData = await fetch(`http://localhost:3030/data/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if(deleteData.status !== 200){
        throw Error('Something happend on delete')
      }
      const deleteDataJson = await deleteData.json();
      this.setState({
        sustainableData: this.state.sustainableData.filter((data) => data._id !== id)
      })
    } catch(err){
      console.log(err);
      return err
    }
  }

    render(){
      const { sustainableData, editData, showEditModal } = this.state;
        return(
          <div>
            <DescribSec>
              <h1>Sustainable</h1>
              <DescribPar>Food is integral to the health and quality of life of individuals and communities. Healthy food is nutritious, delicious and safe. Healthy food meets recommended dietary guidelines and supports the body’s ability to fight disease and heal. All people deserve access to healthy food that is affordable, conveniently availability and culturally relevant.</DescribPar>
              
              <DescribPar>Not all communities live in neighborhoods where “the healthy choice is the easy choice,” and instead are surrounded by unhealthy food retail such as liquor stores, convenience stores and fast food restaurants. Through the numerous policy, systems and environmental changes led by stakeholders throughout the LAFPC network, we are collectively innovating solutions for overcoming systemic barriers to healthy food access— tailoring these innovations to the unique dynamics of the communities that we serve.</DescribPar>
              
              <DescribPar>In this section, we explore progress towards improving the health of ALL Angelenos by evaluating disparities and change over time in the following categories: Increased healthy food access, Improved eating habits amongst adults & children, Rates of obesity, Rates of diet-related diseases.</DescribPar>
            </DescribSec>
            <SustainableData addData={this.addData}/>
            {
              showEditModal
              ?
              <EditSustainable  closeAndEdit={this.closeAndEdit} editData={editData} handleFormChange={this.handleFormChange}/>
              :
              null
            }
            <div>
              {
                sustainableData.map((data, i) => {
                  return (
                    <div key={i}>
                      <div>
                        <button onClick={() => this.editData(data)}>Edit</button>
                        <button onClick={() => this.delete(data._id)}>Delete</button>
                      </div>
                      <div>
                        <h1>Indicator</h1>
                        <p>{data.indicator}</p>
                      </div>
                      <div>
                        <h1>Baseline</h1>
                        <p>{data.baseline}</p>
                      </div>
                      <div>
                        <h1>update</h1>
                        <p>{data.update}</p>
                      </div>
                      <div>
                        <h1>Sources</h1>
                        <p>{data.sources}</p>
                      </div>
                      <div>
                        <h1>Change</h1>
                        <p>{data.change}</p>
                      </div>
                      <div>
                        <h1>Notes</h1>
                        <p>{data.notes}</p>
                      </div>
                      <div>
                        <h1>Data Status</h1>
                        <p>{data.dataStatus}</p>
                      </div>
                      <div>
                        <h1>Group</h1>
                        <p>{data.group}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        )
    }
}

export default withRouter(Sustainable)