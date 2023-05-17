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

const logs = [
    {
        date:"20230301",
        id:"000000",
        name:"여행가고싶다",
        price:"300000",
        startDate:"20230328",
        people:"4",
        state:"예약"
    },
    {
        date:"20230301",
        id:"000002",
        name:"여행가고싶다",
        price:"300000",
        startDate:"20230328",
        people:"4",
        state:"예약"
    },{
        date:"20230301",
        id:"000004",
        name:"여행가고싶다",
        price:"300000",
        startDate:"20230328",
        people:"4",
        state:"예약"
    },

]

function PlanLog(props) {

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });
    const [collapseArr, setCollapseArr] = useState([]);

    const [reviewContent, setReviewContent] = useState(""); // 리뷰 내용
    const [guideContent, setGuideContent] = useState(""); // 가이드 내용

    useEffect(() => {
        // 최초 로드시 여행기록 리스트만큼의 배열을 만들어 전부 false로 채움. id를 구분용으로 넣음
        let tempArr = [];
        for(let i = 0; i < logs.length; i++){
            tempArr.push({id:logs[i].id, check:false});
        }
        console.log(tempArr);
        setCollapseArr(tempArr);
    },[])

    return (
        <Grid content item xs={12}>
            <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems={"center"} sx={{mb: "2rem"}}>
                <Typography sx={{fontSize: "2rem", fontWeight: "700"}}>
                    여행기록
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

                {/* items **/}
                {logs.map((item, idx) => {
                    return (
                    <Grid xs={12} id={item.id} container item
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={0}
                          sx={{px:"2rem", pt:"1rem"}}
                          onClick={() => {
                              let tempArr = JSON.parse(JSON.stringify(collapseArr));
                              console.log(tempArr);
                              // true,false 반대로 넣기
                              if(tempArr[idx].check === false) {
                                  for(let i = 0 ; i < tempArr.length ; i++) {
                                      tempArr[i].check = false;
                                  }
                                  tempArr[idx].check = true;
                              }else {
                                  tempArr[idx].check = false;
                              }
                              setCollapseArr(tempArr);
                              console.log(collapseArr);
                          }}
                    >
                        <Grid xs={1} item
                              display={"flex"}
                              justifyContent={"center"}
                              alignItems={"center"}
                        >
                            <Typography style={{ whiteSpace: 'nowrap', fontWeight:"500", fontSize:"1rem" }}>
                                {item.date}
                            </Typography>
                        </Grid>
                        <Grid xs={1} item
                              display={"flex"}
                              justifyContent={"center"}
                              alignItems={"center"}
                        >
                            <Typography style={{ whiteSpace: 'nowrap', fontWeight:"500", fontSize:"1rem" }}>
                                {item.id}
                            </Typography>
                        </Grid>
                        <Grid xs={1} item
                              display={"flex"}
                              justifyContent={"center"}
                              alignItems={"center"}
                        >
                            <Typography style={{ whiteSpace: 'nowrap', fontWeight:"500", fontSize:"1rem" }}>
                                {item.name}
                            </Typography>
                        </Grid>
                        <Grid xs={1} item
                              display={"flex"}
                              justifyContent={"center"}
                              alignItems={"center"}
                        >
                            <Typography style={{ whiteSpace: 'nowrap', fontWeight:"500", fontSize:"1rem" }}>
                                {item.price}
                            </Typography>
                        </Grid>
                        <Grid xs={1} item
                              display={"flex"}
                              justifyContent={"center"}
                              alignItems={"center"}
                        >
                            <Typography style={{ whiteSpace: 'nowrap', fontWeight:"500", fontSize:"1rem" }}>
                                {item.startDate}
                            </Typography>
                        </Grid>
                        <Grid xs={1} item
                              display={"flex"}
                              justifyContent={"center"}
                              alignItems={"center"}
                        >
                            <Typography style={{ whiteSpace: 'nowrap', fontWeight:"500", fontSize:"1rem" }}>
                                {item.people}
                            </Typography>
                        </Grid>
                        <Grid xs={1} item
                              display={"flex"}
                              justifyContent={"center"}
                              alignItems={"center"}
                        >
                            <Typography style={{ whiteSpace: 'nowrap', fontWeight:"500", fontSize:"1rem" }}>
                                {item.state}
                            </Typography>
                        </Grid>

                        {/* 리뷰작성 **/}
                        <Grid xs={12} container item display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Collapse in={collapseArr[idx] && collapseArr[idx].check} fullWidth>
                                <Grid container item spacing={3} xs={12} sx={{pt:"2rem"}}>
                                    <Grid container item xs={12} md={6}>
                                        <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"}
                                              sx={{direction:"flex", justifyContent:"center", alignItems:"center"}}
                                        >
                                            <Typography sx={{fontSize:"1.3rem", fontWeight:"700"}}>
                                                여행리뷰
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"}
                                              sx={{direction:"flex", justifyContent:"center", alignItems:"center", width:"100%"}}
                                        >
                                            <TextField
                                                multiline
                                                rows={4}
                                                defaultValue="내용"
                                                fullWidth
                                                sx={{width:"100%"}}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={12} md={6} >
                                        <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"}
                                              sx={{direction:"flex", justifyContent:"center", alignItems:"center"}}
                                        >
                                            <Typography sx={{fontSize:"1.3rem", fontWeight:"700"}}>
                                                가이드리뷰
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"}
                                              sx={{direction:"flex", justifyContent:"center", alignItems:"center", width:"100%"}}
                                        >
                                            <TextField
                                                multiline
                                                rows={4}
                                                defaultValue="내용"
                                                fullWidth
                                                sx={{width:"100%"}}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid xs={12} item sx={{pt:'1rem', pb:"2rem"}}>
                                        <Button variant="outlined" fullWidth sx={{borderColor:'#000000', borderRadius:'10px'}}>
                                            <Typography sx={{color:"#000000"}}>리뷰 등록</Typography>
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Collapse>
                        </Grid>

                    </Grid>
                    )
                })}
            </Grid>

            <Grid xs={12} item sx={{pt:'1vw'}}>
                <Button variant="outlined" fullWidth sx={{borderColor:'#000000', borderRadius:'10px'}}>
                    <Typography sx={{color:"#000000"}}>예약일정 더보기</Typography>
                </Button>
            </Grid>
        </Grid>
    );
}

export default PlanLog;