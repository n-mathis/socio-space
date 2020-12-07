import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import sideImage from '../../assets/images/discussion.jpg';

const SignUpPage = () => (
    <div className="container-fluid" style={{background: 'linear-gradient(0deg, rgba(78,0,184,1) 0%, rgba(116,0,184,1) 100%)', height: '100vh'}}>
    <div className="row justify-content-center">
      <div className="col-12 mt-5">
        <div className="card shadow bg-white rounded mx-auto mt-5" style={{width: '78rem'}}>
          <div className="row no-gutters">
            <div className="col">
              <img src={sideImage} className="card-img h-100" alt=""/>
            </div>
            <div className="col">
              <div className="card-body mt-3">
                <h4 className="card-title">SignUp</h4>
                <SignUpForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE }
  }
 
  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
 
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
 
  }
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
          <div className="card shadow p-3 bg-white rounded mx-auto my-5" style={{width: '26rem'}}>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      className="form-control"
                      name="username"
                      value={username}
                      onChange={this.onChange}
                      type="text"
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={this.onChange}
                      type="text"
                      placeholder="Email Address"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                      <input
                        className="form-control"
                        name="passwordOne"
                        value={passwordOne}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Password"
                      />
                  </div>                      
                  <div className="form-group">
                    <label>Confirm Password</label>
                      <input
                        className="form-control"
                        name="passwordTwo"
                        value={passwordTwo}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Confirm Password"
                      />
                  </div>
                <button disabled={isInvalid} type="submit" className="btn btn-primary btn-block mb-3 mt-2">
                  Sign Up
                </button>
                {error && 
                  <div className="alert alert-danger" role="alert">
                    <p>{error.message}</p>
                  </div>
                }
              </form>
            </div>
          </div>
    );
  }
}
 
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink};