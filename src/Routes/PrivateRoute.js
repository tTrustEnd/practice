import { Routes,Route } from "react-router-dom";
import TableAllUser from "../components/TableAllUser";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import Error from "./Error";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
    const user = useSelector(state=>state.user.account);
    if(!user || !user.email||user.auth!==true ){
        return (<>
     <Error/>

        </>)
    }
    return (<>
   {props.children}
    </>)

}
export default PrivateRoute;