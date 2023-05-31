import './App.scss';
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify'
import { UserContext } from './context/UserContext';
import { useContext, useEffect } from 'react';
import AppRoutes from './Routes/AppRoutes';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleLoginUserRedux } from './redux/action/action';
import { handleRefresh } from './redux/action/action';
function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
const user = useSelector(state=>state.user.account)
  console.log(user)

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     dispatch(handleLoginUserRedux(localStorage.getItem('email'),localStorage.getItem('token')))
  //   }
  // }, [localStorage.getItem('token')])
  useEffect( () => {
    if(localStorage.getItem('token')){
      dispatch(handleRefresh())
   
    }

  }, []);
  return (
    <>

      <div className="app-container">
        <Header />
        <Container>
          <AppRoutes />
        </Container>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
