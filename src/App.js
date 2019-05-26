import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./actions/redditActions";
import './App.scss';
import './css/post.scss';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(actions.fetchReddit());
  }

  removeItem(e,id) {
    let currentPost = e.currentTarget.parentElement.parentElement.parentElement;
    if (!this.props.dismissed.includes(id)) {
      currentPost.classList.add('delete');
      setTimeout(() => {
        this.props.dispatch(actions.dismiss(id));
      },300);
    }
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
                              <button onClick={(e) => {this.removeItem(e,post.id)} }><span className="circle cross"></span>Dismiss Post</button>
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
    posts: state.posts,
    dismissed: state.dismissed
  }
};

export default connect(mapStateToProps)(App);
