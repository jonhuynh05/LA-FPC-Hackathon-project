import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import FairData from './FairData';
import EditFair from './EditFair';

class Fair extends Component {

  state = {
    fairData: [],
    showEditModal: false,
    editData: {
      _id: null,
      value:'fair',
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
      const fairData = oldData.data.filter(data => data.value === 'fair')
      console.log(fairData, 'this is fair data')
      this.setState({
        fairData: fairData
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
          const editDataArray = this.state.fairData.map((data) => {
            if(data._id === editResponse.data._id){
              data = editResponse.data
            }
            return data
          });
          this.setState({
            fairData: editDataArray,
            showEditModal: false
          })
          console.log(editResponse, ' editResponse');
          this.props.history.push('/fair')
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
        fairData: this.state.fairData.filter((data) => data._id !== id)
      })
    } catch(err){
      console.log(err);
      return err
    }
  }

    render(){
      const { fairData, editData, showEditModal } = this.state;
        return(
          <div>
            <FairData addData={this.addData}/>
            {
              showEditModal
              ?
              <EditFair  closeAndEdit={this.closeAndEdit} editData={editData} handleFormChange={this.handleFormChange}/>
              :
              null
            }
            <div>
              {
                fairData.map((data, i) => {
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

export default withRouter(Fair)