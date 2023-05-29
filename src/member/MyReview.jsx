import React, {useEffect, useState} from 'react';
import testImg from "../images/test.png";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box, Button, Checkbox, Collapse,
    createTheme, Divider, FormControlLabel,
    Grid, Modal, Radio, RadioGroup,
    TextField,
    ThemeProvider
} from "@mui/material";
import TopBar from "../component/TopNav";
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import FaceIcon from "@mui/icons-material/Face6";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import {useSelector} from "react-redux";
import dayjs from "dayjs";

// 더미 json
const reviews = [
    {
        memberId : 100,
        tourId : 1,
        rating : 5,
        content : "내용입니다 내용내용",
        createdDay : "2020-03-28",
        packageName : "패키지1",
        guideName : "킹용식"
    },
    {
        memberId : 200,
        tourId : 1,
        rating : 5,
        content : "내용입니다 내용내용",
        createdDay : "2020-03-28",
        packageName : "패키지2",
        guideName : "킹용식"

    },
    {
        memberId : 300,
        tourId : 1,
        rating : 5,
        content : "내용입니다 내용내용",
        createdDay : "2020-03-28",
        packageName : "패키지3",
        guideName : "킹용식"

    },
]

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

function MyReview(props) {

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    const accessToken = useSelector((state) => state.accessToken)

    const [result, setResult] = useState(null);
    const [load, setLoad] = useState(false);

    const [content, setContent] = useState(""); // 리뷰 수정용 내용
    const [rating, setRating] = useState(5); // 리뷰 수정용 별점
    const [reviewId, setReviewId] = useState(0); // 리뷰 수정용 id
    const [tourName, setTourName] = useState("") // 리뷰수정용 여행 이름

    const [page, setPage] = useState(1); // page



    // modal용 state
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [reviewType, setReviewType] = useState(false); // f:일반리뷰 t:가이드리뷰

    const [star, setStar] = useState(5); // 별갯수


    // 리뷰 삭제하기
    const deleteReview = async (id) => {
        setLoad(true);
        const response = await axios.post(
            `http://localhost:8099/review/package/delete?reviewId=${id}`,
            null,
            {headers:{'Authorization': `${accessToken}`,}}
        ).catch((err) => {
            console.log(err)
        })
        handleClose(); // modal 닫기
        for(let i = 1; i <= page ; i++){
            // 1페이지부터 마지막으로 보고있던 페이지까지 다시 로드
            await getReviewList(i);
        }
        setLoad(false);
    }

    // 내 리뷰 목록 가져오기
    const getReviewList = async (newPage) => {
        setLoad(true);
        const response = await axios.post(
            `http://localhost:8099/review/package/review?page=${newPage}`,
            null,
            {headers:{'Authorization': `${accessToken}`,}}
        ).catch((err) => {
            console.log(err)
        }).then((res) => {
            console.log(res);
            // 페이징
            if(!result || newPage === 1){
                setResult(res.data)
            }else if(result){
                setResult({count:result.count, review: result.review.push(res.data.review)})
            }

        })
        setLoad(false);
    }

    // 리뷰 수정하기
    const updateReview = async () => {
        setLoad(true);
        const response = await axios.post(
            `http://localhost:8099/review/package/update?content=${content}&rating=${rating}&reviewId=${reviewId}`,
            null,
            {headers:{'Authorization': `${accessToken}`,}}
        ).catch((err) => {
            console.log(err)
        })
        handleClose(); // modal 닫기
        for(let i = 1; i <= page ; i++){
            // 1페이지부터 마지막으로 보고있던 페이지까지 다시 로드
            await getReviewList(i);
        }
        setLoad(false);
    }

    useState(() => {
        getReviewList(1);
        setPage(1);
    },[])

    return (
        <Grid container item xs={12} >


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
                                    리뷰수정
                                </Typography>
                        </Grid>
                        <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Typography sx={{fontSize:"1rem", fontWeight:"700"}}>
                                {tourName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{mb:"2rem"}}>
                            <StarIcon sx={{ color: rating > 0 ? "#6CB0FF" : "#888888", fontSize: '2rem' }} onClick={() => setRating(1)}/>
                            <StarIcon sx={{ color: rating > 1 ? "#6CB0FF" : "#888888", fontSize: '2rem' }} onClick={() => setRating(2)}/>
                            <StarIcon sx={{ color: rating > 2 ? "#6CB0FF" : "#888888", fontSize: '2rem' }} onClick={() => setRating(3)}/>
                            <StarIcon sx={{ color: rating > 3 ? "#6CB0FF" : "#888888", fontSize: '2rem' }} onClick={() => setRating(4)}/>
                            <StarIcon sx={{ color: rating > 4 ? "#6CB0FF" : "#888888", fontSize: '2rem' }} onClick={() => setRating(5)}/>
                        </Grid>
                        <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <TextField
                                multiline
                                rows={7}
                                fullWidth
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{mt:"2rem"}}>
                            <Button fullWidth sx={{backgroundColor:"#6CB0FF", border:0, borderRadius:"2vw", height:"200%"}}
                                    onClick={() => updateReview()}
                            >
                                <Typography sx={{color:"#FFFFFF"}}>
                                    작성완료
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

            {/* modal 끝 **/}



            <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems={"center"} sx={{display:"flex", alignItems:"center", mb:"2rem"}}>
                <Typography sx={{fontSize: "2rem", fontWeight: "700"}}>
                    내가 작성한 리뷰
                </Typography>
            </Grid>
            <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems={"center"} sx={{mb:"2rem"}}>
                <Typography sx={{fontSize: "1rem", fontWeight: "700", color:"#888888"}}>
                    {result ? `${result.count}개의 결과가 있어요.` : "리뷰 정보가 없어요"}
                </Typography>
            </Grid>
            <Grid container item
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  xs={12}>
                {/* items **/}
                {result && result.review.map((item, idx) => {
                    return(
                        <Grid
                            container
                            key={idx}
                            item xs={12}
                            display="flex"
                            justifyContent="flex-start"
                            alignItems="center"
                            sx={{border:2,borderColor: "#DDDDDD", borderRadius: "1vw", p: "1rem", overflow: 'auto', mb:"2rem"}}
                        >
                            <Grid container item xs={9} sx={{pl:"2rem"}}>
                                <Grid
                                    item
                                    container
                                    display="flex"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    xs={12}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        display="flex"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        sx={{pl:0}}
                                    >
                                        <Typography sx={{fontSize:"1.3rem", fontWeight:"700", mr:"1rem"}}>
                                            {item.packageName}
                                        </Typography>
                                        {item.rating > 0 && <StarIcon sx={{ color: '#6CB0FF', fontSize: '1.5rem' }}/>}
                                        {item.rating > 1 && <StarIcon sx={{ color: '#6CB0FF', fontSize: '1.5rem' }}/>}
                                        {item.rating > 2 && <StarIcon sx={{ color: '#6CB0FF', fontSize: '1.5rem' }}/>}
                                        {item.rating > 3 && <StarIcon sx={{ color: '#6CB0FF', fontSize: '1.5rem' }}/>}
                                        {item.rating > 4 && <StarIcon sx={{ color: '#6CB0FF', fontSize: '1.5rem' }}/>}
                                    </Grid>
                                </Grid>
                                <Grid item
                                      display="flex"
                                      justifyContent="flex-start"
                                      alignItems="center"
                                      xs={12} sx={{py:"1rem"}}>
                                    <Typography>
                                        {item.content}
                                    </Typography>
                                </Grid>
                                <Grid item
                                      display="flex"
                                      justifyContent="flex-start"
                                      alignItems="center"
                                      xs={12} sx={{mt:'1rem'}}>
                                    <Typography sx={{color:"#8D8D8D"}}>
                                        {dayjs(item.createDay).format("YYYY년 MM월 DD일 HH시 MM분").toString()}
                                    </Typography>
                                </Grid>
                            </Grid>
                            {/* 버튼배치 **/}
                            <Grid container item xs={3} sx={{px:"3rem"}} spacing={2}>
                                <Grid xs={12} item>
                                    <Button fullWidth variant={"outlined"} sx={{borderColor:"#DDDDDD"}} fullWidth
                                            onClick={() => deleteReview(item.reviewId)}
                                    >
                                        <Typography sx={{color:"#000000"}}>리뷰삭제</Typography>
                                    </Button>
                                </Grid>
                                <Grid xs={12} item>
                                    <Button fullWidth variant={"outlined"} sx={{borderColor:"#DDDDDD"}} fullWidth
                                            onClick={() => {
                                                setContent(item.content)
                                                setRating(item.rating)
                                                setTourName(item.packageName)
                                                setReviewId(item.reviewId);
                                                handleOpen();
                                            }}
                                    >
                                        <Typography sx={{color:"#000000"}}>리뷰수정</Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    );
                })}
            </Grid>
            <Grid xs={12} item sx={{mt:'1vw', mb:'7vw'}}>
                {load === false && result && result.count > page * 10 && (
                    <Button variant="outlined" fullWidth sx={{borderColor:'#DDDDDD', borderRadius:'10px'}}
                            onClick={() => {
                                const newPage = page + 1;
                                getReviewList(newPage); // 다음페이지 가져오기
                                setPage(newPage);
                            }}
                    >
                        <Typography sx={{color:"#000000"}}  >내 리뷰 더보기</Typography>
                    </Button>
                )}
                <Typography sx={{color:"#000000"}}  >마지막 검색결과예요.</Typography>
            </Grid>
        </Grid>
    );
}

export default MyReview;