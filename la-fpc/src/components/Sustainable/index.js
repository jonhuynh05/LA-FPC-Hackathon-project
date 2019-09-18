import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import SustainableData from './SustainableData';
import EditSustainable from './EditSustainable';
import Donut from './SustainableChart';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


import {
  Container,
  DivDataModal,
  ContainModal,
  Table,
  Row,
  TableData,
  TableDataHeader,
  TableDataButton,
  H1,
  P
} from './style'

class Sustainable extends Component {

  state = {
    sustainableData: [],
    showEditModal: false,
    showDataModal: false,
    dataModalProperty: '',
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
      const sustainData = oldData.data.filter(data => data.value === 'sustainable')
      this.setState({
        sustainableData: sustainData
      })

    }catch (err) {
      console.log(err)
    }
  }

  addData = async (data) => {
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
        sustainableData: [...this.state.sustainableData, parsedResponse.data]
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
    e.preventDefault();
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

  cancelEdit = () => {
    this.setState({
      showEditModal: false
    })
  }

  delete = async (id) => {
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

  closeDataModal = () => {
    this.setState({
      showDataModal: false
    })
  }

  showData = e => {
    this.setState({
      showDataModal: !this.state.showDataModal,
      dataModalProperty: e.target.textContent
    })
  }

    render(){
      const { sustainableData, editData, showEditModal, showDataModal, dataModalProperty } = this.state;
      const { isLogged } = this.props.isLogged
        return(
          <Container>
            {
              showEditModal
              ?
              <EditSustainable  cancelEdit={this.cancelEdit} closeAndEdit={this.closeAndEdit} editData={editData} handleFormChange={this.handleFormChange}/>
              :
              null
            }
            {
              showDataModal
              ?
              <DivDataModal onClick={() => this.closeDataModal()}>
                <ContainModal>
                  {dataModalProperty}
                </ContainModal>
              </DivDataModal>
              :
              null
            }
            <Table>
              <Row>
                <TableDataHeader>ADMIN</TableDataHeader>
                <TableDataHeader><H1>Indicator</H1></TableDataHeader>
                <TableDataHeader><H1>Baseline</H1></TableDataHeader>
                <TableDataHeader><H1>Update</H1></TableDataHeader>
                <TableDataHeader><H1>Sources</H1></TableDataHeader>
                <TableDataHeader><H1>Change</H1></TableDataHeader>
                <TableDataHeader><H1>Notes</H1></TableDataHeader>
                <TableDataHeader><H1>Data Status</H1></TableDataHeader>
                <TableDataHeader><H1>Group</H1></TableDataHeader>
              </Row>
              {
                sustainableData.map((data, i) => {
                  return (
                    <Row key={i}>
                      <TableDataButton>
                        <Button onClick={() => this.editData(data)}><EditIcon /></Button>
                        <Button onClick={() => this.delete(data._id)}><DeleteIcon /></Button>
                      </TableDataButton>
                      <TableData onClick={(e) => this.showData(e)}>
                        <P>{data.indicator}</P>
                      </TableData>
                      <TableData onClick={(e) => this.showData(e)}>
                        <P>{data.baseline}</P>
                      </TableData>
                      <TableData onClick={(e) => this.showData(e)}>
                        <P>{data.update}</P>
                      </TableData>
                      <TableData onClick={(e) => this.showData(e)}>
                        <P>{data.sources}</P>
                      </TableData>
                      <TableData onClick={(e) => this.showData(e)}>
                        <P>{data.change}</P>
                      </TableData>
                      <TableData onClick={(e) => this.showData(e)}>
                        <P>{data.notes}</P>
                      </TableData>
                      <TableData onClick={(e) => this.showData(e)}>
                        <P>{data.dataStatus}</P>
                      </TableData>
                      <TableData onClick={(e) => this.showData(e)}>
                        <P>{data.group}</P>
                      </TableData>
                    </Row>
                  )
                })
              }
            </Table>
            <SustainableData addData={this.addData}/>
            <div style={{display:'flex'}}>
              <div>
                toolkit placeholder
              </div>
              <div>
                <Donut sustainableData={this.state.sustainableData} />
              </div>
            </div>
          </Container>
        )
    }
}

export default withRouter(Sustainable)