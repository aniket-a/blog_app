import React from 'react'
import "./post.css"
import { Link } from 'react-router-dom'

const Post = ({post}) => {
    const pf = "http://localhost:4500/images/";
  return (
    <div className="post">
      {post.photo && (
        <img
          className="postImg"
          src={pf + post.photo}
          alt=""
        />
      )}

      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c, i) => (
            <span className="postcat" key={i}>{c}</span>
          ))}

        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`}>{post.title}</Link>
        </span>
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDescription">{post.desc}</p>
    </div>
  );
};

export default Post

