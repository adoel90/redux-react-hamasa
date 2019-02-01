/* eslint-disable no-undef */

import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


import { postUserLogin } from '../actions/login'
import { getListUser} from '../actions/user'
import './App.css';


//*Sementara tak menggunakan Component ! Only use in Container.
class App extends Component {

  constructor(){
    super();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.renderButtonLogout = this.renderButtonLogout.bind(this);
  

    
    this.state = {
      userLoginActivity: false
    }

  }

  componentDidMount(){
    
    const { getListUserDispatch } = this.props;
    const { dataAccessTokenLocalStorage } = this.state

    const sessionLocaStorage = localStorage.getItem("accessToken")
    if(sessionLocaStorage != null) {
      this.setState({
        ...this.state,
        userLoginActivity: true

      }, () => {
        console.log(this.state);
      })
      
      /*****/
      getListUserDispatch(sessionLocaStorage)


    } else {
      console.log("Ga dapat data session Local Storage !!!");
    }

    
    
  };

  
  componentDidUpdate(prevProps){
    
    const { login, user } = this.props;
    
    
    if(prevProps.login != login){
      
          this.setState({
            ...this.state,
            userLoginActivity: true
          }, () => {
            console.log(this.state);
          })
      }

    if(prevProps.user != user){
      console.log(user);
    }


  }
  

  handleInputChange = (e, data ) => {

    e.preventDefault();

    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({

      ...this.state,
        [data]: {
              ...this.state[data],
              [name]: value
        }
    });
  };

  handleClickRecipe = () => {
    console.log("Handle Click Recipes...")
  }

  handleUserLogin = (e) => {
    e.preventDefault();
    const { postUserLoginDispatch } = this.props;
    postUserLoginDispatch(this.state)
  };

  handleUserLogout = (e) => {
    e.preventDefault()
    localStorage.clear(); 
    window.location.reload();
  }

  renderButtonLogout(){

    return(
      <button onClick={(e) => this.handleUserLogout(e)}>Log out </button>
    )
  }



  render() {  
    
    const { recipes, userList } = this.props;
    const { userLoginActivity } = this.state;

    return (
      <div>
      <div className="grid-container">
         
          <div className="grid-item">
            <h1>Hamasa Login Page </h1>
            <form>
              <input type="text" name="username" placeholder="Type your name..." onChange={(e) => this.handleInputChange(e, 'data')} />
              <label> Type username</label>
              <br />
              <br />
              
              <input type="password" name="password" placeholder="Password" onChange={(e) => this.handleInputChange(e, 'data')} />
              <label>Password</label>
              <br />
              <br />
          
              <button onClick={(e) => this.handleUserLogin(e) }>Save</button>
            </form>
            <p>Status Login : <b><i>{userLoginActivity == false ? "Not Login !" : "Hurray, you are in session !"}</i></b></p>
            <span className="opacity :">*Username: "admin", password: "12345678"</span>
            {userLoginActivity == true ? this.renderButtonLogout(): null}
          </div>

          <div className="grid-item">
            <h1>Hamasa User List</h1>


          </div>



        </div>
     
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  login: state,
  user: state.user.user
});

const mapDispatchToProps = (dispatch) => {

  return {
    postUserLoginDispatch : (data) => dispatch(postUserLogin(data)),
    getListUserDispatch : (data) => dispatch(getListUser(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
