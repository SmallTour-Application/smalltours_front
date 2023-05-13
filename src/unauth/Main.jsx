import React from 'react';
import {Box, createTheme, Grid, ThemeProvider} from "@mui/material";
import Slider from 'react-slick';
import TopBar from "../component/TopNav";
import testImg from "../images/test.png";
import styles from "./css/Main.module.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Typography from "@mui/material/Typography";
import StarIcon from '@mui/icons-material/Star';


function Main(props) {
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
                              px:"1rem"
                    }}
                          display={"flex"}
                          justifyContent={"center"}
                          alignItem={"center"}
                          spacing={7}
                    >
                        <Grid item container xs={4}
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
                                        <img src={testImg} style={{width:"100%", height:"100%", objectFit:"cover"}} />
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
                                        홍길동
                                    </Typography>
                                </Grid>
                                {/* 가이드이메일 **/}
                                <Grid item xs={12} display={"flex"} justfyContent={"center"} alignItems={"center"}
                                      sx={{
                                          width:"100%",
                                          direction: 'flex',
                                          justifyContent: 'center',
                                          alignItems: "center",
                                      }}
                                >
                                    <Typography sx={{fontWeight:"900", fontSize:"1rem", color:"#000000"}}>
                                        dlwl2023@kyungmin.ac.kr
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
                                    <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>
                                    <Typography sx={{fontWeight:"900", fontSize:"1rem", color:"#000000"}}>
                                        4.9
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
                                        여행좋아여행좋아여행좋아여행좋아여행좋아여행좋아여행좋아
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Grid>

                        <Grid item container xs={4}
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
                                    <Box sx={{width:"40%", aspectRatio:"1/1", overflow:"hidden",borderRadius:"10vw"}}>
                                        <img src={testImg} style={{width:"100%", height:"100%", objectFit:"cover"}} />
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
                                        홍길동
                                    </Typography>
                                </Grid>
                                {/* 가이드이메일 **/}
                                <Grid item xs={12} display={"flex"} justfyContent={"center"} alignItems={"center"}
                                      sx={{
                                          width:"100%",
                                          direction: 'flex',
                                          justifyContent: 'center',
                                          alignItems: "center",
                                      }}
                                >
                                    <Typography sx={{fontWeight:"900", fontSize:"1rem", color:"#000000"}}>
                                        dlwl2023@kyungmin.ac.kr
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
                                    <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>
                                    <Typography sx={{fontWeight:"900", fontSize:"1rem", color:"#000000"}}>
                                        4.9
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
                                        여행좋아여행좋아여행좋아여행좋아여행좋아여행좋아여행좋아
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Grid>

                        <Grid item container xs={4}
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
                                    <Box sx={{width:"40%", aspectRatio:"1/1", overflow:"hidden",borderRadius:"10vw"}}>
                                        <img src={testImg} style={{width:"100%", height:"100%", objectFit:"cover"}} />
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
                                        홍길동
                                    </Typography>
                                </Grid>
                                {/* 가이드이메일 **/}
                                <Grid item xs={12} display={"flex"} justfyContent={"center"} alignItems={"center"}
                                      sx={{
                                          width:"100%",
                                          direction: 'flex',
                                          justifyContent: 'center',
                                          alignItems: "center",
                                      }}
                                >
                                    <Typography sx={{fontWeight:"900", fontSize:"1rem", color:"#000000"}}>
                                        dlwl2023@kyungmin.ac.kr
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
                                    <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>
                                    <Typography sx={{fontWeight:"900", fontSize:"1rem", color:"#000000"}}>
                                        4.9
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
                                        여행좋아여행좋아여행좋아여행좋아여행좋아여행좋아여행좋아
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
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
                    <Grid item container xs={4} sx={{m:0, p:0, width:"100%"}}>
                        <Grid item container xs={12} sx={{borderRadius:"1vw", borderColor:"#8D8D8D", p:"1rem", border:1, width:"100%"}}>
                            {/* image **/}
                            <Grid item xs={12}>
                                <Box sx={{width:"100%", aspectRatio:"16/9", overflow:"hidden", borderRadius:"1vw"}}>
                                    <img src={testImg} style={{width:"100%", height:"100%", objectFit:"cover"}}/>
                                </Box>
                            </Grid>
                            {/* 투어제목 **/}
                            <Grid item xs={12} sx={{mt:"0.5rem"}}>
                                <Typography sx={{fontWeight:"900", fontSize:"1rem"}}>
                                    [1박2일] 그린투어 + 소금호수 캠핑
                                </Typography>
                            </Grid>
                            {/* 평점 **/}
                            <Grid item xs={12} display={"flex"} justfyContent={"flex-start"} alignItems={"center"}
                                  sx={{
                                      direction: 'flex',
                                      justifyContent: 'flex-start',
                                      alignItems: "center",
                                      pt:"0.5rem"
                                  }}
                            >
                                <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>
                                <Typography sx={{fontWeight:"700", fontSize:"1rem", color:"#000000"}}>
                                    4.9
                                </Typography>
                            </Grid>
                            {/* 가격 **/}
                            {/* 평점 **/}
                            <Grid item xs={12} display={"flex"} justfyContent={"flex-start"} alignItems={"center"}
                                  sx={{
                                      direction: 'flex',
                                      justifyContent: 'flex-start',
                                      alignItems: "center",
                                      pt:"0.5rem"
                                  }}
                            >
                                <Typography sx={{fontWeight:"900", fontSize:"1rem", color:"#8D8D8D"}}>
                                    450000원 / 3인
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* items **/}
                    <Grid item container xs={4} sx={{m:0, p:0, width:"100%"}}>
                        <Grid item container xs={12} sx={{borderRadius:"1vw", borderColor:"#8D8D8D", p:"1rem", border:1, width:"100%"}}>
                            {/* image **/}
                            <Grid item xs={12}>
                                <Box sx={{width:"100%", aspectRatio:"16/9", overflow:"hidden", borderRadius:"1vw"}}>
                                    <img src={testImg} style={{width:"100%", height:"100%", objectFit:"cover"}}/>
                                </Box>
                            </Grid>
                            {/* 투어제목 **/}
                            <Grid item xs={12} sx={{mt:"0.5rem"}}>
                                <Typography sx={{fontWeight:"900", fontSize:"1rem"}}>
                                    [1박2일] 그린투어 + 소금호수 캠핑
                                </Typography>
                            </Grid>
                            {/* 평점 **/}
                            <Grid item xs={12} display={"flex"} justfyContent={"flex-start"} alignItems={"center"}
                                  sx={{
                                      direction: 'flex',
                                      justifyContent: 'flex-start',
                                      alignItems: "center",
                                      pt:"0.5rem"
                                  }}
                            >
                                <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>
                                <Typography sx={{fontWeight:"700", fontSize:"1rem", color:"#000000"}}>
                                    4.9
                                </Typography>
                            </Grid>
                            {/* 가격 **/}
                            {/* 평점 **/}
                            <Grid item xs={12} display={"flex"} justfyContent={"flex-start"} alignItems={"center"}
                                  sx={{
                                      direction: 'flex',
                                      justifyContent: 'flex-start',
                                      alignItems: "center",
                                      pt:"0.5rem"
                                  }}
                            >
                                <Typography sx={{fontWeight:"900", fontSize:"1rem", color:"#8D8D8D"}}>
                                    450000원 / 3인
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* items **/}
                    <Grid item container xs={4} sx={{m:0, p:0, width:"100%"}}>
                        <Grid item container xs={12} sx={{borderRadius:"1vw", borderColor:"#8D8D8D", p:"1rem", border:1, width:"100%"}}>
                            {/* image **/}
                            <Grid item xs={12}>
                                <Box sx={{width:"100%", aspectRatio:"16/9", overflow:"hidden", borderRadius:"1vw"}}>
                                    <img src={testImg} style={{width:"100%", height:"100%", objectFit:"cover"}}/>
                                </Box>
                            </Grid>
                            {/* 투어제목 **/}
                            <Grid item xs={12} sx={{mt:"0.5rem"}}>
                                <Typography sx={{fontWeight:"900", fontSize:"1rem"}}>
                                    [1박2일] 그린투어 + 소금호수 캠핑
                                </Typography>
                            </Grid>
                            {/* 평점 **/}
                            <Grid item xs={12} display={"flex"} justfyContent={"flex-start"} alignItems={"center"}
                                  sx={{
                                      direction: 'flex',
                                      justifyContent: 'flex-start',
                                      alignItems: "center",
                                      pt:"0.5rem"
                                  }}
                            >
                                <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>
                                <Typography sx={{fontWeight:"700", fontSize:"1rem", color:"#000000"}}>
                                    4.9
                                </Typography>
                            </Grid>
                            {/* 가격 **/}
                            {/* 평점 **/}
                            <Grid item xs={12} display={"flex"} justfyContent={"flex-start"} alignItems={"center"}
                                  sx={{
                                      direction: 'flex',
                                      justifyContent: 'flex-start',
                                      alignItems: "center",
                                      pt:"0.5rem"
                                  }}
                            >
                                <Typography sx={{fontWeight:"900", fontSize:"1rem", color:"#8D8D8D"}}>
                                    450000원 / 3인
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </ThemeProvider>
    );
}

export default Main;