import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {
    Button,
    FormControlLabel,
    Grid, Pagination,
    Paper,
    Radio,
    RadioGroup, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    TextField,
    Typography
} from "@mui/material";

function ReservationSearch(props) {
    const defaultSize = 10; // 한 페이지에 보여줄 아이템의 수
    // accessToken

    const [result, setResult] = React.useState(null);
    const [totalCnt, setTotalCnt] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [sort, setSort] = useState(0); // sort 0: 미결제, 1: 결제, 2: 취소

    const accessToken = useSelector((state) => state.accessToken); // 엑세스 토큰

    const location = useLocation();
    const navigate = useNavigate();

    // 현재의 URL 파라미터를 가져옵니다.
    const params = new URLSearchParams(location.search);

    const getReservationList = async(page, name, tourName,startDate, endDate) => { // date들은 getElementsById로 가져옵니다. page는 1부터
        console.log("예약 정보를 가져옵니다...")
        let url = `${process.env.REACT_APP_API_URL}/admin/payment/list?page=${page}&size=${defaultSize}`;
        if(name !== "" && name !== null){
            url += `&name=${name}`;
        }
        if(tourName !== "" && tourName !== null){
            url += `&tourName=${tourName}`;
        }
        if(startDate !== "" && startDate !== null){
            url += `&startDate=${startDate}`;
        }
        if(endDate !== "" && endDate !== null){
            url += `&endDate=${endDate}`;
        }
        const response = await axios.get(
            url,
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then((res) => {
            if(res && res.data){
                console.log(res);
                setResult(res.data.guideDurationDTOS);
                setTotalCnt(res.data.totalCnt);
            }
        }).catch((err) => console.log(err))
    }
    return (
        <Grid container sx={{width:"100%", display:"flex", mt:"3rem", px:"3rem"}}>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                <Typography sx={{fontSize:"2rem", fontWeight:"700"}}>예약검색</Typography>
            </Grid>

            {/* 제목 **/}
            <Grid item xs={6} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <Typography sx={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                    결제자 이름
                    <TextField id={"memberName"} variant={"outlined"} size={"small"}
                               sx={{
                                   ml:"1rem",
                                   height: '30px', // 높이 지정
                                   '& .MuiOutlinedInput-root': {
                                       height: '100%', // 높이를 100%로 지정하여 TextField의 높이와 동일하게 만듭니다.
                                   }
                               }}
                    />
                </Typography>
            </Grid>
            {/* 여행제목 **/}
            <Grid item xs={6} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <Typography sx={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                    여행이름
                    <TextField id={"tourName"} variant={"outlined"} size={"small"}
                               sx={{
                                   ml:"1rem",
                                   height: '30px', // 높이 지정
                                   '& .MuiOutlinedInput-root': {
                                       height: '100%', // 높이를 100%로 지정하여 TextField의 높이와 동일하게 만듭니다.
                                   }
                               }}
                    />
                </Typography>
            </Grid>
            <Grid item xs={6} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <Typography sx={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                    시작일
                    <TextField id={"startDateTextField"} variant={"outlined"}
                               type="date" // <-- 여기서 type을 "date"로 설정
                               InputLabelProps={{
                                   shrink: true, // 이 속성은 날짜 선택기의 레이블이 항상 위로 올라가게 합니다.
                               }}
                               sx={{
                                   ml:"1rem",
                                   height: '30px', // 높이 지정
                                   '& .MuiOutlinedInput-root': {
                                       height: '100%', // 높이를 100%로 지정하여 TextField의 높이와 동일하게 만듭니다.
                                   }
                               }}
                    />
                </Typography>
            </Grid>
            <Grid item xs={6} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <Typography sx={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                    종료일
                    <TextField id={"endDateTextField"} variant={"outlined"}
                               type="date" // <-- 여기서 type을 "date"로 설정
                               InputLabelProps={{
                                   shrink: true, // 이 속성은 날짜 선택기의 레이블이 항상 위로 올라가게 합니다.
                               }}
                               sx={{
                                   ml:"1rem",
                                   height: '30px', // 높이 지정
                                   '& .MuiOutlinedInput-root': {
                                       height: '100%', // 높이를 100%로 지정하여 TextField의 높이와 동일하게 만듭니다.
                                   }
                               }}
                    />
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <Button
                    sx={{
                        backgroundColor: 'skyblue', // 버튼의 배경색을 하늘색으로 설정합니다.
                        ':hover': {
                            backgroundColor: 'deepskyblue', // 마우스 오버시 버튼의 배경색을 조금 더 진한 하늘색으로 설정합니다.
                        },
                        color: 'white', // 버튼의 텍스트 색상을 흰색으로 설정합니다.
                        padding: '5px 20px', // 버튼의 패딩을 설정합니다.
                        borderRadius: '5px', // 버튼의 모서리를 둥글게 만듭니다.
                    }}
                    onClick={() => {
                        // 시작일이 종료일보다 늦을 경우 경고창을 띄웁니다.
                        if(document.getElementById("startDateTextField").value > document.getElementById("endDateTextField").value){
                            alert("시작일이 종료일보다 늦을 수 없습니다.");
                            return;
                        }
                        // 날짜가 하나만 입력되지 않은 경우 경고창을 띄움
                        if((document.getElementById("startDateTextField").value !== "" && document.getElementById("endDateTextField").value === "") || (document.getElementById("startDateTextField").value === "" && document.getElementById("endDateTextField").value !== "") ){
                            alert("날짜를 입력해주세요.");
                            return;
                        }
                        // 날짜가 둘다 입력되지 않은 경우 날짜 파라미터에 null을 넣어서 검색합니다.
                        if(document.getElementById("startDateTextField").value === "" && document.getElementById("endDateTextField").value === ""){
                            getReservationList(1, document.getElementById("memberName").value, document.getElementById("tourName").value, null, null);
                            // page를 1로 초기화합니다.
                            params.set("page", 1);
                            return;
                        }else {
                            // 날짜가 둘다 입력된 경우 날짜 파라미터에 날짜를 넣어서 검색합니다.
                            getReservationList(1, document.getElementById("memberName").value, document.getElementById("tourName").value, document.getElementById("startDateTextField").value, document.getElementById("endDateTextField").value);
                            // page를 1로 초기화합니다.
                            params.set("page", 1);
                            return;
                        }
                        // page를 1로 초기화합니다.
                        params.set("page", 1);
                    }}
                >
                    <Typography>검색</Typography>
                </Button>
            </Grid>


            {/* 이 아래는 검색 후에만 보이게 합니다. **/}

            <Grid container item xs={12}>
                <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mb:"1rem", mt:"3rem"}}>
                    <Typography sx={{fontSize:"2rem", fontWeight:"700", display:"inline"}}>검색결과</Typography>
                    <Typography sx={{fontSize:"1.3rem", fontWeight:"700", display: 'inline', color:"gray", ml:"1rem"}}>{totalCnt}건</Typography>
                </Grid>
                <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>번호</TableCell>
                                    <TableCell>패키지명</TableCell>
                                    <TableCell>예약회원</TableCell>
                                    <TableCell>회원이메일</TableCell>
                                    <TableCell>예약일</TableCell>
                                    <TableCell>인원수</TableCell>
                                    <TableCell>가격</TableCell>
                                    <TableCell>출발일</TableCell>
                                    <TableCell>상태</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {result && result.map((item, idx) => {
                                    return(
                                        <TableRow onClick={() => navigate(`/admin/reservation/info/${item.paymentId}`)}>
                                            {/*id**/}
                                            <TableCell>{idx}</TableCell>
                                            <TableCell>{item.toursTitle}</TableCell>
                                            <TableCell>{item.memberName}</TableCell>
                                            <TableCell>{item.email}</TableCell>
                                            <TableCell>{item.paymentDay}</TableCell>
                                            <TableCell>{item.people}</TableCell>
                                            <TableCell>{item.price}</TableCell>
                                            <TableCell>{item.departureDay}</TableCell>
                                            <TableCell>{item.state}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                {totalCnt >= defaultSize && (
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: "1rem" }}>
                        <Pagination count={Math.ceil(totalCnt / defaultSize)} page={page} onChange={(event, newPage) => {
                            setPage(newPage - 1);
                        }} />
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
}

export default ReservationSearch;