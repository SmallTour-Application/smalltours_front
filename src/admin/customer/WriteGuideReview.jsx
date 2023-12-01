import React, {useEffect, useState} from 'react';
import {
    Button, FormControlLabel,
    Grid, Modal, Pagination,
    Paper, Radio, RadioGroup, Rating,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField,
    Typography
} from "@mui/material";
import {useSelector} from "react-redux";
import axios from "axios";
import {Box} from "@mui/system";

function WriteGuideReview({memberId}) {
    const defaultSize = 10; // 한 페이지에 보여줄 아이템의 수
    // accessToken
    const accessToken = useSelector((state) => state.accessToken); // 엑세스 토큰


    const [result, setResult] = React.useState(null);
    const [totalCnt, setTotalCnt] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [sort, setSort] = useState(0); // sort 0: 미결제, 1: 결제, 2: 취소


    // 작성한 가이드 리뷰 가져오기 api
    const getApi = async(memberId, page, sort) => {
        console.log("작성한 가이드 리뷰를 가져옵니다...")
        console.log(`http://localhost:8099/admin/member/review/guide?memberId=${memberId}&page=${page}$state=${sort}`)
        const response = await axios.get(
            `http://localhost:8099/admin/member/review/guide?memberId=${memberId}&page=${page}&state=${sort}`,
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then((res) => {
            if(res && res.data){
                console.log(res);
                setResult(res.data.reviewList);
                setTotalCnt(res.data.totalCnt);
            }
        }).catch((err) => console.log(err))
    }

    // 삭제  api
    const deleteApi = async(reviewId) => {
        console.log("가이드 리뷰를 삭제합니다...")
        console.log(`http://localhost:8099/admin/review/guide/delete?reviewId=${reviewId}`)
        const response = await axios.post(
            `http://localhost:8099/admin/review/guide/delete?reviewId=${reviewId}`,
            {},
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then((res) => {
            // 다시 데이터 불러오기
            console.log(res);
            getApi(memberId, page, parseInt(sort)); // 재로드
        }).catch((err) => console.log(err))

    }

    useEffect(() => {
        if(accessToken){
            getApi(memberId, page);
        }
    },[accessToken])

    // sort 바뀔때 호출
    useEffect(() => {
        if(accessToken){
            getApi(memberId, page, sort);
        }
    }, [sort])

    const [reviewId, setReviewId] = useState(0); // 리뷰 아이디

    /** 수정 api 호출 */
    const updateApi = async(reviewId, score, content) => {
        console.log("여행 리뷰를 수정합니다...")
        console.log(`http://localhost:8099/admin/review/guide/update?reviewId=${reviewId}&score=${score}&newContent=${content}`)
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/admin/review/guide/update?reviewId=${reviewId}&score=${score}&newContent=${content}`,
            {},
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then((res) => {
            console.log(res);
            getApi(memberId, page, parseInt(sort)); // 재로드
        }).catch((err) => alert("해당 리뷰는 삭제된 상태입니다."))

    }

    const [rating, setRating] = useState(0); // 별점 상태
    const [reviewTitle, setReviewTitle] = useState(''); // 리뷰 제목 상태
    const [reviewContent, setReviewContent] = useState(''); // 리뷰 내용 상태

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    const [modalOpen, setModalOpen] = useState(false);

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);


    return (
        <Grid container item xs={12}>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="review-modal-title"
                aria-describedby="review-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, justifyContent:"center" }}>
                    <Rating
                        name="review-rating"
                        value={rating}
                        onChange={handleRatingChange}
                        fullWidth
                    />
                    <TextField
                        id="review-modal-description"
                        label="리뷰 내용"
                        multiline
                        rows={4}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                    />
                    <Button
                        sx={{
                            backgroundColor: 'skyblue', // 버튼의 배경색을 하늘색으로 설정합니다.
                            ':hover': {
                                backgroundColor: 'deepskyblue', // 마우스 오버시 버튼의 배경색을 조금 더 진한 하늘색으로 설정합니다.
                            },
                            color: 'white', // 버튼의 텍스트 색상을 흰색으로 설정합니다.
                            padding: '3px 3px', // 버튼의 패딩을 설정합니다.
                            borderRadius: '5px', // 버튼의 모서리를 둥글게 만듭니다.
                            width:"100%",
                            mt:"1rem"
                        }}
                        onClick={() => {
                            console.log("수정하기버튼")
                            // 수정 api 호출
                            updateApi(reviewId, rating, reviewContent).then((res) => {
                                //state 초기화
                                setRating(0);
                                setReviewContent('');
                                // modal 닫기
                                handleClose();
                            })
                        }}
                    >
                        <Typography>수정하기</Typography>
                    </Button>
                </Box>
            </Modal>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mb:"1rem", mt:"3rem"}}>
                <Typography sx={{fontSize:"2rem", fontWeight:"700", display:"inline"}}>작성한 가이드리뷰</Typography>
                <Typography sx={{fontSize:"1.3rem", fontWeight:"700", display: 'inline', color:"gray", ml:"1rem"}}>{totalCnt}건</Typography>
            </Grid>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <RadioGroup row value={sort} onChange={(event) => {
                    setSort(event.target.value);
                }}>
                    <FormControlLabel value="0" control={<Radio />} label="삭제됨" />
                    <FormControlLabel value="1" control={<Radio />} label="기본" />
                </RadioGroup>
            </Grid>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>번호</TableCell>
                                <TableCell>상품명</TableCell>
                                <TableCell>가이드명</TableCell>
                                <TableCell>점수</TableCell>
                                <TableCell>내용</TableCell>
                                <TableCell>결제ID</TableCell>
                                <TableCell>작성일시</TableCell>
                                <TableCell>수정</TableCell>
                                <TableCell>삭제</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {result && result.map((item, idx) => {
                                return(
                                    <TableRow>
                                        {/*id**/}
                                        <TableCell>{idx}</TableCell>
                                        <TableCell>{item.packageName}</TableCell>
                                        <TableCell>{item.guideName}</TableCell>
                                        <TableCell>{item.score}</TableCell>
                                        <TableCell>{item.content.length > 10 ? `${item.content.substring(0, 10)}...` : item.content}</TableCell>
                                        <TableCell>{item.paymentId}</TableCell>
                                        <TableCell>{item.reviewDate}</TableCell>
                                        <TableCell>
                                            <Button
                                                sx={{
                                                    ml:"1rem",
                                                    backgroundColor: 'skyblue', // 버튼의 배경색을 하늘색으로 설정합니다.
                                                    ':hover': {
                                                        backgroundColor: 'deepskyblue', // 마우스 오버시 버튼의 배경색을 조금 더 진한 하늘색으로 설정합니다.
                                                    },
                                                    color: 'white', // 버튼의 텍스트 색상을 흰색으로 설정합니다.
                                                    padding: '3px 3px', // 버튼의 패딩을 설정합니다.
                                                    borderRadius: '5px', // 버튼의 모서리를 둥글게 만듭니다.
                                                }}
                                                onClick={() => {
                                                    setReviewId(item.reviewId);
                                                    setRating(item.score);
                                                    setReviewContent(item.content);
                                                    handleOpen();
                                                }}
                                            >
                                                <Typography>수정</Typography>
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                sx={{
                                                    ml:"1rem",
                                                    backgroundColor: 'skyblue', // 버튼의 배경색을 하늘색으로 설정합니다.
                                                    ':hover': {
                                                        backgroundColor: 'deepskyblue', // 마우스 오버시 버튼의 배경색을 조금 더 진한 하늘색으로 설정합니다.
                                                    },
                                                    color: 'white', // 버튼의 텍스트 색상을 흰색으로 설정합니다.
                                                    padding: '3px 3px', // 버튼의 패딩을 설정합니다.
                                                    borderRadius: '5px', // 버튼의 모서리를 둥글게 만듭니다.
                                                }}
                                                onClick={() => {
                                                    deleteApi(item.reviewId);
                                                }}
                                            >
                                                <Typography>삭제</Typography>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            {totalCnt >= defaultSize && (
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: "1rem" }}>
                    <Pagination count={Math.ceil(totalCnt / defaultSize)} page={page + 1} onChange={(event, newPage) => {
                        setPage(newPage - 1);
                    }} />
                </Grid>
            )}
        </Grid>
    );
}

export default WriteGuideReview;