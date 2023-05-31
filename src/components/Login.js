import { useContext, useEffect, useState } from "react";
import { LoginAPI } from "../service/UserService";
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginUserRedux } from "../redux/action/action";
const Login = () => {
    const dispatch =useDispatch()
    const user = useSelector(state => state.user)
    const isLoading= useSelector(state => state.user.isLoading)
    const account = useSelector(state => state.user.account)

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');
    const [isShowPassWord, setIsShowPassWord] = useState(false);
    const [loadingLogin, setLoadingLogin] = useState(false);
    
    const handleLogin = async () => {
      setLoadingLogin(true)
        if(!email || !password) {
            toast.error('email/password is required')
        }
      dispatch(handleLoginUserRedux(email,password))
        setLoadingLogin(false)
        navigate('/')
      
    }

    const handlePressLogin = (event) => {
        if(event.keyCode===13){
            handleLogin()
        }
    }
    useEffect(()=>{
        if(account.email && account.token ){
            navigate('/logout')
        }
    },[account])
    console.log(account)
    return (
        <div className="login-container col-12 col-sm-4">
            <div className='title'> Log in</div>
            <div className='text'>Email or Username ( eve.holt@reqres.in )</div>
            <div>
                <input className="" type='text' placeholder="Email or Username"
                value={email}
                onChange={(event) =>setEmail(event.target.value) }
                ></input>
            </div>
           
            <div className='input-2'>
            <input type={isShowPassWord ? 'text':'password'} placeholder="password" 
                value={password}
                onChange={(event) =>setPassWord(event.target.value) 
                }
                onKeyDown={(event) => handlePressLogin(event)}
            /><i className={isShowPassWord?" fa-solid fa-eye":"fa-solid fa-eye-slash"}
            onClick ={()=>setIsShowPassWord(!isShowPassWord)}
            ></i>
    
            </div>
            <div>
            <button 
            disabled = {email && password? false: true}
            onClick={()=>{handleLogin()}}
            > { isLoading &&<i className="fas fa-spinner fa-spin"/>} Login</button>
            </div>
            <div className = 'goback'>
            <span>Go back</span>
            </div>

        </div>
    )
}
export default Login;