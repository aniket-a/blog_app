import React, { useEffect, useState } from 'react'
import "./sidebar.css"
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaPinterestSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  const [cat, setcat] = useState([])

  useEffect(()=>{
    const getAllCategories = async()=>{
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/cat`);
        setcat(res?.data);
    }
    getAllCategories()
  },[])

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://plus.unsplash.com/premium_photo-1700581634051-afa0328ef3fc?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
          debitis quos ullam vitae repellat dicta adipisci eligendi quas eius
          suscipit iure consectetur officia impedit architecto voluptatem,
          dignissimos expedita iusto error!
        </p>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cat.map((c, i) => (
            <Link key={i} to={`/?cat=${c.name}`}>
              <li className="sidebarListItems">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocials">
          <FaFacebookSquare className="sidebarIcone" />
          <FaTwitterSquare className="sidebarIcone" />
          <FaPinterestSquare className="sidebarIcone" />
          <FaInstagramSquare className="sidebarIcone" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar
