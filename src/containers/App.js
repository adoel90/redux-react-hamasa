/* eslint-disable no-undef */

import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Modal from 'react-awesome-modal';

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
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSaveEdit = this.handleSaveEdit.bind(this);
  

    
    this.state = {
      userLoginActivity: false,
      visible : false,
      userSelected: {}
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

  openModal(e, data) {

    e.preventDefault();
    this.setState({
        ...this.state,
        visible : true,
        userSelected: data
    }, () => {
      console.log(this.state)
    });   
  }

  closeModal() {
    this.setState({
        visible : false
    });
  }

  handleSaveEdit = (e) => {

    const { userSelected } = this.state;
    e.preventDefault();
    console.log(this.state.data);
    console.log(userSelected);
    

  }



  render() {  
    
    const { user } = this.props;
    const { userLoginActivity, userSelected } = this.state;

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
            <table>
                <thead>
                  <tr>
                    <th>*</th>  
                    <th>Name</th>
                    <th>Akses Level</th>  
                    <th>Warehouse Location</th>  
                    <th>Username</th> 
                    <th>Edit</th> 
                  </tr>
                </thead>
                <tbody>

                  {
                    
                    user.length != null  ? user.map((data, i) => {
                    return (
                      <tr key={i}>
                        <td></td>
                        <td>{data.name}</td>
                        <td>{data.access.name}</td>
                        <td>{data.warehouse != null ? data.warehouse.name : null }</td>
                        <td>{data.username}</td>
                        <td>
                          <input type="button" value="Edit" onClick={(e) => this.openModal(e, data)} />
                        </td>
                      </tr>
                    ) 
                  }) : null }
                </tbody>
              </table>
          </div>
        </div>
        
        <Modal visible={this.state.visible} width="400" height="300" effect="fadeInDown" onClickAway={() => this.closeModal()}>
          <div>
              <h1>Edit</h1>              
              <br />
              <input 
                type="text" 
                name="name" 
                placeholder={userSelected.name} 
                defaultValue={userSelected.name}
                onChange={(e) => this.handleInputChange(e, 'data')} 
              />
              <label>Edit Name</label>
              <br />
              <br />

              <input 
                type="text" 
                name="access"
                placeholder={userSelected.access != null ? userSelected.access.name : null} 
                defaultValue={userSelected.access != null ? userSelected.access.name : null} 
                onChange={(e) => this.handleInputChange(e, 'data')}
              />
              <label>Edit Access Level</label>    
              <br />
              <br />
              
              <input 
                type="text" 
                name="warehouse"
                placeholder={userSelected.warehouse != null ? userSelected.warehouse.name : null} 
                defaultValue={userSelected.warehouse != null ? userSelected.warehouse.name : null} 
                onChange={(e) => this.handleInputChange(e, 'data')}
              />
              <label>Edit Warehouse Location</label>    
              <br />
              <br />

              <input 
                type="text" 
                name="username"
                placeholder={userSelected.username} 
                defaultValue={userSelected.username} 
                onChange={(e) => this.handleInputChange(e, 'data')}
              />
              <label>Edit Username</label>    
              <br />
              <br />
              <button type="button" onClick={() => this.closeModal()}>
                Close
              </button>

              <button type="button" onClick={(e) => this.handleSaveEdit(e)}>
                Save
              </button>
          </div>
      </Modal>
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
