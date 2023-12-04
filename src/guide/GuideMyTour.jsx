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

function GuideMyTour(props) {
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

    const [paymentId, setPaymentId] = useState(0); // 결제 id

    const [guideName, setGuideName] = useState("");

    const [last, setLast] = useState(false); // 마지막검색결과 여부

    const memberId = useSelector((state) => state.memberId);


    // 내 여행 목록 불러오는 api
    const getMyTour = async (newPage) => {
        setLoad(true);
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/myPackage/list?page=${newPage}&sort=0`,
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

    // 여행삭제하기
    const delTour = async (id) => {
        setLoad(true);
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/package/delete`,
            {
                id:id
            },
            {headers:{'Authorization': `${accessToken}`,}}
        ).catch((err) => {
            console.log(err)
        }).then((res) => {
                getMyTour(1);
            }
        )
        setLoad(false);
    }


    useEffect(() => {
        // 로그인 체크
        accessToken && getMyTour(1); // 로그인된 상태면 1페이지 전체검색
    }, [,accessToken])


    return (
        <Grid container item xs={12}>

            <Grid item container xs={12} display={"flex"} justifyContent="flex-start" alignItems={"center"} spacing={3}>
                <Grid item xs={11} display={"flex"} justifyContent="flex-start" alignItems={"center"} sx={{display:"flex", alignItems:"center"}}>
                    <Typography sx={{fontSize: "2rem", fontWeight: "700"}}>
                        여행일정
                    </Typography>
                </Grid>
                <Grid xs={1} item display={"flex"} justifyContent="center" alignItems={"center"}>
                    <Button variant={"outlined"} sx={{borderColor:"#000000"}} onClick={() => navigate("/guide/createTour1")} >+</Button>
                </Grid>
                <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems={"center"}>
                    <Typography sx={{fontSize: "1rem", fontWeight: "700", color:"#888888"}}>
                        {result ? `${result.count}개의 결과가 있어요.` : "여행 정보가 없어요"}
                    </Typography>
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
                                  onClick={() => navigate(`/tour/${item.packageId}`)}
                                  sx={{width:"100%", aspectRatio:"16/9", display: "flex", overflow:"hidden", p:0, m:0}}
                            >
                                <img src={item.thumb === "" ? testImg : item.thumb} style={{width:"100%", height: "100%", objectFit:"cover", objectPosition:"center center", margin:0}}/>
                            </Grid>
                            <Grid xs={5} item container
                                  display={"flex"}
                                  justifyContent={"flex-start"}
                                  alignItems={"center"}
                                  sx={{pl:"1rem"}}
                                  spacing={2}
                            >
                                <Grid xs={12} item
                                      display={"flex"}
                                      justifyContent={"flex-start"}
                                      alignItems={"center"}
                                >
                                    <span style={{fontFamily: 'NanumSquareNeo', fontWeight:"700", fontSize:"1rem", marginRight:"1rem"}}>
                                        {item.approvals === true && "승인완료"}
                                        {item.approvals === false && "승인대기"}
                                    </span>
                                </Grid>
                                <Grid xs={12} item onClick={() => navigate(`/tour/${item.id}`)} >
                                    <Typography noWrap sx={{fontSize:"1.3rem", fontWeight:"700"}}>{item.packageName}</Typography>
                                </Grid>
                                <Grid xs={12} item>
                                    <Typography sx={{fontSize:"0.7rem", fontWeight:"700", color:"#888888"}}>생성일시 : {dayjs(item.createdDay).format('YYYY년 MM월 DD일 HH시 MM분').toString()}</Typography>
                                </Grid>
                            </Grid>
                            <Grid xs={3} item container
                                  display={"flex"}
                                  justifyContent={"flex-end"}
                                  alignItems={"center"}
                                  spacing={1}
                            >
                                <Grid item xs={12} sx={{ px:"3rem"}}>
                                    <Button variant={"outlined"} sx={{borderColor:"#DDDDDD"}} fullWidth onClick={() => delTour(item.packageId)} >
                                        <Typography sx={{color:"#000000"}} >여행 삭제</Typography>
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sx={{ px:"3rem"}}>
                                    <Button variant={"outlined"} sx={{borderColor:"#DDDDDD"}} fullWidth onClick={() => navigate(`/guide/editTour1/${item.packageId}`)} >
                                        <Typography sx={{color:"#000000"}}>여행 수정</Typography>
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

export default GuideMyTour;