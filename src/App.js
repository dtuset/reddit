import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./actions/redditActions";
import Moment from 'react-moment';
import {Swipe} from "react-swipe-component"
import './App.scss';
import './css/post.scss';

class App extends Component {

  constructor(props) {
    super(props);
    this.allPostsRef = React.createRef();
    this.sidebarRef = React.createRef();
  }

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

  removeAllItems() {
    this.allPostsRef.current.classList.add('delete');
    setTimeout(() => {
      this.props.dispatch(actions.dismissAll());
    },300);
  }

  viewPost(e,post) {
    let currentPost = e.currentTarget.parentElement.parentElement;
    if (!this.props.viewed.includes(post.id)) {
      currentPost.classList.add('viewed');
      this.props.dispatch(actions.viewPost(post));
    } else {
      this.props.dispatch(actions.activePost(post));
    }
  }

  onSwipeLeftListener = () => {
    this.sidebarRef.current.classList.add('hide', !this.sidebarRef.current.classList.contains('hide'));
    console.log("Swiped left")
  }
  onSwipeRightListener = () => {
    this.sidebarRef.current.classList.remove('hide', !this.sidebarRef.current.classList.contains('hide'));
    console.log("Swiped right")
  }

  render() {
    const { posts, active, dismissed, viewed } = this.props;
    return (
            <Swipe className="App"
              onSwipedLeft={this.onSwipeLeftListener} 
              onSwipedRight={this.onSwipeRightListener}
            >
              <div className="sidebar" ref={ this.sidebarRef }>
                <div className="top">
                  Reddit Posts
                </div>
                <div className="posts" ref={ this.allPostsRef }>

                  {posts.map( (post) => 
                    {
                      if (!dismissed.includes(post.id)) {
                        return (
                          <div className={"post" + (viewed.includes(post.id) ? " viewed" : '')} key={ post.id } >
                            <div className="row">
                                <div className="sub-row-u">
                                    <span className="onoff"></span>
                                    <span className="author">{ post.author }</span>
                                    <Moment className="when" date={ post.created * 1000 } fromNow />
                                </div>
                                <div className="sub-row-m" onClick={(e) => {this.viewPost(e,post)} }>
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
                        )
                      }return false;
                    }
                  )}

                </div>
                <div className="bottom">
                  <button className="button" onClick={() => {this.removeAllItems()} }>
                    Dismiss All
                  </button>
                </div>
              </div>
              <div className="main">
                <div className="container">
                  <div className="main_auth">{ active.author }</div>
                  <img className="main_photo" src={ active.thumbnail } alt={active.id} />
                  <div className="main_title">{ active.title }</div>
                </div>
              </div>
              {/*posts.map( post => <div key={ post.id }>{ post.id }</div>)*/}
            </Swipe>
    );
  }
}

const mapStateToProps = state => {
  return { 
    posts: state.redditReducer.posts,
    dismissed: state.redditReducer.dismissed,
    viewed: state.redditReducer.viewed,
    active: state.redditReducer.active
  }
};

export default connect(mapStateToProps)(App);
