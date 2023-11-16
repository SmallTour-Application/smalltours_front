import React, {useEffect, useState} from 'react';
import {
    createTheme,
    Grid,
    ThemeProvider,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    TableCell,
    TableRow,
    TableContainer,
    TableBody,
    Table,
    Paper,
    Button,
    Box,
    TableHead,
    Checkbox,
    RadioGroup,
    Radio,
    FormControlLabel, Pagination
} from "@mui/material";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';

const defaultSize = 10; // 기본 페이징 사이즈

function CustomerInfo(props) {

    const accessToken = useSelector((state) => state.accessToken); // 엑세스 토큰

    const location = useLocation();
    const navigate = useNavigate();

    const params = useParams(); // params.value에 memberId가 들어있음

    // 회원정보

    const [memberResult, setMemberResult] = useState(null);
    const [memberRole, setMemberRole] = useState(0); // 0: 일반회원, 1: 미등록가이드, 2: 가이드, 3: 관리자

    // 결제내역

    const [paymentInfoSort, setPaymentInfoSort] = useState(0); // sort 0: 미결제, 1: 결제, 2: 취소
    const [paymentListResult, setPaymentListResult] = useState(null); // 결제내역 리스트
    const [paymentListPage, setPaymentListPage] = useState(0); // 결제내역 페이지
    const [paymentListTotalCnt, setPaymentListTotalCnt] = useState(0); // 결제내역 총 페이지

    // 여행리뷰 내역
    const [tourReviewListResult, setTourReviewListResult] = useState(null); // 여행리뷰 리스트
    const [tourReviewListPage, setTourReviewListPage] = useState(0); // 여행리뷰 페이지
    const [tourReviewListTotalCnt, setTourReviewListTotalCnt] = useState(0); // 여행리뷰 총 페이지

    // 가이드리뷰 내역
    const [guideReviewListResult, setGuideReviewListResult] = useState(null); // 가이드리뷰 리스트
    const [guideReviewListPage, setGuideReviewListPage] = useState(0); // 가이드리뷰 페이지
    const [guideReviewListTotalCnt, setGuideReviewListTotalCnt] = useState(0); // 가이드리뷰 총 페이지

    // 내 패키지 목록
    const [myTourListResult, setMyTourListResult] = useState(null); // 내 패키지 리스트
    const [myTourListPage, setMyTourListPage] = useState(0); // 내 패키지 페이지
    const [myTourListTotalCnt, setMyTourListTotalCnt] = useState(0); // 내 패키지 총 페이지


    // 멤버 정보 가져오기 api
    const getMemberInfo = async(memberId) => {
        console.log("회원 정보를 가져옵니다...")
        console.log(`http://localhost:8099/admin/member/info?memberId=${memberId}`)
        const response = await axios.post(
            `http://localhost:8099/admin/member/info?memberId=${memberId}`,
            {},
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then((res) => {
            if(res && res.data){
                console.log(res);
                setMemberRole(res.data.role);

                let name = (
                    <Typography sx={{fontSize:"0.8rem", fontWeight:"500"}}>
                        {res.data.name}
                        <IconButton size={"small"}>
                            <EditIcon/>
                        </IconButton>
                    </Typography>
                )

                let nickname = (
                    <Typography sx={{fontSize:"0.8rem", fontWeight:"500"}}>
                        {res.data.nickname}
                        <IconButton size={"small"}>
                            <EditIcon/>
                        </IconButton>
                    </Typography>
                )

                let tel = (
                    <Typography sx={{fontSize:"0.8rem", fontWeight:"500"}}>
                        {res.data.tel}
                        <IconButton size={"small"}>
                            <EditIcon/>
                        </IconButton>
                    </Typography>
                )

                let email = (
                    <Typography sx={{fontSize:"0.8rem", fontWeight:"500"}}>
                        {res.data.email}
                        <IconButton size={"small"}>
                            <EditIcon/>
                        </IconButton>
                    </Typography>
                )


                let role = "일반회원";
                if(res.data.role === 0){
                    role = "일반회원";
                }else if(res.data.role === 1){
                    role = "미등록가이드";
                }else if(res.data.role === 2){
                    role = "가이드";
                }else if(res.data.role === 3){
                    role = "관리자";
                }

                let roleElement = (
                    <Typography sx={{fontSize:"0.8rem", fontWeight:"500"}}>
                        {role}
                        <IconButton size={"small"}>
                            <EditIcon/>
                        </IconButton>
                    </Typography>
                )

                let gender = "남";
                if(res.data.gender === 0) gender = "남";
                if(res.data.gender === 1) gender = "여";

                let img = (
                    // 원형의 박스를 만들고 그 안에 img태그를 넣어 꽉 채웁니다.
                    <Box sx={{
                        width:"150px",
                        height:"150px",
                        borderRadius:"50%",
                        overflow:"hidden",
                    }}>
                        <img src={res.data.profile} alt="프로필 이미지" style={{width:"100%", height:"100%", objectFit:"cover"}}/>
                    </Box>
                )


                // profileEntries 같은 형식으로 가공해 setMemberResult에 저장
                const profileEntries = [
                    { label: '프로필 이미지', value: img },
                    { label: 'ID', value: res.data.id },
                    { label: '이름', value: name },
                    { label: '닉네임', value: nickname },
                    { label: '이메일', value: email },
                    { label: '전화번호', value: tel },
                    { label: '생일', value: res.data.birthDay },
                    { label: '가입일', value: res.data.joinDay },
                    { label: '성별', value: gender },
                    { label: 'Role', value: roleElement },
                ];

                setMemberResult(profileEntries);
            }
        }).catch((err) => console.log(err))
    }

    // 결제내역 가져오기 api
    const getPaymentInfo = async(memberId, state, page) => {
        console.log("결제 내역을 가져옵니다...")
        console.log(`http://localhost:8099/admin/member/payment/member?memberId=${memberId}&state=${state}&page=${page}`)
        const response = await axios.get(
            `http://localhost:8099/admin/member/payment/member?memberId=${memberId}&state=${state}`,
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then((res) => {
            if(res && res.data && res.data.paymentList){
                console.log(res);
                setPaymentListResult(res.data.paymentList);
                setPaymentListTotalCnt(res.data.totalCnt);
            }
        }).catch((err) => console.log(err))

    }

    // 작성한 여행리뷰 가져오기 api
    const getTourReviewInfo = async(memberId, page) => {
        console.log("작성한 여행리뷰를 가져옵니다...")
        console.log(`http://localhost:8099/admin/member/review/member?memberId=${memberId}&page=${page}`)
        const response = await axios.get(
            `http://localhost:8099/admin/member/review/member?memberId=${memberId}&page=${page}`,
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then((res) => {
            if(res && res.data){
                console.log(res);
                setTourReviewListResult(res.data.reviewList);
                setTourReviewListTotalCnt(res.data.totalCnt);
            }
        }).catch((err) => console.log(err))

    }

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
                setGuideReviewListResult(res.data.reviewList);
                setGuideReviewListTotalCnt(res.data.totalCnt);
            }
        }).catch((err) => console.log(err))
    }

    // 생성한 투어 목록 가져오기
    const getMyTourList = async(memberId, page) => {
        console.log("생성한 투어 목록을 가져옵니다...")
        console.log(`http://localhost:8099/admin/member/tour/member?memberId=${memberId}&page=${page}`)
        const response = await axios.get(
            `http://localhost:8099/admin/member/tour/member?memberId=${memberId}&page=${page}`,
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
            getMemberInfo(params.value).then((res) => {
                if(res && res.data.role === 0){
                    getPaymentInfo(params.value, paymentInfoSort, paymentListPage); // 결제내역
                    getTourReviewInfo(params.value, tourReviewListPage); // 여행리뷰
                    getGuideReviewInfo(params.value, guideReviewListPage); // 가이드리뷰
                }else if(res && res.data.role === 2){
                    getMyTourList(params.value, myTourListPage); // 내 투어 목록
                }
            })
        }
    }, [, accessToken]);

    // 결제내역 sort 바뀔때 호출
    useEffect(() => {
        if(accessToken){
            setPaymentListPage(0);
            getPaymentInfo(params.value, paymentInfoSort, 0); // 결제내역
        }
    }, [paymentInfoSort]);

    return (
        <Grid container sx={{width:"100%", display:"flex", mt:"3rem", px:"3rem", mb:"3rem"}}>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mb:"3rem"}}>
                <Typography sx={{fontSize:"2rem", fontWeight:"700"}}>회원정보</Typography>
            </Grid>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {memberResult && memberResult.map((entry) => (
                            <TableRow key={entry.label}>
                                <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                                    {entry.label}
                                </TableCell>
                                <TableCell align="left">
                                    {entry.value}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* 결제내역 **/}
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mb:"1rem", mt:"3rem"}} onClick={() => console.log(memberRole)}>
                <Typography sx={{fontSize:"2rem", fontWeight:"700", display:"inline"}}>결제내역</Typography>
                <Typography sx={{fontSize:"1.3rem", fontWeight:"700", display: 'inline', color:"gray", ml:"1rem"}}>{paymentListTotalCnt}건</Typography>
            </Grid>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <RadioGroup row value={paymentInfoSort} onChange={(event) => {
                    setPaymentInfoSort(event.target.value);
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
                            {paymentListResult && paymentListResult.map((paymentListItem, paymentListIdx) => {
                                return(
                                    <TableRow>
                                        {/*id**/}
                                        <TableCell>{paymentListIdx}</TableCell>
                                        <TableCell>{paymentListItem.toursTitle}</TableCell>
                                        <TableCell>{paymentListItem.email}</TableCell>
                                        <TableCell>{paymentListItem.price}</TableCell>
                                        <TableCell>{paymentListItem.people}</TableCell>
                                        <TableCell>{paymentListItem.paymentDay}</TableCell>
                                        <TableCell>
                                            {paymentListItem.state === 0 && "미결제"}
                                            {paymentListItem.state === 1 && "결제"}
                                            {paymentListItem.state === 2 && "취소"}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            {paymentListTotalCnt >= defaultSize && (
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: "1rem" }}>
                <Pagination count={Math.ceil(paymentListTotalCnt / defaultSize)} page={paymentListPage + 1} onChange={(event, newPage) => {
                    setPaymentListPage(newPage - 1);
                }} />
            </Grid>
            )}
            {/* 작성한 여행리뷰 **/}
            {memberRole === 0 && (
                <Grid item container xs={12}>
                    <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mb:"1rem", mt:"3rem"}}>
                        <Typography sx={{fontSize:"2rem", fontWeight:"700", display:"inline"}}>작성한 여행리뷰</Typography>
                        <Typography sx={{fontSize:"1.3rem", fontWeight:"700", display: 'inline', color:"gray", ml:"1rem"}}>{tourReviewListTotalCnt}건</Typography>
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
                                    {tourReviewListResult && tourReviewListResult.map((tourReviewListItem, tourReviewListIdx) => {
                                        return(
                                            <TableRow>
                                                {/*id**/}
                                                <TableCell>{tourReviewListIdx}</TableCell>
                                                <TableCell>{tourReviewListItem.packageName}</TableCell>
                                                <TableCell>{tourReviewListItem.guideName}</TableCell>
                                                <TableCell>{tourReviewListItem.score}</TableCell>
                                                <TableCell>{tourReviewListItem.content}</TableCell>
                                                <TableCell>{tourReviewListItem.paymentId}</TableCell>
                                                <TableCell>{tourReviewListItem.reviewDate}</TableCell>
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
                    {tourReviewListTotalCnt >= defaultSize && (
                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: "1rem" }}>
                            <Pagination count={Math.ceil(tourReviewListTotalCnt / defaultSize)} page={tourReviewListPage + 1} onChange={(event, newPage) => {
                                setTourReviewListPage(newPage - 1);
                            }} />
                        </Grid>
                    )}
                </Grid>
            )}

            {/* 작성한 가이드리뷰 **/}

            {memberRole === 0 && (

                <Grid container item xs={12}>
                    <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mb:"1rem", mt:"3rem"}}>
                        <Typography sx={{fontSize:"2rem", fontWeight:"700", display:"inline"}}>작성한 가이드리뷰</Typography>
                        <Typography sx={{fontSize:"1.3rem", fontWeight:"700", display: 'inline', color:"gray", ml:"1rem"}}>{guideReviewListTotalCnt}건</Typography>
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
                                    {guideReviewListResult && guideReviewListResult.map((guideReviewListItem, guideReviewListIdx) => {
                                        return(
                                            <TableRow>
                                                {/*id**/}
                                                <TableCell>{guideReviewListIdx}</TableCell>
                                                <TableCell>{guideReviewListItem.packageName}</TableCell>
                                                <TableCell>{guideReviewListItem.guideName}</TableCell>
                                                <TableCell>{guideReviewListItem.score}</TableCell>
                                                <TableCell>{guideReviewListItem.content}</TableCell>
                                                <TableCell>{guideReviewListItem.paymentId}</TableCell>
                                                <TableCell>{guideReviewListItem.reviewDate}</TableCell>
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
                    {guideReviewListTotalCnt >= defaultSize && (
                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: "1rem" }}>
                            <Pagination count={Math.ceil(guideReviewListPage / defaultSize)} page={guideReviewListPage + 1} onChange={(event, newPage) => {
                                setGuideReviewListPage(newPage - 1);
                            }} />
                        </Grid>
                    )}
                </Grid>
            )}

            {/* 작성한 투어 목록 **/}

            {memberRole === 2 && (

                <Grid container item xs={12}>
                    <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mb:"1rem", mt:"3rem"}}>
                        <Typography sx={{fontSize:"2rem", fontWeight:"700", display:"inline"}}>패키지</Typography>
                        <Typography sx={{fontSize:"1.3rem", fontWeight:"700", display: 'inline', color:"gray", ml:"1rem"}}>{guideReviewListTotalCnt}건</Typography>
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
                            <Pagination count={Math.ceil(myTourListPage / defaultSize)} page={myTourListPage + 1} onChange={(event, newPage) => {
                                setMyTourListPage(newPage - 1);
                            }} />
                        </Grid>
                    )}
                </Grid>
            )}


        </Grid>
    );
}

export default CustomerInfo;