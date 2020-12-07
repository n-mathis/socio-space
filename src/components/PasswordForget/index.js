import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
 
import sideImage from '../../assets/images/discussion.jpg';

const PasswordForgetPage = () => (
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
                  <h4 className="card-title">Password Forget</h4>
                  <PasswordForgetForm />
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
  error: null,
};
 
class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { email } = this.state;
 
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;
 
    const isInvalid = email === '';
 
    return (
          <div className="card shadow p-3 bg-white rounded mx-auto my-5" style={{width: '26rem'}}>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label>Email Address</label>
                      <input
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Email Address"
                      />
                  </div>
                <button disabled={isInvalid} type="submit" className="btn btn-primary btn-block mb-3 mt-2">
                  Reset My Password
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
 
const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);
 
export default PasswordForgetPage;
 
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
 
export { PasswordForgetForm, PasswordForgetLink };