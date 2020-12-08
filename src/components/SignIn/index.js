import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
 
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import sideImage from '../../assets/images/discussion.jpg';

const SignInPage = () => (
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
                <h4 className="card-title">SignIn</h4>
                <SignInForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
 
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
 
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { email, password } = this.state;
 
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const { email, password, error } = this.state;
 
    const isInvalid = password === '' || email === '';
 
    return (
      <div className="card shadow p-3 bg-white rounded mx-auto my-5" style={{width: '26rem'}}>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Email address</label>
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
                  name="password"
                  value={password}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Password"
                />
              </div>
            <button disabled={isInvalid} type="submit" className="btn btn-primary btn-block mb-3 mt-2">
              Sign In
            </button>
            {error && 
              <div className="alert alert-danger" role="alert">
                <p>{error.message}</p>
              </div>
            }
            <PasswordForgetLink />
            <SignUpLink />
          </form>
        </div>
      </div>
    );
  }
}
 
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);
 
export default SignInPage;
 
export { SignInForm };