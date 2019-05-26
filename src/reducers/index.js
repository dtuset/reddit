import { combineReducers } from 'redux';
import redditReducer from './redditReducer';

const mainReducer = combineReducers({
    redditReducer
});

export default mainReducer;