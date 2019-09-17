import React, { Component } from 'react'
import HealthyData from './HealthyData';

class Healthy extends Component {

  state = {
    healthyData: []
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
            <HealthyData addData={this.addData}/>
          </div>
        )
    }
}

export default Healthy