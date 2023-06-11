import React from 'react';
import {createTheme, Grid, TextField, ThemeProvider} from "@mui/material";
import TopBar from "../component/TopNav";
import Typography from "@mui/material/Typography";

function AddTour(props) {
    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <TopBar/>
            {/* 최상위 Grid **/}
            <Grid container sx={{width:"100%" ,mb:"10rem",py:"5rem", px:{xs:"3%", md:"10%", lg:"20%"}, mt:"3rem"}} spacing={3}
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-start"
            >
                {/* 투어제목 **/}
                <Grid item xs={12}>
                    <Typography>투어제목</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant={"outlined"} fullWidth />
                </Grid>
                {/* 부제목 **/}
                <Grid item xs={12}>
                    <Typography>부제목</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant={"outlined"}fullWidth />
                </Grid>
                {/* 여행기간 **/}
                <Grid item xs={12}>
                    <Typography>여행기간(일)</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant={"outlined"}  type={"number"}/>
                </Grid>
                {/* 최소인원 **/}
                <Grid item xs={12}>
                    <Typography>최소인원(인)</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant={"outlined"} type={"number"}/>
                </Grid>
                {/* 최대인원 **/}
                <Grid item xs={12}>
                    <Typography>최대인원(인)</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant={"outlined"} type={"number"}/>
                </Grid>
                {/* 기본가격 **/}
                <Grid item xs={12}>
                    <Typography>기본가격</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant={"outlined"} fullWidth />
                </Grid>
                {/* 만나는 장소 및 시간 **/}
                <Grid item xs={12}>
                    <Typography>만나는 장소 및 시간</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant={"outlined"}fullWidth />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default AddTour;