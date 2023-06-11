import React, {useEffect, useState} from 'react';
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
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";




function Tour(props) {
    const params = useParams();

    const navigate = useNavigate();

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

    const [tourInfo, setTourInfo] = useState(null);
    const [review, setReview] = useState(null);
    const [reviewRating, setReviewRating] = useState(0);
    const [schedule, setSchedule] = useState(null);

    const [duration, setDuration] = useState([]);
    const [selectSchedule, setSelectSchedule] = useState([]); // 선택한 스케쥴 저장하기 위한 state

    const [price, setPrice] = useState(0);

    const handleSelect = date => {
        setSelectedDate(dayjs(date));
    };

    const decreaseTravelers = () => {
        if (travelers >= tourInfo.minGroupSize) setTravelers(travelers - 1);
    };

    const increaseTravelers = () => {
        if (travelers <= tourInfo.maxGroupSize) setTravelers(travelers + 1);
    };

    // 투어정보 불러오기
    const getTourInfo = async (id) => {
        const response = await axios.get(
            `http://localhost:8099/package/unauth/view?id=${id}`
        ).then((res) => {
            if(res.data){
                console.log(res)
                setTourInfo(res.data)
                const tempArr = []
                for(let i = 1 ; i <= res.data.duration ; i++){
                    tempArr.push(i);
                }
                setDuration(tempArr);
            }
        })
    }

    // 리뷰정보 불러오기
    const getReviewInfo = async (id, paramPage) => {
        const response = await axios.post(
            `http://localhost:8099/review/package/unauth/list?packageId=${id}&page=${paramPage}`
        ).then((res) => {
                if (res.data) {
                    console.log(res)
                    setReview(res.data);
                }
            }
        )
    }

    // 리뷰평점 불러오기
    const getReviewRating = async (id, paramPage) => {
        const response = await axios.get(
            `http://localhost:8099/review/package/unauth/rating?id=${id}`
        ).then((res) => {
                if (res.data) {
                    console.log(res)
                    setReviewRating(res.data.rating);
                }
            }
        ).catch((err) => console.log(err))
    }

    // 스케쥴 불러오기
    const getSchedule = async (id) => {
        const response = await axios.get(
            `http://localhost:8099/package/schedule/unauth/view?id=${id}`
        ).then((res) => {
                if (res.data) {
                    console.log(res)
                    setSchedule(res.data);
                    const tempArr1 = [];
                    for(let i = 0; i < res.data.length ; i++){
                        for(let j = 0; j < (res.data)[i].scheduleItemDTOList.length ; j++){
                            tempArr1.push({scheduleId : (res.data)[i].id, itemId : 0})
                            if(((res.data)[i].scheduleItemDTOList)[j].defaultItem === 1){
                                tempArr1[i].itemId = ((res.data)[i].scheduleItemDTOList)[j].id
                            }
                        }
                    }
                    setSelectSchedule(tempArr1);
                }
            }
        ).catch((err) => console.log(err))
    }

    // 실시간 가격 계산하기 -> selectSchedule와 travler에 변동이 생길 때마다 계산합니다.
    const calcPrice = () => {
        let defaultPrice = tourInfo.defaultPrice;
        let optionPrice = 0;
        for(let i = 0; i < selectSchedule.length; i++){
            for(let q = 0 ; q < schedule.length ; q++){
                for(let p = 0 ; p < schedule[q].scheduleItemDTOList.length ; p++){
                    if(selectSchedule[i].itemId === schedule[q].scheduleItemDTOList[p].id){
                        optionPrice += schedule[q].scheduleItemDTOList[p].price
                    }
                }
            }
        }
        setPrice((defaultPrice + optionPrice) * travelers)
    }

    useEffect(() => {
        getTourInfo(params.value)
        getReviewInfo(params.value, 1);
        getReviewRating(params.value)
        getSchedule(params.value)
    },[])

    useEffect(() => {
        if(selectSchedule.length > 0 && travelers > 0){
            calcPrice()
        }
    }, [selectSchedule, travelers])


    return (
        <ThemeProvider theme={theme}>
            <TopBar/>
            {/* TopBar 띄우기 위한 Box*/}
            {/* 최상위 Grid **/}
            <Grid container sx={{width:"100%" ,mb:"10rem", mt:"3rem"}}>
                {/* 여행 요약(Title, img, subTitle 등) **/}
                <Grid xs={12} container item display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{m:0, p:0}}>
                    <Grid  item container xs={12} sx={{backgroundColor:"#6CB0FF", px:{xs:"3%", md:"10%", lg:"20%", }, pb:"3rem", pt:"5rem"}} spacing={3}>
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
                                    {tourInfo && tourInfo.title}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}
                                  display="flex"
                                  justifyContent="flex-start"
                                  alignItems="center"
                                  sx={{direction:"flex", justifyContent:"flex-start", alignItems:"center"}}
                            >
                                {reviewRating > 0 && (<StarIcon sx={{ color: '#F2D857', fontSize: '2.5rem' }}/>)}
                                {reviewRating > 1 && (<StarIcon sx={{ color: '#F2D857', fontSize: '2.5rem' }}/>)}
                                {reviewRating > 2 && (<StarIcon sx={{ color: '#F2D857', fontSize: '2.5rem' }}/>)}
                                {reviewRating > 3 && (<StarIcon sx={{ color: '#F2D857', fontSize: '2.5rem' }}/>)}
                                {reviewRating > 4 && (<StarIcon sx={{ color: '#F2D857', fontSize: '2.5rem' }}/>)}

                                <Typography>({reviewRating})</Typography>
                            </Grid>
                            <Grid item xs={12}
                                  display={"flex"} justifyContent={"flex-start"} alignItems={"center"}
                                  sx={{direction:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                                <Typography sx={{fontWeight:"900", fontSize:"1rem"}}>
                                    {review && review.count}개의 리뷰 | {tourInfo && (tourInfo.duration)}일 동안 떠나요
                                </Typography>
                            </Grid>
                            <Grid item xs={12}
                                  display={"flex"} justifyContent={"flex-start"} alignItems={"center"}
                                  onClick={() => navigate(`/guideInfo/${tourInfo && tourInfo.profileResponseDTO.guideId}`)}
                                  sx={{direction:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                                <Typography sx={{fontWeight:"900", fontSize:"1.5rem"}}>
                                    가이드 {tourInfo && tourInfo.profileResponseDTO.nickname}
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
                                    가격 : {tourInfo && tourInfo.defaultPrice}원 (3인기준)
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>


                {/* 패키지 사진 및 내용 **/}
                <Grid xs={12} item container sx={{px:{xs:"3%", md:"10%", lg:"20%"}, py:"5rem"}}>
                    {/* 부제목 **/}
                    <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItmes={"center"} sx={{py:"3rem"}}>
                        <Typography sx={{fontWeight:"900", fontSize:"1.5rem"}}>
                            {tourInfo && tourInfo.subTitle}
                        </Typography>
                    </Grid>
                    {/* 이미지들 **/}
                    <Grid xs={12} item>
                        <Box sx={{width:"100%"}}>
                            <img src={testImg} style={{width:"100%", height:"auto"}} />
                        </Box>
                    </Grid>

                    {/* 내용 **/}
                    <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItmes={"center"} sx={{pt:"3rem"}}>
                        <Typography sx={{fontWeight:"900", fontSize:"1.5rem"}}>
                            {tourInfo && tourInfo.description}
                        </Typography>
                    </Grid>
                </Grid>


                {/* 옵션 아코디언 **/}
                {schedule && tourInfo && duration && duration.map((dur) => {
                    return(
                        <Grid xs={12} container item sx={{px:{xs:"3%", md:"10%", lg:"20%"}, pt:"5rem"}}>
                            <Grid xs={12} item display={"flex"} justifyContent={"center"} alignItmes={"center"} sx={{mb:"2rem"}}>
                                <Typography sx={{fontWeight:"900", fontSize:"1.5rem"}}>
                                    {dur}일차
                                </Typography>
                            </Grid>
                            {schedule.map((item, idx) => {
                                    return(
                                        item.tourDay === dur && (
                            <Grid xs={12} item display={"flex"} justifyContent={"center"} alignItmes={"center"}>
                                                <Accordion fullWidth sx={{width:"100%"}} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                                    <AccordionSummary sx={{backgroundColor:'#D9D9D9'}} expandIcon={<ExpandMoreIcon />}>
                                                        <Typography>
                                                            {item.startTime} ~ {item.endTime}
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <RadioGroup   defaultValue={selectSchedule[idx].itemId} onChange={(e) => {
                                                        // 1. 기존의 배열을 깊은복사합니다.
                                                        let tempArr = JSON.parse(JSON.stringify(selectSchedule))
                                                        // 2. 기존의 배열에 들어간 내용을 수정합니다.
                                                        for(let i = 0 ; i < selectSchedule.length ; i++) {
                                                            if(tempArr[i].scheduleId === item.id){
                                                                tempArr[i].itemId = e.target.value
                                                            }
                                                        }
                                                        // 3. state를 수정합니다.
                                                        setSelectSchedule(tempArr);
                                                    }}>
                                                        {item.scheduleItemDTOList.map((subItem, subIdx) => {
                                                            return(
                                                                <AccordionDetails
                                                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                                                                >
                                                                    <Grid container sx={{width:"100%"}} display={"flex"} justifyContent={"center"} alignItems={"center"}
                                                                          sx={{direction:"flex", justifyContent:"center", alignItems:"center"}}
                                                                    >
                                                                        <Grid item xs={9} display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
                                                                            <Typography sx={{fontWeight:"700", fontSize:"1.3rem"}}>
                                                                                {subItem.title}(+{subItem.price}원)
                                                                            </Typography>
                                                                            <Typography sx={{fontWeight:"700", fontSize:"0.9rem", color:"#A2A2A2"}}>
                                                                                {subItem.content}
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item xs={3} display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
                                                                            <Typography sx={{fontSize:"1.3rem"}}>
                                                                                <FormControlLabel value={subItem.id} control={<Radio />} />
                                                                            </Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                </AccordionDetails>
                                                            )
                                                        })}

                                                    </RadioGroup>
                                                </Accordion>
                            </Grid>
                                            )

                                    )

                                })}


                        </Grid>
                    )
                }
                )}



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
                {tourInfo && (
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
                                총 여행 금액 : <b style={{fontWeight:"900"}}>{price}원</b>
                            </Typography>
                            <Button variant={"outlined"} sx={{backgroundColor:"#3972B3", px:"1rem",py:"0.5rem", borderRadius:"50px"}}
                                    display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                <Typography sx={{color:"#FFFFFF", fontSize:"2rem", fontWeight:"700"}}>구매하러가기</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                )}



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