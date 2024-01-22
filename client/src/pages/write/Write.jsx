import React, { useContext, useState } from "react";
import "./write.css";
import { IoAddOutline } from "react-icons/io5";
import { Context } from "../../context/Context";
import axios from "axios";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userName: user?.user?.userName,
      title,
      desc,
    };
    
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);

      try {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/upload`, data);
      } catch (error) {
        console.log(error);
      }
      newPost.photo = filename;
    }

    try {
      const res = await axios.post(`http://localhost:4500/api/posts`, newPost);
      window.location.replace("/", res.data._id);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}

      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <IoAddOutline className="writeIcone" />
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          <input
            type="text"
            placeholder="Title"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            type="text"
            placeholder="Tell Your Story..."
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <button className="writeSubmit_btn" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
