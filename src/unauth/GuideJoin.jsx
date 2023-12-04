import React, {useEffect, useState} from 'react';
import TopBar from "../component/TopNav";
import {
    Box,
    Button,
    createTheme,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    ThemeProvider
} from "@mui/material";
import styles from "./css/Login.module.css";
import dayjs from 'dayjs';
import {LocalizationProvider, MobileDatePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { postcodeScriptUrl } from 'react-daum-postcode/lib/loadPostcode';
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";


function GuideJoin(props) {
    const navigate = useNavigate();// 페이지 이동

    const dispatch = useDispatch();// redux dispatch
    const accessToken = useSelector((state) => state.accessToken); // 엑세스 토큰

    const [email, setEmail] = useState(""); // 이메일
    const [pw, setPw] = useState(''); // 비밀번호
    const [checkPw, setCheckPw] = useState(false); // 비밀번호확인용
    const [name, setName] = useState(""); //이름
    const [nickname, setNickname] = useState(""); // 닉네임
    const [tel, setTel] = useState(""); // 전화번호
    const [birth, setBirth] = useState(dayjs(new Date())); // 생일
    const [gender, setGender] = useState(0);
    const [file, setFile] = useState(null); // 파일
    const [img, setImg] = useState('');


    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    // useEffect

    // 이미 로그인 된 경우 메인으로 이동
    useEffect(() => {
        if (accessToken) {
            navigate("/main")
            return null;
        }
    },[accessToken])

    useEffect(() => {
        if (accessToken) {
            navigate("/main")
            return null;
        }
    },[])

    // Function

    // 실시간 비밀번호 매칭 채크
    const checkingPW = (event) => {
        if (pw === event.target.value) {
            setCheckPw(true);
        } else {
            setCheckPw(false);
        }
    };

    // 비밀번호 규칙 체크
    const pwRuleCheck = () => {
        return true;
        /*// 비밀번호 규칙 검사
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/; // 영문, 숫자는 각각 1자 이상이고 총 8자 이상
        if (!passwordRegex.test(pw)) {
            // 비밀번호 규칙에 맞지 않는 경우
            alert("비밀번호는 영문과 숫자를 최소한 한 개 이상 포함하고, 8자 이상이어야 합니다.");
            return false;
        }
        // 비밀번호 규칙에 부합하는 경우
        return true;*/
    }

    // 회원가입 버튼 클릭 시
    const handleSubmit = async () => {
        // 1. 비밀번호 규칙 검사 수행
        if(!pwRuleCheck()){
            console.log("비밀번호 체크 오류");
            return;
        }
        // 2. formData에 합체
        console.log("회원가입 api 연결")
        const fd = new FormData();
        Object.values(file).forEach((file) => {
            fd.append('profileImgRequest', file);
        }); // 파일 임포트
        fd.append('email', email); // 이메일
        fd.append('password', pw); // 비밀번호
        fd.append('birthDay', `${birth.format('YYYY-MM-DD').toString()}`) // 생일
        fd.append('gender', gender) // 성별
        fd.append('nickname', nickname) // 닉네임
        fd.append('tel', tel) // 전화번호
        fd.append('name', name); // 이름
        fd.append('role', 1) // 역할
        // 회원가입 api 호출
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/unauth/member/signup`,
            fd,
            {
                headers:{
                    'Content-Type':`multipart/form-data`,
                },
            }
        ).then((res) => {
            console.log("회원가입 성공")
            alert("회원가입이 완료되었습니다. 이메일 인증 후 서비스를 이용하실 수 있습니다.");
            navigate("/login");
        }).catch((res) => {
            console.log("회원가입 실패");
            alert("회원가입 실패")
        })


    }

    return (
        <ThemeProvider theme={theme}>
            <TopBar/>
            <Grid container sx={{px:"30vw", mt:"7rem"}}>
                <Grid item xs={12} sx={{pt:2}}>
                    <p className={styles.font_body_login}>가이드 회원가입</p>
                </Grid>
                <Grid item xs={12} sx={{pt:2}}>
                    <p className={styles.font_body_menu}>이메일</p>
                    <TextField
                        required
                        id="email"
                        label="이메일"
                        name="email"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </TextField>
                </Grid>
                <Grid item xs={12} sx={{pt:2}}>
                    <p className={styles.font_body_menu}>비밀번호</p>
                    <TextField
                        required
                        id="password"
                        label="비밀번호(영문, 숫자를 포함하고 8자 이상)"
                        name="password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        onChange={(e) => setPw(e.target.value)}
                    >
                    </TextField>
                </Grid>
                <Grid item xs={12} sx={{pt:2}}>
                    <p className={styles.font_body_menu}>비밀번호 확인</p>
                    <TextField
                        required
                        id="passwordChk"
                        label="비밀번호 확인"
                        name="passwordChk"
                        variant="outlined"
                        type="password"
                        fullWidth
                        onChange={(e) => setCheckPw(e.target.value)}
                    >
                    </TextField>
                </Grid>
                <Grid item xs={12} sx={{pt:2}}>
                    <p className={styles.font_body_menu}>이름</p>
                    <TextField
                        required
                        id="name"
                        label="이름"
                        name="name"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setName(e.target.value)}
                    >
                    </TextField>
                </Grid>
                <Grid item xs={12} sx={{pt:2}}>
                    <p className={styles.font_body_menu}>닉네임</p>
                    <TextField
                        required
                        id="nickname"
                        label="닉네임"
                        name="passwordChk"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setNickname(e.target.value)}
                    >
                    </TextField>
                </Grid>
                <Grid item xs={12} sx={{pt:2}}>
                    <p className={styles.font_body_menu}>전화번호</p>
                    <TextField
                        required
                        id="tel"
                        label="전화번호"
                        name="passwordChk"
                        variant="outlined"
                        type="tel"
                        fullWidth
                        onChange={(e) => setTel(e.target.value)}
                    >
                    </TextField>
                </Grid>
                <Grid item xs={12} sx={{pt:2}}>
                    <p className={styles.font_body_menu}>생일</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                            fullWidth
                            label="생일"
                            inputFormat="MM/DD/YYYY"
                            value={birth}
                            onChange={(e) => {
                                console.log(e.format("YYYY-MM-DD'T'HH:mm:ss"));
                                setBirth(e);
                                console.log(birth)
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sx={{pt:2}}>
                    <p className={styles.font_body_menu}>성별</p>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel
                            value="0"
                            control={<Radio />}
                            label="남"
                            onChange={(e) => {
                                if (e.target.checked === true) {
                                    setGender(e.target.value);
                                }
                            }}
                        />
                        <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label="여"
                            onChange={(e) => {
                                if (e.target.checked === true) {
                                    setGender(e.target.value);
                                }
                            }}
                        />
                    </RadioGroup>
                </Grid>
                <Grid item container xs={12} sx={{pt:2, width:"100%"}}>
                    <Grid item container xs={12} sx={{pt:2 , width:"100%"}}>
                        <Grid item xs="12">
                            <p className={styles.font_body_menu}>프로필</p>
                        </Grid>
                        <Grid item xs="6">
                            <Button
                                variant="contained"
                                component="label"
                                sx={{ backgroundColor:"#6CB0FF", width:"50%", aspectRatio:"5/1" }}
                                size="small"
                            >
                                <Typography>파일 첨부</Typography>
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) => setFile(e.target.files)}
                                />
                            </Button>
                        </Grid>
                        <Grid item xs="6" sx={{ display: 'flex', alignItems: 'center', width:"100%" }}>
                            {file === null && img === '' && (
                                <Typography>선택된 파일 없음</Typography>
                            )}
                            {file && (
                                <div className={styles.image_box}>
                                    <img
                                        src={URL.createObjectURL(file[0])}
                                        alt="썸네일"
                                        loading="lazy"
                                        className={styles.image}
                                    />
                                </div>
                            )}
                            {file === null && img !== '' && (
                                <div className={styles.image_box}>
                                    <img
                                        src={img}
                                        alt="썸네일"
                                        loading="lazy"
                                        className={styles.image}
                                    />
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    item xs={12} sx={{pt:10, pb:20}}>
                    <Button
                        fullWidth
                        sx={{height: '120%', borderRadius:"1vw", backgroundColor: '#6CB0FF',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#6CB0FF',
                            }
                        }}
                        onClick={() => handleSubmit()}
                    >
                        <Typography
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            color="#FFFFFF" variant={'h4'}>
                            회원가입
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default GuideJoin;