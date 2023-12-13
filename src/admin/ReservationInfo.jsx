import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";

function ReservationInfo(props) {
    const accessToken = useSelector((state) => state.accessToken); // 엑세스 토큰

    const location = useLocation();
    const navigate = useNavigate();

    const params = useParams(); // params.value에 tourId가 들어있음

    const paymentId = params.value;

    const [edit, setEdit] = useState(false);

    // 여행정보
    const [result, setResult] = useState(null);

    // 멤버 정보 가져오기 api
    const getReservationInfo = async(paramPaymentId) => {
        console.log("여행 정보를 가져옵니다...")
        console.log(`${process.env.REACT_APP_API_URL}/admin/member/payment/detail?paymentId=${paramPaymentId}`)
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/admin/member/payment/detail?paymentId=${paramPaymentId}`,null,
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then((res) => {
            if(res && res.data){
                console.log(res);
                setResult(res.data.paymentDetailDTO)
            }
        }).catch((err) => console.log(err))
        return response;
    }

    /**
     * 결제 취소 api... /payment/cancel
     * */
    const cancelPayment = async(paramPaymentId) => {
        console.log("결제를 취소합니다...")
        console.log(`${process.env.REACT_APP_API_URL}/payment/cancel?paymentId=${paramPaymentId}`)
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/payment/cancel?paymentId=${paramPaymentId}`,null,
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then((res) => {
            if(res && res.data){
                console.log(res);
                alert("결제가 취소되었습니다.");
                // 다시불러오기
                getReservationInfo(parseInt(paymentId));
            }
        }).catch((err) => console.log(err))
        return response;

    }

    useEffect(() => {
        if(accessToken){
            getReservationInfo(parseInt(paymentId));
        }
    }, [accessToken])
    return (
        <Grid container sx={{width:"100%", display:"flex", mt:"3rem", px:"3rem", mb:"3rem"}}>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mb:"3rem"}}>
                <Typography sx={{fontSize:"2rem", fontWeight:"700"}}>예약정보</Typography>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        {/* 썸네일 이미지 필드가 JSON 데이터에 없으므로 제거하거나 다른 이미지 필드로 대체합니다. */}
                        <TableRow>
                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>상품명</TableCell>
                            <TableCell align="left">{result && result.tourName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>예약회원</TableCell>
                            <TableCell align="left" onClick={() => navigate(`/admin/customer/info/${result.memberId}`)}>{result && result.memberName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>가이드</TableCell>
                            <TableCell align="left">{result && result.guideName}</TableCell>
                        </TableRow>
                        {/* 평점 필드가 JSON 데이터에 없으므로 제거합니다. */}
                        <TableRow>
                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>금액</TableCell>
                            <TableCell align="left">{result && result.price}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>인원</TableCell>
                            {/* 최소인원 데이터가 없으므로 people로 대체하거나 제거합니다. */}
                            <TableCell align="left">{result && result.people}</TableCell>
                        </TableRow>
                        {/* 최대인원 필드가 JSON 데이터에 없으므로 제거합니다. */}
                        <TableRow>
                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>출발일</TableCell>
                            <TableCell align="left">{result && result.departureDay}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>결제일</TableCell>
                            <TableCell align="left">{result && result.paymentDay}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>상태</TableCell>
                            <TableCell align="left">{result && result.state}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>결제취소</TableCell>
                            <TableCell align="left">
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
                                        // item.state가 "결제성공" 일때만 결제취소를 할 수 있음
                                        if(result && result.state === "결제성공"){
                                            cancelPayment(parseInt(paymentId));
                                        }
                                        else{
                                            alert("취소가 불가능합니다.")
                                        }
                                    }}
                                >
                                    <Typography>{result && result.state === "결제성공" ? "취소" : "취소불가"}</Typography>
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}

export default ReservationInfo;