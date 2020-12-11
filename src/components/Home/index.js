
import { withAuthorization } from '../Session';
 
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Discussion from './Discussion';
import * as ROUTES from '../../constants/routes';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
        discussions: ['climate-change', 'recycling'],
        error: null,
        loading: false
      };
  }

  render() {
    const { discussions, error, loading } = this.state;
 
    return (
      <div className="row justify-content-between mt-5" style={{background: 'rgb(250,250,250)'}}>
        <div className="col-2 position-relative border-right" style={{background: 'rgb(255,255,255)'}}>
          <div className="row m-3 position-fixed">
            <div className="col-12 my-3" >
              <Link to={ROUTES.HOME} className="nav-link text-decoration-none" style={{color: 'grey'}}>Home</Link>
            </div>
            <div className="col-12 my-3">
              <Link to={ROUTES.ACCOUNT} className="nav-link text-decoration-none" style={{color: 'grey'}}>Profile</Link>
            </div>
          </div>
        </div>
        <div className="col-3 position-relative pt-4">
          <div className="card position-fixed w-25">
            <div className="card-body">
              <h4>Tweet</h4>
              Tweet
            </div>
          </div>
        </div>
        <div className="col pt-4 mr-2">
          {/* <div className="card shadow p-3 bg-white rounded mx-auto my-5" style={{width: '65rem'}}>
              <div className="card-body"> */}
                  <Discussions discussions={discussions} />
                  <Discussions discussions={discussions} />

              {/* </div>
          </div> */}
        </div>
      </div>
    );
  }
}

const Discussions = ({ discussions }) => (
    <ul className="list-unstyled">
      {discussions.map(discussion => (
        <li key={discussion}>
          <Discussion thread={discussion}/>
        </li>
      ))}
    </ul>
  );
 
const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(HomePage);