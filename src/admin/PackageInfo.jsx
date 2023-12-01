import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import TourReviewList from "./package/TourReviewList";
import dayjs from "dayjs";

function PackageInfo(props) {
    const accessToken = useSelector((state) => state.accessToken); // 엑세스 토큰

    const location = useLocation();
    const navigate = useNavigate();

    const params = useParams(); // params.value에 tourId가 들어있음

    const tourId = params.value;

    const [edit, setEdit] = useState(false);

    // 여행정보
    const [result, setResult] = useState(null);

    // 멤버 정보 가져오기 api
    const getTourInfo = async(paramTourId) => {
        console.log("여행 정보를 가져옵니다...")
        console.log(`${process.env.REACT_APP_API_URL}/admin/package/detail/img?tourId=${paramTourId}`)
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/admin/package/detail/img?page=1&tourId=${paramTourId}`,
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then((res) => {
            if(res && res.data){
                console.log(res);
                setResult(res.data)
            }
        }).catch((err) => console.log(err))
        return response;
    }

    useEffect(() => {
        if(accessToken){
            getTourInfo(tourId);
        }
    }, [accessToken])


    return (
        <Grid container sx={{width:"100%", display:"flex", mt:"3rem", px:"3rem", mb:"3rem"}}>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mb:"3rem"}}>
                <Typography sx={{fontSize:"2rem", fontWeight:"700"}}>여행정보</Typography>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell align="right">상품명</TableCell>
                            <TableCell align="left">{result.tourName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">가이드</TableCell>
                            <TableCell align="left">{result.tourSeller}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">평점</TableCell>
                            <TableCell align="left">{result.rating}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">금액</TableCell>
                            <TableCell align="left">{result.price}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">최소인원</TableCell>
                            <TableCell align="left">{result.people}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">최대인원</TableCell>
                            <TableCell align="left">{result.people}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">등록일시</TableCell>
                            <TableCell align="left">{dayjs().format("yyyy-mm-dd")}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">상태</TableCell>
                            <TableCell align="left">{result.status}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <TourReviewList tourId={tourId}/>
        </Grid>
    );
}

export default PackageInfo;