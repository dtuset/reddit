import { FETCH_POSTS, RECEIVE_POSTS, POSTS_ERRORS } from '../actions/types'

export const initialState = {
    posts: [],
    isFetching: false,
    isError: false
};
  
  const redditReducer = (state = initialState, action) => {
    
    //console.log(action);

    switch (action.type) {
      case FETCH_POSTS:
        return {
          ...state,
          isFetching: true,
          isError: false
        }
      case RECEIVE_POSTS:
        return {
          ...state,
          posts: action.posts,
          isFetching: false,
          isError: false
        }
      case POSTS_ERRORS:
        return {
          ...state,
          isError: true,
          isFetching: false
        }
      default:
        return state;
    }

  };
  
  export default redditReducer;