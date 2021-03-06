import { 
  FETCH_POSTS, 
  RECEIVE_POSTS, 
  POSTS_ERRORS,
  DISMISS_POST,
  DISMISS_ALL_POSTS,
  VIEW_POST,
  ACTIVE_POST
} from './types'

export const fetch_posts = () => {
  return {
    type: FETCH_POSTS
  }
};

export const receive_posts = posts => {
  return {
    type: RECEIVE_POSTS,
    posts: posts
  }
};

export const error = () => {
  return {
    type: POSTS_ERRORS
  }
};

export function fetchReddit() {
  return async function(dispatch) {
    dispatch(fetch_posts());
    const res = await fetch("https://www.reddit.com/r/all/top.json?limit=50");

    if ( res.ok ) {
      const json = await res.json()
      const posts = json.data.children.map(post => {
        return post.data
      })
      dispatch(receive_posts(posts));

    } else {
      dispatch(error());
    }

  };
}

export const dismiss = postId => {
  return {
    type: DISMISS_POST,
    postId: postId
  }
};

export const dismissAll = () => {
  return {
    type: DISMISS_ALL_POSTS
  }
};

export const viewPost = (post) => {
  return {
    type: VIEW_POST,
    post: post
  }
};

export const activePost = (post) => {
  return {
    type: ACTIVE_POST,
    post: post
  }
};
