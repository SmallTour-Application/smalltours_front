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
import axios from "axios";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Box} from "@mui/system";

function TourPaymentList({tourId}) {
    const defaultSize = 10; // 한 페이지에 보여줄 아이템의 수
    // accessToken
    const accessToken = useSelector((state) => state.accessToken); // 엑세스 토큰

    const navigate = useNavigate();


    const [result, setResult] = React.useState(null);
    const [totalCnt, setTotalCnt] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [sort, setSort] = useState(0); // sort 0: 미결제, 1: 결제, 2: 취소


    /* api 호출 **/
    const getApi = async(tourId, state, page) => {
        console.log("받은 결제 정보를 가져옵니다...")
        console.log(`http://localhost:8099/admin/member/payment/tours/list?tourId=${tourId}&state=${state}&page=${page}`)
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/admin/member/payment/tours/list?tourId=${tourId}&state=${state}&page=${page}`,
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then((res) => {
            if(res && res.data){
                console.log(res);
                setResult(res.data.paymentList);
                setTotalCnt(res.data.totalCnt);
            }
        }).catch((err) => console.log(err))

    }

    useEffect(() => {
        if(accessToken){
            getApi(tourId, 0,1);
        }
    }, [accessToken]);

    // 결제내역 sort 바뀔때 호출
    useEffect(() => {
        if(accessToken){
            setPage(1);
            getApi(tourId, parseInt(sort), 1); // 결제내역
        }
    }, [sort]);

    return (
        <Grid container item xs={12}>

            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mb:"1rem", mt:"3rem"}}>
                <Typography sx={{fontSize:"2rem", fontWeight:"700", display:"inline"}}>결제목록</Typography>
                <Typography sx={{fontSize:"1.3rem", fontWeight:"700", display: 'inline', color:"gray", ml:"1rem"}}>{totalCnt}건</Typography>
            </Grid>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <RadioGroup row value={sort} onChange={(event) => {
                    setSort(event.target.value);
                }}>
                    <FormControlLabel value="1" control={<Radio />} label="결제" />
                    <FormControlLabel value="0" control={<Radio />} label="미결제" />
                    <FormControlLabel value="2" control={<Radio />} label="취소" />
                </RadioGroup>
            </Grid>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>번호</TableCell>
                                <TableCell>아이디</TableCell>
                                <TableCell>패키지명</TableCell>
                                <TableCell>결제자</TableCell>
                                <TableCell>가격</TableCell>
                                <TableCell>출발일</TableCell>
                                <TableCell>결제일시</TableCell>
                                <TableCell>인원수</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {result && result.map((item, idx) => {
                                return(
                                    <TableRow key={idx}>
                                        {/*id**/}
                                        <TableCell>{idx}</TableCell>
                                        <TableCell>{item.paymentId}</TableCell>
                                        <TableCell>{item.title.length > 10 ? `${item.title.substring(0, 10)}...` : item.title}</TableCell>
                                        <TableCell>{item.memberName}</TableCell>
                                        <TableCell>{item.price}</TableCell>
                                        <TableCell>{item.departureDay}</TableCell>
                                        <TableCell>{item.paymentDay}</TableCell>
                                        <TableCell>{item.people}</TableCell>
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

export default TourPaymentList;