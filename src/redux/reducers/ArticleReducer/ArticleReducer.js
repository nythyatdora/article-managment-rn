import {
    actions,
} from '../../actions/ArticleActions/ArticleActions';

const INITIAL_STATE = {
    articles: [],
    currentSelected: {},
    uploadedImageLink: '',
    searchedArticles: [],
};

const articleReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actions.CREATE_ARTICLE:
            return state;

        case actions.UPLOAD_IMAGE:
            return {
                ...state,
                uploadedImageLink: action.payload
            };

        case actions.VIEW_ARTICLES:
            return {
                ...state,
                articles: action.payload,
            };

        case actions.VIEW_ARTICLE_BY_ID:
            return {
                ...state,
                currentSelected: action.payload,
            };

        case actions.EDIT_ARTICLE_BY_ID:
            return state;

        case actions.DELETE_ARTICLE_BY_ID:
            return state;

        case actions.VIEW_ARTICLE_BY_NAME:
            return {
                ...state,
                searchedArticles: action.payload
            };

        case actions.CLEAR_IMAGE_LINK:
            return {
                ...state,
                uploadedImageLink: action.payload,
            };

        case actions.CLEAR_CURRENT_SELECTED:
            return {
                ...state,
                currentSelected: action.payload,
            };

        default:
            return state;
    }
}

export {
    articleReducer
};