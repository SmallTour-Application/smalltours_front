import React from 'react';
import testImg from "../images/test.png";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box, Button, Checkbox,
    createTheme, Divider, FormControlLabel,
    Grid, Radio, RadioGroup,
    TextField,
    ThemeProvider
} from "@mui/material";
import TopBar from "../component/TopNav";
import Typography from "@mui/material/Typography";

const page=["개인정보", "예약일정", "여행기록", "리뷰 및 평가 확인", "관심 가이드"]

function MyPage(props) {

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <TopBar/>
            {/* 최상위 Grid **/}
            <Grid container sx={{width:"100%" ,mb:"10rem",py:"5rem", px:{xs:"3%", md:"10%", lg:"20%"}}} spacing={3}>
                {/* 페이지 선택용 Grid **/}
                <Grid container item md={4} xs={12}>
                    <Grid item container xs={12} display={"flex"} justifyContent={"flex-start"} alignItmes={"center"} sx={{mb:"2rem"}}>
                        <Typography sx={{fontSize:"2rem", fontWeight:"700"}}>
                            마이페이지
                        </Typography>
                    </Grid>
                    <Grid xs={12} container item sx={{borderRadius:"1vw", border:1, borderColor:"#8D8D8D", p:"1rem"}}>
                        {page.map((item) => (
                            <Grid item container xs={12} display={"flex"} justifyContent={"flex-start"} alignItmes={"center"}>
                                <Grid xs={12} item display={"flex"} justifyContent={"flex-start"} alignItmes={"center"}>
                                    <Typography sx={{fontSize:"1rem", fontWeight:"700", my:"1rem"}}>
                                        {item}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}><Divider/></Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid container item md={8}>
                    {props.value === "info" && (
                        <MyPage/>
                    )}
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default MyPage;