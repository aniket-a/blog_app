import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topbar from './components/topbar/Topbar';
import Home from './pages/home/Home';
import SinglePage from './pages/Single/Single';
import Singlepost from './components/SinglePost/Singlepost';
import Single from './pages/Single/Single';
import Write from './pages/write/Write';
import Settings from './pages/settings/Settings';
import Login from './pages/login/Login';
import Register from "./pages/register/Register"
import { Context } from './context/Context';

const App = () => {
  const {user} = useContext(Context)
  return (
    <div>
      <BrowserRouter>
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/register" element={user? <Home /> : <Register />} />
          <Route path="/login" element={user? <Home /> : <Login />} />
          <Route path='/write' element={user? <Write /> : <Register />} />
          <Route path="/settings" element={user? <Settings /> : <Register /> } />
          <Route path="/post/:postId" element={<Single />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;