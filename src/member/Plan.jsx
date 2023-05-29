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

function Plan(props) {
    const accessToken = useSelector((state) => state.accessToken)

    const navigate = useNavigate();

    const [load, setLoad] = useState(false); //  api 호출중이면 true(true인동안은 버튼 사라짐)

    const [page, setPage] = useState(1);

    const [start, setStart] = useState(dayjs().subtract(6, 'month')); // 시작일(초기값은 현재시간 - 6개월로)
    const [end, setEnd] = useState(dayjs()); // 종료일

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



    // 결제내역 불러오는 api(검색 미사용)(최초사용)
    const getPayment = async (newPage) => {
        setLoad(true);
        const response = await axios.post(
            `http://localhost:8099/payment/myPayment?page=${newPage}`,
            null,
            {headers:{'Authorization': `${accessToken}`,}}
        ).catch((err) => {
            console.log(err)
        }).then((res) => {
                console.log(res);
                setResult(res.data)
            })
        setLoad(false);
    }

    // 결제내역 불러오는 api(검색 사용)
    const getPaymentSearch = async (newPage) => {
        setLoad(true);
        const response = await axios.post(
            `http://localhost:8099/payment/search?page=${newPage}&startDay=${start.format('YYYY-MM-DD').toString()}`+
                `&endDay=${end.format('YYYY-MM-DD').toString()}&keyword=${keyword}&type=0`,
            null,
            {headers:{'Authorization': `${accessToken}`,}}
        ).catch((err) => {
            console.log(err)
            console.log({
                startDay : start.format('YYYY-MM-DD').toString(),
                endDay : end.format('YYYY-MM-DD').toString(),
                keyword : keyword,
                type : 0 // 패키지명
            })
        }).then((res) => {
            console.log(res);
            setResult(res.data);
        })
        setLoad(false);
    }


    useEffect(() => {
        // 로그인 체크
        !accessToken ? navigate("/login") : getPayment(1); // 로그인된 상태면 1페이지 전체검색
    }, [])

    // 페이지값이 변경되면 api재호출


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
                            {reviewType === false && (
                                <Typography id="modal-modal-description" fullWidth sx={{ fontSize:"1.5rem", fontWeight:"900" }}>
                                    여행리뷰
                                </Typography>
                            )}
                            {reviewType === true && (
                                <Typography id="modal-modal-description" fullWidth sx={{ fontSize:"1.5rem", fontWeight:"900" }}>
                                    가이드 리뷰
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Typography sx={{fontSize:"1rem", fontWeight:"700"}}>
                                여행이름
                            </Typography>
                        </Grid>
                        <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{mb:"1rem"}}>
                            <Typography sx={{fontSize:"0.7rem", fontWeight:"700", fontColor:"#8D8D8D"}}>
                                가이드명
                            </Typography>
                        </Grid>
                        <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{mb:"2rem"}}>
                            <StarIcon sx={{ color: star > 0 ? "#6CB0FF" : "#888888", fontSize: '2rem' }} onClick={() => setStar(1)}/>
                            <StarIcon sx={{ color: star > 1 ? "#6CB0FF" : "#888888", fontSize: '2rem' }} onClick={() => setStar(2)}/>
                            <StarIcon sx={{ color: star > 2 ? "#6CB0FF" : "#888888", fontSize: '2rem' }} onClick={() => setStar(3)}/>
                            <StarIcon sx={{ color: star > 3 ? "#6CB0FF" : "#888888", fontSize: '2rem' }} onClick={() => setStar(4)}/>
                            <StarIcon sx={{ color: star > 4 ? "#6CB0FF" : "#888888", fontSize: '2rem' }} onClick={() => setStar(5)}/>
                        </Grid>
                        <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <TextField
                                multiline
                                rows={7}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{mt:"2rem"}}>
                            <Button fullWidth sx={{backgroundColor:"#6CB0FF", border:0, borderRadius:"2vw", height:"200%"}}>
                                <Typography sx={{color:"#FFFFFF"}}>
                                    작성완료
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

            {/* modal 끝 **/}

            <Grid item container xs={12} md={5} display={"flex"} justifyContent="flex-start" alignItems={"center"} spacing={3}>
                <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems={"center"} sx={{display:"flex", alignItems:"center"}}>
                    <Typography sx={{fontSize: "2rem", fontWeight: "700"}}>
                        여행일정
                    </Typography>
                </Grid>
                <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems={"center"}>
                    <Typography sx={{fontSize: "1rem", fontWeight: "700", color:"#888888"}}>
                        {result ? `${result.count}개의 결과가 있어요.` : "여행 정보가 없어요"}
                    </Typography>
                </Grid>
            </Grid>

            <Grid item container xs={12} md={7} display={"flex"} justifyContent="flex-end" alignItems={"center"} spacing={3}>
                <Grid item xs={12} display={"flex"} justifyContent="flex-end" alignItems={"center"}>
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
                </Grid>

                <Grid item xs={12} display={"flex"} justifyContent="flex-end" alignItems={"center"}>
                    <TextField value={keyword} variant={"standard"} onChange={(e) => setKeyword(e.target.value)} />
                    <Button variant="outlined" sx={{border:1, borderColor:'#DDDDDD', borderRadius:'10px'}} display={"flex"} justifyContent={"center"} sx={{ml:"1rem"}}
                            onClick={() => {
                                getPaymentSearch(1);
                                setPage(1);
                            }}
                    >
                        <Typography sx={{color:"#000000"}}>검색</Typography>
                    </Button>
                    <Button variant="outlined" sx={{border:1, borderColor:'#DDDDDD', borderRadius:'10px'}} display={"flex"} justifyContent={"center"} sx={{ml:"1rem"}}
                            onClick={() => {
                                getPayment(1);
                                setPage(1);
                            }}
                    >
                        <Typography sx={{color:"#000000"}}>모든여행보기</Typography>
                    </Button>
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
                                  sx={{width:"100%", height:"100%", display: "flex", overflow:"hidden", p:0, m:0}}
                            >
                                <img src={testImg} style={{width:"100%", height: "100%", objectFit:"cover", objectPosition:"center center", margin:0}}/>
                            </Grid>
                            <Grid xs={5} item container
                                  display={"flex"}
                                  justifyContent={"flex-start"}
                                  alignItems={"center"}
                                  sx={{pl:"1rem"}}
                            >
                                <Grid xs={12} item
                                      display={"flex"}
                                      justifyContent={"flex-start"}
                                      alignItems={"center"}
                                >
                                    <span style={{fontFamily: 'NanumSquareNeo', fontWeight:"700", fontSize:"1rem", marginRight:"1rem"}}>
                                        {item.state === 0 && "결제대기"}
                                        {item.state === 1 && "결제완료"}
                                    </span>
                                    <span style={{fontFamily: 'NanumSquareNeo',color:"#888888", fontSize:"1rem"}}>
                                        출발일 : {item.departureDay}
                                    </span>
                                </Grid>
                                <Grid xs={12} item>
                                    <Typography noWrap sx={{fontSize:"1.3rem", fontWeight:"700"}}>{item.packageName}</Typography>
                                </Grid>
                                <Grid xs={12} item sx={{my:"1rem"}}>
                                    <Typography sx={{fontSize:"1rem", fontWeight:"700", color:"#888888"}}>김용식 가이드</Typography>
                                </Grid>
                                <Grid xs={12} item>
                                    <Typography sx={{fontWeight:"700"}}>{item.people}인</Typography>
                                </Grid>
                                <Grid xs={12} item sx={{mt:"1rem"}}>
                                    <Typography sx={{fontWeight:"700"}}>{item.price}원</Typography>
                                </Grid>
                                <Grid xs={12} item>
                                    <Typography sx={{fontSize:"0.7rem", fontWeight:"700", color:"#888888"}}>결제일시 : {dayjs(item.payDay).format('YYYY년 MM월 DD일 HH시 MM분').toString()}</Typography>
                                </Grid>
                            </Grid>
                            <Grid xs={3} item container
                                  display={"flex"}
                                  justifyContent={"flex-end"}
                                  alignItems={"center"}
                                  spacing={1}
                            >
                                <Grid item xs={12} sx={{ px:"3rem"}}>
                                    <Button variant={"outlined"} sx={{borderColor:"#DDDDDD"}} fullWidth>
                                        <Typography sx={{color:"#000000"}}>여행 상세보기</Typography>
                                    </Button>
                                </Grid>
                                {dayjs(item.departureDay) > dayjs().add(3,"day") && (
                                    <Grid item xs={12} sx={{ px:"3rem"}}>
                                        <Button variant={"outlined"} sx={{borderColor:"#DDDDDD"}} fullWidth>
                                            <Typography sx={{color:"#000000"}}>예약 취소</Typography>
                                        </Button>
                                    </Grid>
                                )}
                                <Grid item xs={12} sx={{ px:"3rem"}}>
                                    <Button variant={"outlined"} sx={{borderColor:"#DDDDDD"}} fullWidth
                                            onClick={() => {
                                                setReviewType(false);
                                                handleOpen();
                                            }}
                                    >
                                        <Typography sx={{color:"#000000"}}>여행 리뷰</Typography>
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sx={{ px:"3rem"}}>
                                    <Button variant={"outlined"} sx={{borderColor:"#DDDDDD"}} fullWidth
                                            onClick={() => {
                                                setReviewType(true);
                                                handleOpen();
                                            }}
                                    >
                                        <Typography sx={{color:"#000000"}}>가이드 리뷰</Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                })}

            </Grid>



            <Grid xs={12} item sx={{pt:'1vw',}}>
                {load === false && result && result.count > page * 10 && (
                    <Button variant="outlined" fullWidth sx={{borderColor:'#DDDDDD', borderRadius:'10px'}}
                            onClick={() => {
                                const newPage = page + 1;
                                type === 0 && getPayment(newPage); // 전체검색
                                type === 1 && getPaymentSearch(newPage); // 조건검색
                                setPage(newPage);
                            }}
                    >
                        <Typography sx={{color:"#000000"}}  >내 여행 더보기</Typography>
                    </Button>
                )}
                <Typography sx={{color:"#000000"}}  >마지막 검색결과예요.</Typography>
            </Grid>
        </Grid>
    );
}

export default Plan;