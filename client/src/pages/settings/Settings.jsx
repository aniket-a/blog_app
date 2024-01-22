import React, { useContext, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { FaRegUserCircle } from "react-icons/fa";
import "./setting.css";
import { Context } from "../../context/Context";
import axios from "axios";

const Settings = () => {
  const [file, setFile] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, dispatch } = useContext(Context);
  const userId = user.user._id;

  

  const PF = "https://blog-api-mocha-two.vercel.app/images/";

  const profiles = user?.user?.profilePic;
  const userNames = user?.user?.userName;
  const emails = user?.user?.email;


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    
    const updatedUser = {
      userId: user.user._id,
      userName,
      email,
      password,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      
      try {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/upload`, data)
        updatedUser.profilePic = filename;
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/users/${userId}`,updatedUser);
      alert(res?.data?.message)
      dispatch({ type: "UPDATE_SUCCESSFUL", payload:res?.data });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: "UPDATE_FAIL" });
    }
  };

  return (
    <div className="setting">
      <div className="settingWrapper">
        <div className="settingTitle">
          <span className="settingUpdateTitle">Update Your Account</span>
          <span className="settingDeleteTitle">Delete Account</span>
        </div>

        <form className="settingForm" onSubmit={handleSubmit}>
          <label htmlFor="fileInput">Profile</label>
          <div className="settingPP">
            <img src={file ? URL.createObjectURL(file) : PF + profiles} alt="/" />
            <label htmlFor="fileInput">
              <FaRegUserCircle className="settingPPIcon" />
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
              value=""
              name="file"
            />
          </div>

          <label>UserName</label>
          <input
            type="text"
            placeholder={userNames}
            onChange={(e) => setUserName(e.target.value)}
            name="userName"
          />

          <label>Email</label>
          <input
            type="text"
            placeholder={emails}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />

          <button type="submit" className="settingSubmitBtn">
            Update
          </button>
        </form>
      </div>

      <Sidebar />
    </div>
  );
};

export default Settings;
