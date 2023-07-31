import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { BrowserRouter, Route, Link } from "react-router-dom"
import './styles/AppBar.css'
import icon from './blue-icon.png'

function AppBar({token}) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container className='nav-container'>
        <Navbar.Brand as={Link} to="/"><img src={icon} className='img-bar'/> Chesslines</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
          
            <Nav.Link as={Link} to='learn'>My Moves</Nav.Link>
            
            <Nav.Link as={Link} to="contact">Contact</Nav.Link>
          </Nav>
          <Nav>
            {!token && token!=="" && token !== undefined ?
            <>
              <Nav.Link as={Link} to='login'>Sign in</Nav.Link>
              <Nav.Link as={Link} to='signup'>Sign up</Nav.Link>
            </>
            :
            <Nav.Link as={Link} to='logout'>Log out</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppBar