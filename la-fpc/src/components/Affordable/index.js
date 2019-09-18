import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import AffordableData from './AffordableData';
import EditAffordable from './EditAffordable';
import AffordableChart from '../AffordableChart';

import {
  Container,
  Table,
  Row,
  TableData,
  Button,
  H1,
  P
} from './styled'

class Affordable extends Component {

  state = {
    affordableData: [],
    showEditModal: false,
    editData: {
      _id: null,
      value:'affordable',
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
      const affordData = oldData.data.filter(data => data.value === 'affordable')
      console.log(affordData, 'this is affordable data')
      this.setState({
        affordableData: affordData
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
          const editDataArray = this.state.affordableData.map((data) => {
            if(data._id === editResponse.data._id){
              data = editResponse.data
            }
            return data
          });
          this.setState({
            affordableData: editDataArray,
            showEditModal: false
          })
          console.log(editResponse, ' editResponse');
          this.props.history.push('/affordable')
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
        affordableData: this.state.affordableData.filter((data) => data._id !== id)
      })
    } catch(err){
      console.log(err);
      return err
    }
  }

    render(){
      const { affordableData, editData, showEditModal } = this.state;
        return(

          <Container>
            {
              showEditModal
              ?
              <EditAffordable closeAndEdit={this.closeAndEdit} editData={editData} handleFormChange={this.handleFormChange}/>
              :
              null
            }
            <Table>
              {
                affordableData.map((data, i) => {
                  return (
                    <Row key={i}>
                      <TableData>
                        <Button onClick={() => this.editData(data)}>Edit</Button>
                        <Button onClick={() => this.delete(data._id)}>Delete</Button>
                      </TableData>
                      <TableData>
                        <H1>Indicator</H1>
                        <P>{data.indicator}</P>
                      </TableData>
                      <TableData>
                        <H1>Baseline</H1>
                        <P>{data.baseline}</P>
                      </TableData>
                      <TableData>
                        <H1>uPdate</H1>
                        <P>{data.update}</P>
                      </TableData>
                      <TableData>
                        <H1>Sources</H1>
                        <P>{data.sources}</P>
                      </TableData>
                      <TableData>
                        <H1>Change</H1>
                        <P>{data.change}</P>
                      </TableData>
                      <TableData>
                        <H1>Notes</H1>
                        <P>{data.notes}</P>
                      </TableData>
                      <TableData>
                        <H1>Data Status</H1>
                        <P>{data.dataStatus}</P>
                      </TableData>
                      <TableData>
                        <H1>Group</H1>
                        <P>{data.group}</P>
                      </TableData>
                    </Row>
                  )
                })
              }
            </Table>
            <AffordableData addData={this.addData}/>
          </Container>
        )
    }
}

export default withRouter(Affordable)