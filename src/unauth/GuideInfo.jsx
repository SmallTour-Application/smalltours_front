import React, {useEffect, useState} from 'react';
import {Box, Button, createTheme, Divider, Grid, ThemeProvider} from "@mui/material";
import TopBar from "../component/TopNav";
import axios from "axios";
import testImg from "../images/test.png"
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import {useNavigate, useParams} from "react-router-dom";
import FaceIcon from "@mui/icons-material/Face6";
import StarIcon from "@mui/icons-material/Star";

function GuideInfo(props) {
    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    const params = useParams();
    const navigate = useNavigate()

    const [guideInfo, setGuideInfo] = useState(null)
    const [guideTour, setGuideTour] = useState(null);
    const [tourPage, setTourPage] = useState(1);
    const [tourMore, setTourMore] = useState(true);
    const [guideReview, setGuideReview] = useState(null);
    const [reviewPage, setReviewPage] = useState(1);
    const [reviewMore, setReviewMore] = useState(true);


    // 가이드 정보 불러오기
    const getGuideInfo = async (id) => {
        // 가이드 정보
        const response = await axios.get(
            `http://localhost:8099/unauth/profile/guide?guideId=${id}`
        ).then((res) => {
            console.log(res)
            if(res.data){
                setGuideInfo(res.data);
            }
        }).catch((err) => console.log(err))
    }

    // 가이드 투어 불러오기
    const getGuideTour = async (id, paramPage) => {
        const response = await axios.get(
            `http://localhost:8099/unauth/profile/guide/tours?guideId=${id}&page=${paramPage}`
        ).then((res) => {
            console.log(res);
            // 페이징
            if(res.data){
                if(!guideTour || paramPage === 1){
                    setGuideTour(res.data)
                }else if(guideTour){
                    setGuideTour({count:guideTour.count, review: guideTour.contents.push(res.data.contents)})
                }
                if(res.data.count < 10){
                    setTourMore(false);
                }
            }
        })
    }

    // 가이드 리뷰 불러오기
    const getGuideReview = async (id, paramPage) => {
        const response = await axios.get(
            `http://localhost:8099/unauth/profile/guide/review?guideId=${id}&page=${paramPage}`
        ).then((res) => {
            console.log(res);
            // 페이징
            if(res.data){
                if(!guideReview || paramPage === 1){
                    setGuideReview(res.data)
                }else if(guideReview){
                    setGuideReview({count:guideReview.count, review: guideReview.contents.push(res.data.contents)})
                }
                if(res.data.count < 10){
                    setReviewMore(false);
                }
            }
        })
    }

    useEffect(() => {
        getGuideInfo(params.value)
        getGuideTour(params.value, 1)
        getGuideReview(params.value, 1)
    },[])

    useEffect(() => {
        if(tourPage> 1){
            getGuideTour(params.value, tourPage)
        }
    },[tourPage])

    useEffect(() => {
        if(tourPage> 1){
            getGuideReview(params.value, tourPage)
        }
    },[reviewPage])

    return (
        <ThemeProvider theme={theme}>
            <TopBar/>
            <Grid container sx={{px:{xs:"3%", md:"20%", lg:"30%"}, pt:"10rem"}}>
                <Grid item xs={4}>
                    <Box sx={{borderRadius:"1000px", width:"100%", aspectRatio:"1/1", overflow:"hidden"}}>
                        <img src={testImg} style={{width:"100%", height:"100%", objectFit:"cover"}}/>
                    </Box>
                </Grid>
                <Grid item xs={8} display={"flex"} justifyContent={"flex-start"} alignItems={"center"} sx={{pl:"1rem"}}>
                    <Typography sx={{fontWeight:"700", fontSize:"3rem"}}>{guideInfo && guideInfo.name}</Typography>
                </Grid>
                <Grid xs={12} item sx={{my:"2rem"}}>
                    <Divider fullWidth/>
                </Grid>
                <Grid item xs={12} display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
                    <Typography sx={{fontSize:"1.5rem", fontWeight:"700"}}>가입일</Typography>
                </Grid>
                <Grid item xs={12} display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
                    <Typography sx={{fontSize:"1.3rem", fontWeight:"700", color:"#A2A2A2"}}>{guideInfo && dayjs(guideInfo.joinDay).format('YYYY년 mm월 DD일')}</Typography>
                </Grid>
                <Grid item xs={12} display={"flex"} justifyContent={"flex-start"} alignItems={"center"} sx={{mt:"3rem"}}>
                    <Typography  sx={{fontSize:"1.5rem", fontWeight:"700"}}>자기소개</Typography>
                </Grid>
                <Grid item xs={12} display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
                    <Typography sx={{fontSize:"1.3rem", fontWeight:"700", color:"#A2A2A2"}}>{guideInfo && guideInfo.introduce}</Typography>
                </Grid>
                <Grid item xs={12} display={"flex"} justifyContent={"flex-start"} alignItems={"center"} sx={{my:"3rem"}}>
                    <Typography sx={{fontSize:"1.5rem", fontWeight:"800", color:"#000000"}}>{guideTour ? guideTour.count : "0"} 개의 여행을 준비했어요!</Typography>
                </Grid>
                {guideTour && guideTour.contents && guideTour.contents.map((item, idx) => {
                    return(
                        <Grid container item
                              display={"flex"}
                              justifyContent={"center"}
                              alignItems={"center"}
                              xs={12} sx={{border: 1,borderRadius:"1vw", borderColor: "#DDDDDD", overflow: 'hidden', p:0, mb:"2rem"}}>
                            <Grid xs={4} item
                                  display={"flex"}
                                  justifyContent={"center"}
                                  alignItems={"center"}
                                  sx={{width:"100%", height:"100%", display: "flex", overflow:"hidden", p:0, m:0}}
                                  onClick={() => navigate(`/tour/${item.tourId}`)}
                            >
                                <img src={testImg} style={{width:"100%", height: "100%", objectFit:"cover", objectPosition:"center center", margin:0}}/>
                            </Grid>
                            <Grid xs={8} item container
                                  display={"flex"}
                                  justifyContent={"flex-start"}
                                  alignItems={"center"}
                                  sx={{pl:"1rem"}}
                            >
                                <Grid xs={12} item>
                                    <Typography noWrap sx={{fontSize:"1.3rem", fontWeight:"700"}}>{item.title}</Typography>
                                </Grid>
                                <Grid xs={12} item sx={{my:"1rem"}}>
                                    <Typography sx={{fontSize:"1rem", fontWeight:"700", color:"#888888"}}>{item.subTitle} 가이드</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        )
                })}
                <Grid xs={12} item sx={{my:'3rem'}}>
                    {tourMore === true && (
                        <Button variant="outlined" fullWidth sx={{borderColor:'#DDDDDD', borderRadius:'10px'}}>
                            <Typography sx={{color:"#000000"}} onClick={() => setTourPage(tourPage+1)} >투어 더보기</Typography>
                        </Button>
                    )}
                </Grid>
                {/* 가이드 리뷰 보기 **/}
                <Grid item xs={12} display={"flex"} justifyContent={"flex-start"} alignItems={"center"} sx={{my:"3rem"}}>
                    <Typography sx={{fontSize:"1.5rem", fontWeight:"800", color:"#000000"}}>{guideReview ? guideReview.count : "0"} 개의 리뷰가 있어요!</Typography>
                </Grid>
                {/* items **/}
                {guideReview && guideReview.reviews.map((item, idx) => {
                    return(
                        <Grid
                            container
                            item xs={12}
                            display="flex"
                            justifyContent="flex-start"
                            alignItems="center"
                            sx={{mt:'1rem'}}
                        >
                            <Grid container item xs={12} sx={{mt:'0.3vw'}}>
                                <Grid item
                                      display="flex"
                                      justifyContent="flex-start"
                                      alignItems="center"
                                      xs={1} sx={{pr:'1vw'}}>
                                    <FaceIcon sx={{fontSize:'4rem'}}/>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    display="flex"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    xs={1}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        display="flex"
                                        justifyContent="flex-start"
                                        alignItems="flex-end"
                                    >
                                        {item.rating > 0 && <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>}
                                        {item.rating > 1 && <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>}
                                        {item.rating > 2 && <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>}
                                        {item.rating > 3 && <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>}
                                        {item.rating > 4 && <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>}
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        display="flex"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        sx={{pl:0}}
                                    >
                                        <Typography sx={{fontSize:"1rem", fontWeight:"700"}}>{item.nickname}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item
                                      display="flex"
                                      justifyContent="flex-start"
                                      alignItems="center"
                                      xs={12} sx={{mt:'1vw'}}>
                                    <Typography>
                                        {item.content}
                                    </Typography>
                                </Grid>
                                <Grid item
                                      display="flex"
                                      justifyContent="flex-start"
                                      alignItems="center"
                                      xs={12} sx={{mt:'1vw'}}>
                                    <Typography sx={{color:"#8D8D8D"}}>
                                        {dayjs(item.createdDay).format("YYYY년 MM월 DD일 HH:MM:ss")}
                                    </Typography>
                                    <br/>
                                </Grid>
                                <Grid item
                                      xs={12} sx={{mt:'2vw', mb:'1vw'}}>
                                    <Divider fullWidth/>
                                    <br/>
                                </Grid>
                            </Grid>

                        </Grid>
                    )
                })}
                <Grid xs={12} item sx={{my:'3rem'}}>
                    {reviewMore === true && (
                        <Button variant="outlined" fullWidth sx={{borderColor:'#DDDDDD', borderRadius:'10px'}}>
                            <Typography sx={{color:"#000000"}} onClick={() => setReviewPage(reviewPage+1)} >리뷰 더보기</Typography>
                        </Button>
                    )}
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default GuideInfo;