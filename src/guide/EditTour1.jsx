import React, {useEffect, useState} from 'react';
import {Box, Button, createTheme, Grid, TextField, ThemeProvider} from "@mui/material";
import TopBar from "../component/TopNav";
import Typography from "@mui/material/Typography";
import styles from "../unauth/css/Login.module.css";
import IconButton from "@mui/material/IconButton";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

function EditTour1(props) {
    const param = useParams();

    const navigate = useNavigate()

    const accessToken = useSelector((state) => state.accessToken);

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    const [tourInfo, setTourInfo] = useState(null);

    const [thumb, setThumb] = useState(null); // 썸네일
    const [title, setTitle] = useState(""); // 제목
    const [subTitle, setSubTitle] = useState(""); // 썸네일
    const [description, setDescription] = useState(""); // 설명
    const [duration ,setDuration] = useState(1); // 여행기간
    const [minPeople, setMinPeople] = useState(1); // 최소인원
    const [maxPeople, setMaxPeople] = useState(2); // 최대인원
    const [img, setImg] = useState(null); // 설명이미지
    const [price, setPrice] = useState(0); // 기본가격
    const [meeting, setMeeting] = useState(""); // 미팅장소

    // 투어정보 불러오기
    const getTourInfo = async (id) => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/package/unauth/view?id=${id}`
        ).then((res) => {
            if(res.data){
                console.log(res)
                setTourInfo(res.data)
                const tempArr = []
                for(let i = 1 ; i <= res.data.duration ; i++){
                    tempArr.push(i);
                }
                setDuration(tempArr);
                setTitle(res.data.title)
                setSubTitle(res.data.subTitle)
                setDescription(res.data.description)
                setDuration(res.data.duration)
                setMinPeople(res.data.minGroupSize)
                setMaxPeople(res.data.maxGroupSize)
                setPrice(res.data.price)
                setMeeting(res.data.meetingPoint)
            }
        })
    }

    // 서버로 전송하기
    const handleSubmit = async () => {
        // 1. 내용없는거 있는지 체크함
        if(title === ""){
            alert("제목을 입력해 주세요.")
            return;
        }
        if(meeting === ""){
            alert("만나는 장소를 입력해 주세요.")
            return;
        }
        // 2. formData에 합체
        console.log("tour 생성 시도...")
        const fd = new FormData();
        // 썸네일
        if(thumb){
            Object.values(thumb).forEach((thumb) => {
                fd.append('thumb', thumb);
            }); // 파일 임포트
        }
        // 설명이미지
        if(img){
            Object.values(img).forEach((img) => {
                fd.append('tourImages', img);
            }); // 파일 임포트
        }
        fd.append('id', param.value);
        fd.append('defaultPrice', price);
        fd.append('description', description);
        fd.append('duration', duration)
        fd.append('maxGroupSize', maxPeople)
        fd.append('minGroupSize', minPeople)
        fd.append('meetingPoint', meeting)
        fd.append('price', price);
        fd.append('subTitle', subTitle)
        fd.append('title', title) // 역할

        // 회원가입 api 호출
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/package/update`,
            fd,
            {
                headers:{
                    'Content-Type':`multipart/form-data`,
                    'Authorization': `${accessToken}`,
                },
            }
        ).then((res) => {
            console.log("다음단계로 이동합니다.")
            alert("다음단계로 이동합니다.");
            navigate(`/guide/editTour2/${param.value}`) // 이동
        }).catch((res) => {
            console.log("생성 실패. 다시 시도해 주세요.");
            alert("생성 실패. 계속해서 장애가 발생하면 고객센터에 문의해 주세요.")
        })


    }

    useEffect(() => {
        if(accessToken){
            getTourInfo(param.value);
        }
    },[,accessToken])



    return (
        <ThemeProvider theme={theme}>
            <TopBar/>
            {/* 최상위 Grid **/}
            <Grid container sx={{width:"100%" ,mb:"10rem",py:"5rem", px:{xs:"3%", md:"10%", lg:"20%"}, mt:"3rem"}} spacing={3}
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-start"
            >
                <Typography sx={{fontSize: "2rem", fontWeight: "700"}}>
                    여행수정(1/4)
                </Typography>
                {/* 투어제목 **/}
                <Grid item xs={12}>
                    <Typography>투어제목</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant={"outlined"} value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
                </Grid>
                {/* 썸네일 **/}
                <Grid item xs={12}>
                    <Typography>썸네일 이미지</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        component="label"
                        size="small"
                    >
                        <Typography>파일 첨부</Typography>
                        <input
                            type="file"
                            hidden
                            onChange={(e) => setThumb(e.target.files)}
                        />
                    </Button>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', width:"100%" }}>
                    {tourInfo && tourInfo.thumb === "" && thumb === null && (
                        <Typography>선택된 파일 없음</Typography>
                    )}
                    {thumb && (
                        <Box sx={{width:"100px", aspectRatio:"16/9", overflow:"hidden", borderRadius:"10px"}}>
                            <img
                                src={URL.createObjectURL(thumb[0])}
                                alt="썸네일"
                                loading="lazy"
                                style={{width:"100%", height:"100%", objectFit:"cover"}}
                            />
                        </Box>
                    )}
                    {!thumb && tourInfo && tourInfo.thumb !== "" && (
                        <Box sx={{width:"100px", aspectRatio:"16/9", overflow:"hidden", borderRadius:"10px"}}>
                            <img
                                src={tourInfo.thumb}
                                alt="썸네일"
                                loading="lazy"
                                style={{width:"100%", height:"100%", objectFit:"cover"}}
                            />
                        </Box>
                    )}
                </Grid>
                {/* 부제목 **/}
                <Grid item xs={12}>
                    <Typography>부제목</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant={"outlined"} value={subTitle} onChange={(e) => setSubTitle(e.target.value)}  fullWidth />
                </Grid>
                {/* 여행기간 **/}
                <Grid item xs={12}>
                    <Typography>여행기간(일)</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
                        <IconButton onClick={() => setDuration(duration - 1)} disabled={duration === 1} sx={{color:"#000000"}}>
                            <RemoveCircleRoundedIcon sx={{fontSize:"2rem" }}/>
                        </IconButton>
                        <Typography sx={{ mx: "2rem", fontSize:"1.5rem", fontWeight:"700", color:"#000000" }}>{duration}</Typography>
                        <IconButton onClick={() => setDuration(duration + 1)} disabled={duration === 31} sx={{color:"#000000"}}>
                            <AddCircleRoundedIcon sx={{fontSize:"2rem"}} />
                        </IconButton>
                    </Box>
                </Grid>
                {/* 최소인원 **/}
                <Grid item xs={12}>
                    <Typography>최소인원(인)</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
                        <IconButton onClick={() => 1 < minPeople && setMinPeople(minPeople - 1)} disabled={minPeople === 1} sx={{color:"#000000"}}>
                            <RemoveCircleRoundedIcon sx={{fontSize:"2rem" }}/>
                        </IconButton>
                        <Typography sx={{ mx: "2rem", fontSize:"1.5rem", fontWeight:"700", color:"#000000" }}>{minPeople}</Typography>
                        <IconButton onClick={() => maxPeople > minPeople && setMinPeople(minPeople + 1)} disabled={minPeople >= maxPeople} sx={{color:"#000000"}}>
                            <AddCircleRoundedIcon sx={{fontSize:"2rem"}} />
                        </IconButton>
                    </Box>
                </Grid>
                {/* 최대인원 **/}
                <Grid item xs={12}>
                    <Typography>최대인원(인)</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
                        <IconButton onClick={() => minPeople < maxPeople && setMaxPeople(maxPeople - 1)} disabled={maxPeople <= minPeople} sx={{color:"#000000"}}>
                            <RemoveCircleRoundedIcon sx={{fontSize:"2rem" }}/>
                        </IconButton>
                        <Typography sx={{ mx: "2rem", fontSize:"1.5rem", fontWeight:"700", color:"#000000" }}>{maxPeople}</Typography>
                        <IconButton onClick={() => 30 > maxPeople && setMaxPeople(maxPeople + 1)} disabled={maxPeople >= 30} sx={{color:"#000000"}}>
                            <AddCircleRoundedIcon sx={{fontSize:"2rem"}} />
                        </IconButton>
                    </Box>
                </Grid>
                {/* 기본가격 **/}
                <Grid item xs={12}>
                    <Typography>기본가격(인당 가격)</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant={"outlined"} fullWidth value={price} type={"number"} onChange={(e) => setPrice(e.target.value)}/>
                </Grid>
                {/* 만나는 장소 및 시간 **/}
                <Grid item xs={12}>
                    <Typography>만나는 장소 및 시간</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant={"outlined"} fullWidth multiline={3} value={meeting} onChange={(e) => setMeeting(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <Typography>투어 설명</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant={"outlined"} value={description} onChange={(e) => setDescription(e.target.value)} fullWidth multiline={10}/>
                </Grid>
                {/* 만나는 장소 및 시간 **/}
                <Grid item xs={12}>
                    <Typography>설명 이미지</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        component="label"
                        size="small"
                    >
                        <Typography>파일 첨부</Typography>
                        <input
                            type="file"
                            hidden
                            onChange={(e) => setImg(e.target.files)}
                        />
                    </Button>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', width:"100%" }}>
                    {tourInfo && tourInfo.toursImgDTOList && tourInfo.toursImagesDTOList.length < 1 && img === null && (
                        <Typography>선택된 파일 없음</Typography>
                    )}
                    {img && (
                        <Box sx={{width:"100px", aspectRatio:"16/9", overflow:"hidden", borderRadius:"10px"}}>
                            <img
                                src={URL.createObjectURL(img[0])}
                                alt="썸네일"
                                loading="lazy"
                                style={{width:"100%", height:"100%", objectFit:"cover"}}
                            />
                        </Box>
                    )}
                    {!img && tourInfo && tourInfo.toursImagesDTOList.length > 0 && (
                        <Box sx={{width:"100px", aspectRatio:"16/9", overflow:"hidden", borderRadius:"10px"}}>
                            <img
                                src={tourInfo.toursImagesDTOList[0].imagePath}
                                alt="썸네일"
                                loading="lazy"
                                style={{width:"100%", height:"100%", objectFit:"cover"}}
                            />
                        </Box>
                    )}
                </Grid>


                {/* 다음단계로 **/}
                <Grid item xs={12} >
                    <Button fullWidth variant={"outlined"} onClick={() => handleSubmit()} >
                        다음단계로 이동
                    </Button>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default EditTour1;