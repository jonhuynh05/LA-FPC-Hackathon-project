import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import AffordableData from './AffordableData';
import EditAffordable from './EditAffordable';
import Donut from './AffordChart';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Data from "../test.js"

import {
  Container,
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

class Affordable extends Component {

  state = {
    affordableData: [],
    showEditModal: false,
    showDataModal: false,
    dataModalProperty: '',
    editData: {
      _id: null,
      category: 'affordable',
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
    filter: "",
    buttons: []
  }

  componentDidMount = () => {
    this.getData()
  }

  getButtons = () => {
    let filterButtons = []
    // for (let i = 0; i < this.state.affordableData.length; i++){
    //   filterButtons.push(this.state.affordableData[i].indicator)
    // }
    this.state.affordableData.forEach(data => filterButtons.push(data.indicator))
    this.setState({
      buttons: filterButtons
    })
  }


  getData = async () => {
    try {
      // const testData = await fetch("../test.json").then(res => res.json()).then(data => {
      console.log(Data)
      // })
      // console.log(parsedData, "This is test data")
      const data = await fetch(`http://localhost:3030/data/get-data`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const oldData = await data.json()
      console.log(oldData, "this is old data")
      const affordData = oldData.data.filter(data => data.category === 'affordable')
      console.log(affordData, "this is afford data")
      this.setState({
        affordableData: affordData
      })
      this.getButtons()

    } catch (err) {
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
        affordableData: [...this.state.affordableData, parsedResponse.data]
      })
    } catch (err) {
      console.log(err, 'this is error from add data')
    }
  }

  handleFilter = async (e) => {
    this.setState({
      filter: e.currentTarget.value
    })
    try {
      const data = await fetch(`http://localhost:3030/data/get-data`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const oldData = await data.json()
      const affordData = oldData.data.filter(data => data.category === 'affordable')
      const filteredData = affordData.filter(data => data.indicator === this.state.filter)
      console.log(filteredData, "this is filtered afford data")
      if (this.state.filter !== "") {
        this.setState({
          affordableData: filteredData
        })
      }
      else {
        this.setState({
          affordableData: affordData
        })
      }
    }
    catch (err) {
      console.log(err)
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
      if (editRequest.status !== 200) {
        throw Error('editResquest not working')
      }
      const editResponse = await editRequest.json();
      const editDataArray = this.state.affordableData.map((data) => {
        if (data._id === editResponse.data._id) {
          data = editResponse.data
        }
        return data
      });
      this.setState({
        affordableData: editDataArray,
        showEditModal: false
      })
      this.props.history.push('/affordable')
    } catch (err) {
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
      if (deleteData.status !== 200) {
        throw Error('Something happend on delete')
      }
      const deleteDataJson = await deleteData.json();
      this.setState({
        affordableData: this.state.affordableData.filter((data) => data._id !== id)
      })
    } catch (err) {
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

  render() {
    const { affordableData, editData, showEditModal, showDataModal, dataModalProperty } = this.state;
    const { isLogged } = this.props.isLogged
    console.log(this.props.isLogged, 'this is logged')
    return (
      <Container>
        {
          showEditModal
            ?
            <EditAffordable cancelEdit={this.cancelEdit} closeAndEdit={this.closeAndEdit} editData={editData} handleFormChange={this.handleFormChange} />
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
        <DescribSec>
          <h1>Affordable</h1>
          <DescribPar>Food is integral to the health and quality of life of individuals and communities. Healthy food is nutritious, delicious and safe. Healthy food meets recommended dietary guidelines and supports the body’s ability to fight disease and heal. All people deserve access to healthy food that is affordable, conveniently availability and culturally relevant.</DescribPar>

          <DescribPar>Not all communities live in neighborhoods where “the healthy choice is the easy choice,” and instead are surrounded by unhealthy food retail such as liquor stores, convenience stores and fast food restaurants. Through the numerous policy, systems and environmental changes led by stakeholders throughout the LAFPC network, we are collectively innovating solutions for overcoming systemic barriers to healthy food access— tailoring these innovations to the unique dynamics of the communities that we serve.</DescribPar>

          <DescribPar>In this section, we explore progress towards improving the health of ALL Angelenos by evaluating disparities and change over time in the following categories: Increased healthy food access, Improved eating habits amongst adults & children, Rates of obesity, Rates of diet-related diseases.</DescribPar>
        </DescribSec>
        <Table>
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
            affordableData.map((data, i) => {
              return (
                <Row key={i} isLogged={isLogged}>
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
                  }

                </Row>
              )
            })
          }
        </Table>
        {
          this.props.isLogged
            ?
            <AffordableData addData={this.addData} />
            :
            null
        }
        <ChartDiv>
          <ToolKit>
            {
              this.state.buttons.map((indicator, i) => {
                return (
                  <Button key={i} value={indicator} onClick={this.handleFilter} style={{ backgroundColor: '#F4934D', marginTop: "10px" }} fullWidth>
                    {indicator}
                  </Button>
                )
              })
            }
            <Button value="" onClick={this.handleFilter} style={{ backgroundColor: '#F4934D', marginTop: "10px" }} fullWidth>
              Reset Filter
                    </Button>
          </ToolKit>
          <ToolKit>
            <Donut affordableData={this.state.affordableData} />
          </ToolKit>
        </ChartDiv>
        <div>
          THIS IS THE AFFORDABLE DATA
              {
            this.state.affordableData.map((data, i) => {
              return (
                <div key={i}>
                  {data.value}
                </div>
              )
            })
          }
        </div>
      </Container>
    )
  }
}

export default withRouter(Affordable)