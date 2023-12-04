import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {
    Box,
    Button,
    FormControlLabel,
    Grid, Modal, Pagination,
    Paper,
    Radio,
    RadioGroup,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TableRow,
    Typography
} from "@mui/material";
import axios from "axios";
import ReactPlayer from "react-player";

function GuideEducationList({memberId}) {

    const [selectedRole, setSelectedRole] = useState('0');
    const [roleModalOpen, setRoleModalOpen] = useState(false);
    const defaultSize = 10; // 한 페이지에 보여줄 아이템의 수
    // accessToken
    const accessToken = useSelector((state) => state.accessToken); // 엑세스 토큰


    const [result, setResult] = React.useState(null);
    const [totalCnt, setTotalCnt] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [sort, setSort] = useState(0); // sort 0: 미결제, 1: 결제, 2: 취소

    const [educationId, setEducationId] = useState(0); // 교육 id

    /**
     * 가이드 교육현황 목록 가져오기... /admin/guide/education/view/list?state&page&memberId
     * */
    const getGuideEducationList = async(memberId, state, page) => {
        console.log("가이드 교육현황 목록을 가져옵니다...")
        console.log(`${process.env.REACT_APP_API_URL}/admin/guide/education/view/list?state=${state}&page=${page}&memberId=${memberId}`)
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/admin/guide/education/view/list?state=${state}&page=${page}&memberId=${memberId}`,null,
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then((res) => {
            if (res && res.data) {
                console.log(res);
                setResult(res.data.educationGuideLogList);
                setTotalCnt(res.data.count);
            }
        }).catch((err) => {
            console.log(err)
            setResult(null)
            setTotalCnt(0)
        })
    }

    /**
     * 상태변경... /admin/guide/education/state/update
     * */
    const updateEducationState = async(educationId, state, guideId) => {
        console.log("상태를 변경합니다...")
        console.log(`${process.env.REACT_APP_API_URL}/admin/guide/education/state/update?educationId=${educationId}&state=${state}&guideId=${guideId}`)
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/admin/guide/education/state/update?educationId=${educationId}&state=${state}&guideId=${guideId}`,null,
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then((res) => {
                console.log(res);
                alert("상태가 변경되었습니다.");
                getGuideEducationList(parseInt(memberId), parseInt(sort), page);
        }).catch((err) => {
            console.log(err)
            alert("상태변경에 실패했습니다.")
        })

    }

    useEffect(() => {
        if(accessToken){
            getGuideEducationList(parseInt(memberId), 0,1);
        }
    }, [accessToken]);

    // 결제내역 sort 바뀔때 호출
    useEffect(() => {
        if(accessToken){
            setPage(1);
            getGuideEducationList(parseInt(memberId), parseInt(sort), 1); // 결제내역
        }
    }, [sort]);

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

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
                <FormControlLabel value="0" control={<Radio />} label="수강중" />
                <FormControlLabel value="1" control={<Radio />} label="수강완료" />
                <FormControlLabel value="2" control={<Radio />} label="미수강" />
            </RadioGroup>
            <Button onClick={() => {
                updateEducationState(educationId, selectedRole, memberId).then(() => {
                    //modal 닫기
                    setRoleModalOpen(false);
                })
            }}>역할 변경</Button>
        </Box>
    )

    return (
        <Grid container item xs={12}>
            <Modal
                open={roleModalOpen}

                onClose={() => setRoleModalOpen(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                {stateBody}
            </Modal>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mb:"1rem", mt:"3rem"}}>
                <Typography sx={{fontSize:"2rem", fontWeight:"700", display:"inline"}}>교육내역</Typography>
                <Typography sx={{fontSize:"1.3rem", fontWeight:"700", display: 'inline', color:"gray", ml:"1rem"}}>{totalCnt}건</Typography>
            </Grid>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <RadioGroup row value={sort} onChange={(event) => {
                    setSort(event.target.value);
                }}>
                    {/*0:수강중, 1:수강완료, 2:미수강 **/}
                    <FormControlLabel value={0} control={<Radio />} label="수강중" />
                    <FormControlLabel value={1} control={<Radio />} label="수강완료" />
                    <FormControlLabel value={2} control={<Radio />} label="미수강" />
                </RadioGroup>
            </Grid>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>번호</TableCell>
                                <TableCell>교육제목</TableCell>
                                <TableCell>시작일</TableCell>
                                <TableCell>종료일</TableCell>
                                <TableCell>완료일</TableCell>
                                <TableCell>수강상태</TableCell>
                                <TableCell>상태변경</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {result && result.map((item, idx) => {
                                return(
                                    <TableRow>
                                        {/*id**/}
                                        <TableCell>{idx}</TableCell>
                                        <TableCell>{item.educationTitle}</TableCell>
                                        <TableCell>{item.startDay}</TableCell>
                                        <TableCell>{item.endDay}</TableCell>
                                        <TableCell>{item.completeDate}</TableCell>
                                        <TableCell>
                                            {item.state === 0 && "수강중"}
                                            {item.state === 1 && "수강완료"}
                                            {item.state === 2 && "미수강"}
                                        </TableCell>
                                        <TableCell>
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
                                                    setEducationId(item.id);
                                                    setRoleModalOpen(true);
                                                }}
                                            >
                                                <Typography>수정</Typography>
                                            </Button>
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
                    <Pagination count={Math.ceil(totalCnt / defaultSize)} page={page} onChange={(event, newPage) => {
                        setPage(newPage - 1);
                    }} />
                </Grid>
            )}
        </Grid>
    );
}

export default GuideEducationList;