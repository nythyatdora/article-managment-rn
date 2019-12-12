const DomainApi = 'http://110.74.194.124:15011';

const actions = {
    CREATE_ARTICLE: 'CREATE_ARTICLE',
    UPLOAD_IMAGE: 'UPLOAD_IMAGE',
    EDIT_ARTICLE_BY_ID: 'EDIT_ARTICLE_BY_ID',
    DELETE_ARTICLE_BY_ID: 'DELETE_ARTICLE_BY_ID',
    SEARCH_ARTICLE_BY_NAME: 'SEARCH_ARTICLE_BY_NAME',

    VIEW_ARTICLES: 'VIEW_ARTICLES',
    VIEW_ARTICLE_BY_ID: 'VIEW_ARTICLE_BY_ID',
    VIEW_ARTICLE_BY_NAME: 'VIEW_ARTICLE_BY_NAME',
};

function createArticle(newArticle) {
    return dispatch => {
        fetch(`${DomainApi}/v1/api/articles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic QU1TQVBJQURNSU46QU1TQVBJUEBTU1dPUkQ=',
            },
            body: JSON.stringify(newArticle)
        })
            .then(respond => respond.json())
            .then(respond => {
                dispatch({
                    type: actions.CREATE_ARTICLE,
                    payload: respond.DATA,
                });
            })
            .catch(error => console.log(error));
    }
}

function uploadImage(file) {
    return dispatch => {
        fetch(`${DomainApi}/v1/api/uploadfile/single`, {
            method: 'POST',
            body: file,
        })
            .then(respond => respond.json())
            .then(respond => {
                dispatch({
                    type: actions.UPLOAD_IMAGE,
                    payload: respond.DATA,
                });
            })
            .catch(error => console.log(error));
    }
}

function viewArticles(page = 1, limit = 10) {
    return dispatch => {
        fetch(`${DomainApi}/v1/api/articles?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic QU1TQVBJQURNSU46QU1TQVBJUEBTU1dPUkQ=',
            },
        })
            .then(respond => respond.json())
            .then(respond => {
                dispatch({
                    type: actions.VIEW_ARTICLES,
                    payload: respond.DATA,
                });
            })
            .catch(error => console.log(error));
    }
}

function viewArticleById(id) {
    return dispatch => {
        fetch(`${DomainApi}/v1/api/articles/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic QU1TQVBJQURNSU46QU1TQVBJUEBTU1dPUkQ=',
            },
        })
            .then(respond => respond.json())
            .then(respond => {
                dispatch({
                    type: actions.VIEW_ARTICLE_BY_ID,
                    payload: respond.DATA,
                });
            })
            .catch(error => console.log(error));
    }
}

function viewArticleByName(query, page, limit) {
    return dispatch => {
        fetch(`${DomainApi}/v1/api/articles?title=${query}&page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic QU1TQVBJQURNSU46QU1TQVBJUEBTU1dPUkQ=',
            },
        })
            .then(respond => respond.json())
            .then(respond => {
                dispatch({
                    type: actions.VIEW_ARTICLE_BY_NAME,
                    payload: respond.DATA,
                });
            })
            .catch(error => console.log(error));
    }
}

function deleteArticleById(id) {
    return dispatch => {
        fetch(`${DomainApi}/v1/api/articles/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic QU1TQVBJQURNSU46QU1TQVBJUEBTU1dPUkQ=',
            },
        })
            .then(respond => respond.json())
            .then(respond => {
                dispatch({
                    type: actions.VIEW_ARTICLE_BY_ID,
                    payload: respond.DATA,
                });
            })
            .catch(error => console.log(error));
    }
}

export {
    actions,
    createArticle,
    uploadImage,
    viewArticles,
    viewArticleById,
    viewArticleByName,
    deleteArticleById
};