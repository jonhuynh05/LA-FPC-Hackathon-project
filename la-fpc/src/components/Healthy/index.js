import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import HealthyData from './HealthyData';
import EditHealthy from './EditHealthy';
import Donut from './HealthyChart';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


import {
  MainDiv,
  TileDiv, 
  TileWrapper,
  Tiles, 
  Container,
  BannerDiv,
  BannerText,
  DivDataModal,
  ContainModal,
  Table,
  Row,
  HeaderRow,
  TableData,
  TableDataHeader,
  TableDataButton,
  H1,
  P,
  DescribSec,
  DescribPar,
  ChartDiv,
  ToolKit
} from './style'


class Healthy extends Component {

  state = {
    healthyData: [],
    showEditModal: false,
    showDataModal: false,
    dataModalProperty: '',
    editData: {
      _id: null,
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
      const healthData = oldData.data.filter(data => data.category === 'healthy')
      this.setState({
        healthyData: healthData
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
        healthyData: [...this.state.healthyData, parsedResponse.data]
      })
      this.props.handleUpdateNav()
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
          const editDataArray = this.state.healthyData.map((data) => {
            if(data._id === editResponse.data._id){
              data = editResponse.data
            }
            return data
          });
          this.setState({
            healthyData: editDataArray,
            showEditModal: false
          })
          this.props.history.push('/healthy')
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
        healthyData: this.state.healthyData.filter((data) => data._id !== id)
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
      const { healthyData, editData, showEditModal, showDataModal, dataModalProperty } = this.state;
      const { isLogged } = this.props.isLogged
        return(
          <Container>
            {
              showEditModal
              ?
              <EditHealthy  cancelEdit={this.cancelEdit} closeAndEdit={this.closeAndEdit} editData={editData} handleFormChange={this.handleFormChange}/>
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
              <BannerDiv>
                    <BannerText>
                      <DescribSec>
                        <h1>HEALTH</h1>
                      </DescribSec> 
                                  <p> Food is integral to the health and quality of life of individuals and communities. <br/> Healthy food is
                            nutritious, delicious and safe. It meets dietary guidelines and contributes to the health and
                            vitality of those that consume it.</p>
                    </BannerText>
          </BannerDiv>
        <DescribSec>
          <h1>FAST FACTS</h1>
        </DescribSec> 
        <MainDiv>
          <TileDiv>
            <TileWrapper>
              <Tiles />
            </TileWrapper> 
            <TileWrapper>
              <Tiles />
            </TileWrapper>
            <TileWrapper>
              <Tiles />
            </TileWrapper>
            <TileWrapper>
              <Tiles />
            </TileWrapper>
          </TileDiv>
        </MainDiv>
            <Table>
              {/* <Row>
              {
                  this.props.isLogged
                  ?
                  <TableDataHeader>ADMIN</TableDataHeader>
                  :
                  null
                }
                <TableDataHeader><H1>Indicator</H1></TableDataHeader>
                <TableDataHeader><H1>Baseline</H1></TableDataHeader>
                <TableDataHeader><H1>Update</H1></TableDataHeader>
                <TableDataHeader><H1>Sources</H1></TableDataHeader>
                <TableDataHeader><H1>Change</H1></TableDataHeader>
                <TableDataHeader><H1>Notes</H1></TableDataHeader>
                <TableDataHeader><H1>Data Status</H1></TableDataHeader>
                <TableDataHeader><H1>Group</H1></TableDataHeader>
              </Row> */}
              <HeaderRow isLogged={isLogged}>
            {
              this.props.isLogged
                ?
                <React.Fragment>
                  <TableDataHeader>ADMIN</TableDataHeader>
                  <TableDataHeader><H1>Group</H1></TableDataHeader>
                  <TableDataHeader><H1>Subgroup</H1></TableDataHeader>
                  <TableDataHeader><H1>Indicator</H1></TableDataHeader>
                  <TableDataHeader><H1>Sources</H1></TableDataHeader>
                  <TableDataHeader><H1>2013</H1></TableDataHeader>
                  <TableDataHeader><H1>2017</H1></TableDataHeader>
                  <TableDataHeader><H1>2020</H1></TableDataHeader>
                  <TableDataHeader><H1>Trend</H1></TableDataHeader>
                </React.Fragment>
                :
                <React.Fragment>
                  <TableDataHeader><H1>Indicator</H1></TableDataHeader>
                  <TableDataHeader><H1>2013</H1></TableDataHeader>
                  <TableDataHeader><H1>2017</H1></TableDataHeader>
                  <TableDataHeader><H1>2020</H1></TableDataHeader>
                  <TableDataHeader><H1>Trend</H1></TableDataHeader>
                </React.Fragment>
            }
          </HeaderRow>
              {
                healthyData.map((data, i) => {
                  return (
                    <Row key={i}>
                      {
                      this.props.isLogged
                      ?               
                      <TableDataButton>
                        <Button onClick={() => this.editData(data)}><EditIcon /></Button>
                        <Button onClick={() => this.delete(data._id)}><DeleteIcon /></Button>
                      </TableDataButton>
                      :
                      null
                      }
                    {
                    this.props.isLogged
                      ?
                      <React.Fragment>
                        <TableData onClick={(e) => this.showData(e)}>
                          <P>{data.group}</P>
                        </TableData>
                        <TableData onClick={(e) => this.showData(e)}>
                          <P>{data.subgroup}</P>
                        </TableData>
                        <TableData onClick={(e) => this.showData(e)}>
                          <P>{data.indicator}</P>
                        </TableData>
                        <TableData onClick={(e) => this.showData(e)}>
                          <P>{data.sources}</P>
                        </TableData>
                        <TableData onClick={(e) => this.showData(e)}>
                          <P>{data.baseline}</P>
                        </TableData>
                        <TableData onClick={(e) => this.showData(e)}>
                          <P>{data.firstUpdate}</P>
                        </TableData>
                        <TableData onClick={(e) => this.showData(e)}>
                          <P>{data.secondUpdate}</P>
                        </TableData>
                        <TableData onClick={(e) => this.showData(e)}>
                          <P>{data.trend}</P>
                        </TableData>
                      </React.Fragment>
                      :
                      this.props.groupFilter === ""
                      ?
                      <React.Fragment>
                        <TableData onClick={(e) => this.showData(e)}>
                          <P>{data.indicator}</P>
                        </TableData>
                        <TableData onClick={(e) => this.showData(e)}>
                          <P>{data.baseline}</P>
                        </TableData>
                        <TableData onClick={(e) => this.showData(e)}>
                          <P>{data.firstUpdate}</P>
                        </TableData>
                        <TableData onClick={(e) => this.showData(e)}>
                          <P>{data.secondUpdate}</P>
                        </TableData>
                        <TableData onClick={(e) => this.showData(e)}>
                          <P>{data.trend}</P>
                        </TableData>
                      </React.Fragment>
                      :
                      data.group === this.props.groupFilter
                      ?
                      <React.Fragment>
                      <TableData onClick={(e) => this.showData(e)}>
                        <P>{data.indicator}</P>
                      </TableData>
                      <TableData onClick={(e) => this.showData(e)}>
                        <P>{data.baseline}</P>
                      </TableData>
                      <TableData onClick={(e) => this.showData(e)}>
                        <P>{data.firstUpdate}</P>
                      </TableData>
                      <TableData onClick={(e) => this.showData(e)}>
                        <P>{data.secondUpdate}</P>
                      </TableData>
                      <TableData onClick={(e) => this.showData(e)}>
                        <P>{data.trend}</P>
                      </TableData>
                    </React.Fragment>
                    :
                    null
                  }
                    </Row>
                  )
                })
              }
            </Table>
              {
                  this.props.isLogged
                  ?
                  <HealthyData addData={this.addData}/>
                  :
                  null
                }
             <ChartDiv>
              {/* <ToolKit>
                  <Button style={{backgroundColor:'#AAE0F4', marginTop:"10px"}} fullWidth>Number of Properties</Button>
                  <Button style={{backgroundColor:'#AAE0F4', marginTop:"10px"}} fullWidth>Grocery Stores</Button>
                  <Button style={{backgroundColor:'#AAE0F4', marginTop:"10px"}} fullWidth>Food Consumption</Button>
                  <Button style={{backgroundColor:'#AAE0F4', marginTop:"10px"}} fullWidth>Obesity Percentage</Button>
                  <Button style={{backgroundColor:'#AAE0F4', marginTop:"10px"}} fullWidth>Health Diagnosis Percentage</Button>
              </ToolKit>
              <ToolKit>
                <Donut healthyData={this.state.healthyData} />
              </ToolKit> */}
            </ChartDiv>
          </Container>
        )
    }
}

export default withRouter(Healthy)