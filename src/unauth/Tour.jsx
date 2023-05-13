import React, {useState} from 'react';
import TopBar from "../component/TopNav";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box, Checkbox,
    createTheme, FormControlLabel,
    Grid, Radio, RadioGroup,
    TextField,
    ThemeProvider
} from "@mui/material";
import testImg from "../images/test.png";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './css/MyCalendar.css';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";



function Tour(props) {

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    // 비활성화 할 날짜
    const [disallowedRanges, setDisallowedRanges] = useState([
        {
            start : dayjs('2023-06-10'),
            end : dayjs('2023-06-13')
        },
        {
            start : dayjs('2023-06-20'),
            end : dayjs('2023-06-23')
        }
    ]);

    const isDisabled = ({ date }) => {
        const day = dayjs(date);
        return disallowedRanges.some(range => day.isAfter(range.start) && day.isBefore(range.end));
    };

    const [selectedDate, setSelectedDate] = useState(dayjs().toDate());

    const handleSelect = date => {
        setSelectedDate(dayjs(date));
    };


    return (
        <ThemeProvider theme={theme}>
            <TopBar/>
            {/* TopBar 띄우기 위한 Box*/}
            {/* 최상위 Grid **/}
            <Grid container sx={{width:"100%" ,mb:"10rem"}}>
                {/* 여행 요약(Title, img, subTitle 등) **/}
                <Grid xs={12} container item display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{m:0, p:0}}>
                    <Grid  item container xs={12} sx={{backgroundColor:"#6CB0FF", px:{xs:"3%", md:"10%", lg:"20%", }, py:"3rem"}} spacing={3}>
                        {/* 여행 썸네일 **/}
                        <Grid item xs={12} md={6}>
                            <Box sx={{width:"100%", aspectRatio:"16/9", overflow:"hidden"}}>
                                <img src={testImg} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                            </Box>
                        </Grid>
                        {/* 여행 썸네일 옆 요약정보 **/}
                        <Grid container item xs={12} md={6}>
                            <Grid item xs={12}
                                  display={"flex"} justifyContent={"flex-start"} alignItems={"center"}
                                  sx={{direction:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                                <Typography sx={{fontWeight:"900", fontSize:"2rem"}}>
                                    걸어서 세계 속으로
                                </Typography>
                            </Grid>
                            <Grid item xs={12}
                                  display="flex"
                                  justifyContent="flex-start"
                                  alignItems="center"
                                  sx={{direction:"flex", justifyContent:"flex-start", alignItems:"center"}}
                            >
                                <StarIcon sx={{ color: '#F2D857', fontSize: '2.5rem' }}/>
                                <StarIcon sx={{ color: '#F2D857', fontSize: '2.5rem' }}/>
                                <StarIcon sx={{ color: '#F2D857', fontSize: '2.5rem' }}/>
                                <StarIcon sx={{ color: '#F2D857', fontSize: '2.5rem' }}/>
                                <StarIcon sx={{ color: '#F2D857', fontSize: '2.5rem' }}/>
                                <Typography>(5.0)</Typography>
                            </Grid>
                            <Grid item xs={12}
                                  display={"flex"} justifyContent={"flex-start"} alignItems={"center"}
                                  sx={{direction:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                                <Typography sx={{fontWeight:"900", fontSize:"1rem"}}>
                                    200개의 리뷰 | 121번째 여행
                                </Typography>
                            </Grid>
                            <Grid item xs={12}
                                  display={"flex"} justifyContent={"flex-start"} alignItems={"center"}
                                  sx={{direction:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                                <Typography sx={{fontWeight:"900", fontSize:"1.5rem"}}>
                                    가이드 홍길동
                                </Typography>
                            </Grid>
                            <Grid item xs={12}
                                  display={"flex"} justifyContent={"flex-start"} alignItems={"center"}
                                  sx={{direction:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                                <Typography sx={{fontWeight:"900", fontSize:"1.2rem"}}>
                                    3인 ~ 5인
                                </Typography>
                            </Grid>
                            <Grid item xs={12}
                                  display={"flex"} justifyContent={"flex-start"} alignItems={"center"}
                                  sx={{direction:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                                <Typography sx={{fontWeight:"900", fontSize:"1.5rem"}}>
                                    가격 : 1000000원 (3인기준)
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>


                {/* 패키지 사진 및 내용 **/}
                <Grid xs={12} item container sx={{px:{xs:"3%", md:"10%", lg:"20%"}, py:"5rem"}}>
                    {/* 이미지들 **/}
                    <Grid xs={12} item>
                        <Box sx={{width:"100%"}}>
                            <img src={testImg} style={{width:"100%", height:"auto"}} />
                        </Box>
                    </Grid>

                    {/* 내용 **/}
                    <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItmes={"center"} sx={{pt:"3rem"}}>
                        <Typography sx={{fontWeight:"900", fontSize:"1.5rem"}}>
                            내용내용
                        </Typography>
                    </Grid>
                </Grid>


                {/* 옵션 아코디언 **/}
                <Grid xs={12} container item sx={{px:{xs:"3%", md:"10%", lg:"20%"}, py:"5rem"}}>
                    <Grid xs={12} item display={"flex"} justifyContent={"center"} alignItmes={"center"} sx={{mb:"2rem"}}>
                        <Typography sx={{fontWeight:"900", fontSize:"1.5rem"}}>
                            1일차
                        </Typography>
                    </Grid>
                    <Grid xs={12} item display={"flex"} justifyContent={"center"} alignItmes={"center"}>
                        <Accordion fullWidth sx={{width:"100%"}} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <AccordionSummary sx={{backgroundColor:'#D9D9D9'}} expandIcon={<ExpandMoreIcon />}>
                                <Typography>
                                    10:00 ~ 12:00
                                </Typography>
                            </AccordionSummary>
                            <RadioGroup     defaultValue="0">
                            <AccordionDetails
                                              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                            >
                                    <Grid container sx={{width:"100%"}} display={"flex"} justifyContent={"center"} alignItems={"center"}
                                          sx={{direction:"flex", justifyContent:"center", alignItems:"center"}}
                                    >
                                        <Grid item xs={9} display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
                                            <Typography sx={{fontWeight:"700", fontSize:"1.3rem"}}>
                                                파리 거리투어(+0원)
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
                                            <Typography sx={{fontSize:"1.3rem"}}>
                                                <FormControlLabel value="0" control={<Radio />} />
                                            </Typography>
                                        </Grid>
                                    </Grid>
                            </AccordionDetails>
                                <AccordionDetails
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <Grid container sx={{width:"100%"}} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                        <Grid item xs={9} display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
                                            <Typography sx={{fontWeight:"700", fontSize:"1.3rem"}}>
                                                에펠탑 구경(+20000원)
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
                                            <Typography sx={{fontSize:"1.3rem"}}>
                                                <FormControlLabel value="1" control={<Radio />} />
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                                <AccordionDetails
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <Grid container sx={{width:"100%"}} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                        <Grid item xs={9} display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
                                            <Typography sx={{fontWeight:"700", fontSize:"1.3rem"}} >
                                                파리 길거리 음식(+50000원)
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
                                            <Typography sx={{fontSize:"1.3rem"}}>
                                                <FormControlLabel value="2" control={<Radio />} />
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </RadioGroup>
                        </Accordion>
                    </Grid>
                </Grid>


                {/* 옵션 아코디언 **/}
                <Grid xs={12} container item sx={{px:{xs:"3%", md:"10%", lg:"20%"}, py:"5rem"}}>
                    <Grid xs={12} item display={"flex"} justifyContent={"center"} alignItmes={"center"} sx={{mb:"2rem"}}>
                        <Typography sx={{fontWeight:"900", fontSize:"1.5rem"}}>
                            2일차
                        </Typography>
                    </Grid>
                    <Grid xs={12} item display={"flex"} justifyContent={"center"} alignItmes={"center"}>
                        <Accordion fullWidth sx={{width:"100%"}} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <AccordionSummary sx={{backgroundColor:'#D9D9D9'}} expandIcon={<ExpandMoreIcon />}>
                                <Typography>
                                    12:00
                                </Typography>
                            </AccordionSummary>
                            <RadioGroup     defaultValue="0">
                                <AccordionDetails
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <Grid container sx={{width:"100%"}} display={"flex"} justifyContent={"center"} alignItems={"center"}
                                          sx={{direction:"flex", justifyContent:"center", alignItems:"center"}}
                                    >
                                        <Grid item xs={9} display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
                                            <Typography sx={{fontWeight:"700", fontSize:"1.3rem"}}>
                                                파리 공기마시기(+0원)
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
                                            <Typography sx={{fontSize:"1.3rem"}}>
                                                <FormControlLabel value="0" control={<Radio />} />
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                                <AccordionDetails
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <Grid container sx={{width:"100%"}} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                        <Grid item xs={9} display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
                                            <Typography sx={{fontWeight:"700", fontSize:"1.3rem"}}>
                                                달팽이 요리(+80000원)
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
                                            <Typography sx={{fontSize:"1.3rem"}}>
                                                <FormControlLabel value="1" control={<Radio />} />
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                                <AccordionDetails
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <Grid container sx={{width:"100%"}} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                        <Grid item xs={9} display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
                                            <Typography sx={{fontWeight:"700", fontSize:"1.3rem"}} >
                                                파리 길거리 음식(+50000원)
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
                                            <Typography sx={{fontSize:"1.3rem"}}>
                                                <FormControlLabel value="2" control={<Radio />} />
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </RadioGroup>
                        </Accordion>
                    </Grid>
                </Grid>



                {/* 출발일 설정 **/}
                <Grid xs={12} container item sx={{px:{xs:"3%", md:"10%", lg:"20%"}, py:"5rem", backgroundColor:"#6CB0FF"}}
                    display={"flex"} justifyContent={"center"} alignItems={"center"}
                >
                    <Grid xs={12} item display={"flex"} justifyContent={"center"} alignItems={"center"}
                        sx={{pb:"2rem"}}
                    >
                        <Typography sx={{fontWeight:"900", fontSize:"2rem"}}>
                            출발일 설정
                        </Typography>
                    </Grid>
                    <Grid xs={12} item display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <Box sx={{width:{xs:"90%", md:"80%", lg:"60%"}, aspectRatio:"3/2"}}>
                            <Calendar
                                onChange={handleSelect}
                                value={selectedDate}
                                tileDisabled={isDisabled}
                                minDate={new Date()}  // 오늘 이전의 날짜는 선택할 수 없습니다.
                            />
                        </Box>
                    </Grid>
                </Grid>



            </Grid>

        </ThemeProvider>
    );
}

export default Tour;