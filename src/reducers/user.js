
import { ADD_USER, CREATE_USER, GET_LIST_USERS} from '../constants/action-types'


const initialState = {
    loading : false,
    list : [],
    user: {}
};

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                loading: false,
                user: action.data
            }

        case CREATE_USER.PENDING:
            return {
                ...state,
                loading: true
            }

        case CREATE_USER.SUCCESS:

            // console.log(action)

            return {
                ...state,
                loading: false,
                user: action.data
            }

        case CREATE_USER.ERROR:
            return {
                ...state,
                loading: false
            }

        case GET_LIST_USERS.PENDING :
            return {
                ...state, 
                loading: true
            }

        case GET_LIST_USERS.SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload // STANDARD "Payload" data is ONLY "action.payload"
            }

        case GET_LIST_USERS.ERROR:
            return {
                ...state,
                loading: false
            }

        default :
            // console.log(":)");
            break
            
    }

    return state;


}

export default userReducer;