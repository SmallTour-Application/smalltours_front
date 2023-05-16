import React, {useState} from 'react';
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

function Plan(props) {

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    return (
        <Grid content item xs={12}>
            <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems={"center"} sx={{mb: "2rem"}}>
                <Typography sx={{fontSize: "2rem", fontWeight: "700"}}>
                    예약일정
                </Typography>
            </Grid>
            <Grid container item
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  xs={12} sx={{border: 1, borderColor: "#8D8D8D", borderRadius: "1vw", p: "1rem", overflow: 'auto'}}>
                <Grid xs={12} container item
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                        spacing={0}
                      sx={{px:"2rem", pb:"1rem"}}
                >
                    <Grid xs={1} item
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                    >
                        <Typography style={{ whiteSpace: 'nowrap', fontWeight:"700", fontSize:"1rem" }}>
                            예약일
                        </Typography>
                    </Grid>
                    <Grid xs={1} item
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                    >
                        <Typography style={{ whiteSpace: 'nowrap', fontWeight:"700", fontSize:"1rem" }}>
                            예약코드
                        </Typography>
                    </Grid>
                    <Grid xs={1} item
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                    >
                        <Typography style={{ whiteSpace: 'nowrap', fontWeight:"700", fontSize:"1rem" }}>
                            상품이름
                        </Typography>
                    </Grid>
                    <Grid xs={1} item
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                    >
                        <Typography style={{ whiteSpace: 'nowrap', fontWeight:"700", fontSize:"1rem" }}>
                            결제금액
                        </Typography>
                    </Grid>
                    <Grid xs={1} item
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                    >
                        <Typography style={{ whiteSpace: 'nowrap', fontWeight:"700", fontSize:"1rem" }}>
                            출발날짜
                        </Typography>
                    </Grid>
                    <Grid xs={1} item
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                    >
                        <Typography style={{ whiteSpace: 'nowrap', fontWeight:"700", fontSize:"1rem" }}>
                            여행인원
                        </Typography>
                    </Grid>
                    <Grid xs={1} item
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                    >
                        <Typography style={{ whiteSpace: 'nowrap', fontWeight:"700", fontSize:"1rem" }}>
                            현재상태
                        </Typography>
                    </Grid>
                </Grid>

                {/* line1 **/}
                <Grid xs={12} container item
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={0}
                      sx={{px:"2rem", pt:"1rem"}}
                >
                    <Grid xs={1} item
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                    >
                        <Typography style={{ whiteSpace: 'nowrap', fontWeight:"500", fontSize:"1rem" }}>
                            20230301
                        </Typography>
                    </Grid>
                    <Grid xs={1} item
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                    >
                        <Typography style={{ whiteSpace: 'nowrap', fontWeight:"500", fontSize:"1rem" }}>
                            000000
                        </Typography>
                    </Grid>
                    <Grid xs={1} item
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                    >
                        <Typography style={{ whiteSpace: 'nowrap', fontWeight:"500", fontSize:"1rem" }}>
                            여행가고싶다
                        </Typography>
                    </Grid>
                    <Grid xs={1} item
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                    >
                        <Typography style={{ whiteSpace: 'nowrap', fontWeight:"500", fontSize:"1rem" }}>
                            300000
                        </Typography>
                    </Grid>
                    <Grid xs={1} item
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                    >
                        <Typography style={{ whiteSpace: 'nowrap', fontWeight:"500", fontSize:"1rem" }}>
                            20230328
                        </Typography>
                    </Grid>
                    <Grid xs={1} item
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                    >
                        <Typography style={{ whiteSpace: 'nowrap', fontWeight:"500", fontSize:"1rem" }}>
                            4
                        </Typography>
                    </Grid>
                    <Grid xs={1} item
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                    >
                        <Typography style={{ whiteSpace: 'nowrap', fontWeight:"500", fontSize:"1rem" }}>
                            예약
                        </Typography>
                    </Grid>
                </Grid>

                {/* line2 **/}
                <Grid xs={12} container item
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={0}
                      sx={{px:"2rem", pt:"1rem"}}
                >
                    <Grid xs={1} item
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                    >
                        <Typography style={{ whiteSpace: 'nowrap', fontWeight:"500", fontSize:"1rem" }}>
                            20230301
                        </Typography>
                    </Grid>
                    <Grid xs={1} item
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                    >
                        <Typography style={{ whiteSpace: 'nowrap', fontWeight:"500", fontSize:"1rem" }}>
                            000000
                        </Typography>
                    </Grid>
                    <Grid xs={1} item
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                    >
                        <Typography style={{ whiteSpace: 'nowrap', fontWeight:"500", fontSize:"1rem" }}>
                            여행가고싶다
                        </Typography>
                    </Grid>
                    <Grid xs={1} item
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                    >
                        <Typography style={{ whiteSpace: 'nowrap', fontWeight:"500", fontSize:"1rem" }}>
                            300000
                        </Typography>
                    </Grid>
                    <Grid xs={1} item
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                    >
                        <Typography style={{ whiteSpace: 'nowrap', fontWeight:"500", fontSize:"1rem" }}>
                            20230328
                        </Typography>
                    </Grid>
                    <Grid xs={1} item
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                    >
                        <Typography style={{ whiteSpace: 'nowrap', fontWeight:"500", fontSize:"1rem" }}>
                            4
                        </Typography>
                    </Grid>
                    <Grid xs={1} item
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                    >
                        <Typography style={{ whiteSpace: 'nowrap', fontWeight:"500", fontSize:"1rem" }}>
                            예약
                        </Typography>
                    </Grid>
                </Grid>

            </Grid>

            <Grid xs={12} item sx={{pt:'1vw'}}>
                <Button variant="outlined" fullWidth sx={{borderColor:'#000000', borderRadius:'10px'}}>
                    <Typography sx={{color:"#000000"}}>예약일정 더보기</Typography>
                </Button>
            </Grid>
        </Grid>
    );
}

export default Plan;