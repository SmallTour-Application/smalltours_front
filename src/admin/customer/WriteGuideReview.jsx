import React, {useEffect, useState} from 'react';
import {
    Button,
    Grid, Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {useSelector} from "react-redux";
import axios from "axios";

function WriteGuideReview({memberId}) {
    const defaultSize = 10; // 한 페이지에 보여줄 아이템의 수
    // accessToken
    const accessToken = useSelector((state) => state.accessToken); // 엑세스 토큰


    const [result, setResult] = React.useState(null);
    const [totalCnt, setTotalCnt] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [sort, setSort] = useState(0); // sort 0: 미결제, 1: 결제, 2: 취소


    // 작성한 가이드 리뷰 가져오기 api
    const getGuideReviewInfo = async(memberId, page) => {
        console.log("작성한 가이드 리뷰를 가져옵니다...")
        console.log(`http://localhost:8099/admin/member/review/guide?memberId=${memberId}&page=${page}`)
        const response = await axios.get(
            `http://localhost:8099/admin/member/review/guide?memberId=${memberId}&page=${page}`,
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
            getGuideReviewInfo(memberId, page);
        }
    },[accessToken])


    return (
        <Grid container item xs={12}>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mb:"1rem", mt:"3rem"}}>
                <Typography sx={{fontSize:"2rem", fontWeight:"700", display:"inline"}}>작성한 가이드리뷰</Typography>
                <Typography sx={{fontSize:"1.3rem", fontWeight:"700", display: 'inline', color:"gray", ml:"1rem"}}>{totalCnt}건</Typography>
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
                                        <TableCell>{item.content}</TableCell>
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

export default WriteGuideReview;