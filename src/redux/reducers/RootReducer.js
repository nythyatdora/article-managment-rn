import { combineReducers } from 'redux';
import {
    articleReducer
} from './ArticleReducer/ArticleReducer'

const rootReducers = combineReducers({
    articleReducer:  articleReducer,
});

export default rootReducers;