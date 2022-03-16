import { async } from "q";
import React, { useEffect, useState } from "react";
import MyNavbar from "./MyNavbar";

function Main() {
  const [blogs, setBlogs] = useState([]);
  const fetchData = async () => {
    try {
      let res = await fetch("http://localhost:3001/user/me/stories", {
        method: "GET",
        headers: {},
      });
      if (res.ok) {
        let data = await res.json();
        setBlogs(data);
        console.log(data);
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
      <MyNavbar />
    </div>
  );
}

export default Main;
