import { 
  FETCH_POSTS,
  RECEIVE_POSTS,
  POSTS_ERRORS,
  DISMISS_POST,
  DISMISS_ALL_POSTS,
  VIEW_POST
} from '../actions/types'

export const initialState = {
    posts: [],
    dismissed: [],
    viewed: [],
    active: [],
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
      case DISMISS_POST:
        return {
          ...state,
          dismissed: [ ...state.dismissed, action.postId],
          posts: state.posts.filter( post => post.id !== action.postId ),
          isError: false,
          isFetching: false
        }
      case DISMISS_ALL_POSTS:
        return {
          ...state,
          dismissed: state.dismissed.concat(state.posts.map( post => post.id )),
          posts: [],
          isError: false,
          isFetching: false
        }
      case VIEW_POST:
        return {
          ...state,
          viewed: [ ...state.viewed, action.post.id],
          active: action.post,
          isError: false,
          isFetching: false
        }
      default:
        return state;
    }

  };
  
  export default redditReducer;