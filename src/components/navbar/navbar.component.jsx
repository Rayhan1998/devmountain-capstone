import { Heading } from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context";
import "./navbar.styles.css";

export default function Navbar() {
  const { isLoggedIn, userData } = useContext(Context);
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <nav>
      <Heading>
        <Link to="/">Discourse </Link>
      </Heading>

      {isLoggedIn ? (
        <div className="navbar-right-side">
          <ul>
            <li>
              <Link to="/"> Homepage </Link>
            </li>
            <li>{`Hello ${userData.user_name}`}</li>
            {/* <li> Hello {userData ? userData.name : ` user`}</li> */}
            <li onClick={logout}>
              <Link to="/"> Sign out </Link>
            </li>
            <li>
              <Link to="/likedThreads"> Liked Threads </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className="navbar-right-side">
          <ul>
            <li>
              <Link to="/"> All Threads Page </Link>
            </li>

            <li>
              <Link to="/signin"> Sign In </Link>
            </li>
            <li>
              <Link to="/register"> Register</Link>
            </li>
            <li>
              <Link to="/likedThreads"> Liked Threads </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
