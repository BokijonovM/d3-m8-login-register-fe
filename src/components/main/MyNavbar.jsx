import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MyNavbar({ isLoggedIn }) {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Hello World!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
          {isLoggedIn ? (
            <Button
              className="mr-2"
              variant="outline-primary"
              onClick={() => {
                localStorage.removeItem("MyToken");
                window.location.href = "/";
              }}
            >
              Logout
            </Button>
          ) : (
            <Nav>
              <Button
                className="mr-2"
                variant="outline-primary"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>{" "}
              <Button
                variant="outline-secondary"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>{" "}
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default MyNavbar;
