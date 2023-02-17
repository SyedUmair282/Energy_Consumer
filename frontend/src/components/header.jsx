import React,{useState,useEffect} from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom";
import './header.css'

const Header = () => {
  const navigate = useNavigate();
  const [token,setToken]=useState("");
  
  
  const logout=async()=>{
    localStorage.clear();
    navigate("/");
    window.location.reload();
  }
  
  
  useEffect(() => {
    const tokenStorage=JSON.parse(localStorage.getItem('User'));
    setToken(tokenStorage);    
  }, [])
  //console.log("User==>",token.username);
  
  return (
    <div className="main_container">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/" className="brand">ENERGY-CONSUMER</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav" style={{}}>
            <Nav  className="ms-auto" style={{width:"100%",justifyContent:"flex-end"}}>
              
                <Link className="link" to="/" style={{padding:"1%"}}>Home</Link>
             
             
                <Link className="link" to="/about" style={{padding:"1%"}}>About</Link>
                {token?
                

            <NavDropdown title={token.username} id="basic-nav-dropdown" style={{padding:"0.25%",color:"black",fontWeight:"bold"}}>
                <NavDropdown.Item>
                  <Link className="link" to="/12/dashboard">Dashboard</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link className="link" to="/calculation">Calculate bill</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            
              :
                <Link className="link" to="/login" style={{padding:"1%"}}>Sign In</Link>
              }
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
