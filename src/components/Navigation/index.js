import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{background: 'linear-gradient(90deg, rgba(78,0,184,1) 0%, rgba(116,0,184,1) 60%)'}}>
    <a className="navbar-brand" href="/">Socio Space</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link to={ROUTES.LANDING} className="nav-link">Landing</Link>
        </li>
        <li className="nav-item">
          <Link to={ROUTES.HOME} className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to={ROUTES.ACCOUNT} className="nav-link">Account</Link>
        </li>
        <li className="nav-item">
          <Link to={ROUTES.ADMIN} className="nav-link">Admin</Link>
        </li>
        <li className="nav-item">
          <SignOutButton />
        </li>
      </ul>
    </div>
  </nav>
);

const NavigationNonAuth = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="/">Socio Space</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link to={ROUTES.LANDING} className="nav-link">Landing</Link>
        </li>
        <li className="nav-item">
          <Link to={ROUTES.SIGN_IN} className="nav-link">Sign In</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navigation;
