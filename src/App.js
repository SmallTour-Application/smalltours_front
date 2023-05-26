import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./unauth/Login";
import Join from "./unauth/Join";
import Main from "./unauth/Main";
import Tour from "./unauth/Tour";
import MyInfo from "./member/MyInfo";
import MyPage from "./member/MyPage";
import SearchResult from "./unauth/SearchResult";
import {useDispatch} from "react-redux";
import {setAccessToken} from "./redux/actions";
import Cookies from "js-cookie"


function App() {
    const dispatch = useDispatch();

    // token을 리덕스로 가져옴. 이후에 refresh token 적용 시 쿠키에는 refresh token, redux에는 access token 적용하는 식으로 진행.
    useEffect(() => {
        if(Cookies.get('accessToken'))
        dispatch(setAccessToken(Cookies.get('accessToken')));
    },[])

  return (
      <Routes>
          {/* 로그인 **/}
          <Route path={"/login"} element={<Login />}/>
          {/* 회원가입 */}
          <Route path="/join" element={<Join/>}/>
          {/* 메인 */}
          <Route path="/main" element={<Main/>}/>
          {/* 투어 */}
          <Route path="/tour" element={<Tour/>}/>
          {/* 내정보 */}
          <Route path="/my/:value" element={<MyPage/>}/>
          {/* result */}
          <Route path="/search" element={<SearchResult/>}/>
      </Routes>
  );
}

export default App;
