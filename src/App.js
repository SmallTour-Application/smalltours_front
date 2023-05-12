import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./unauth/Login";
import Join from "./unauth/Join";
import Main from "./unauth/Main";

function App() {
  return (
      <Routes>
          <Route path={"/login"} element={<Login />}/>
          {/* 회원가입 */}
          <Route path="/join" element={<Join/>}/>
          {/* 메인 */}
          <Route path="/main" element={<Main/>}/>
      </Routes>
  );
}

export default App;
