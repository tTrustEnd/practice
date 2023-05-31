import { FETCH_USERLOGIN, FETCH_USERLOGOUT,LOGIN_SUCCESS, LOGIN_ERROR,USER_REFRESH} from '../action/action'

const initialState = {
  account: {
    email:'',
    auth:false,
    token:''
  },
  isLoading:false,
  isError:false
};

 const userReducerRedux = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERLOGIN:
      return {
        ...state,
       isLoading:true,
       isError:false
      };

    case LOGIN_ERROR:
      return {
        ...state,
       isLoading:false,
       isError:true
      };
      case LOGIN_SUCCESS:
        console.log('check acction', action)
        return {
          ...state,
        account:{
        auth:true,
        email: action.data.email,
        token:action.data.token
        },
        isLoading:false,
        isError:false
        };

        case FETCH_USERLOGOUT:
            return {
              ...state,
             account:{
              email:'',
              token:'',
              auth:false,
             },
             isLoading:false,
             isError:false
            };
            case USER_REFRESH:
              return {
                ...state,
               account:{
                auth:true,
                email: localStorage.getItem('email'),
                token: localStorage.getItem('token')},
               isLoading:false,
               isError:false
              };
    default:
      return state;
  }
};
export default userReducerRedux;