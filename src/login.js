import React from 'react';
import {  Form, Header } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import store from 'store';
import axios from 'axios';
import AppConstants from './AppConstants';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: false,
      message:'',
      errors:[]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }
  handleValidation(){
  //  let errors = {};
  var emptyArray=[];
  let formIsValid = true;
    if (this.state.password==''){
        formIsValid = false;
        emptyArray['password']="Please enter Password";
        this.setState({errors :emptyArray});
    }
    if (this.state.email==''){
        formIsValid = false;
        emptyArray['email']="Please Enter Email";
    }else
    {
        if (new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(this.state.email)) {
           
          } else {
            formIsValid = false;
            emptyArray['email']="Please enter correct email adress";
          }
    }
    this.setState({errors :emptyArray});
    return formIsValid;
  }
  handleSubmit(e) {
    e.preventDefault();
    if(this.handleValidation())
    {

    const user = {
      'password': this.state.password,
      'email' :  this.state.email
    };
    console.log(user);
    this.setState({ error: false });
    axios.post(AppConstants.API+"/users/login", user, {
      headers: {
      'Content-Type': 'application/json',
      'crossDomain': true
      }
    })
    .then(res => {
        if(res.data.status === 'fail' ){
          this.setState({ error: true });
          this.setState({ message: res.data.message });
        }else{
            store.set('loggedIn', true);
            if(res.data.user_data.role=='ADMIN')
            {
              this.props.history.push('/list');
            }
            else if(res.data.user_data.role=='EMPLOYEE')
            {
              console.log(res.data.user_data.id);
              this.props.history.push('/profile', { id: res.data.user_data.id });
            }
        }
    })
   .catch(err => {
    this.setState({ error: true });
    });
    
  }
  }

  handleChange(e, { name, value }) {
    console.log("test")
    this.setState({ [name]: value });
  }

  render() {
    const { error } = this.state;

    return (
      <div style={{width:"400px", background:"#e4e4e4", margin:"0 auto", "margin-top":"200px", padding:"20px"}}>
        <Helmet>
          <title>Login</title>
        </Helmet>


          <Form error={error}>
            <Header as="h1">Login</Header>
            {this.state.error && 
            <div style={{color:"red"}}>{this.state.message}</div>}
            <Form.Input
              inline
              label="Email"
              name="email"
              onChange={this.handleChange}
              ref="email"
            />
            <span className="error" style={{color: 'red'}}>{this.state.errors["email"]}</span>
            <Form.Input
              inline
              label="Password"
              type="password"
              name="password"
              onChange={this.handleChange}
              ref="password"
            />
            <span className="error" style={{color: 'red'}}>{this.state.errors["password"]}</span>
            <Form.Button  onClick={this.handleSubmit}>Go!</Form.Button>
          </Form>

      </div>
    );
  }
}

export default Login;