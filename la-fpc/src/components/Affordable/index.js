import React, { Component } from 'react'
import AffordableData from './AffordableData';
import AffordableChart from '../AffordableChart'

class Affordable extends Component {

  state = {
    affordableData: []
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

    render(){
      const { addData } = this.addData
        return(
          <div>
            <AffordableData addData={this.addData}/>
            <AffordableChart />
          </div>
        )
    }
}

export default Affordable