import React, {useState} from 'react';
import testImg from "../images/test.png";
import {
    Box,

    Button,
    createTheme,
    Grid,
} from "@mui/material";
import Typography from "@mui/material/Typography";

function Plan(props) {

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    return (
        <Grid content item xs={12}>
            <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems={"center"}>
                <Typography sx={{fontSize: "2rem", fontWeight: "700"}}>
                    여행일정
                </Typography>
            </Grid>
            <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems={"center"} sx={{mb: "2rem"}}>
                <Typography sx={{fontSize: "1rem", fontWeight: "700", color:"#888888"}}>
                    2건의 여행 일정이 있어요
                </Typography>
            </Grid>
            <Grid container item
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  xs={12}
            >

                {/* item 1 **/}
                <Grid container item
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      xs={12} sx={{border: 1,borderRadius:"1vw", borderColor: "#DDDDDD", overflow: 'hidden', p:0, mb:"2rem"}}>
                    <Grid xs={3} item
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          sx={{height:"100%"}}
                    >
                        <Box sx={{width:"100%", height:"100%", display: "flex", overflow:"hidden", p:0}}>
                            <img src={testImg} style={{width:"100%", height: "100%", objectFit:"cover", objectPosition:"center center"}}/>
                        </Box>
                    </Grid>
                    <Grid xs={6} item container
                          display={"flex"}
                          justifyContent={"flex-start"}
                          alignItems={"center"}
                          sx={{pl:"1rem"}}
                    >
                        <Grid xs={12} item sx={{mb:"1rem"}} >
                            <span style={{fontFamily: 'NanumSquareNeo', fontWeight:"700", fontSize:"1.3rem", marginRight:"1rem"}}>예약완료</span>
                            <span style={{fontFamily: 'NanumSquareNeo',color:"#888888", fontSize:"1rem"}}>5월 13일 ~ 5월 17일</span>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography sx={{fontSize:"1.3rem", fontWeight:"700"}}>싱가포르 5,6일 #1일 자유 #슈퍼트리쇼 #루지 체험</Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography sx={{fontSize:"1rem", fontWeight:"700", color:"#888888"}}>김용식 가이드</Typography>
                        </Grid>
                        <Grid xs={12} item sx={{mt:"1rem"}}>
                            <Typography sx={{fontWeight:"700"}}>799,000원</Typography>
                        </Grid>
                    </Grid>
                    <Grid xs={3} item container
                          display={"flex"}
                          justifyContent={"flex-end"}
                          alignItems={"center"}
                          spacing={2}
                    >
                        <Grid item xs={12} sx={{ px:"3rem"}}>
                            <Button variant={"outlined"} sx={{borderColor:"#DDDDDD"}} fullWidth>
                                <Typography sx={{color:"#000000"}}>여행 상세보기</Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ px:"3rem"}}>
                            <Button variant={"outlined"} sx={{borderColor:"#DDDDDD"}} fullWidth>
                                <Typography sx={{color:"#000000"}}>예약 취소</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

                {/* item 2 **/}
                <Grid container item
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      xs={12} sx={{border: 1,borderRadius:"1vw", borderColor: "#DDDDDD", overflow: 'hidden', p:0}}>
                    <Grid xs={3} item
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          sx={{height:"100%"}}
                    >
                        <Box sx={{width:"100%", height:"100%", display: "flex", overflow:"hidden", p:0}}>
                            <img src={testImg} style={{width:"100%", height: "100%", objectFit:"cover", objectPosition:"center center"}}/>
                        </Box>
                    </Grid>
                    <Grid xs={6} item container
                          display={"flex"}
                          justifyContent={"flex-start"}
                          alignItems={"center"}
                          sx={{pl:"1rem"}}
                    >
                        <Grid xs={12} item sx={{mb:"1rem"}}>
                            <span style={{fontFamily: 'NanumSquareNeo', fontWeight:"700", fontSize:"1.3rem", marginRight:"1rem"}}>예약완료</span>
                            <span style={{fontFamily: 'NanumSquareNeo',color:"#888888", fontSize:"1rem"}}>5월 13일 ~ 5월 17일</span>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography sx={{fontSize:"1.3rem", fontWeight:"700"}}>싱가포르 5,6일 #1일 자유 #슈퍼트리쇼 #루지 체험</Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography sx={{fontSize:"1rem", fontWeight:"700", color:"#888888"}}>김용식 가이드</Typography>
                        </Grid>
                        <Grid xs={12} item sx={{mt:"1rem"}}>
                            <Typography sx={{fontWeight:"700"}}>799,000원</Typography>
                        </Grid>
                    </Grid>
                    <Grid xs={3} item container
                          display={"flex"}
                          justifyContent={"flex-end"}
                          alignItems={"center"}
                          spacing={2}
                    >
                        <Grid item xs={12} sx={{ px:"3rem"}}>
                            <Button variant={"outlined"} sx={{borderColor:"#DDDDDD"}} fullWidth>
                                <Typography sx={{color:"#000000"}}>여행 상세보기</Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ px:"3rem"}}>
                            <Button variant={"outlined"} sx={{borderColor:"#DDDDDD"}} fullWidth>
                                <Typography sx={{color:"#000000"}}>예약 취소</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>



            <Grid xs={12} item sx={{pt:'1vw',}}>
                <Button variant="outlined" fullWidth sx={{borderColor:'#DDDDDD', borderRadius:'10px'}}>
                    <Typography sx={{color:"#000000"}}>예약일정 더보기</Typography>
                </Button>
            </Grid>
        </Grid>
    );
}

export default Plan;