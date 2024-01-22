import React,{useState} from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"


const Login = () => {

  const [userName, setuserName] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/register`, {
      userName,
      email,
      password,
    });
    console.log(res)
    alert(res?.data.message);
    navigate("/login")
  }

  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="loginTitle">Register...</div>

        <label htmlFor="">UserName</label>
        <input
          className="loginInputs"
          type="text"
          placeholder="Enter Your Username..."
          onChange={(e) => setuserName(e.target.value)}
        />

        <label htmlFor="">Email</label>
        <input
          className="loginInputs"
          type="text"
          placeholder="Enter Your Email..."
          onChange={(e) => setemail(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          className="loginInputs"
          type="password"
          placeholder="Enter Your password "
          onChange={(e) => setpassword(e.target.value)}
        />

        <button className="login_btn">
          <Link to="/register" onClick={handleSubmit}>Register</Link>
        </button>
      </form>

      <button className="register_btn">
        <Link className="tab_link" to="/login">
          Login
        </Link>
      </button>
    </div>
  );
};

export default Login;
