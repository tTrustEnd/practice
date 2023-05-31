
import { LoginAPI } from "../../service/UserService"
import {toast} from 'react-toastify'
export const FETCH_USERLOGIN = "FETCH_LOGIN"
export const FETCH_USERLOGOUT = "FETCH_LOGOUT"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_ERROR= "LOGIN_ERROR"
export const USER_REFRESH= "USER_REFRESH"

export const handleLoginUserRedux =  (email, password) => {
return async (dispatch, state) => {
    dispatch({type:"FETCH_LOGIN"} )
    let res = await LoginAPI(email.trim(), password)
    localStorage.setItem('token',res.token);
    localStorage.setItem('email',email)


    if(res && res.token){
        dispatch({type:"LOGIN_SUCCESS",data:{email:email,token:res.token}})
    }else{
        if(res && res.status===400){
            toast.error(res.data.error)
        }
        dispatch({type:"LOGIN_ERROR"})
    }
}
}

export const handleLogoutUSerRedux = ()=>{
    return (dispatch, token) =>{
        dispatch({
            type:"FETCH_LOGOUT"
        })
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        

    }
}
export const handleRefresh = (auth) => {
    return (dispatch, token) =>{
        dispatch({
            type:"USER_REFRESH"
        })
    }
}