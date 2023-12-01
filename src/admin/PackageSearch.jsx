import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {
    Button,
    Checkbox, FormControlLabel,
    Grid, Pagination,
    Paper, Radio, RadioGroup,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import axios from "axios";

function PackageSearch(props) {

    const defaultSize = 10; // 한 페이지에 보여줄 아이템의 수
    // accessToken

    const [result, setResult] = React.useState(null);
    const [totalCnt, setTotalCnt] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [sort, setSort] = useState(0); // sort 0: 미결제, 1: 결제, 2: 취소

    const accessToken = useSelector((state) => state.accessToken); // 엑세스 토큰

    const location = useLocation();
    const navigate = useNavigate();

    // 현재의 URL 파라미터를 가져옵니다.
    const params = new URLSearchParams(location.search);

    const getPackageList = async (paramPage) => {
        let url = `${process.env.REACT_APP_API_URL}/admin/package/list?page=${paramPage}&count=${defaultSize}`;

        // 검색 조건을 가져옵니다.
        let packageName = document.getElementById("packageName").value;
        let packageDuration = document.getElementById("packageDuration").value;
        let packagePrice = document.getElementById("packagePrice").value;
        let packagePeople = document.getElementById("packagePeople").value;

        // 검색 조건을 URL에 추가합니다.
        if(packageName !== "") url += "&title=" + packageName;
        if(packageDuration !== "") url += "&duration=" + packageDuration;
        if(packagePrice !== "") url += "&price=" + packagePrice;
        if(packagePeople !== "") url += "&people=" + packagePeople;

        // 검색 조건이 없을 경우 경고창을 띄웁니다.
        if(packageName === "" && packageDuration === "" && packagePrice === "" && packagePeople === "") {
            alert("검색 조건을 입력해주세요.");
            return;
        }

        const response = await axios.get(
            url,
            {
                headers: {
                    Authorization: `${accessToken}`,
                },
            }
        ).then((res) => {
            if(res && res.data){
                console.log(res);
                setResult(res.data.adminToursList);
                setTotalCnt(res.data.count);
                if(res.data.count === 0){
                    alert("검색 결과가 없습니다.")
                }
            }
        }).catch((err) => {
            alert("검색 결과가 없습니다.")
        })
    }

    // useEffect(() => {
    //     if(accessToken) {
    //         // 페이지 파라미터가 없을 경우 1페이지를 호출합니다.
    //         if(params.get("page") === null) {
    //             getPackageList(1);
    //         }
    //         // 페이지 파라미터가 있을 경우 해당 페이지를 호출합니다.
    //         else {
    //             getPackageList(params.get("page"));
    //         }
    //     }
    // },[accessToken])

    return (
        <Grid container sx={{width:"100%", display:"flex", mt:"3rem", px:"3rem"}}>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                <Typography sx={{fontSize:"2rem", fontWeight:"700"}}>패키지검색</Typography>
            </Grid>

            {/* 가입기간 **/}
            <Grid item xs={6} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <Typography sx={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                    패키지명
                    <TextField id={"packageName"} variant={"outlined"} size={"small"}
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
                    기간
                    <TextField id={"packageDuration"} variant={"outlined"} type={"number"}
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
                    가격
                    <TextField id={"packagePrice"} variant={"outlined"} type={"number"}
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
                    인원수
                    <TextField id={"packagePeople"} variant={"outlined"} type={"number"}
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
                        getPackageList(1);
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
                                    <TableCell>생성일시</TableCell>
                                    <TableCell>수정일시</TableCell>
                                    <TableCell>상태</TableCell>
                                    <TableCell>가격</TableCell>
                                    <TableCell>최대인원</TableCell>
                                    <TableCell>최소인원</TableCell>
                                    <TableCell>기간</TableCell>
                                    <TableCell>판매자</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {result && result.map((item, idx) => {
                                    return(
                                        <TableRow onClick={() => navigate(`/admin/package/info/${item.tourId}`)}>
                                            {/*id**/}
                                            <TableCell>{idx}</TableCell>
                                            <TableCell>{item.tourName}</TableCell>
                                            <TableCell>{item.createdDay}</TableCell>
                                            <TableCell>{item.updateDay}</TableCell>
                                            <TableCell>{item.approval}</TableCell>
                                            <TableCell>{item.price}</TableCell>
                                            <TableCell>{item.maxPeople}</TableCell>
                                            <TableCell>{item.minPeople}</TableCell>
                                            <TableCell>{item.duration}</TableCell>
                                            <TableCell>{item.guideName}</TableCell>
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
        </Grid>
    );
}

export default PackageSearch;