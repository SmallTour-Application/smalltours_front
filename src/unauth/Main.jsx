import React, {useEffect, useState} from 'react';
import {Box, createTheme, Grid, ThemeProvider} from "@mui/material";
import Slider from 'react-slick';
import TopBar from "../component/TopNav";
import testImg from "../images/test.png";
import styles from "./css/Main.module.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Typography from "@mui/material/Typography";
import StarIcon from '@mui/icons-material/Star';
import axios from "axios";
import {setAccessToken} from "../redux/actions";


function Main(props) {

    const [topGuide, setTopGuide] = useState(null); // Top Guide 넣을 곳
    const [topTour, setTopTour] = useState(null); // Top Tour 넣을 곳

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    // Banner Image Slider Settings
    const settings = {
        infinite: true,
        dots: true,
        fade: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        adaptiveHeight: false,
        arrows: false,
        dotsClass: 'slick-dots',
    };

    // TOP 가이드 가져오는 api 호출
    const getTopGuide = async () => {
        const response = await axios.get(
            `http://localhost:8099/unauth/main/top-ratings`
        ).catch((err) => {
            console.log(err)
            alert("오류 발생. 페이지를 새로고침 해주세요.")
        }).then((res) => {
            console.log(res)
            setTopGuide(res.data.content);
        })
    }

    // 인기 패키지 가져오는 api 호출
    const getTopTour = async () => {
        const response = await axios.get(
            `http://localhost:8099/unauth/main/popularTours`
        ).catch((err) => {
            console.log(err)
            alert("오류 발생. 페이지를 새로고침 해주세요.")
        }).then((res) => {
            console.log(res)
            setTopTour(res.data.content);
        })
    }

    // 컴포넌트 최초 로드 시 실행
    useEffect(() => {
        // TOP 가이드 가져오기
        getTopGuide();
        getTopTour();
    },[])

    return (
        <ThemeProvider theme={theme}>
            <TopBar/>
            {/* TopBar 띄우기 위한 Box*/}
            <Box sx={{height: 64}}/>
            {/* 최상위 Grid **/}
            <Grid container sx={{px:"20%", width:"100%", pb:"10rem"}}>
                {/* Banner **/}
                <Grid item xs={12}>
                    <Slider {...settings}>
                        <div className={styles.image_banner}>
                            <img
                                src={testImg}
                                className={styles.image_thumbnail}
                                alt={'testImg'}
                            />
                        </div>
                        <div className={styles.image_banner}>
                            <img
                                src={testImg}
                                className={styles.image_thumbnail}
                                alt={'testImg'}
                            />
                        </div>
                        <div className={styles.image_banner}>
                            <img
                                src={testImg}
                                className={styles.image_thumbnail}
                                alt={'testImg'}
                            />
                        </div>
                    </Slider>
                </Grid>
                {/* 인기가이드 **/}
                <Grid item container xs={12} sx={{width:"100%", pt:"3rem", mt:"3rem",
                        borderRadius:"1vw",
                    backgroundColor:"#6CB0FF",
                }}>
                    {/* TOP3 이달의 인기 가이드 **/}
                    <Grid item xs={12} sx={{width:"100%"}}
                        display={"flex"}
                          justifyContent={"center"}
                          alignItem={"center"}
                    >
                        <Typography sx={{fontWeight:"900", fontSize:"2rem", color:"#000000"}}>
                            TOP3<br/>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{width:"100%"}}
                          display={"flex"}
                          justifyContent={"center"}
                          alignItem={"center"}
                    >
                        <Typography sx={{fontWeight:"900", fontSize:"2rem", color:"#000000"}}>
                            이달의 인기 가이드
                        </Typography>
                    </Grid>
                    {/* 인기가이드 item **/}
                    <Grid item container xs={12}
                          sx={{width:"100%",
                        direction: 'flex',
                        justifyContent: 'center',
                        alignItems: "center",
                              py:"3rem",
                              px:"1rem",
                    }}
                          display={"flex"}
                          justifyContent={"center"}
                          alignItem={"center"}
                          spacing = {topGuide ? 5 : 0}
                    >
                        {/* 인기가이드 출력 **/}
                        {topGuide && topGuide.map((item, idx) => {
                            return(
                                <Grid item container xs={4} key={idx}
                                      display={"flex"} justfyContent={"center"} alignItem={"center"}>
                                    <Grid item container xs={12}
                                          sx={{borderRadius:"1vw", backgroundColor:"#FFFFFF",
                                              direction: 'flex',
                                              justifyContent: 'center',
                                              alignItems: "center",
                                              p:"1rem"
                                          }}
                                    >
                                        {/* 가이드 사진 **/}
                                        <Grid item xs={12} display={"flex"} justfyContent={"center"} alignItem={"center"}
                                              sx={{
                                                  width:"100%",
                                                  direction: 'flex',
                                                  justifyContent: 'center',
                                                  alignItems: "center",
                                              }}
                                        >
                                            <Box sx={{width:"40%", aspectRatio:"1/1", overflow:"hidden", borderRadius:"10vw"}}>
                                                <img src={item.profileImg} style={{width:"100%", height:"100%", objectFit:"cover"}} />
                                            </Box>
                                        </Grid>
                                        {/* 가이드이름 **/}
                                        <Grid item xs={12} display={"flex"} justfyContent={"center"} alignItems={"center"}
                                              sx={{
                                                  width:"100%",
                                                  direction: 'flex',
                                                  justifyContent: 'center',
                                                  alignItems: "center",
                                                  pt:"0.5rem"
                                              }}
                                        >
                                            <Typography sx={{fontWeight:"900", fontSize:"1.3rem", color:"#000000"}}>
                                                {item.guideName}
                                            </Typography>
                                        </Grid>
                                        {/* 평점 **/}
                                        <Grid item xs={12} display={"flex"} justfyContent={"center"} alignItems={"center"}
                                              sx={{
                                                  width:"100%",
                                                  direction: 'flex',
                                                  justifyContent: 'center',
                                                  alignItems: "center",
                                                  pt:"0.5rem"
                                              }}
                                        >
                                            {item.rating > 0 && <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>}
                                            {item.rating > 1 && <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>}
                                            {item.rating > 2 && <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>}
                                            {item.rating > 3 && <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>}
                                            {item.rating > 4 && <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>}
                                            <Typography sx={{fontWeight:"900", fontSize:"1rem", color:"#000000"}}>
                                                {item.rating.toFixed(1)}
                                            </Typography>
                                        </Grid>
                                        {/* 자기소개 **/}
                                        <Grid item xs={12} display={"flex"} justfyContent={"center"} alignItems={"center"}
                                              sx={{
                                                  width:"100%",
                                                  direction: 'flex',
                                                  justifyContent: 'center',
                                                  alignItems: "center",
                                                  pt:"0.5rem"
                                              }}
                                        >
                                            <Typography sx={{fontWeight:"500", fontSize:"1rem", color:"#000000", textAlign:"center"}}>
                                                가이드 소개입니다.
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>

                {/* 인기 패키지 **/}

                <Grid
                    display={"flex"} justifyContent={"center"} alignItmes={"center"}
                    item container xs={12} spacing={3} sx={{width:"100%", pt:"3rem", p:0, mt:"3rem" , direction:"flex", justifyContent:"center", alignItems:"center"}}>
                    <Grid item container xs={12} sx={{direction:"flex", justifyContent:"center", alignItems:"center", mb:"2rem"}}>
                        <Typography sx={{fontWeight:"900", fontSize:"2rem", color:"#000000"}}>
                            인기 패키지
                        </Typography>
                    </Grid>
                    {/* items **/}
                    {topTour && topTour.map((item, idx) => {
                        return(
                            <Grid item container xs={4} sx={{m:0, p:0, width:"100%"}} key={idx}>
                                <Grid item container xs={12} sx={{border:1,borderRadius:"1vw", borderColor:"#A2A2A2", p:"1rem", width:"100%"}}>
                                    {/* image **/}
                                    <Grid item xs={12}>
                                        <Box sx={{width:"100%", aspectRatio:"16/9", overflow:"hidden", borderRadius:"1vw"}}>
                                            <img src={item.thumb} style={{width:"100%", height:"100%", objectFit:"cover"}}/>
                                        </Box>
                                    </Grid>
                                    {/* 투어제목 **/}
                                    {/* 가이드이름 **/}
                                    <Grid item xs={12} display={"flex"} justfyContent={"center"} alignItems={"center"}
                                          sx={{
                                              width:"100%",
                                              direction: 'flex',
                                              justifyContent: 'center',
                                              alignItems: "center",
                                              pt:"0.5rem"
                                          }}
                                    >
                                        <Typography sx={{fontWeight:"900", fontSize:"1.3rem", color:"#000000"}}>
                                            {item.title}
                                        </Typography>
                                    </Grid>
                                    {/* 평점 **/}
                                    <Grid item xs={12} display={"flex"} justfyContent={"center"} alignItems={"center"}
                                          sx={{
                                              width:"100%",
                                              direction: 'flex',
                                              justifyContent: 'center',
                                              alignItems: "center",
                                              pt:"0.5rem"
                                          }}
                                    >
                                        {item.rating > 0 && <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>}
                                        {item.rating > 1 && <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>}
                                        {item.rating > 2 && <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>}
                                        {item.rating > 3 && <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>}
                                        {item.rating > 4 && <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>}
                                        <Typography sx={{fontWeight:"900", fontSize:"1rem", color:"#000000"}}>
                                            {item.rating.toFixed(1)}
                                        </Typography>
                                    </Grid>
                                    {/* 가격 **/}
                                    <Grid item xs={12} display={"flex"} justfyContent={"flex-start"} alignItems={"center"}
                                          sx={{
                                              direction: 'flex',
                                              justifyContent: 'center',
                                              alignItems: "center",
                                              pt:"0.5rem"
                                          }}
                                    >
                                        <Typography sx={{fontWeight:"500", fontSize:"1rem", color:"#000000"}}>
                                            {item.price}원 / {item.minPeople}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} display={"flex"} justfyContent={"flex-start"} alignItems={"center"}
                                          sx={{
                                              direction: 'flex',
                                              justifyContent: 'center',
                                              alignItems: "center",
                                              pt:"0.5rem"
                                          }}
                                    >
                                        <Typography sx={{fontWeight:"500", fontSize:"1rem", color:"#000000"}}>
                                            {item.minPeople}명 ~ {item.maxPeople}명
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    })}

                </Grid>
                {/* footer **/}
                <Grid container xs={12} sx={{py:"20rem"}}>
                    <Grid container xs={12}>
                        <Grid item xs={3}  direction='row'  justifyContent='center'>
                            <p className={styles.font_footer_logo}>스몰투어</p>
                        </Grid>
                        <Grid container item xs={9}>
                            <Grid item xs={3}>
                                <p className={styles.font_footer_menu}>이음코딩 이용약관</p>
                            </Grid>
                            <Grid item xs={3}>
                                <p className={styles.font_footer_menu}>개인정보 처리방침</p>
                            </Grid>
                            <Grid item xs={3}>
                                <p className={styles.font_footer_menu}>책임의 한계와 법적 고지</p>
                            </Grid>
                            <Grid item xs={3}>
                                <p className={styles.font_footer_menu}>커뮤니티 가이드라인</p>
                            </Grid>

                            <Grid item xs={12}>
                                <p className={styles.font_footer_description}>
                                    이음코딩은 LatteIs에서 서비스하는 여행 플랫폼입니다.
                                </p>
                            </Grid>
                            <Grid item xs={12}>
                                <p className={styles.font_footer_description}>
                                    (주)라떼는 | 대표자 : 이상훈 | 사업자번호 : 아직없음
                                </p>
                            </Grid>
                            <Grid item xs={12}>
                                <p className={styles.font_footer_description}>
                                    주소 : 경기 의정부시 가능동 562-6 경민대학교 효행관 404호 들어와서 왼쪽
                                </p>
                            </Grid>
                            <Grid item xs={12}>
                                <p className={styles.font_footer_description}>
                                    ©LATTEIS. ALL RIGHTS RESERVED.
                                </p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Main;