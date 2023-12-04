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
    FormControlLabel, Pagination, TextField, Modal
} from "@mui/material";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from "@mui/icons-material/Check";
import EditableName from "./customer/EditableName";
import EditableNickname from "./customer/EditableNickname";
import EditableEmail from "./customer/EditableEmail";
import EditableTel from "./customer/EditableTel";
import WriteTourList from "./customer/WriteTourList";
import PaymentList from "./customer/PaymentList";
import WriteTourReview from "./customer/WriteTourReview";
import WriteGuideReview from "./customer/WriteGuideReview";
import ReceivedGuideReview from "./customer/ReceivedGuideReview";
import ReceivedTourReview from "./customer/ReceivedTourReview";
import GuideEducationList from "./customer/GuideEducationList";

const defaultSize = 10; // 기본 페이징 사이즈

function CustomerInfo(props) {
    const [selectedRole, setSelectedRole] = useState('0');
    const [roleModalOpen, setRoleModalOpen] = useState(false);

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    const accessToken = useSelector((state) => state.accessToken); // 엑세스 토큰

    const location = useLocation();
    const navigate = useNavigate();

    const params = useParams(); // params.value에 memberId가 들어있음

    const memberId = params.value;


    // name edit
    const [nameEdit, setNameEdit] = useState(false);


    // 회원정보

    const [memberResult, setMemberResult] = useState(null);
    const [memberRole, setMemberRole] = useState(99); // 0: 일반회원, 1: 미등록가이드, 2: 가이드, 3: 관리자

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


    // 멤버 이름 수정하기
    const editMemberName = async(memberId, name) => {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/admin/member/update/name?memberId=${memberId}`,
            {
                name: name
            },
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then((res) => {
            // 회원정보 다시 호출
            getMemberInfo(params.value);
        }).catch((err) => {
            console.log(err);
            alert("이름 변경 실패");
        })
    }

    // 멤버 닉네임 수정하기
    const editMemberNickname = async(memberId, nickname) => {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/admin/member/update/nickname?memberId=${memberId}`,
            {
                nickname: nickname
            },
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then((res) => {
            // 회원정보 다시 호출
            getMemberInfo(params.value);
        }).catch((err) => {
            console.log(err);
            alert("동일한 닉네임이 존재해요.");
        })

    }

    // 멤버 이메일 수정하기
    const editMemberEmail = async(memberId, email) => {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/admin/member/update/email?memberId=${memberId}`,
            {
                email: email
            },
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then((res) => {
            // 회원정보 다시 호출
            getMemberInfo(params.value);
        }).catch((err) => {
            console.log(err);
            alert("이메일 변경 실패");
        })

    }

    // 멤버 전화번호 수정하기
    const editMemberTel = async(memberId, tel) => {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/admin/member/update/tel?memberId=${memberId}`,
            {
                tel: tel
            },
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then((res) => {
            // 회원정보 다시 호출
            getMemberInfo(params.value);
        }).catch((err) => {
            console.log(err);
            alert("같은 전화번호가 존재해요");
        })
    }

    useEffect(() => {
        console.log(nameEdit);
    }, [nameEdit])


    // 멤버 정보 가져오기 api
    const getMemberInfo = async(memberId) => {
        console.log("회원 정보를 가져옵니다...")
        console.log(`http://localhost:8099/admin/member/info?memberId=${memberId}`)
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/admin/member/info?memberId=${memberId}`,
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
                    <EditableName name={res.data.name} onEdit={() => setNameEdit(!nameEdit)} editMemberName={editMemberName} memberId={res.data.id} />
                )

                let nickname = (
                    <EditableNickname nickname={res.data.nickname} onEdit={() => setNameEdit(!nameEdit)} editMemberNickname={editMemberNickname} memberId={res.data.id} />
                )

                let tel = (
                    <EditableTel tel={res.data.tel} onEdit={() => setNameEdit(!nameEdit)} editMemberTel={editMemberTel} memberId={res.data.id} />
                )

                let email = (
                    <EditableEmail email={res.data.email} onEdit={() => setNameEdit(!nameEdit)} editMemberEmail={editMemberEmail} memberId={res.data.id} />
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
                        <Button
                            sx={{
                                ml:"2rem",
                                backgroundColor: 'skyblue', // 버튼의 배경색을 하늘색으로 설정합니다.
                                ':hover': {
                                    backgroundColor: 'deepskyblue', // 마우스 오버시 버튼의 배경색을 조금 더 진한 하늘색으로 설정합니다.
                                },
                                color: 'white', // 버튼의 텍스트 색상을 흰색으로 설정합니다.
                                padding: '3px 20px', // 버튼의 패딩을 설정합니다.
                                borderRadius: '5px', // 버튼의 모서리를 둥글게 만듭니다.
                            }}
                            onClick={() => {
                                // modal open
                                setRoleModalOpen(true);
                            }}
                        >
                            <Typography>수정</Typography>
                        </Button>
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

                return res;
            }
        }).catch((err) => console.log(err))
        return response;
    }




    useEffect(() => {
        if(accessToken){
            getMemberInfo(params.value).then((res) => {
                console.log("회원정보 가져오기 완료")
            })
        }
    }, [accessToken]);

    const updateMemberRole = async (memberId, role) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/member/role/update?memberId=${memberId}&role=${role}`, null,
                {
                    headers: {
                        Authorization: `${accessToken}`,
                    }
                }
                );
            return response.data;
        } catch (error) {
            console.error("Error updating member role", error);
            alert("역할 변경 실패")
            throw error;
        }
    };




    const roleBody = (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80vw',
                maxWidth: 400,
                bgcolor: 'background.paper',
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                boxShadow: 24,
                p: 3,
            }}
        >
            <RadioGroup value={selectedRole} onChange={handleRoleChange}>
                <FormControlLabel value="0" control={<Radio />} label="일반회원" />
                <FormControlLabel value="1" control={<Radio />} label="미등록가이드" />
                <FormControlLabel value="2" control={<Radio />} label="가이드" />
                <FormControlLabel value="3" control={<Radio />} label="관리자" />
            </RadioGroup>
            <Button onClick={() => {
                updateMemberRole(memberId, selectedRole).then(() => {
                    alert("역할 변경 완료")
                    getMemberInfo(params.value);
                    //modal 닫기
                    setRoleModalOpen(false);
                })
            }}>역할 변경</Button>
        </Box>
    )

    return (
        <Grid container sx={{width:"100%", display:"flex", mt:"3rem", px:"3rem", mb:"3rem"}}>
            <Modal
                open={roleModalOpen}

                onClose={() => setRoleModalOpen(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                {roleBody}
            </Modal>
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

            {/* 결제목록 **/}
            {memberRole === 0 && (
                <PaymentList memberId={memberId} />
            )}

            {/* 작성한 여행리뷰 **/}
            {memberRole === 0 && (
                <WriteTourReview memberId={memberId} />
            )}

            {/* 작성한 가이드리뷰 **/}

            {memberRole === 0 && (
                <WriteGuideReview memberId={memberId} />
            )}

            {/* 작성한 투어 목록 **/}

            {memberRole === 2 && (
                <WriteTourList memberId={memberId} />
            )}

            {/* 받은 가이드 리뷰 **/}
            {memberRole === 2 && (
                <ReceivedGuideReview memberId={memberId} />
            )}

            {/* 받은 여행 리뷰 **/}
            {memberRole === 2 && (
                <ReceivedTourReview memberId={memberId} />
            )}

            {memberRole === 2 && (
                <GuideEducationList memberId={memberId} />
            )}




        </Grid>
    );
}

export default CustomerInfo;