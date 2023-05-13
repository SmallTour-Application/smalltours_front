import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./unauth/Login";
import Join from "./unauth/Join";
import Main from "./unauth/Main";
import Tour from "./unauth/Tour";

function App() {
  return (
      <Routes>
          {/* 로그인 **/}
          <Route path={"/login"} element={<Login />}/>
          {/* 회원가입 */}
          <Route path="/join" element={<Join/>}/>
          {/* 메인 */}
          <Route path="/main" element={<Main/>}/>
          {/* 메인 */}
          <Route path="/tour" element={<Tour/>}/>
      </Routes>
  );
}

export default App;
