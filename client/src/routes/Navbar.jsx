import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from '../assets/BlueTechtonicaWord.png'
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet, Link } from "react-router-dom";

function MyNavBar() {

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <>
      <Navbar data-testid="navbar" bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={Logo}
              height="30"
              className="d-lg-inline-block"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          {!user ? null : <Nav.Link to="/user-profile" as={Link}>{user.name}</Nav.Link>}

          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
          
            <Navbar.Text>
              {!isAuthenticated ? (<button onClick={() => loginWithRedirect()}>Log In</button>) : (<button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Log Out
              </button>)}

            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default MyNavBar;