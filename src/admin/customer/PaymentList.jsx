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

function PaymentList({memberId}) {
    const defaultSize = 10; // 한 페이지에 보여줄 아이템의 수
    // accessToken
    const accessToken = useSelector((state) => state.accessToken); // 엑세스 토큰


    const [result, setResult] = React.useState(null);
    const [totalCnt, setTotalCnt] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [sort, setSort] = useState(0); // sort 0: 미결제, 1: 결제, 2: 취소


    /* 내 결제 목록 불러오기 **/
    const getPaymentInfo = async(memberId, state, page) => {
        console.log("결제 내역을 가져옵니다...")
        console.log(`http://localhost:8099/admin/member/payment/member?memberId=${memberId}&state=${state}&page=${page}`)
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/admin/member/payment/member?memberId=${memberId}&state=${state}`,
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then((res) => {
            if(res && res.data && res.data.paymentList){
                console.log(res);
                setResult(res.data.paymentList);
                setTotalCnt(res.data.totalCnt);
            }
        }).catch((err) => console.log(err))

    }

    useEffect(() => {
        if(accessToken){
            getPaymentInfo(memberId, 0,0);
        }
    }, [accessToken]);

    // 결제내역 sort 바뀔때 호출
    useEffect(() => {
        if(accessToken){
            setPage(0);
            getPaymentInfo(memberId, parseInt(sort), 0); // 결제내역
        }
    }, [sort]);

    return (
        <Grid container item xs={12}>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mb:"1rem", mt:"3rem"}}>
                <Typography sx={{fontSize:"2rem", fontWeight:"700", display:"inline"}}>결제내역</Typography>
                <Typography sx={{fontSize:"1.3rem", fontWeight:"700", display: 'inline', color:"gray", ml:"1rem"}}>{totalCnt}건</Typography>
            </Grid>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <RadioGroup row value={sort} onChange={(event) => {
                    setSort(event.target.value);
                }}>
                    <FormControlLabel value="0" control={<Radio />} label="미결제" />
                    <FormControlLabel value="1" control={<Radio />} label="결제" />
                    <FormControlLabel value="2" control={<Radio />} label="취소" />
                </RadioGroup>
            </Grid>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>번호</TableCell>
                                <TableCell>상품명</TableCell>
                                <TableCell>이메일</TableCell>
                                <TableCell>결제금액</TableCell>
                                <TableCell>결제인원</TableCell>
                                <TableCell>결제일</TableCell>
                                <TableCell>결과</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {result && result.map((item, idx) => {
                                return(
                                    <TableRow>
                                        {/*id**/}
                                        <TableCell>{idx}</TableCell>
                                        <TableCell>{item.toursTitle}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.price}</TableCell>
                                        <TableCell>{item.people}</TableCell>
                                        <TableCell>{item.paymentDay}</TableCell>
                                        <TableCell>
                                            {item.state === 0 && "미결제"}
                                            {item.state === 1 && "결제"}
                                            {item.state === 2 && "취소"}
                                            {item.state === 3 && "실패"}
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

export default PaymentList;