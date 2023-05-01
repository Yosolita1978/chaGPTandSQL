import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from '../assets/BlueTechtonicaWord.png'
import { useState } from 'react';


function MyNavBar(props) {

  const [users, setUsers] = useState(null)

  const handleLoging = () => {
    fetch ("http://localhost:8080/api/users")
    .then((response) => response.json())
    .then((users) => {
      setUsers(users)
    })
    //get request to the backend to bring the user 
    // put that user in someplace so I can grabe the name
    // change the Login text to my name
  }

  const handleLogout = () => {
    setUsers(null);
  }

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
        <Nav.Link >Your Link</Nav.Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {!users ? <button onClick={handleLoging} >Login</button> : <button onClick={handleLogout}>{users[0].fullname}</button>  }
            
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default MyNavBar;