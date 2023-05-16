import React, {useState} from 'react';
import TopBar from "../component/TopNav";
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
import {Add, Remove} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import FaceIcon from '@mui/icons-material/Face6';




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

    const [travelers, setTravelers] = useState(3); // 초기 값은 3
    const [travelerMin, setTravelerMin] = useState(3); // 최소인원
    const [travelerMax, setTravelerMax] = useState(5); // 최대인원

    const handleSelect = date => {
        setSelectedDate(dayjs(date));
    };

    const decreaseTravelers = () => {
        if (travelers >= travelerMin) setTravelers(travelers - 1);
    };

    const increaseTravelers = () => {
        if (travelers <= travelerMax) setTravelers(travelers + 1);
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
                            <Box sx={{width:"100%", aspectRatio:"16/9", overflow:"hidden", borderRadius:"1vw"}}>
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
                <Grid xs={12} container item sx={{px:{xs:"3%", md:"10%", lg:"20%"}, pt:"5rem"}}>
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
                <Grid xs={12} container item sx={{px:{xs:"3%", md:"10%", lg:"20%"}, pt:"5rem"}}>
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
                <Grid xs={12} container item sx={{px:{xs:"3%", md:"10%", lg:"20%"}, py:"5rem", mt:"5rem", backgroundColor:"#3972B3"}}
                    display={"flex"} justifyContent={"center"} alignItems={"center"}
                >
                    <Grid xs={12} item display={"flex"} justifyContent={"center"} alignItems={"center"}
                        sx={{pb:"2rem"}}
                    >
                        <Typography sx={{fontWeight:"900", fontSize:"2rem", color:"#FFFFFF"}}>
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


                {/* 인원수 가격 **/}
                <Grid xs={12} container item sx={{px:{xs:"3%", md:"10%", lg:"20%"}, py:"5rem"}}
                      display={"flex"} justifyContent={"center"} alignItems={"center"}
                >
                    <Grid xs={12} item display={"flex"} justifyContent={"center"} alignItems={"center"}
                          sx={{py:"2rem"}}
                    >
                        <Typography sx={{fontWeight:"900", fontSize:"2rem", color:"#000000"}}>
                            인원 설정
                        </Typography>
                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <IconButton onClick={decreaseTravelers} disabled={travelers === 3} sx={{color:"#000000"}}>
                                <RemoveCircleRoundedIcon sx={{fontSize:"4rem" }}/>
                            </IconButton>
                            <Typography sx={{ mx: "2rem", fontSize:"3rem", fontWeight:"700", color:"#000000" }}>{travelers}</Typography>
                            <IconButton onClick={increaseTravelers} disabled={travelers === 5} sx={{color:"#000000"}}>
                                <AddCircleRoundedIcon sx={{fontSize:"4rem"}} />
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid xs={12} item display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <Typography sx={{fontWeight:"700", fontSize:"2rem", mr:"3rem"}}>
                            총 여행 금액 : <b style={{fontWeight:"900"}}>135000원</b>
                        </Typography>
                        <Button variant={"outlined"} sx={{backgroundColor:"#3972B3", px:"1rem",py:"0.5rem", borderRadius:"50px"}}
                                display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Typography sx={{color:"#FFFFFF", fontSize:"2rem", fontWeight:"700"}}>구매하러가기</Typography>
                        </Button>
                    </Grid>
                </Grid>


                {/* 리뷰 **/}
                <Grid container item xs={12} sx={{px:'20%', pt:0, mt:0}}>
                    <Grid item xs={12}
                          display="flex"
                          justifyContent="flex-start"
                          alignItems="flex-end"
                          sx={{pt:'7vw'}}
                    >
                        <Typography sx={{fontSize:"2rem", fontWeight:"700"}}>수강평&nbsp;</Typography>
                        <Typography sx={{fontSize:"1rem", fontWeight:"500", pb:"0.5rem"}}>총 207개</Typography>
                    </Grid>
                    <Grid item xs={12}
                          display="flex"
                          justifyContent="flex-start"
                          alignItems="center"
                          sx={{pb:'7vw', mt:'1rem'}}
                    >
                        <StarIcon sx={{ color: '#F2D857', fontSize: '3rem' }}/>
                        <StarIcon sx={{ color: '#F2D857', fontSize: '3rem' }}/>
                        <StarIcon sx={{ color: '#F2D857', fontSize: '3rem' }}/>
                        <StarIcon sx={{ color: '#F2D857', fontSize: '3rem' }}/>
                        <StarIcon sx={{ color: '#F2D857', fontSize: '3rem' }}/>
                        <Typography sx={{fontWeight:"700", fontSie:"2rem", pt:"0.5rem"}}>(5.0)</Typography>
                    </Grid>
                    {/* 리뷰 정렬 옵션 **/}
                    <Grid container item xs={12}
                          display="flex"
                          justifyContent="flex-start"
                          alignItems="center"
                          sx={{mb:'0.5vw'}}
                    >
                        <Typography sx={{fontSize:"1rem", fontWeight:"700", mx:"1rem"}}>최신 순</Typography>
                        <Typography sx={{fontSize:"1rem", fontWeight:"700", mx:"1rem"}}>좋아요 순</Typography>
                        <Typography sx={{fontSize:"1rem", fontWeight:"700", mx:"1rem"}}>높은 평점 순</Typography>
                        <Typography sx={{fontSize:"1rem", fontWeight:"700", mx:"1rem"}}>낮은 평점 순</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider sx={{borderWidth:'0.1rem', borderColor:'#000000'}}/>
                    </Grid>
                    {/* 리뷰목록 **/}
                    <Grid
                        container
                        item xs={12}
                        display="flex"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{mt:'1rem'}}
                    >
                        <Grid container item xs={12} sx={{mt:'0.3vw'}}>
                            <Grid item
                                  display="flex"
                                  justifyContent="flex-start"
                                  alignItems="center"
                                  xs={1} sx={{pr:'1vw'}}>
                                <FaceIcon sx={{fontSize:'4rem'}}/>
                            </Grid>
                            <Grid
                                item
                                container
                                display="flex"
                                justifyContent="flex-start"
                                alignItems="center"
                                xs={1}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    display="flex"
                                    justifyContent="flex-start"
                                    alignItems="flex-end"
                                >
                                    <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>
                                    <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>
                                    <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>
                                    <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>
                                    <StarIcon sx={{ color: '#F2D857', fontSize: '1.5rem' }}/>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    display="flex"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    sx={{pl:0}}
                                >
                                    <Typography sx={{fontSize:"1rem", fontWeight:"700"}}>닉네임</Typography>
                                </Grid>
                            </Grid>
                            <Grid item
                                  display="flex"
                                  justifyContent="flex-start"
                                  alignItems="center"
                                  xs={12} sx={{mt:'1vw'}}>
                                <Typography>
                                    내용내용내용내용내용내용내용
                                </Typography>
                            </Grid>
                            <Grid item
                                  display="flex"
                                  justifyContent="flex-start"
                                  alignItems="center"
                                  xs={12} sx={{mt:'1vw'}}>
                                <Typography sx={{color:"#8D8D8D"}}>
                                    2022-03-18 ♥2
                                </Typography>
                                <br/>
                            </Grid>
                            <Grid item
                                  xs={12} sx={{mt:'2vw', mb:'1vw'}}>
                                <Divider fullWidth/>
                                <br/>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid xs={12} item sx={{mt:'1vw', mb:'7vw'}}>
                        <Button variant="outlined" fullWidth sx={{borderColor:'#000000', borderRadius:'10px'}}>
                            <Typography sx={{color:"#000000"}}>리뷰 더보기</Typography>
                        </Button>
                    </Grid>
                </Grid>


            </Grid>

        </ThemeProvider>
    );
}

export default Tour;