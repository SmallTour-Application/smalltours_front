import React, {useEffect, useState} from 'react';
import {
    createTheme, Divider,
    Grid,
    ThemeProvider
} from "@mui/material";
import TopBar from "../component/TopNav";
import Typography from "@mui/material/Typography";
import {useNavigate, useParams} from "react-router-dom";
import GuideMyInfo from "./GuideMyInfo";
import GuideMyTour from "./GuideMyTour";
import Education from "./Education";
import Sell from "./Sell";
import GuideStat from "./GuideStat";

const page=[
    {url:"info", name:"개인정보"},
    {url:"tour", name:"내 여행"},
    {url:"sell", name:"판매 내역"},
    {url:"stat", name:"통계"},
    {url:"edu", name:"온라인 교육"}
]
function GuideMain(props) {
    const move = useNavigate();

    const params = useParams();
    const [keyword, setKeyword] = useState("");

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    useEffect(() => {
        setKeyword(params.value);
    }, [])

    useEffect(() => {
        setKeyword(params.value)
    }, [params])

    return (
        <ThemeProvider theme={theme}>
            <TopBar/>
            {/* 최상위 Grid **/}
            <Grid container sx={{width:"100%" ,mb:"10rem",py:"5rem", px:{xs:"3%", md:"10%", lg:"20%"}, mt:"3rem"}} spacing={3}
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-start"
            >
                {/* 페이지 선택용 Grid **/}
                <Grid container item md={3} xs={12}>
                    <Grid item container xs={12} display={"flex"} justifyContent={"flex-start"} alignItmes={"center"} sx={{mb:"2rem"}}>
                        <Typography sx={{fontSize:"2rem", fontWeight:"700"}}>
                            마이페이지
                        </Typography>
                    </Grid>
                    <Grid xs={12} container item sx={{borderRadius:"1vw", borderColor:"#8D8D8D"}}>
                        {page.map((item) => (
                            <Grid item container xs={12} display={"flex"} justifyContent={"flex-start"} alignItmes={"center"}>
                                <Grid xs={12} item display={"flex"} justifyContent={"flex-start"} alignItmes={"center"}>
                                    <Typography
                                        onClick={() => move(`/guide/main/${item.url}`)}
                                        sx={{fontSize:"1rem",
                                            fontWeight: keyword === item.url ? "900" : "700" ,
                                            my:"1rem",
                                            color : keyword === item.url && "#6CB0FF" ,
                                        }}>
                                        {item.name}
                                    </Typography>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid container item md={9} xs={12}>
                    {keyword === "info" && (
                        <GuideMyInfo/>
                    )}
                    {keyword === "tour" && (
                        <GuideMyTour/>
                    )}
                    {keyword === "edu" && (
                        <Education/>
                    )}
                    {keyword === "stat" && (
                        <GuideStat/>
                    )}
                    {keyword === "sell" && (
                    <Sell/>
                    )}
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default GuideMain;