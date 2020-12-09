import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

class Discussion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            comments: [],
            error: null,
            loading: false
        };
    }

    onSubmit = event => {
        event.preventDefault();
        const { text } = this.state;
        this.props.firebase.addComment(this.props.thread, Date.now(), this.props.firebase.currUser(), text);
    };

    componentDidMount() {
        this.setState({ loading: true });
        this.props.firebase.getDiscussion(this.props.thread)
            .on('value', snapshot => {
                const topic = snapshot.val();
                const comments = Object.keys(topic).sort().map(timeStamp => ({
                    ...topic[timeStamp],
                    time: timeStamp
                }));
                this.setState({
                    comments: comments,
                    loading: false
                });
            });
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    
    render() {
        const { text, comments, error } = this.state;
    
        return (
        <div className="card shadow p-3 bg-white rounded mx-auto my-5" style={{width: '30rem'}}>
            <div className="card-body">
            {this.props.thread}
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Comment</label>
                    <input
                    className="form-control"
                    name="text"
                    value={text}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Comment"
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-3 mt-2">
                Submit
                </button>
                <Comments comments={comments} />
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

const Comments = ({ comments }) => (
    <ul>
    {comments.map(comment => (
        <li key={comment.time}>
        <div>
            <strong>text:</strong> {comment.text}
        </div>
        <div>
            <strong>user:</strong> {comment.user}
        </div>
        <div>
            <strong>time:</strong> {comment.time}
        </div>
        </li>
    ))}
    </ul>
);

export default withFirebase(Discussion);