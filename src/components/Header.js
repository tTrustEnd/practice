import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom'
import { handleLogoutUSerRedux } from '../redux/action/action';
import { useDispatch, useSelector } from 'react-redux';
const Header = () => {
  const user = useSelector(state => state.user.account)
  const dispatch = useDispatch();
  const navigate = useNavigate();
const handleLogout =  () => {
  dispatch(handleLogoutUSerRedux());
  navigate('/')
}
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>

          <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
    
          <>
         
          < Nav className="me-auto" >
          <NavLink to="/" className={isActive =>
            "nav-link" + (!isActive ? " unselected" : "")
          }
          >   Home
          </NavLink>
          
          <NavLink to="/users" className={isActive =>
            "nav-link" + (!isActive ? " unselected" : "")
          }
          >
         Manage Users
          </NavLink>
        </Nav>

        <Nav>
    {user.token && user.email&&user.auth===true &&<span className='nav-link'>{`welcome ${user.email}`} </span> }
          <NavDropdown title="Setting" >
          <NavDropdown.Item>
         {user && user.email?
          <NavLink to='' className='dropdown-item'   onClick={handleLogout}>Logout</NavLink>
          : <NavLink to='/login' className='dropdown-item'>Login</NavLink>
         
         }
          

          </NavDropdown.Item>
         
           
          </NavDropdown>
        </Nav>
        </>
        
       
      </Navbar.Collapse>
    </Container>
  </Navbar >
  </>
              
     

  )
}
export default Header;