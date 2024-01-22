import React, { useContext, useState } from 'react'
import "./topbar.css"
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaPinterestSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom"
import { Context } from '../../context/Context';

const Topbar = () => {

  const PF = "http://localhost:4500/images/";

  const [isActive, setisActive] = useState(true)
  const [Menu, setMenu] = useState("HOME")

  const handleActive = () => {
    setisActive(!isActive)
  }

  const {user, dispatch} = useContext(Context) 

  const handleLogout = ()=>{
    dispatch({ type: "LOGOUT" });
  }

  return (
    <div className="top">
      <div className="topLeft">
        <FaFacebookSquare className="socialLink" />
        <FaTwitterSquare className="socialLink" />
        <FaPinterestSquare className="socialLink" />
        <FaInstagramSquare className="socialLink" />
      </div>

      <div className={isActive ? "active" : "topCenter"}>
        <ul className="toplist">
          <li onClick={() => setMenu("HOME")}>
            <Link to="/">HOME</Link> {Menu === "HOME" ? <hr /> : ""}
          </li>
          <li onClick={() => setMenu("ABOUT")}>
            <Link to="/about">ABOUT</Link> {Menu === "ABOUT" ? <hr /> : ""}
          </li>
          <li onClick={() => setMenu("CONTACT")}>
            <Link to="/contact">CONTACT</Link>{" "}
            {Menu === "CONTACT" ? <hr /> : ""}
          </li>
          <li onClick={() => setMenu("WRITE")}>
            <Link to="/write">WRITE</Link> {Menu === "WRITE" ? <hr /> : ""}
          </li>
          <li onClick={() => setMenu("LOGOUT")}>
            <Link to="/login" onClick={handleLogout}>
              {user ? "LOGOUT" : ""}
            </Link>{" "}
            {Menu === "LOGOUT" ? <hr /> : ""}
          </li>
        </ul>
      </div>

      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topimg" src={PF + user?.user?.profilePic} alt="" />
          </Link>
        ) : (
          <>
            <Link className="socialLink tab" to="/login">
              LOGIN
            </Link>
            <Link className="socialLink tab" to="/register">
              REGISTER
            </Link>
          </>
        )}
        <FaSearch className="topSearchIcon" />
      </div>

      <div className="menuBar">
        {isActive ? (
          <MdOutlineMenu onClick={handleActive} />
        ) : (
          <IoClose className="close" onClick={handleActive} />
        )}
      </div>
    </div>
  );
}

export default Topbar
