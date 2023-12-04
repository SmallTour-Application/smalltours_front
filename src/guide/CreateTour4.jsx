import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import TopBar from "../component/TopNav";
import Typography from "@mui/material/Typography";
import {Box, Button, Collapse, createTheme, Divider, Grid, Modal, TextField, ThemeProvider} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import dayjs from "dayjs";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

// modal에 적용할 style
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius:"1vw",
};

function CreateTour4(props) {
    const param = useParams();

    const accessToken = useSelector((state) => state.accessToken);

    const navigate = useNavigate();

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    // 서버에서 가져온 airline 저장할 곳
    const [airline, setAirline] = useState(null);

    const [contactEmail, setContactEmail] = useState("");
    const [contactTel, setContactTel] = useState("")
    const [country, setCountry] = useState("");
    const [airName, setAirName] = useState("");

    // 비행기 추가할때 쓸거

    const [arrivalAirport, setArrivalAirport] = useState("")
    const [arrivalDateTime, setArrivalDateTime] = useState(dayjs())
    const [departCity, setDepartCity] = useState("")
    const [departDateTime, setDepartDateTime] = useState(dayjs())
    const [duration, setDuration] = useState(0);
    const [flyName, setFlyName] = useState("");
    const [seatType, setSeatType] = useState("");

    const [hotelId, setHotelId] = useState(0);

    const [collapse, setCollapse] = useState([]);

    // modal용 state
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // 서버에서 숙소정보 가져오기
    const getHotel = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/package/airline/unauth/view?id=${param.value}`
        ).then(
            (res)=>{
                console.log(res);
                if(res.data){
                    setAirline(res.data)
                    const tempArr = [];
                    if(res.data.roomDTO){
                        for(let i = 0 ; i < res.data.roomDTO.length ; i++){
                            tempArr.push(false);
                        }
                    }
                    setCollapse(tempArr);
                }
            }
        )
    }

    // airline 추가하기
    const addHotel = async () => {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/package/airline/add`,
            {
                contactEmail:contactEmail,
                contactTel:contactTel,
                name:airName,
                country:country,
                tourId:param.value,
            },
            {headers:{'Authorization': `${accessToken}`,}}
        ).then((res) => {
            getHotel(param.value)
        }).catch((err) =>{
            console.log("실패. 다시시도해주세요")
        })
    }

    // airline 삭제하기
    const delHotel = async (id) => { // 매개변수 : duration (몇일차인지) 넣으면 됩니다.
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/package/airline/delete`,
            {
                id:id
            },
            {headers:{'Authorization': `${accessToken}`,}}
        ).then((res) => {
            getHotel(param.value)
        }).catch((err) =>{
            console.log("실패. 다시시도해주세요")
        })
    }

    // 비행기 추가하기
    const addRoom = async (id) => { // 매개변수 : duration (몇일차인지) 넣으면 됩니다.
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/package/airline/flight/add`,
            {
                airlineId: id,
                arrivalAirport: arrivalAirport,
                arrivalDateTime: arrivalDateTime.format('YYYY-MM-DDTHH:mm:ss.SSS'),
                departCity: departCity,
                departDateTime: departDateTime.format('YYYY-MM-DDTHH:mm:ss.SSS'),
                duration: duration,
                flightName: flyName,
                price: 10000,
                seatType: seatType
            },
            {headers:{'Authorization': `${accessToken}`,}}
        ).then((res) => {
            getHotel(param.value)
        }).catch((err) =>{
            console.log("실패. 다시시도해주세요")
        })
    }

    // 비행기 삭제하기
    const delRoom = async (id) => { // 매개변수 : duration (몇일차인지) 넣으면 됩니다.
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/package/airline/flight/delete`,
            {
                id:id
            },
            {headers:{'Authorization': `${accessToken}`,}}
        ).then((res) => {
            getHotel(param.value)
        }).catch((err) =>{
            console.log("실패. 다시시도해주세요")
        })
    }

    useEffect(() => {
        if(accessToken){
            getHotel(param.value)
        }
    }, [,accessToken])

    return (
        <ThemeProvider theme={theme}>
            {/* 방 추가용 modal **/}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle} >
                    <Grid container sx={{width:"100%"}} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        {/* 방 설명 **/}
                        <Grid xs={12} item sx={{mt:"3rem"}}>
                            <Typography>도착 공항</Typography>
                        </Grid>
                        <Grid xs={12} item >
                            <TextField value={arrivalAirport} onChange={(e) => setArrivalAirport(e.target.value)} fullWidth />
                        </Grid>
                        <Grid xs={12} item sx={{mt:"3rem"}}>
                            <Typography>소요시간</Typography>
                        </Grid>
                        <Grid xs={12} item >
                            <TextField type={"number"} value={duration} onChange={(e) => setDuration(e.target.value)} fullWidth />
                        </Grid>
                        {/* 출발 도시 **/}
                        <Grid xs={12} item >
                            <Typography>출발 도시</Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <TextField value={departCity} onChange={(e) => setDepartCity(e.target.value)} fullWidth/>
                        </Grid>
                        {/* 방 이름 **/}
                        <Grid xs={12} item >
                            <Typography>항공기 이름</Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <TextField value={flyName} onChange={(e) => setFlyName(e.target.value)} fullWidth/>
                        </Grid>
                        <Grid xs={12} item >
                            <Typography>좌석타입</Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <TextField value={seatType} onChange={(e) => setSeatType(e.target.value)} fullWidth/>
                        </Grid>
                        {/* 방 추가 **/}
                        <Grid xs={12} item sx={{my:"1rem"}}>
                            <Button variant={"outlined"} fullWidth onClick={() => addRoom(hotelId)} >입력된 내용으로 항공기 추가</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            <TopBar/>
            {/* 최상위 Grid **/}
            <Grid container sx={{width:"100%" ,mb:"10rem",py:"5rem", px:{xs:"3%", md:"10%", lg:"20%"}, mt:"3rem"}} spacing={3}
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-start"
            >
                <Typography sx={{fontSize: "2rem", fontWeight: "700"}}>
                    여행추가(3/4)
                </Typography>
                <Grid xs={12} item sx={{py:"2rem"}}>
                    <Typography sx={{fontSize:"1.5rem", fontWeight:"700"}}>숙소목록</Typography>
                </Grid>
                {/* 서버에서 가져온 숙소목록을 여기에 표시합니다. **/}
                {airline && airline.map((hItem, hIdx) => {
                    return(
                        <Grid xs={12} item container sx={{border:1, borderColor:"#A2A2A2", borderRadius:"20px", p:3, mb:3}}>
                            <Grid xs={12} item>
                                <Typography sx={{fontSize: "1rem"}}>항공사명 : {hItem.name}</Typography>
                            </Grid>
                            <Grid xs={12} item>
                                <Typography sx={{fontSize: "1rem"}}>항공사 이메일 : {hItem.contactEmail}</Typography>
                            </Grid>
                            <Grid xs={12} item>
                                <Typography sx={{fontSize: "1rem"}}>항공사 전화번호 : {hItem.contactTel}</Typography>
                            </Grid>
                            <Grid xs={12} item>
                                <Typography sx={{fontSize: "1rem"}}>항공사 국가 : {hItem.country}</Typography>
                            </Grid>
                            {!hItem.flightDTO && (
                                <Grid xs={12} item sx={{py:"1rem"}}>
                                    <Button variant={"outlined"} fullWidth onClick={() => {
                                        setHotelId(hItem.id)
                                        handleOpen();
                                    }} >비행편 추가</Button>
                                </Grid>
                            )}
                            <Grid xs={12} item sx={{py:"1rem"}}>
                                <Button variant={"outlined"} fullWidth onClick={() => delHotel(hItem.id)}>항공사 정보 삭제</Button>
                            </Grid>
                            <Grid xs={12} item sx={{py:"1rem"}}>
                                <Button variant={"outlined"} fullWidth onClick={() => {
                                    // 1. 깊은복사
                                    const tempArr = JSON.parse(JSON.stringify(collapse));
                                    // 2. 해당하는 인덱스를 반대로 전환
                                    tempArr[hIdx] = !tempArr[hIdx]
                                    // 3. 재삽입
                                    console.log(tempArr[hIdx])
                                    setCollapse(tempArr);
                                }}>항공편 정보 토글</Button>
                            </Grid>
                            <Grid xs={12} item>
                                <Divider/>
                            </Grid>
                            {/* 방 정보들을 여기에 표시합니다. **/}
                            <Collapse key={collapse[hIdx]} in={collapse[hIdx]} sx={{width:"100%"}}>
                                {hItem.flightDTO && (
                                    <Grid container sx={{width:"100%"}}>
                                        <Grid xs={12} item>
                                            <Typography sx={{fontSize: "0.8rem"}}>항공편 이름 : {hItem.flightDTO.flightName}</Typography>
                                        </Grid>
                                        <Grid xs={12} item>
                                            <Typography sx={{fontSize: "0.8rem"}}>출발 도시 : {hItem.flightDTO.departCity}</Typography>
                                        </Grid>
                                        <Grid xs={12} item>
                                            <Typography sx={{fontSize: "0.8rem"}}>소요시간 : {hItem.flightDTO.duration}</Typography>
                                        </Grid>
                                        <Grid xs={12} item>
                                            <Typography sx={{fontSize: "0.8rem"}}>좌석타입 : {hItem.flightDTO.seatType}</Typography>
                                        </Grid>
                                        <Grid xs={12} item sx={{py:"1rem"}}>
                                            <Button variant={"outlined"} fullWidth onClick={() => delRoom(hItem.flightDTO.id)}>항공편 삭제</Button>
                                        </Grid>
                                    </Grid>
                                )}
                            </Collapse>
                        </Grid>
                    )

                })}
                <Grid xs={12} item sx={{py:"2rem"}}>
                    <Typography sx={{fontSize:"1.5rem", fontWeight:"700"}}>숙소추가</Typography>
                </Grid>
                <Grid xs={12} item container>
                    {/* 항공사 이름 **/}
                    <Grid xs={12} item>
                        <Typography sx={{fontSize: "1rem"}}>항공사 이름</Typography>
                    </Grid>
                    <Grid xs={12} item  value={airName} onChange={(e) => setAirName(e.target.value)}  >
                        <TextField />
                    </Grid>
                    {/* 항공사 이메일 **/}
                    <Grid xs={12} item>
                        <Typography sx={{fontSize: "1rem"}} >항공사 이메일</Typography>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
                    </Grid>
                    {/* 항공사 전화번호 **/}
                    <Grid xs={12} item>
                        <Typography sx={{fontSize: "1rem"}}  >항공사전화번호</Typography>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField type={"number"} value={contactTel} onChange={(e) => setContactTel(e.target.value)} />
                    </Grid>
                    {/* 항공사 국가 **/}
                    <Grid xs={12} item>
                        <Typography sx={{fontSize: "1rem"}}  >항공사 국가</Typography>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField value={country} onChange={(e) => setCountry(e.target.value)} />
                    </Grid>

                    <Grid xs={12} item sx={{py:"1rem"}}>
                        <Button variant={"outlined"} fullWidth onClick={() => addHotel()}>항공사 정보 추가</Button>
                    </Grid>
                </Grid>
                <Grid xs={12} item sx={{py:"3rem"}}>
                    <Button variant={"outlined"} fullWidth onClick={() => navigate(`/guide/main/tour`)} >여행추가 종료</Button>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default CreateTour4;