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
        guideId : 1,
        tourThumb : testImg,
        guideName : "가이드1",
        sub : 33
    },
    {
        guideId : 2,
        tourThumb : testImg,
        guideName : "가이드2",
        sub : 33
    },
    {
        guideId : 3,
        tourThumb : testImg,
        guideName : "가이드3",
        sub : 33
    },
]

function MyFavoriteGuide(props) {

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
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  xs={12} sx={{ overflow: 'auto'}}
                  spacing={2}
            >
                {/* items **/}
                {reviews && reviews.map((items) => {
                    return(
                        <Grid
                            container
                            item xs={3}
                            display="flex"
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            <Grid
                                container
                                item xs={12}
                                display="flex"
                                justifyContent="flex-start"
                                alignItems="center"
                                sx={{border:2, borderRadius:"1vw" ,borderColor: "#DDDDDD",py:"3rem"}}
                            >
                                <Grid xs={12}
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      sx={{px:"30%"}}
                                >
                                    <Box sx={{width:"100%", aspectRatio:"1/1", borderRadius:"30vw", overflow:"hidden"}}>
                                        <img src={testImg} style={{width:"100%", height:"100%", objectFit:"cover"}}/>
                                    </Box>
                                </Grid>
                                <Grid xs={12}
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      sx={{mt:"2rem"}}
                                >
                                    <Typography sx={{fontSize:"1rem", fontWeight:"700"}}>
                                        {items.guideName}
                                    </Typography>
                                </Grid>
                                <Grid xs={12}
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      sx={{mt:"0.5rem"}}
                                >
                                    <Typography sx={{fontSize:"1rem", fontWeight:"700", color:"#888888"}}>
                                        구독자 {items.sub} 명
                                    </Typography>
                                </Grid>
                                <Grid xs={12}
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      sx={{mt:"2rem", px:"30%"}}
                                >
                                    <Button fullWidth sx={{border:2, borderColor:"#DDDDDD", borderRadius:"50vw"}}>
                                        <Typography sx={{fontSize:"0.7rem", fontWeight:"700", color:"#000000"}}>구독취소</Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    );
                })}
            </Grid>
            <Grid xs={12} item sx={{mt:'1vw', mb:'7vw'}}>
                <Button variant="outlined" fullWidth sx={{borderColor:'#DDDDDD', borderRadius:'10px'}}>
                    <Typography sx={{color:"#000000"}}>가이드 더보기</Typography>
                </Button>
            </Grid>
        </Grid>
    );
}

export default MyFavoriteGuide;