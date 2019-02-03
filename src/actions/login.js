import { API_POST_USER_LOGIN_REQUEST, GET_ACCESS_TOKEN_USER_LOGIN } from '../constants/action-types'
import { URL_API } from '../constants/config-api'


export const postUserLogin = (data) => ({

    type: API_POST_USER_LOGIN_REQUEST,
    payload: {
            url: URL_API + "/user/login",
            next: GET_ACCESS_TOKEN_USER_LOGIN
        },
    data: data  
})