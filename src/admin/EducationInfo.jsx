import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {
    Box,
    Button, FormControlLabel,
    Grid,
    Modal,
    Paper, Radio, RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import ReactPlayer from "react-player";

function EducationInfo(props) {
    const [selectedRole, setSelectedRole] = useState('0');
    const [roleModalOpen, setRoleModalOpen] = useState(false);
    const accessToken = useSelector((state) => state.accessToken); // 엑세스 토큰

    const location = useLocation();
    const navigate = useNavigate();

    const params = useParams(); // params.value에 tourId가 들어있음

    const educationId = params.value;

    const [edit, setEdit] = useState(false);
    // 여행정보
    const [result, setResult] = useState(null);

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };


    const getEducationInfo = async(paramEducationId) => {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/admin/upload/education/detail?educationId=${paramEducationId}`, null,
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then(res => {
            console.log(res);
            setResult(res.data)
        }).catch(err => {
            console.log(err);
            alert("교육 정보를 불러오는데 실패했습니다.")
        })
    }

    /**
     * 교육삭제 .. /admin/upload/education/view/list/delete
     * */
    const deleteEducation = async(paramEducationId) => {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/admin/upload/education/view/list/delete?educationId=${paramEducationId}`, null,
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then(res => {
            console.log(res);
            alert("교육이 삭제되었습니다.");
            navigate("/admin/education/search")
        }).catch(err => {
            console.log(err);
            alert("교육 삭제에 실패했습니다.")
        })

    }

    /**
     * 교육 상태 수정 ... /admin/upload/education/view/state/update
     * */
    const updateEducationState = async(paramEducationId, state) => {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/admin/upload/education/view/state/update?educationId=${paramEducationId}&state=${state}`, null,
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then(res => {
            console.log(res);
            alert("교육 상태가 변경되었습니다.");
            getEducationInfo(parseInt(educationId));
        }).catch(err => {
            console.log(err);
            alert("교육 상태 변경에 실패했습니다.")
        })
    }




    useEffect(() => {
        if(accessToken){
            getEducationInfo(educationId)
        }
    },[accessToken])


    const stateBody = (
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
                <FormControlLabel value="0" control={<Radio />} label="수강불가" />
                <FormControlLabel value="1" control={<Radio />} label="수강가능" />
            </RadioGroup>
            <Button onClick={() => {
                updateEducationState(educationId, selectedRole).then(() => {
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
                {stateBody}
            </Modal>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mb:"3rem"}}>
                <Typography sx={{fontSize:"2rem", fontWeight:"700"}}>교육정보</Typography>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        {/* 썸네일 이미지 필드가 JSON 데이터에 없으므로 제거하거나 다른 이미지 필드로 대체합니다. */}
                        <TableRow>
                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>교육ID</TableCell>
                            <TableCell align="left">{result && result.id}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>시작일</TableCell>
                            <TableCell align="left">{result && result.startDay}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>종료일</TableCell>
                            <TableCell align="left">{result && result.endDay}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>재생시간</TableCell>
                            <TableCell align="left">{result && result.playTime}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>교육제목</TableCell>
                            {/* 최소인원 데이터가 없으므로 people로 대체하거나 제거합니다. */}
                            <TableCell align="left">{result && result.title}</TableCell>
                        </TableRow>
                        {/* 최대인원 필드가 JSON 데이터에 없으므로 제거합니다. */}
                        <TableRow>
                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>업로드일</TableCell>
                            <TableCell align="left">{result && result.uploadDay}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>상태</TableCell>
                            <TableCell align="left">{result && (result.educationState === 1 ? "수강가능" : "수강불가")}
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
                                        // modal open
                                        setRoleModalOpen(true);
                                    }}
                                >
                                    <Typography>상태변경</Typography>
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>삭제</TableCell>
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
                                        deleteEducation(educationId)
                                    }}
                                >
                                    <Typography>삭제</Typography>
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>수정</TableCell>
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

                                    }}
                                >
                                    <Typography>수정</Typography>
                                </Button>
                            </TableCell>
                        </TableRow>
                        {
                            result && (
                                <TableRow>
                                    <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                                        영상
                                    </TableCell>
                                    <TableCell sx={{p:5}}>
                                        <ReactPlayer url={result.videoPath} playing={"false"} controls={true} width='50%'/>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}

export default EducationInfo;