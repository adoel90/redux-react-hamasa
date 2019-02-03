import axios from 'axios'
import { API_POST_USER_LOGIN_REQUEST, AP } from '../constants/action-types'


const loginMiddleware = ({dispatch}) => (next) => (action) => {


    if(action.type === API_POST_USER_LOGIN_REQUEST){

        axios
            .post(action.payload.url, action.data.data)
            .then(function(response){
                
                if(response.status == 200 || response.statusText == "OK"){

                    dispatch({type: action.payload.next.SUCCESS, payload: response.data.result})
                    // console.log("Access Token : ", response.data.result.accessToken)
                    localStorage.setItem('accessToken', response.data.result.accessToken)

                } else { console.log("Status response NOT OK, NOT 200 !")}
            })
            .catch(function(error){
                console.log("Error : ", error)
                dispatch({type: action.payload.next.ERROR})
            })

        dispatch({type: action.payload.next.PENDING });
    }

    //Hati - hati kelupaan "synntax" ini !
    next(action);

}

export default loginMiddleware;