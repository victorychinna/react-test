import React, { Component } from 'react';
import axios from 'axios';
import AppConstants from './AppConstants';
class List extends Component {
 constructor(props)
  {
    super(props);
    this.state={
      usersData:[]
    }
  }
   componentDidMount() {

    this.setState({ error: false });
    axios.get(AppConstants.API+"/users/getAll")
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
    return (
      <div style={{width:"400px", background:"#e4e4e4", margin:"0 auto", "margin-top":"200px", padding:"20px"}}>
        <h2>Users List </h2>
        <table border="1">
          <thead>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </thead>
        {this.state.usersData.map(( listValue, index ) => {
          return (
            <tr key={index}>
              <td>{listValue.id}</td>
              <td>{listValue.name}</td>
              <td>{listValue.email}</td>
              <td>{listValue.role}</td>
            </tr>
          );
        })}
        </table>
      </div>
    );
  }
}

export default List;