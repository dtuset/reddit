import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchReddit } from "./actions/redditActions";
import './App.scss';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(fetchReddit());
  }

  render() {
    const { posts } = this.props;
    return (
      <div className="App">
        {posts.map( post => <div key={ post.id }>{ post.id }</div>)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    posts: state.posts
  }
};

export default connect(mapStateToProps)(App);
