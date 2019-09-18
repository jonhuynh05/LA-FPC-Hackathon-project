import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Homepage from '../Homepage';
import AddAdmin from '../AddAdmin';
import Affordable from '../Affordable';
import Healthy from '../Healthy';
import Fair from '../Fair';
import Sustainable from '../Sustainable';
import Navbar from '../Navbar';
import AdminHome from '../AdminHome';
import SignIn from '../SignIn'
import AdminButton from '../AdminButton';
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
    affordable: [],

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

      this.setState({
        user: parsedResponse.data,
        laoding: false
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
      console.log(parsedResponse, 'this is my logindata')
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



    render() {
      const { login } = this.login
      console.log(this.props)
        return (
          <div>
            <AdminButton />
            <Navbar />
            <Switch>
              {/* {
                this.state.isLogged
                ?
                <Route exact path='/admin-home' render={() => <AdminHome />}/>
                : 
                <Route exact path='/' render={(props) =>  <Homepage {...props} />}  />
              } */}
              <Route exact path='/admin-home' render={() => <AdminHome />}/>
              <Route exact path='/addadmin' render={(props) =>  <AddAdmin register={this.register}  {...props} />} />
              <Route exact path='/' render={(props) =>  <Homepage {...props} />}  />
              <Route exact path='/home' render={(props) =>  <Homepage {...props} />}  />
              <Route exact path='/affordable' render={() => <Affordable />}/>
              <Route exact path='/healthy' render={() => <Healthy />}/>
              <Route exact path='/fair' render={() => <Fair />}/>
              <Route exact path='/sustainable' render={() => <Sustainable />}/>
              <Route exact path='/signin' render={() => <SignIn login={this.login}/>} />
              <Route component={ My404 } />
            </Switch>
            <Footer/>
          </div>
        )
    }
}

export default App