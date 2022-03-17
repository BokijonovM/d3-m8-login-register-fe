import React, { useEffect, useState } from "react";
import MyNavbar from "./MyNavbar";
import { Row, Col, Container, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function Main() {
  // const location = useLocation()
  const currentURL = window.location.href;
  const pathName = currentURL.slice(35);
  if (pathName.length > 1) {
    localStorage.setItem("MyToken", pathName);
  }

  const myToken = localStorage.getItem("MyToken");
  const dataJson = JSON.parse(JSON.stringify(myToken));
  const [blogs, setBlogs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const fetchData = async () => {
    try {
      let res = await fetch("http://localhost:3001/user/me/stories", {
        method: "GET",
        headers: {
          Authorization: `Bearer ` + dataJson,
          "Content-type": "application/json",
        },
      });
      if (res.ok) {
        let data = await res.json();
        setBlogs(data);
        setIsLoggedIn(true);
      } else {
        console.log("fetch error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <MyNavbar isLoggedIn={isLoggedIn} />
      <Container>
        <Row className=" my-3">
          {blogs.map((blog) => {
            return (
              <Col key={blog._id} sm={12} md={6} lg={3}>
                <Card className="my-3">
                  <Card.Img variant="top" src={blog.cover} />
                  <Card.Body>
                    <Card.Title>{blog.title}</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default Main;
