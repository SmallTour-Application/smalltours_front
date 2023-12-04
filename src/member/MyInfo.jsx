import React, {useEffect, useState} from 'react';
import testImg from "../images/test.png";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box, Button, Checkbox, Collapse,
    createTheme, Divider, FormControlLabel,
    Grid, Radio, RadioGroup,
    TextField,
    ThemeProvider
} from "@mui/material";
import TopBar from "../component/TopNav";
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function MyInfo(props) {

    const accessToken = useSelector((state) => state.accessToken); // 저장되어있는 accessToken

    const navigate = useNavigate();

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    const [name, setName] = useState(""); // 이름
    const [nickname, setNickname] = useState("") // 닉네임
    const [email, setEmail] = useState("") // 이메일
    const [curPw, setCurPw] = useState("") // 현재 비밀번호(입력받기)
    const [chgPw1, setChgPw1] = useState("") // 변경할 비밀번호
    const [chgPw2, setChgPw2] = useState("") // 변경할 비밀번호(확인용)
    const [tel, setTel] = useState("01000000000"); // 전화번호

    const [nameEdit, setNameEdit] = useState(false); // 이름 편집 시 true
    const [nickEdit, setNickEdit] = useState(false);
    const [pwEdit, setPwEdit] = useState(false); // 비밀번호 편집 시 true
    const [telEdit, setTelEdit] = useState(false); // 전화번호 편집 시 true

    // 전화번호 변경 시 숫자만 들어가게
    const handleTelChange = (e) => {
        const value = e.target.value;

        // 입력된 값이 숫자인지 확인
        if (!isNaN(value)) {
            setTel(value);
        }
    }
    // 개인정보 가져오는
    const getInfo = async () => {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/member/info`, null,{
                headers: {
                    'Authorization': `${accessToken}`,
                },
            }
        ).catch((err) => {
            console.log(err)
        }).then((res) => {
            console.log(res)
            if(res){
                setName(res.data.name)
                setNickname(res.data.nickname)
                setEmail(res.data.email)
                setTel(res.data.tel)
            }
        })
    }
    
    // 닉네임 변경
    const updateNickname = async () => {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/member/updatenickname`, {nickname: nickname}, {
                headers:{'Authorization': `${accessToken}`,}
            }
        ).then((res) => {
                // 회원정보 재요청
                getInfo();
                // 닉네임 변경 관련 state 초기화
                setNickEdit(false);
        }
        )
    }


    // 비밀번호 변경
    const updatePw = async () => {
        if(chgPw1 !== chgPw2){
            alert("비밀번호가 일치하지 않습니다.")
            return;
        }
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/member/updatepw`, {chgPw: chgPw1, curPw: curPw}, {
                headers:{'Authorization': `${accessToken}`,}
            }
        ).then((res) => {
                // 회원정보 재요청
                getInfo();
                // 닉네임 변경 관련 state 초기화
                setPwEdit(false);
                setChgPw2(false);
                setChgPw1(false);
        }
        ).catch((err) => {
            alert("비밀번호를 확인해주세요.")
        })
    }

    // 전화번호 변경
    const updateTel = async () => {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/member/updatetel`, {tel: tel}, {
                headers:{'Authorization': `${accessToken}`,}
            }
        ).then((res) => {
                // 회원정보 재요청
                getInfo();
                // 닉네임 변경 관련 state 초기화
                setTelEdit(false);
        }
        ).catch((err) => {
            alert("이미 같은 전화번호가 있어요.")
        })
    }


    // 컴포넌트 로드 시
    useEffect(() => {
        // 로그인되어있지 않으면 login 페이지로 이동
        if(!accessToken){
            navigate(`/login`);
        }else{
            // 로그인 되어있는 경우 api 호출
            getInfo();
        }
    }, [])

    return (
        <Grid content item xs={12}>
            <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems={"center"} sx={{mb: "2rem"}}>
                <Typography sx={{fontSize: "2rem", fontWeight: "700"}}>
                    개인정보
                </Typography>
            </Grid>
            <Grid container item xs={12} sx={{ border:2,borderColor: "#DDDDDD", borderRadius: "1vw" , overflow:"hidden"}}>
                {/* 이름 **/}
                <Grid xs={12} item container>
                    <Grid item xs={6} md={4} lg={3} display={"flex"} justifyContent="flex-start" alignItems={"center"}
                        sx={{backgroundColor:"#F5F5F5", py:"1rem", pl:"2rem"}}
                    >
                        <Typography sx={{fontWeight: "700", fontSize: "1rem"}}>이름</Typography>
                    </Grid>
                    <Grid item xs={6} md={8} lg={9} display={"flex"} justifyContent="flex-start" alignItems={"center"}
                        sx={{py:"1rem", pl:"2rem"}}
                    >
                        <Typography sx={{fontWeight: "500", fontSize: "1rem"}}
                                    display={"flex"} justifyContent="flex-start" alignItems={"center"}
                        >
                            {name}
                        </Typography>
                    </Grid>
                </Grid>

                {/* 닉네임 **/}
                <Grid xs={12} item container>
                    <Grid item xs={6} md={4} lg={3} display={"flex"} justifyContent="flex-start" alignItems={"center"}
                          sx={{backgroundColor:"#F5F5F5", py:"1rem", pl:"2rem"}}
                    >
                        <Typography sx={{fontWeight: "700", fontSize: "1rem"}}>닉네임</Typography>
                    </Grid>
                    <Grid item xs={6} md={8} lg={9} display={"flex"} justifyContent="flex-start" alignItems={"center"}
                          sx={{py:"1rem", pl:"2rem"}}
                    >
                        <Typography sx={{fontWeight: "500", fontSize: "1rem"}}
                                    display={"flex"} justifyContent="flex-start" alignItems={"center"}
                        >
                            {nickEdit === false && nickname}
                            {nickEdit === true && (
                                <TextField variant="standard" sx={{mr: "1rem"}}
                                           value={nickname} onChange={(e) => setNickname(e.target.value)}
                                />
                            )}
                            {/* 편집 버튼 눌렀을 시에는 TextField로 변환 **/}
                            {nickEdit === true && (
                                <CloseIcon onClick={() => setNickEdit(false)} />
                            )}
                            {nickEdit === true && (
                                <CheckIcon onClick={() => updateNickname()}/>
                            )}
                            {nickEdit === false && (
                                <EditIcon onClick={() => setNickEdit(true)}/>
                            )}
                        </Typography>
                    </Grid>
                </Grid>

                {/* 이메일 **/}
                <Grid xs={12} item container>
                    <Grid item xs={6} md={4} lg={3} display={"flex"} justifyContent="flex-start" alignItems={"center"}
                          sx={{backgroundColor:"#F5F5F5", py:"1rem", pl:"2rem"}}
                    >
                        <Typography sx={{fontWeight: "700", fontSize: "1rem"}}>이메일</Typography>
                    </Grid>
                    <Grid item xs={6} md={8} lg={9} display={"flex"} justifyContent="flex-start" alignItems={"center"}
                          sx={{py:"1rem", pl:"2rem"}}
                    >
                        <Typography sx={{fontWeight: "500", fontSize: "1rem"}}
                                    display={"flex"} justifyContent="flex-start" alignItems={"center"}
                        >
                            {email}
                        </Typography>
                    </Grid>
                </Grid>

                {/* 비밀번호 **/}
                <Grid xs={12} item container>
                    <Grid item xs={6} md={4} lg={3} display={"flex"} justifyContent="flex-start" alignItems={"center"}
                          sx={{backgroundColor:"#F5F5F5", py:"1rem", pl:"2rem"}}
                    >
                        <Typography sx={{fontWeight: "700", fontSize: "1rem"}}>비밀번호</Typography>
                    </Grid>
                    <Grid item xs={6} md={8} lg={9} display={"flex"} justifyContent="flex-start" alignItems={"center"}
                          sx={{py:"1rem", pl:"2rem"}}
                    >
                        <Typography sx={{fontWeight: "500", fontSize: "1rem"}}
                                    display={"flex"} justifyContent="flex-start" alignItems={"center"}
                        >
                            {pwEdit === false && "**********"}
                            {pwEdit === true && (
                                <TextField variant="standard" sx={{mr: "1rem"}} type={"password"} value={chgPw1} onChange={(e) => setChgPw1(e.target.value)}/>
                            )}
                            {/* 편집 버튼 눌렀을 시에는 TextField로 변환 **/}
                            {pwEdit === false && (
                                <EditIcon onClick={() => pwEdit === true ? setPwEdit(false) : setPwEdit(true)}/>
                            )}
                            {chgPw1 !== chgPw2 && "비밀번호가 일치하지 않습니다."}
                        </Typography>
                    </Grid>
                </Grid>

                {/* 비밀번호 확인 - 비밀번호 옆 편집 버튼 눌렀을 시에만 활성화**/}
                <Grid xs={12} container item>
                    <Collapse in={pwEdit} sx={{width:"100%"}}>
                        <Grid xs={12} item container>
                            <Grid item xs={6} md={4} lg={3} display={"flex"} justifyContent="flex-start"
                                  alignItems={"center"}
                                  sx={{backgroundColor:"#F5F5F5", py:"1rem", pl:"2rem"}}
                            >
                                <Typography sx={{fontWeight: "700", fontSize: "1rem"}}>비밀번호 확인</Typography>
                            </Grid>
                            <Grid item xs={6} md={8} lg={9} display={"flex"} justifyContent="flex-start"
                                  alignItems={"center"}
                                  sx={{py:"1rem", pl:"2rem"}}
                            >
                                <Typography sx={{fontWeight: "500", fontSize: "1rem"}}
                                            display={"flex"} justifyContent="flex-start" alignItems={"center"}
                                >
                                    <TextField variant="standard" sx={{mr: "1rem"}} type={"password"} value={chgPw2} onChange={(e) => setChgPw2(e.target.value)}/>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid xs={12} item container>
                            <Grid item xs={6} md={4} lg={3} display={"flex"} justifyContent="flex-start"
                                  alignItems={"center"}
                                  sx={{backgroundColor:"#F5F5F5", py:"1rem", pl:"2rem"}}
                            >
                                <Typography sx={{fontWeight: "700", fontSize: "1rem"}}>현재 비밀번호</Typography>
                            </Grid>
                            <Grid item xs={6} md={8} lg={9} display={"flex"} justifyContent="flex-start"
                                  alignItems={"center"}
                                  sx={{py:"1rem", pl:"2rem"}}
                            >
                                <Typography sx={{fontWeight: "500", fontSize: "1rem"}}
                                            display={"flex"} justifyContent="flex-start" alignItems={"center"}
                                >
                                    <TextField variant="standard" sx={{mr: "1rem"}} type={"password"} value={curPw} onChange={(e) => setCurPw(e.target.value)}/>
                                    {pwEdit === true && (
                                        <CloseIcon onClick={() => setPwEdit(false)}/>
                                    )}
                                    <CheckIcon onClick={() => updatePw()}/>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Collapse>
                </Grid>


                {/* 전화번호 **/}
                <Grid xs={12} item container>
                    <Grid item xs={6} md={4} lg={3} display={"flex"} justifyContent="flex-start" alignItems={"center"}
                          sx={{backgroundColor:"#F5F5F5", py:"1rem", pl:"2rem"}}
                    >
                        <Typography sx={{fontWeight: "700", fontSize: "1rem"}}>전화번호</Typography>
                    </Grid>
                    <Grid item xs={6} md={8} lg={9} display={"flex"} justifyContent="flex-start" alignItems={"center"}
                          sx={{py:"1rem", pl:"2rem"}}
                    >
                        <Typography sx={{fontWeight: "500", fontSize: "1rem"}}
                                    display={"flex"} justifyContent="flex-start" alignItems={"center"}
                        >
                            {telEdit === false && tel}
                            {telEdit === true && (
                                <TextField variant="standard" sx={{mr: "1rem"}}
                                    value={tel} onChange={handleTelChange}
                                />
                            )}
                            {/* 편집 버튼 눌렀을 시에는 TextField로 변환 **/}
                            {telEdit === true && (
                                <CloseIcon onClick={() => setTelEdit(false)} />
                            )}
                            {telEdit === true && (
                                <CheckIcon onClick={() => updateTel()}/>
                            )}
                            {telEdit === false && (
                                <EditIcon onClick={() => setTelEdit(true)}/>
                            )}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default MyInfo;