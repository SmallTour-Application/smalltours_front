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
import axios from "axios";
import {useSelector} from "react-redux";

function WriteTourList({memberId}) {
    const defaultSize = 10; // 한 페이지에 보여줄 아이템의 수
    // accessToken
    const accessToken = useSelector((state) => state.accessToken); // 엑세스 토큰


    const [myTourListResult, setMyTourListResult] = React.useState(null);
    const [myTourListTotalCnt, setMyTourListTotalCnt] = React.useState(0);
    const [page, setPage] = React.useState(0);


    // 생성한 패키지 목록 가져오기
    const getMyTourList = async(memberId, page) => {
        console.log("생성한 패키지 목록을 가져옵니다...")
        console.log(`http://localhost:8099/admin/member/tours/member?memberId=${memberId}&page=${page}`)
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/admin/member/tours/member?memberId=${memberId}&page=${page}`,
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then((res) => {
            if(res && res.data){
                console.log(res);
                setMyTourListResult(res.data.toursList);
                setMyTourListTotalCnt(res.data.totalCnt);
            }
        }).catch((err) => console.log(err))

    }

    useEffect(() => {
        if(accessToken){
            getMyTourList(memberId, page);
        }
    }, [accessToken]);

    return (
        <Grid container item xs={12}>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mb:"1rem", mt:"3rem"}}>
                <Typography sx={{fontSize:"2rem", fontWeight:"700", display:"inline"}}>패키지</Typography>
                <Typography sx={{fontSize:"1.3rem", fontWeight:"700", display: 'inline', color:"gray", ml:"1rem"}}>{myTourListTotalCnt}건</Typography>
            </Grid>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>번호</TableCell>
                                <TableCell>상품명</TableCell>
                                <TableCell>생성일시</TableCell>
                                <TableCell>수정일시</TableCell>
                                <TableCell>상태</TableCell>
                                <TableCell>판매량</TableCell>
                                <TableCell>수정</TableCell>
                                <TableCell>삭제</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {myTourListResult && myTourListResult.map((myTourListItem, myTourListIdx) => {
                                return(
                                    <TableRow>
                                        {/*id**/}
                                        <TableCell>{myTourListIdx}</TableCell>
                                        <TableCell>{myTourListItem.toursTitle}</TableCell>
                                        <TableCell>{myTourListItem.createDate}</TableCell>
                                        <TableCell>{myTourListItem.updateDate}</TableCell>
                                        <TableCell>
                                            {myTourListItem.state === 0 && "미승인"}
                                            {myTourListItem.state === 1 && "승인"}
                                            {myTourListItem.state === 2 && "일시정지"}
                                            {myTourListItem.state === 3 && "삭제"}
                                        </TableCell>
                                        <TableCell>{myTourListItem.sales}</TableCell>
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
            {myTourListTotalCnt >= defaultSize && (
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: "1rem" }}>
                    <Pagination count={Math.ceil(page / defaultSize)} page={page + 1} onChange={(event, newPage) => {
                        page(newPage - 1);
                    }} />
                </Grid>
            )}
        </Grid>
    );
}

export default WriteTourList;