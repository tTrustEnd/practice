import Home from '../components/Home'
import {Routes, Route, Link} from'react-router-dom'
import Login from '../components/Login';
import PrivateRoute from './PrivateRoute';
import TableAllUser from '../components/TableAllUser';
import Error from './Error';
const AppRoutes = () => {
    return (
        <>
         <Routes>
    <Route path='/' element = {<Home />} />
    <Route path='/login' element = {  <Login/>} />
    <Route path ='*' element = {<Error/>}/>
    <Route
    path='users'
    element={
        <PrivateRoute>
            <TableAllUser/>
        </PrivateRoute>
    }
    />


    </Routes>

   

        </>
    )
}
export default AppRoutes;