import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import Discussion from './Discussion';

class Landing extends Component {
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
      <div className="card shadow p-3 bg-white rounded mx-auto my-5" style={{width: '65rem'}}>
        <div className="card-body">
            <Discussions discussions={discussions} />
        </div>
      </div>
    );
  }
}

const Discussions = ({ discussions }) => (
    <ul>
      {discussions.map(discussion => (
        <li key={discussion}>
          <Discussion thread={discussion}/>
        </li>
      ))}
    </ul>
  );

export default withFirebase(Landing);