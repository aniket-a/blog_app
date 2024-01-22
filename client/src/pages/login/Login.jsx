import React, { useContext, useRef } from 'react'
import "./login.css"
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../context/Context';
import axios from "axios"


const Login = () => {

  const navigate = useNavigate()
   
  const { dispatch, isFetching } = useContext(Context);

  const emailRef = useRef()
  const passwordRef = useRef();


  const handleSubmit = async(e)=>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"})
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`,{
          email:emailRef.current.value,
          password:passwordRef.current.value
        });
        console.log(res)
        dispatch({ type: "LOGIN_SUCCESSFUL", payload:res?.data });
        alert(res.data.message)
        navigate("/")
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL" });
    }
  }
console.log(isFetching);
  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="loginTitle">Login!</div>

        <label htmlFor="">Email</label>
        <input className="loginInputs" type="text" placeholder="Enter Your Email..." ref={emailRef} required/>

        <label htmlFor="">Password</label>
        <input
          className="loginInputs"
          type="text"
          placeholder="Enter Your password "
          ref={passwordRef}
          required
        />

        <button type="submit" onClick={handleSubmit} className="login_btn">
          <Link to="/login">Login</Link>
        </button>
      </form>

      <button className="register_btn">
        <Link to="/register" className="regi_link">
          Register
        </Link>
      </button>
    </div>
  );
}

export default Login
