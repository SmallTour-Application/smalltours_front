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

function MyInfo(props) {

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <TopBar/>
            {/* 최상위 Grid **/}
            <Grid container sx={{width:"100%" ,mb:"10rem", px:{xs:"3%", md:"10%", lg:"20%", }}}>
                {/* 왼쪽페이지 **/}
                <Grid container item md={3} xs={12}>

                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default MyInfo;