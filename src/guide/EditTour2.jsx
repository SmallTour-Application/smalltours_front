import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {Button, createTheme, Divider, Grid, TextField, ThemeProvider} from "@mui/material";
import TopBar from "../component/TopNav";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";


function EditTour2(props) {

    const param = useParams();

    const accessToken = useSelector((state) => state.accessToken);

    const navigate = useNavigate();

    const [tourInfo, setTourInfo] = useState();

    const [duration, setDuration] = useState([]);

    const [startTime, setStartTime] = useState(dayjs());
    const [endTime, setEndTime] = useState(dayjs());

    const [schedule, setSchedule] = useState(null);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [price, setPrice] = useState(0);

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

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

    // 스케쥴 정보 가져오기
    const getSchedule = async (id) => {
        const response = await axios.get(
            `http://localhost:8099/package/schedule/unauth/view?id=${id}`
        ).then((res) => {
                if (res.data) {
                    console.log(res)
                    setSchedule(res.data);
                }
            }
        ).catch((err) => console.log(err))
    }

    // 스케쥴 추가하기
    const addSchedule = async (tourDay) => { // 매개변수 : duration (몇일차인지) 넣으면 됩니다.
        console.log(
            {
                endTime: `${endTime.hour().toString().padStart(2, '0')}:${endTime.minute().toString().padStart(2, '0')}`,
                startTime: `${startTime.hour().toString().padStart(2, '0')}:${startTime.hour().toString().padStart(2, '0')}`,
                tourDay: tourDay,
                tourId: param.value,
            }
        )
        const response = await axios.post(
            `http://localhost:8099/package/schedule/add`,
            {
                endTime : `${endTime.hour().toString().padStart(2,'0')}:${endTime.minute().toString().padStart(2,'0')}`,
                startTime : `${startTime.hour().toString().padStart(2,'0')}:${startTime.hour().toString().padStart(2,'0')}`,
                tourDay : tourDay,
                tourId : param.value,
            },
            {headers:{'Authorization': `${accessToken}`,}}
        ).then((res) => {
            getSchedule(param.value)

        }).catch((err) =>{
            console.log("시간이 겹치는 일정이 있어요.")
        })
    }

    // 스케쥴에 아이템 추가하기
    const addItem = async (scheduleId) => { // 매개변수 : 스케쥴의 아이디를 넣으면 됩니다.
        const response = await axios.post(
            `http://localhost:8099/package/schedule/item/add`,
            {
                content:content,
                defaultItem : 0,
                locationX : 1,
                locationY : 1,
                price : price,
                scheduleId : scheduleId,
                title : title,
            },
            {headers:{'Authorization': `${accessToken}`,}}
        ).then((res) => {
            getSchedule(param.value)
            setTitle("")
            setContent("")
            setPrice(0)
        }).catch((err) =>{
            console.log("생성실패")
        })
    }

    // 스케쥴 제거
    const delSchedule = async (scheduleId) => { // 매개변수 : duration (몇일차인지) 넣으면 됩니다.
        const response = await axios.post(
            `http://localhost:8099/package/schedule/delete`,
            {
                id:scheduleId,
            },
            {headers:{'Authorization': `${accessToken}`,}}
        ).then((res) => {
            getSchedule(param.value)
        }).catch((err) =>{
            console.log("삭제 실패. 다시시도해주세요")
        })
    }

    // 아이템 제거
    const delItem = async (itemId) => {
        const response = await axios.post(
            `http://localhost:8099/package/schedule/item/delete`,
            {
                id:itemId,
            },
            {headers:{'Authorization': `${accessToken}`,}}
        ).then((res) => {
            getSchedule(param.value)
        }).catch((err) =>{
            console.log("삭제 실패. 다시시도해주세요")
        })
    }

    // 기본값으로 설정하기
    const setDefault = async (id) => {
        const response = await axios.post(
            `http://localhost:8099/package/schedule/item/default_item`,
            {
                id:id,
            },
            {headers:{'Authorization': `${accessToken}`,}}
        ).then((res) => {
            getSchedule(param.value)
        }).catch((err) =>{
            console.log("기본값으로 변경 실패. 다시시도해주세요")
        })
    }

    useEffect(() => {
        if(accessToken){
            getTourInfo(param.value)
            getSchedule(param.value)
        }
    },[,accessToken])

    return (
        <ThemeProvider theme={theme}>
            <TopBar/>
            {/* 최상위 Grid **/}
            <Grid container sx={{width:"100%" ,mb:"10rem",py:"5rem", px:{xs:"3%", md:"10%", lg:"20%"}, mt:"3rem"}} spacing={3}
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-start"
            >
                <Typography sx={{fontSize: "2rem", fontWeight: "700"}}>
                    여행수정(2/4)
                </Typography>
                {/* 일차별로 정렬합니다. **/}
                {tourInfo && duration.length > 0 && duration.map((dur, durIdx) => {
                    return(
                        <Grid item container xs={12}>
                            <Grid xs={12} item sx={{py:"1rem"}}>
                                <Typography sx={{fontSize:"2rem", fontWeight:"700"}}>{dur}일차</Typography>
                            </Grid>

                            {/* 이미 만들어진 페이지가 있으면 그것을 출력합니다. **/}
                            {schedule && schedule.map((sItem, sIdx) => {
                                return(
                                    dur === sItem.tourDay && (
                                        <Grid xs={12} item container sx={{my:"1rem"}}>
                                            <Grid xs={12} item sx={{display:"flex",  alignItems:"center"}}>
                                                <Typography sx={{fontSize:"1.5rem", fontWeight:"700"}}># {sItem.startTime} ~ {sItem.endTime}</Typography>
                                                <Button variant={"outlined"} onClick={() => delSchedule(sItem.id)} sx={{ml:"1rem"}}>스케쥴 제거</Button>
                                            </Grid>
                                            <Grid xs={12} item sx={{py:"1rem"}}>
                                                <Divider fullWidth />
                                            </Grid>

                                            {/* 스케쥴의 아이템을 출력합니다. **/}
                                            {sItem.scheduleItemDTOList && sItem.scheduleItemDTOList.length > 0 && sItem.scheduleItemDTOList.map((iItem, iIdx) => {
                                                return(
                                                    <Grid xs={12} item container>
                                                        <Grid xs={12} item display={"flex"} alignContent={"center"} sx={{display:"flex", alignItems:"center"}}>
                                                            <Typography>아이템: {iItem.title} / {iItem.content} / {iItem.price}원</Typography>
                                                            <Button variant={"outlined"} sx={{ml:"1rem"}} onClick={() => delItem(iItem.id)} >옵션 제거</Button>
                                                            {iItem.defaultItem === 0 && (
                                                                <Button variant={"outlined"} sx={{ml:"1rem"}} onClick={() => setDefault(iItem.id)} >기본값으로 설정</Button>
                                                            )}
                                                        </Grid>
                                                        <Grid xs={12} item sx={{py:"1rem"}}>
                                                            <Divider fullWidth />
                                                        </Grid>
                                                    </Grid>
                                                )
                                            })}
                                            {/* 스케쥴의 아이템 만들기 **/}
                                            <Grid xs={12} item>
                                                <Typography>옵션 제목</Typography>
                                                <TextField value={title} onChange={(e) => setTitle(e.target.value)} />
                                            </Grid>
                                            <Grid xs={12} item>
                                                <Typography>옵션 설명</Typography>
                                                <TextField value={content} onChange={(e) => setContent(e.target.value)} />
                                            </Grid>
                                            <Grid xs={12} item>
                                                <Typography>옵션 가격</Typography>
                                                <TextField type={"number"} value={price} onChange={(e) => setPrice(e.target.value)} />
                                            </Grid>
                                            <Grid xs={12} item sx={{my:"1rem"}}>
                                                <Button variant={"outlined"} onClick={() => addItem(sItem.id)} >아이템 생성하기</Button>
                                            </Grid>
                                        </Grid>
                                    )

                                )
                            })}
                            {/* 스케쥴을 추가합니다. **/}
                            <Grid xs={12} item>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        label="시작시간"
                                        views={['hours', 'minutes']}
                                        value={startTime}
                                        onChange={(newValue) => setStartTime(newValue)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        label="종료시간"
                                        views={['hours', 'minutes']}
                                        value={endTime}
                                        onChange={(newValue) => setEndTime(newValue)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid xs={12} item sx={{mt:"1rem"}}>
                                <Button variant={"outlined"} onClick={() => addSchedule(dur)} >스케쥴 추가하기</Button>
                            </Grid>
                        </Grid>
                    )

                })}
                {/* 다음단계로 **/}
                <Grid item xs={12} >
                    <Button fullWidth variant={"outlined"} onClick={() => navigate(`/guide/editTour3/${param.value}`)} >
                        다음단계로
                    </Button>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default EditTour2;