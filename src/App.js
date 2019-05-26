import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchReddit } from "./actions/redditActions";
import './App.scss';
import './css/post.scss';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(fetchReddit());
  }

  render() {
    const { posts } = this.props;
    return (
            <div className="App">
              <div className="sidebar">
                <div className="top">
                  Reddit Posts
                </div>
                <div className="posts">
                  {posts.map( post => 
                    <div className="post" key={ post.id } >
                      <div className="row">
                          <div className="sub-row-u">
                              <span className="onoff"></span>
                              <span className="author">{ post.author }</span>
                              <span className="when">{ post.created * 1000 }</span>
                          </div>
                          <div className="sub-row-m">
                              <img className="photo" src={ post.thumbnail } alt={post.id} />
                              <span className="m-2">{ post.title }</span>
                              <span className="m-3">&#10095;</span>
                          </div>
                          <div className="sub-row-b">
                              <button onClick={(e) => {this.removeItem(post.id)} }><span className="circle cross"></span>Dismiss Post</button>
                              <span className="comments">{ post.num_comments + ' comments'}</span>
                          </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="bottom">
                  Dismiss All
                </div>
              </div>
              <div className="main">
                  <div className="main_auth">main_auth</div>
                  <div className="main_photo">main_photo</div>
                  <div className="main_title">main_title</div>
              </div>
              {/*posts.map( post => <div key={ post.id }>{ post.id }</div>)*/}
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
