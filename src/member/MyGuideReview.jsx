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
import FaceIcon from "@mui/icons-material/Face6";
import StarIcon from "@mui/icons-material/Star";

// 더미 json
const reviews = [
    {
        memberId : 100,
        tourId : 1,
        rating : 5,
        content : "내용입니다 내용내용",
        createdDay : "2020-03-28",
        packageName : "일지훈"
    },
    {
        memberId : 200,
        tourId : 1,
        rating : 5,
        content : "내용입니다 내용내용",
        createdDay : "2020-03-28",
        packageName : "이지훈"
    },
    {
        memberId : 300,
        tourId : 1,
        rating : 5,
        content : "내용입니다 내용내용",
        createdDay : "2020-03-28",
        packageName : "삼지훈"
    },
]

function MyGuideReview(props) {

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    return (
        <Grid container item xs={12}>
            <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems={"center"} sx={{mb: "2rem"}}>
                <Typography sx={{fontSize: "2rem", fontWeight: "700"}}>
                    내 가이드리뷰
                </Typography>
            </Grid>
            <Grid container item
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  xs={12}>
                {/* items **/}
                {reviews && reviews.map((items) => {
                    return(
                        <Grid
                            container
                            item xs={12}
                            display="flex"
                            justifyContent="flex-start"
                            alignItems="center"
                            sx={{border:2,borderColor: "#DDDDDD", borderRadius: "1vw", p: "1rem", overflow: 'auto', mb:"2rem"}}
                        >
                            <Grid container item xs={9} sx={{pl:'2rem'}}>
                                <Grid
                                    item
                                    container
                                    display="flex"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    xs={12}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        display="flex"
                                        justifyContent="flex-start"
                                        alignItems="flex-end"
                                    >
                                        <StarIcon sx={{ color: '#6CB0FF', fontSize: '1.5rem' }}/>
                                        <StarIcon sx={{ color: '#6CB0FF', fontSize: '1.5rem' }}/>
                                        <StarIcon sx={{ color: '#6CB0FF', fontSize: '1.5rem' }}/>
                                        <StarIcon sx={{ color: '#6CB0FF', fontSize: '1.5rem' }}/>
                                        <StarIcon sx={{ color: '#6CB0FF', fontSize: '1.5rem' }}/>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        display="flex"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        sx={{pl:0}}
                                    >
                                        <Typography sx={{fontSize:"1rem", fontWeight:"700"}}>
                                            가이드명 : {items.packageName}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item
                                      display="flex"
                                      justifyContent="flex-start"
                                      alignItems="center"
                                      xs={12} sx={{pt:"1rem"}}>
                                    <Typography>
                                        {items.content}
                                    </Typography>
                                </Grid>
                                <Grid item
                                      display="flex"
                                      justifyContent="flex-start"
                                      alignItems="center"
                                      xs={12} sx={{mt:'1rem'}}>
                                    <Typography sx={{color:"#8D8D8D"}}>
                                        2022-03-18 ♥2
                                    </Typography>
                                </Grid>
                            </Grid>
                            {/* 버튼배치 **/}
                            <Grid container item xs={3} sx={{px:"3rem"}} spacing={2}>
                                <Grid xs={12} item>
                                    <Button fullWidth variant={"outlined"} sx={{borderColor:"#DDDDDD"}} fullWidth>
                                        <Typography sx={{color:"#000000"}}>리뷰삭제</Typography>
                                    </Button>
                                </Grid>
                                <Grid xs={12} item>
                                    <Button fullWidth variant={"outlined"} sx={{borderColor:"#DDDDDD"}} fullWidth>
                                        <Typography sx={{color:"#000000"}}>리뷰수정</Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    );
                })}
            </Grid>
            <Grid xs={12} item sx={{mt:'1vw', mb:'7vw'}}>
                <Button variant="outlined" fullWidth sx={{borderColor:'#000000', borderRadius:'10px'}}>
                    <Typography sx={{color:"#000000"}}>리뷰 더보기</Typography>
                </Button>
            </Grid>
        </Grid>
    );
}

export default MyGuideReview;