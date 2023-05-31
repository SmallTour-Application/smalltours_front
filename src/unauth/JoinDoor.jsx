import React, {useEffect} from 'react';
import {createTheme, Grid, ThemeProvider} from "@mui/material";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import TopBar from "../component/TopNav";
import Typography from "@mui/material/Typography";

function JoinDoor(props) {

    const accessToken = useSelector((state) => state.accessToken);

    const navigate = useNavigate();

    useEffect(() => {
        // 로그인 된 상태면 메인으로 날림
        if(accessToken){
            navigate("/main");
        }
    },[])

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <TopBar/>
            {/* 최상위 Grid **/}
            <Grid container sx={{px:{xs:"3%", md:"20%", lg:"20%"}, mt:"5rem"}} spacing={3}
                  display={"flex"} justifyContent={"center"} alignContent={"center"}
            >
                <Grid item container xs={12} md={6} onClick={() => navigate("/guideJoin")}>
                    <Grid item container xs={12} sx={{ border:2, borderRadius:"20px", borderColor:"#DDDDDD", p:"1rem"}}>
                        <Grid xs={12} item sx={{py:"3rem"}} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                            <Typography sx={{fontSize:"3rem", color:"#000000", fontWeight:"900"}}>가이드</Typography>
                        </Grid>
                        <Grid xs={12} item sx={{py:"3rem"}} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                            <Typography sx={{fontSize:"3rem", color:"#000000", fontWeight:"900"}}>회원가입</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container xs={12} md={6} onClick={() => navigate("/guideJoin")}>
                    <Grid item container xs={12} sx={{border:2, borderRadius:"20px", borderColor:"#DDDDDD", p:"1rem"}}>
                        <Grid xs={12} item sx={{py:"3rem"}}>
                            <Typography sx={{fontSize:"3rem", color:"#000000", fontWeight:"900"}}>일반</Typography>
                        </Grid>
                        <Grid xs={12} item sx={{py:"3rem"}}>
                            <Typography sx={{fontSize:"3rem", color:"#000000", fontWeight:"900"}}>회원가입</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default JoinDoor;