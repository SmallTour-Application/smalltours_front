import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./unauth/Login";
import Join from "./unauth/Join";
import Main from "./unauth/Main";
import Tour from "./unauth/Tour";
import MyInfo from "./member/MyInfo";
import MyPage from "./member/MyPage";
import SearchResult from "./unauth/SearchResult";
import {useDispatch, useSelector} from "react-redux";
import {setAccessToken, setMemberId, setRole} from "./redux/actions";
import Cookies from "js-cookie"
import JoinDoor from "./unauth/JoinDoor";
import GuideJoin from "./unauth/GuideJoin";
import GuideMain from "./guide/GuideMain";
import GuideInfo from "./unauth/GuideInfo";
import AddTour from "./guide/AddTour";


function App() {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.accessToken);
    const navigate = useNavigate();

    // token을 리덕스로 가져옴. 이후에 refresh token 적용 시 쿠키에는 refresh token, redux에는 access token 적용하는 식으로 진행.
    useEffect(() => {
        if(Cookies.get('accessToken'))
            dispatch(setAccessToken(Cookies.get('accessToken')));
        if(Cookies.get('role'))
            dispatch(setRole(Cookies.get('role')));
        if(!accessToken && !Cookies.get('accessToken')){
            navigate("/login");
        }
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
          <Route path="/tour/:value" element={<Tour/>}/>
          {/* 내정보 */}
          <Route path="/my/:value" element={<MyPage/>}/>
          {/* result */}
          <Route path="/search" element={<SearchResult/>}/>
          {/* 가이드 정보 (다른사람이 볼때) **/}
          <Route path="/guideInfo/:value" element={<GuideInfo/>}/>
          {/* 가이드 회원가입 **/}
          <Route path="/guideJoin" element={<GuideJoin/>}/>
          {/* 가이드 메인 **/}
          <Route path="/guide/main/:value" element={<GuideMain/>}/>
          {/* tour 만들기 **/}
          <Route path="/guide/createTour" element={<AddTour/>}/>

      </Routes>
  );
}

export default App;
