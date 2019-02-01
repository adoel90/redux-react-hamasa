

const asyncActionTypeUser = (type) => ({
    PENDING: `[API] ${type}_PENDING`,
    SUCCESS: `[API] ${type}_SUCCESS`,
    ERROR: `[API] ${type}_ERROR`,
});


export const API_POST_USER_REQUEST = '[Middleware] Api POST User Request...';
export const API_GET_USER_REQUEST = '[Middleware] Api GET User Request...';

export const CREATE_USER = asyncActionTypeUser('CREATE_USER');
export const GET_LIST_USERS = asyncActionTypeUser('GET_LIST_USERS');

//CRUD WITH REQRES API
export const ADD_USER = '[Action] Add user & job ...';


const asyncActionTypeLogin = (type) => ({
    PENDING: `${type} PENDING !`,
    SUCCESS: `${type} SUCCESS !`,
    ERROR: `${type} ERROR !`,
});

export const API_POST_USER_LOGIN_REQUEST = "[Middleware -> Action] Api Post User Login Request...";
// export const GET_ACCESS_TOKEN_USER_LOGIN = "[Action -> Reducer] Api Get Access Token user to login..."
export const GET_ACCESS_TOKEN_USER_LOGIN = asyncActionTypeLogin("[Middleware -> Reducer] Api Get Access Token user to login... ");


