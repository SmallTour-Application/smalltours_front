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
    TableCell, TableRow, TableContainer, TableBody, Table, Paper, Button, Box
} from "@mui/material";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';

function CustomerInfo(props) {

    const accessToken = useSelector((state) => state.accessToken); // 엑세스 토큰

    const location = useLocation();
    const navigate = useNavigate();

    const params = useParams(); // params.value에 memberId가 들어있음

    const [memberResult, setMemberResult] = useState(null);

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

    useEffect(() => {
        if(accessToken){
            getMemberInfo(params.value);
        }
    }, [, accessToken]);

    return (
        <Grid container sx={{width:"100%", display:"flex", mt:"3rem", px:"3rem"}}>
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
        </Grid>
    );
}

export default CustomerInfo;