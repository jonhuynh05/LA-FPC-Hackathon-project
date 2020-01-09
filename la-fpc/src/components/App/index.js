import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Homepage from '../Homepage';
import AddAdmin from '../addAdmin';
import Affordable from '../Affordable';
import Healthy from '../Healthy';
import Fair from '../Fair';
import Sustainable from '../Sustainable';
import SideNav from '../SideNav '
import AdminHome from '../AdminHome';
import SignIn from '../SignIn'
import Faq from "../Faq"
import Container from '@material-ui/core/Container';
import Footer from '../Footer'

const My404 = () => {
  return (
    <div>
      <Redirect to='/home' />
    </div>
  )
}


class App extends Component {

  state = {
    user: null,
    laoding: true,
    isLogged: false,
    data: [],
    affordable: [],
    fairness: [],
    healthy: [],
    sustainability: [],
    groupFilter: "",
    indicatorFilter: "",
    affordableGroup: [],
    affordableSubgroup: [],
    affordableIndicators: [],
    healthyGroup: [],
    healthySubgroup: [],
    healthyIndicators: [],
    sustainableGroup: [],
    sustainableSubgroup: [],
    sustainableIndicators: [],
    fairnessGroup: [],
    fairnessSubgroup: [],
    fairnessIndicators: []
  }

  handleIndicator = (e) => {
    this.setState({
      indicator: e.currentTarget.value
    })
  }

  handleDataFilter = (e) => {
    this.setState({
      groupFilter: e.currentTarget.textContent
    })
  }

  handleDataReset = () => {
    this.setState({
      groupFilter: ""
    })
  }

  handleUpdateAffordNav = async () => {
    try{
      const data = await fetch(`http://localhost:3030/data/get-data`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const oldData = await data.json()
      const affordData = oldData.data.filter(data => data.category === 'affordable')
      let affordableGroup = []
      let affordableSubgroup = []
      let affordIndicators = []
      affordData.forEach(data => {
        affordableGroup.push(data.group)
        affordableSubgroup.push(data.subgroup)
        affordIndicators.push(data.indicator)
      })
      this.setState({
        affordableGroup: affordableGroup,
        affordableSubgroup: affordableSubgroup,
        affordableIndicators: affordIndicators,
      })
    }
    catch(err){
      console.log(err)
    }
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
      console.log(oldData, "this is old data - app")

      const affordData = oldData.data.filter(data => data.category === 'affordable')
      console.log(affordData, "this is afford data - app")
      let affordableGroup = []
      let affordableSubgroup = []
      let affordIndicators = []
      affordData.forEach(data => {
        affordableGroup.push(data.group)
        affordableSubgroup.push(data.subgroup)
        affordIndicators.push(data.indicator)
      })

      const healthData = oldData.data.filter(data => data.category === 'healthy')
      console.log(healthData, "this is healthy data - app")
      let healthyGroup = []
      let healthySubgroup = []
      let healthyIndicators = []
      healthData.forEach(data => {
        healthyGroup.push(data.group)
        healthySubgroup.push(data.subgroup)
        healthyIndicators.push(data.indicator)
      })

      const sustainData = oldData.data.filter(data => data.category === 'sustainable')
      console.log(sustainData, "this is sustainable data - app")
      let sustainableGroup = []
      let sustainableSubgroup = []
      let sustainableIndicators = []
      sustainData.forEach(data => {
        sustainableGroup.push(data.group)
        sustainableSubgroup.push(data.subgroup)
        sustainableIndicators.push(data.indicator)
      })

      const fairData = oldData.data.filter(data => data.category === 'fairness')
      console.log(fairData, "this is afford data - app")
      let fairnessGroup = []
      let fairnessSubgroup = []
      let fairnessIndicators = []
      fairData.forEach(data => {
        fairnessGroup.push(data.group)
        fairnessSubgroup.push(data.subgroup)
        fairnessIndicators.push(data.indicator)
      })

      this.setState({
        affordable: affordData,
        affordableGroup: affordableGroup,
        affordableSubgroup: affordableSubgroup,
        affordableIndicators: affordIndicators,
        healthy: healthData,
        healthyGroup: healthyGroup,
        healthySubgroup: healthySubgroup,
        healthyIndicators: healthyIndicators,
        sustainability: sustainData,
        sustainableGroup: sustainableGroup,
        sustainableSubgroup: sustainableSubgroup,
        sustainableIndicators: sustainableIndicators,
        fairness: fairData,
        fairnessGroup: fairnessGroup,
        fairnessSubgroup: fairnessSubgroup,
        fairnessIndicators: fairnessIndicators,
      })
      
    }catch (err) {
      console.log(err)
    }
  }


  componentDidMount() {
    this.getData()
  }

  register = async (data) => {
    console.log("hitting")
    try {
      const registerResponse = await fetch(`http://localhost:3030/admin/register-admin`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const parsedResponse = await registerResponse.json()
      console.log(parsedResponse, 'this is register response')
      localStorage.setItem('admin', parsedResponse.data.username)
      localStorage.setItem('loggedIn', true)
      console.log(localStorage, 'this is local storage')
      this.setState({
        user: parsedResponse.data,
        laoding: false,
        isLogged: true
      })

    } catch(err) {
      console.log(err, 'this is error from register')
    }
  }

  login = async (loginInfo) =>{
    console.log('login app')
    try {
      const loginResponse = await fetch (`http://localhost:3030/admin/login-admin`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(loginInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const parsedResponse = await loginResponse.json();
      console.log(parsedResponse, 'this is register response')
      localStorage.setItem('admin', JSON.stringify(parsedResponse.foundAdmin.username));
      localStorage.setItem('loggedIn', true);
      console.log(localStorage, 'this is local storage')
      this.setState(() => {
        return {
          isLogged: true,
          user: parsedResponse.foundUser,
          loading: false
        }
      })

      return parsedResponse


    } catch (err){
      alert('sorry, wrong info')
      console.log(err)
    }
  }

  logout = async () => {
    try {
      fetch(`http://localhost:3030/admin/logout-admin`)
      .then(res => {
        this.setState({
          isLogged: false
        })
      })
      localStorage.removeItem('admin');
      localStorage.removeItem('loggedIn');
      this.props.history.push(`/`)
    } catch(err){
      console.log(err)
    }
  }



    render() {
      const { login } = this.login
      console.log(this.props)
        return (
          <div>
            <SideNav logout={this.logout} state={this.state} handleDataFilter={this.handleDataFilter} handleDataReset={this.handleDataReset}/>
            <Switch>
              {
                this.state.isLogged
                ?
                <Route exact path='/admin-home' render={() => <AdminHome />}/>
                : 
                <Route exact path='/' render={(props) =>  <Homepage {...props} />}  />
              }
              <Route exact path='/addadmin' render={(props) =>  <AddAdmin register={this.register}  {...props} />} />
              <Route exact path='/' render={(props) =>  <Homepage {...props} />}  />
              <Route exact path='/home' render={(props) =>  <Homepage {...props} />}  />
              <Route exact path='/affordable' render={() => <Affordable  isLogged={this.state.isLogged} groupFilter={this.state.groupFilter} handleUpdateAffordNav={this.handleUpdateAffordNav}/>}/>
              <Route exact path='/healthy' render={() => <Healthy isLogged={this.state.isLogged} groupFilter={this.state.groupFilter}/>}/>
              <Route exact path='/fair' render={() => <Fair isLogged={this.state.isLogged} groupFilter={this.state.groupFilter}/>}/>
              <Route exact path='/sustainable' render={() => <Sustainable isLogged={this.state.isLogged} groupFilter={this.state.groupFilter}/>}/>
              <Route exact path="/faq" render={() => <Faq />}/>
              <Route exact path='/signin' render={() => <SignIn login={this.login}/>} />
              <Route component={ My404 } />
            </Switch>
            <Footer/>
          </div>
        )
    }
}

export default withRouter(App)