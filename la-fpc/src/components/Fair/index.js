import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import FairData from './FairData';
import EditFair from './EditFair';
import Donut from './FairChart';
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


class Fair extends Component {

  state = {
    fairData: [],
    showEditModal: false,
    showDataModal: false,
    dataModalProperty: '',
    editData: {
      _id: null,
      category: 'fairness',
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
      console.log(oldData, "THIS IS OLD FAIR DATA")
      const fairData = oldData.data.filter(data => data.category === 'fairness')
      console.log(fairData, "THIS IS FAIR DATA")
      this.setState({
        fairData: fairData
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
        fairData: [...this.state.fairData, parsedResponse.data]
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
        fairData: this.state.fairData.filter((data) => data._id !== id)
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
      const { fairData, editData, showEditModal, showDataModal, dataModalProperty } = this.state;
      const { isLogged } = this.props.isLogged
        return(
          <Container>
            {
              showEditModal
              ?
              <EditFair  cancelEdit={this.cancelEdit} closeAndEdit={this.closeAndEdit} editData={editData} handleFormChange={this.handleFormChange}/>
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
                        <h1>FAIRNESS</h1>
                      </DescribSec> 
                                  <p>Fair food consists of food produced, manufactured, distributed, sold and recycled through fair
                        labor practices and humane treatment of animals. <br/>At every point in the food supply chain,
                        workers should receive fair compensation, treatment and be free from exploitation. <br/> Promoting
                        fair food ensures that food workers compliant with relevant food safety standards, <br/>such as the
                        hundreds of mobile food vendors throughout the City of Los Angeles, are free from legal
                        penalties or fines for bringing food to communities that need it most.</p>
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
                fairData.map((data, i) => {
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
                  <FairData addData={this.addData}/>
                  :
                  null
              }
            <ChartDiv>
              <ToolKit>
                  {/* <Button style={{backgroundColor:'#D6D7AD', marginTop:"10px"}} fullWidth>Number of Properties</Button>
                  <Button style={{backgroundColor:'#D6D7AD', marginTop:"10px"}} fullWidth>Grocery Stores</Button>
                  <Button style={{backgroundColor:'#D6D7AD', marginTop:"10px"}} fullWidth>Food Consumption</Button>
                  <Button style={{backgroundColor:'#D6D7AD', marginTop:"10px"}} fullWidth>Obesity Percentage</Button>
                  <Button style={{backgroundColor:'#D6D7AD', marginTop:"10px"}} fullWidth>Health Diagnosis Percentage</Button> */}
                  {/* {
                    this.state.buttons.map((indicator, i) => {
                      return (
                        <Button key={i} value={indicator} onClick={this.handleFilter} style={{ backgroundColor: '#F4934D', marginTop: "10px" }} fullWidth>
                          {indicator}
                        </Button>
                      )
                    })
                  } */}
              </ToolKit>
              {/* <ToolKit>
                <Donut fairData={this.state.fairData} />
              </ToolKit> */}
            </ChartDiv>
            
          </Container>
        )
    }
}

export default withRouter(Fair)