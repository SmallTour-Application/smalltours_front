import React, {useEffect, useState} from 'react';
import testImg from "../images/test.png";
import {
    Box,

    Button,
    createTheme,
    Grid, Modal, TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {setSearchEnd} from "../redux/actions";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";

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

function Sell(props) {



    const accessToken = useSelector((state) => state.accessToken)

    const navigate = useNavigate();

    const [load, setLoad] = useState(false); //  api 호출중이면 true(true인동안은 버튼 사라짐)

    const [page, setPage] = useState(1);

    const [keyword, setKeyword] = useState(""); // 검색 키워드

    const [result, setResult] = useState(null) // 검색결과

    const [type, setType] = useState(0) // 검색타입. 0:전체검색 1:조건검색

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    // modal용 state
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [reviewType, setReviewType] = useState(false); // f:일반리뷰 t:가이드리뷰

    const [star, setStar] = useState(5); // 별갯수

    const [paymentId, setPaymentId] = useState(0); // 결제 id

    const [guideName, setGuideName] = useState("");

    const [last, setLast] = useState(false); // 마지막검색결과 여부

    const [start, setStart] = useState(dayjs().subtract(6, 'month')); // 시작일(초기값은 현재시간 - 6개월로)
    const [end, setEnd] = useState(dayjs()); // 종료일

    const memberId = useSelector((state) => state.memberId);

    const [detail, setDetail] = useState(null);


    // 내 여행 목록 불러오는 api
    const getMyTour = async (newPage) => {
        setLoad(true);
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/payment/sell?startDay=${start.format('YYYY-MM-DD')}&endDay=${end.format('YYYY-MM-DD')}&page=${newPage}&type=0`,
            null,
            {headers:{'Authorization': `${accessToken}`,}}
        ).catch((err) => {
            console.log(err)
        }).then((res) => {
                console.log(res);
                // 페이징
                if(!result || newPage === 1){
                    res.data && setResult(res.data)
                }else if(result){
                    res.data && setResult({count:result.count, review: result.reviews.push(res.data.review)})
                }
                if(res.data.content.length  < 10){
                    setLast(true);
                }
            }
        )
        setLoad(false);
    }

    // 세부정보 가져오기
    const getDetail = async (id) => {
        setLoad(true);
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/payment/info?paymentId=${id}`,
            null,
            {headers:{'Authorization': `${accessToken}`,}}
        ).catch((err) => {
            console.log(err)
        }).then((res) => {
                console.log(res);
                if(res.data){
                    setDetail(res.data)
                }
            }
        )
        setLoad(false);
        handleOpen();
    }



    useEffect(() => {

    }, [,accessToken])


    return (
        <Grid container item xs={12}>
            {/* 리뷰용 modal **/}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle} >
                    <Grid container sx={{width:"100%"}} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{mb:"2rem"}}>
                            <Typography id="modal-modal-description" fullWidth sx={{ fontSize:"1.5rem", fontWeight:"900" }}>
                                결제정보
                            </Typography>
                        </Grid>
                        <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{mb:"1rem"}}>
                            <Typography sx={{fontSize:"0.7rem", fontWeight:"700", fontColor:"#8D8D8D"}}>
                                회원명 : {detail && detail.memberName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{mb:"1rem"}}>
                            <Typography sx={{fontSize:"0.7rem", fontWeight:"700", fontColor:"#8D8D8D"}}>
                                연락처 : {detail && detail.tel}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{mb:"1rem"}}>
                        <Typography sx={{fontSize:"0.7rem", fontWeight:"700", fontColor:"#8D8D8D"}}>
                            인원 : {detail && detail.people}명
                        </Typography>
                    </Grid>
                        <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{mb:"1rem"}}>
                            <Typography sx={{fontSize:"0.7rem", fontWeight:"700", fontColor:"#8D8D8D"}}>
                                출발일 : {detail && detail.departureDay}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            <Grid item container xs={12} display={"flex"} justifyContent="flex-start" alignItems={"center"} spacing={3}>
                <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems={"center"} sx={{display:"flex", alignItems:"center"}}>
                    <Typography sx={{fontSize: "2rem", fontWeight: "700"}}>
                        판매내역
                    </Typography>
                </Grid>
                <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems={"center"}>
                    <Typography sx={{fontSize: "1rem", fontWeight: "700", color:"#888888"}}>
                        {result ? `${result.count}개의 결과가 있어요.` : "여행 정보가 없어요"}
                    </Typography>
                </Grid>
                <Grid item xs={12} display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="시작일"
                            inputFormat="MM/DD/YYYY"
                            value={start}
                            onChange={(e) => {
                                const tempDate = dayjs(e)
                                if (e && end < tempDate) {
                                    // 입력된 날짜가 종료일 이후이면
                                    setEnd(tempDate)
                                    setStart(tempDate)
                                }else if(e) {
                                    // 입력된 날짜가 종료일과 같거나 이전이면
                                    setStart(tempDate)
                                }
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            sx={{mr:"1rem"}}
                        />
                        <DesktopDatePicker
                            label="종료일"
                            inputFormat="MM/DD/YYYY"
                            value={end}
                            minDate={start}
                            disablePast
                            onChange={(e) => {
                                const tempDate = dayjs(e)
                                if (e && start > tempDate) {
                                    // 입력된 날짜가 시작일보다 이전이면
                                    setEnd(start)
                                }else if(e) {
                                    // 입력된 날짜가 시작일보다 이후이면
                                    setEnd(tempDate)
                                }
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <Button variant={"outlined"}
                            sx={{ml:"2rem"}}
                        onClick={() => {
                            getMyTour(1);
                            setPage(1);
                        }}
                    >검색</Button>
                </Grid>
            </Grid>


            <Grid container item
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  xs={12}
                  sx={{mt:"3rem"}}
            >

                {/* 결과들 **/}
                {result && result.content.map((item, idx) => {
                    return(
                        <Grid container item
                              display={"flex"}
                              justifyContent={"center"}
                              alignItems={"center"}
                              xs={12} sx={{border: 1,borderRadius:"1vw", borderColor: "#DDDDDD", overflow: 'hidden', p:0, mb:"2rem"}}>
                            <Grid xs={4} item
                                  display={"flex"}
                                  justifyContent={"center"}
                                  alignItems={"center"}
                                  sx={{width:"100%", aspectRatio:"16/9", display: "flex", overflow:"hidden", p:0, m:0}}
                            >
                                <img src={item.thumb !== "" ? item.thumb : testImg} style={{width:"100%", height: "100%", objectFit:"cover", objectPosition:"center center", margin:0}}/>
                            </Grid>
                            <Grid xs={5} item container
                                  display={"flex"}
                                  justifyContent={"flex-start"}
                                  alignItems={"center"}
                                  sx={{pl:"1rem"}}
                                  spacing={2}
                            >
                                <Grid xs={12} item onClick={() => navigate(`/tour/${item.id}`)} >
                                    <Typography noWrap sx={{fontSize:"1.3rem", fontWeight:"700"}}>{item.packageName}</Typography>
                                </Grid>
                                <Grid xs={12} item
                                      display={"flex"}
                                      justifyContent={"flex-start"}
                                      alignItems={"center"}
                                >
                                    <Typography>가격 : {item.price}</Typography>
                                </Grid>
                                <Grid xs={12} item>
                                    <Typography sx={{fontSize:"0.7rem", fontWeight:"700", color:"#888888"}}>결제일시 : {dayjs(item.payday).format('YYYY년 MM월 DD일 HH시 MM분').toString()}</Typography>
                                </Grid>
                            </Grid>
                            <Grid xs={3} item container
                                  display={"flex"}
                                  justifyContent={"flex-end"}
                                  alignItems={"center"}
                                  spacing={1}
                            >
                                <Grid item xs={12} sx={{ px:"3rem"}}>
                                    <Button variant={"outlined"} sx={{borderColor:"#DDDDDD"}} fullWidth onClick={() => getDetail(item.paymentId)} >
                                        <Typography sx={{color:"#000000"}}>세부정보 확인</Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                })}

            </Grid>



            <Grid xs={12} item sx={{pt:'1vw',}}>
                {last === false && load === false && result && result.count > page * 10 && (
                    <Button variant="outlined" fullWidth sx={{borderColor:'#DDDDDD', borderRadius:'10px'}}
                            onClick={() => {
                                const newPage = page + 1;
                                getMyTour(newPage);
                                setPage(newPage);
                            }}
                    >
                        <Typography sx={{color:"#000000"}}  >내 여행 더보기</Typography>
                    </Button>
                )}
                {last && <Typography sx={{color:"#000000"}}  >마지막 검색결과예요.</Typography>}
            </Grid>
        </Grid>
    );
}

export default Sell;