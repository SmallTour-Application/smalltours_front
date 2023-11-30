import React, {useEffect, useState} from 'react';
import {
    Button, FormControlLabel,
    Grid, Pagination,
    Paper, Radio, RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import axios from "axios";
import {useSelector} from "react-redux";

function ReceivedTourReview({memberId}) {
    const defaultSize = 10; // 한 페이지에 보여줄 아이템의 수
    // accessToken
    const accessToken = useSelector((state) => state.accessToken); // 엑세스 토큰


    const [result, setResult] = React.useState(null);
    const [totalCnt, setTotalCnt] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [sort, setSort] = useState(0); // sort 0: 미결제, 1: 결제, 2: 취소


    /* api 호출 **/
    const getApi = async(memberId, state, page) => {
        console.log("받은 여행 리뷰를 가져옵니다...")
        console.log(`http://localhost:8099/admin/member/review/tours/receiver?memberId=${memberId}&state=${state}&page=${page}`)
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/admin/member/review/tours/receiver?memberId=${memberId}&state=${state}&page=${page}`,
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

    useEffect(() => {
        if(accessToken){
            getApi(memberId, 0,0);
        }
    }, [accessToken]);

    // 결제내역 sort 바뀔때 호출
    useEffect(() => {
        if(accessToken){
            setPage(0);
            getApi(memberId, parseInt(sort), 0); // 결제내역
        }
    }, [sort]);

    return (
        <Grid container item xs={12}>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mb:"1rem", mt:"3rem"}}>
                <Typography sx={{fontSize:"2rem", fontWeight:"700", display:"inline"}}>받은 여행 리뷰</Typography>
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
                                <TableCell>패키지명</TableCell>
                                <TableCell>내용</TableCell>
                                <TableCell>작성일시</TableCell>
                                <TableCell>상태</TableCell>
                                <TableCell>작성자</TableCell>
                                <TableCell>결제ID</TableCell>
                                <TableCell>삭제</TableCell>
                                <TableCell>수정</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {result && result.map((item, idx) => {
                                return(
                                    <TableRow>
                                        {/*id**/}
                                        <TableCell>{idx}</TableCell>
                                        <TableCell>{item.packageName}</TableCell>
                                        <TableCell>{item.reviewContent}</TableCell>
                                        <TableCell>{item.reviewDate}</TableCell>
                                        <TableCell>
                                            {item.state === 0 && "삭제"}
                                            {item.state === 1 && "기본"}
                                        </TableCell>
                                        <TableCell>{item.reviewerName}</TableCell>
                                        <TableCell>{item.paymentId}</TableCell>
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

export default ReceivedTourReview;