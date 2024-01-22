import React, { useContext, useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import "./singlepost.css";
import Sidebar from '../sidebar/Sidebar';
import { MdDelete } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
import axios from "axios"
import { Context } from '../../context/Context';

const Singlepost = () => {
  const { user } = useContext(Context)
  const singleUser = user?.user?.userName

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [updateMode, setUpdateMode] = useState(false)


  const location = useLocation();
  const path = location.pathname.split("/")[2]

  const [post, setpost] = useState([])
  const pf = "http://localhost:4500/images/";

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/posts/` + path
      );
      setpost(res?.data);
      setTitle(res?.data?.title)
      setDesc(res?.data?.desc)
      
    };
    getPost();
  }, [path]);


  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/${post._id}`, { data: { userName: singleUser } });
      console.log(res);
      window.location.replace("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = () => {
    setUpdateMode(true)

  }
  
  const updateHandler = async()=>{
    try {
      const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/posts/${post._id}`, {
         userName: singleUser, title, desc 
      })
      console.log(res.data)
      setUpdateMode(false)
      window.location.reload()
    } catch (error) {
      console.log(error.message)
    }
  }


  console.log(post._id);

  return (
    <div className="singlepost">
      <div className="singlepostWrapper">
        {post?.photo && (
          <img className="singlepostImg" src={pf + post.photo} alt="" />
        )}

        {
          updateMode ? <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} className='singlepostTitle' /> : (
            <h1 className="singlepostTitle">
              {post?.title}
              {post?.userName === singleUser && (
                <div className="singlePostEdit">
                  <FaEdit style={{ color: "skyblue" }} className="singlepost" onClick={handleEdit} />
                  <MdDelete
                    style={{ color: "crimson" }}
                    className="singlepost"
                    onClick={handleDelete}
                  />
                </div>
              )}
            </h1>
          )
        }



        <div className="singlepostInfo">
          <span className="singlepostAuthor">
            Author:
            <Link to={`/?userName=${post.userName}`}>
              <b>{post?.userName}</b>{" "}
            </Link>
          </span>
          <span className="singlepostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {
          updateMode ? <textarea className="singlepostDescription" value={desc} onChange={(e) => setDesc(e.target.value)} /> : <p className="singlepostDescription">{post.desc}</p>
        }
      </div>
      {updateMode ?<div className="updateBox">
        <button className="updateBtn" onClick={updateHandler}>Update</button>
      </div>:""}
    </div>
  );
}

export default Singlepost
