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
        tourId : 1,
        tourThumb : testImg,
        tourName : "패키지1"
    },
    {
        tourId : 2,
        tourThumb : testImg,
        tourName : "패키지2"
    },
    {
        tourId : 3,
        tourThumb : testImg,
        tourName : "패키지3"
    },
]

function MyGuideReview(props) {

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    return (
        <Grid container item xs={12}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
        >
            <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems={"center"} sx={{mb: "2rem"}}>
                <Typography sx={{fontSize: "2rem", fontWeight: "700"}}>
                    내 가이드리뷰
                </Typography>
            </Grid>
            <Grid container item
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  xs={12} sx={{border: 1, borderColor: "#8D8D8D", borderRadius: "1vw", p: "1rem", overflow: 'auto'}}>
                {/* items **/}
                {reviews && reviews.map((items) => {
                    return(
                        <Grid
                            container
                            item xs={12}
                            display="flex"
                            justifyContent="flex-start"
                            alignItems="center"
                            sx={{px:"1rem", py:"1rem"}}
                        >
                            <Grid lg={1} md={2} xs={5}
                                  display="flex"
                                  justifyContent="center"
                                  alignItems="center"
                            >
                                <Box sx={{width:"100%", aspectRatio:"1/1", borderRadius:"30vw", overflow:"hidden"}}>
                                    <img src={testImg} style={{width:"100%", height:"100%", objectFit:"cover"}}/>
                                </Box>
                            </Grid>
                            <Grid lg={11} md={10} xs={7}
                                  sx={{pl:"2rem"}}
                                  display="flex"
                                  justifyContent="flex-start"
                                  alignItems="center"
                            >
                                <Typography>
                                    {items.tourName}
                                </Typography>
                            </Grid>
                        </Grid>
                    );
                })}
            </Grid>
            <Grid xs={12} item sx={{mt:'1vw', mb:'7vw'}}>
                <Button variant="outlined" fullWidth sx={{borderColor:'#000000', borderRadius:'10px'}}>
                    <Typography sx={{color:"#000000"}}>투어 더보기</Typography>
                </Button>
            </Grid>
        </Grid>
    );
}

export default MyGuideReview;