import React, { useEffect, useState } from "react";
import MyNavbar from "./MyNavbar";
import { Row, Col, Container, Card } from "react-bootstrap";

function Main() {
  const url = window.location;

  const access_token = () => {
    if (new URLSearchParams(url.search).get("accessToken")) {
      const data = new URLSearchParams(url.search).get("accessToken");
      console.log("hello", data);
      localStorage.setItem("MyToken", data);
      return data;
    } else if (localStorage.getItem("MyToken")) {
      console.log("hi");
      return localStorage.getItem("MyToken");
    }
  };
  useEffect(() => {
    access_token();
  }, []);

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
        console.log("fetch");
      } else {
        console.log("fetch error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("fetch use");
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
