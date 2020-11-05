import React, { Component } from 'react';
import axios from 'axios';
import AppConstants from './AppConstants';
class Profile extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      usersData:{}
    }
   
  }
   componentDidMount() {

   var userId=this.props.location.state.id;
    this.setState({ error: false });
    axios.get(AppConstants.API+"/users/getUser/"+userId)
    .then(res => {
        if(res.data.status === 'fail' ){
          this.setState({ error: true });
          this.setState({ message: res.data.message });
        }else{
          this.setState({ usersData: res.data });
        }
    })
   .catch(err => {
    this.setState({ error: true });
    });
    

  }
  render() {
    var data=this.state.usersData;
    return (
      <div style={{width:"400px", background:"#e4e4e4", margin:"0 auto", "margin-top":"200px", padding:"20px"}}>
        <h2>Profile </h2>
        <ul style={{"list-style":"none"}}>
       
    <li><spam>Id:</spam>{data.id}</li>
            <li>Name:{data.name}</li>
            <li>Email:{data.email}</li>
            <li>Role:{data.role}</li>
          </ul>
      </div>
    );
  }
}

export default Profile;