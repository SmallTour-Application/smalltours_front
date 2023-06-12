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

function CreateTour3(props) {
    const param = useParams();

    const accessToken = useSelector((state) => state.accessToken);

    const navigate = useNavigate();

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    // 서버에서 가져온 숙소정보 저장할 곳
    const [hotelInfo, setHotelInfo] = useState(null);

    const [hotelAddress, setHotelAddress] = useState("");
    const [hotelDescription, setHotelDescription] = useState("");
    const [hotelTel, setHotelTel] = useState("");
    const [hotelName, setHotelName] = useState("");
    const [hotelId, setHotelId] = useState(0) // 서버에 숙소정보 전송 뒤 받아올 id

    const [hotel, setHotel] = useState(false); // 호텔 정보가 입력되었는지 확인

    const [minPeople, setMinPeople] = useState(1);
    const [maxPeople, setMaxPeople] = useState(1);

    const [roomDescription, setRoomDescription] = useState("");
    const [roomName, setRoomName] = useState("");
    const [roomPrice, setRoomPrice] = useState(0);
    const [roomImage, setRoomImage] = useState(null);

    const [collapse, setCollapse] = useState([]);

    // modal용 state
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // 서버에서 숙소정보 가져오기
    const getHotel = async () => {
        const response = await axios.get(
            `http://localhost:8099/package/hotel/unauth/view?id=${param.value}`
        ).then(
            (res)=>{
                console.log(res);
                if(res.data){
                    setHotelInfo(res.data)
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

    // 숙소 추가하기
    const addHotel = async () => { // 매개변수 : duration (몇일차인지) 넣으면 됩니다.
        const response = await axios.post(
            `http://localhost:8099/package/hotel/add`,
            {
                address:hotelAddress,
                description:hotelDescription,
                hotelLocationX:1,
                hotelLocationY:1,
                hotelTel:hotelTel,
                name:hotelName,
                tourId:param.value
            },
            {headers:{'Authorization': `${accessToken}`,}}
        ).then((res) => {
            getHotel(param.value)
        }).catch((err) =>{
            console.log("실패. 다시시도해주세요")
        })
    }

    // 숙소 삭제하기
    const delHotel = async (id) => { // 매개변수 : duration (몇일차인지) 넣으면 됩니다.
        const response = await axios.post(
            `http://localhost:8099/package/hotel/delete`,
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

    // 방 추가하기
    const addRoom = async (id) => { // 매개변수 : duration (몇일차인지) 넣으면 됩니다.
        const fd = new FormData();
        if(roomImage){
            Object.values(roomImage).forEach((roomImage) => {
                fd.append('image', roomImage);
            }); // 파일 임포트
        }
        fd.append('addPrice', 1)
        fd.append('description', roomDescription);
        fd.append('hotelId', id);
        fd.append('maxPeople', maxPeople);
        fd.append('minPeople', minPeople);
        fd.append('name', roomName);
        fd.append('price', 1);

        const response = await axios.post(
            `http://localhost:8099/package/hotel/room/add`,
            fd,
            {headers:{'Authorization': `${accessToken}`,}}
        ).then((res) => {
            getHotel(param.value)
        }).catch((err) =>{
            console.log("실패. 다시시도해주세요")
        })
    }

    // 방 삭제하기
    const delRoom = async (id) => { // 매개변수 : duration (몇일차인지) 넣으면 됩니다.
        const response = await axios.post(
            `http://localhost:8099/package/hotel/room/delete`,
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
                            <Typography>방 설명</Typography>
                        </Grid>
                        <Grid xs={12} item >
                            <TextField value={roomDescription} onChange={(e) => setRoomDescription(e.target.value)}/>
                        </Grid>

                        {/* 최소 수용인원 **/}
                        <Grid xs={12} item >
                            <Typography>최소 수용인원</Typography>
                        </Grid>
                        <Grid xs={12} item sx={{mt:"3rem"}}>
                            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                <IconButton onClick={() => 1 < minPeople && setMinPeople(minPeople - 1)} disabled={minPeople === 1} sx={{color:"#000000"}}>
                                    <RemoveCircleRoundedIcon sx={{fontSize:"2rem" }}/>
                                </IconButton>
                                <Typography sx={{ mx: "2rem", fontSize:"1.5rem", fontWeight:"700", color:"#000000" }}>{minPeople}</Typography>
                                <IconButton onClick={() => maxPeople > minPeople && setMinPeople(minPeople + 1)} disabled={minPeople >= maxPeople} sx={{color:"#000000"}}>
                                    <AddCircleRoundedIcon sx={{fontSize:"2rem"}} />
                                </IconButton>
                            </Box>
                        </Grid>
                        {/* 최대 수용인원 **/}
                        <Grid xs={12} item >
                            <Typography>최대 수용인원</Typography>
                        </Grid>
                        <Grid xs={12} item sx={{mt:"3rem"}}>
                            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                <IconButton onClick={() => minPeople < maxPeople && setMaxPeople(maxPeople - 1)} disabled={maxPeople <= minPeople} sx={{color:"#000000"}}>
                                    <RemoveCircleRoundedIcon sx={{fontSize:"2rem" }}/>
                                </IconButton>
                                <Typography sx={{ mx: "2rem", fontSize:"1.5rem", fontWeight:"700", color:"#000000" }}>{maxPeople}</Typography>
                                <IconButton onClick={() => 30 > maxPeople && setMaxPeople(maxPeople + 1)} disabled={maxPeople >= 30} sx={{color:"#000000"}}>
                                    <AddCircleRoundedIcon sx={{fontSize:"2rem"}} />
                                </IconButton>
                            </Box>
                        </Grid>

                        {/* 방 이름 **/}
                        <Grid xs={12} item >
                            <Typography>방 이름</Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <TextField value={roomName} onChange={(e) => setRoomName(e.target.value)} fullWidth/>
                        </Grid>
                        {/* 방 이름 **/}
                        <Grid xs={12} item >
                            <Typography>방 가격</Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <TextField type={"number"} value={roomPrice} onChange={(e) => setRoomPrice(e.target.value)} fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                component="label"
                                size="small"
                            >
                                <Typography>파일 첨부</Typography>
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) => setRoomImage(e.target.files)}
                                />
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', width:"100%" }}>
                            {!roomImage && (
                                <Typography>선택된 파일 없음</Typography>
                            )}
                            {roomImage && (
                                <Box sx={{width:"100px", aspectRatio:"16/9", overflow:"hidden", borderRadius:"10px"}}>
                                    <img
                                        src={URL.createObjectURL(roomImage[0])}
                                        alt="썸네일"
                                        loading="lazy"
                                        style={{width:"100%", height:"100%", objectFit:"cover"}}
                                    />
                                </Box>
                            )}
                        </Grid>
                        {/* 방 추가 **/}
                        <Grid xs={12} item>
                            <Button variant={"outlined"} fullWidth onClick={() => addRoom(hotelId)} >입력된 내용으로 방 추가</Button>
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
                {hotelInfo && hotelInfo.map((hItem, hIdx) => {
                    return(
                        <Grid xs={12} item container sx={{border:1, borderColor:"#A2A2A2", borderRadius:"20px", p:3, mb:3}}>
                            <Grid xs={12} item>
                                <Typography sx={{fontSize: "1rem"}}>숙소명 : {hItem.name}</Typography>
                            </Grid>
                            <Grid xs={12} item>
                                <Typography sx={{fontSize: "1rem"}}>숙소주소 : {hItem.address}</Typography>
                            </Grid>
                            <Grid xs={12} item>
                                <Typography sx={{fontSize: "1rem"}}>숙소설명 : {hItem.description}</Typography>
                            </Grid>
                            <Grid xs={12} item>
                                <Typography sx={{fontSize: "1rem"}}>숙소전화번호 : {hItem.hotelTel}</Typography>
                            </Grid>
                            {!hItem.roomDTO && (
                                <Grid xs={12} item sx={{py:"1rem"}}>
                                    <Button variant={"outlined"} fullWidth onClick={() => {
                                        setHotelId(hItem.id)
                                        handleOpen();
                                    }} >방정보 추가</Button>
                                </Grid>
                            )}
                            <Grid xs={12} item sx={{py:"1rem"}}>
                                <Button variant={"outlined"} fullWidth onClick={() => delHotel(hItem.id)}>숙소정보 삭제</Button>
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
                                }}>방 정보 토글</Button>
                            </Grid>
                            <Grid xs={12} item>
                                <Divider/>
                            </Grid>
                            {/* 방 정보들을 여기에 표시합니다. **/}
                            <Collapse key={collapse[hIdx]} in={collapse[hIdx]} sx={{width:"100%"}}>
                            {hItem.roomDTO && (
                                            <Grid container sx={{width:"100%"}}>
                                                <Grid xs={12} item>
                                                    <Typography sx={{fontSize: "0.8rem"}}>방이름 : {hItem.roomDTO.name}</Typography>
                                                </Grid>
                                                <Grid xs={12} item>
                                                    <Typography sx={{fontSize: "0.8rem"}}>방설명 : {hItem.roomDTO.description}</Typography>
                                                </Grid>
                                                <Grid xs={12} item>
                                                    <Typography sx={{fontSize: "0.8rem"}}>최소인원 : {hItem.roomDTO.minPeople}</Typography>
                                                </Grid>
                                                <Grid xs={12} item>
                                                    <Typography sx={{fontSize: "0.8rem"}}>최대인원 : {hItem.roomDTO.maxPeople}</Typography>
                                                </Grid>
                                                {
                                                    hItem.roomDTO.image !== "" && (
                                                        <Grid xs={12} item>
                                                            <Box sx={{width:"100px", aspectRatio:"16/9", overflow:"hidden"}}>
                                                                <img src={hItem.roomDTO.image} style={{width:"100%", height:"100%", objectFit:"cover"}}/>
                                                            </Box>
                                                        </Grid>
                                                    )
                                                }
                                                <Grid xs={12} item sx={{py:"1rem"}}>
                                                    <Button variant={"outlined"} fullWidth onClick={() => delRoom(hItem.roomDTO.id)}>방 삭제</Button>
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
                    {/* 숙소명 **/}
                    <Grid xs={12} item>
                        <Typography sx={{fontSize: "1rem"}}>숙소명</Typography>
                    </Grid>
                    <Grid xs={12} item  value={hotelName} onChange={(e) => setHotelName(e.target.value)}  >
                        <TextField />
                    </Grid>
                    {/* 호텔주소 **/}
                    <Grid xs={12} item>
                        <Typography sx={{fontSize: "1rem"}} >숙소주소</Typography>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField multiline={5} value={hotelAddress} onChange={(e) => setHotelAddress(e.target.value)} />
                    </Grid>
                    {/* 호텔설명 **/}
                    <Grid xs={12} item>
                        <Typography sx={{fontSize: "1rem"}}  >숙소설명</Typography>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField multiline={5} value={hotelDescription} onChange={(e) => setHotelDescription(e.target.value)} />
                    </Grid>
                    {/* 호텔 전화번호 **/}
                    <Grid xs={12} item>
                        <Typography sx={{fontSize: "1rem"}}  >숙소 전화번호</Typography>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField type={"number"} value={hotelTel} onChange={(e) => setHotelTel(e.target.value)} />
                    </Grid>

                    <Grid xs={12} item sx={{py:"1rem"}}>
                        <Button color={"primary"} variant={"outlined"} fullWidth onClick={() => addHotel()}>숙소 정보 추가</Button>
                    </Grid>
                </Grid>
                <Grid xs={12} item sx={{py:"3rem"}}>
                    <Button variant={"outlined"} fullWidth onClick={() => navigate(`/guide/createTour4/${param.value}`)} >다음단계로</Button>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default CreateTour3;