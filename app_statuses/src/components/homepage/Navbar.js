import React from "react"
import { Navbar, Container } from "react-bootstrap";
import './Navbar.css'
import { useNavigate } from "react-router-dom";

const Header = (props) => {
    const navigate = useNavigate();

    return ( 
        <div className='NavProp'>
           <Navbar variant="dark" bg="dark" expand="lg">
                <Container fluid>
                  <Navbar.Brand>                    
                    <ul>
                      <li className="clickable" onClick={() => navigate('/homepage')}>
                        <img
                          alt=""
                          src="https://pbs.twimg.com/profile_images/1142044419924910081/2jVH0Hcb_400x400.jpg"
                          width="50"
                          height="50"
                          className="d-inline-block align-top"
                        />
                      </li>
                      <li className="clickable" onClick={() => navigate('/homepage')}>
                        <h2>OZI APPS SERVERS</h2>
                      </li>
                    </ul>
                  </Navbar.Brand>
                </Container>
              </Navbar>
        </div>
    )
}

export default Header;