import React, {useEffect, useState} from 'react';
import {
    createTheme, Divider,
    Grid,
    ThemeProvider
} from "@mui/material";
import TopBar from "../component/TopNav";
import Typography from "@mui/material/Typography";
import MyInfo from "./MyInfo";
import {useNavigate, useParams} from "react-router-dom";
import Plan from "./Plan";
import PlanLog from "./PlanLog";
import MyReview from "./MyReview";
import MyGuideReview from "./MyGuideReview";
import MyFavoriteTour from "./MyFavoriteTour";
import MyFavoriteGuide from "./MyFavoriteGuide";
import {useSelector} from "react-redux";

const page=[
    {url:"info", name:"개인정보"},
    {url:"plan", name:"내 여행"},
    {url:"review", name:"리뷰 확인"},
    {url:"guide", name:"가이드 리뷰 확인"},
    {url:"ftour", name:"관심 여행"},
    {url:"fguide", name:"관심 가이드"},]
function MyPage(props) {
    const move = useNavigate();

    const params = useParams();
    const [keyword, setKeyword] = useState("");

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    const accessToken = useSelector((state) => state.accessToken);
    const role = useSelector((state) => state.role);

    useEffect(() => {

        accessToken && setKeyword(params.value);
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
                                        onClick={() => move(`/my/${item.url}`)}
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
                        <MyInfo/>
                    )}
                    {keyword === "plan" && (
                        <Plan/>
                    )}
                    {keyword === "review" && (
                        <MyReview/>
                    )}
                    {keyword === "guide" && (
                        <MyGuideReview/>
                    )}
                    {keyword === "ftour" && (
                        <MyFavoriteTour/>
                    )}
                    {keyword === "fguide" && (
                        <MyFavoriteGuide/>
                    )}
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default MyPage;