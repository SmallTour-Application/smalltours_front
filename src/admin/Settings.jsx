import React, {useEffect, useState} from 'react';
import {
    Button,
    Grid,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ReactPlayer from "react-player";
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";

function Settings(props) {

    const accessToken = useSelector((state) => state.accessToken); // 엑세스 토큰

    const [packageCommission, setPackageCommission] = useState(0); // 패키지 수수료
    const [editPackageCommission, setEditPackageCommission] = useState(false); // 패키지 수수료 수정
    const [packageCommisionInput, setPackageCommisionInput] = useState(0); // 패키지 수수료 입력

    const location = useLocation();
    const navigate = useNavigate();

    /*
    * axios.post로 여행 수수료 불러오기... /admin/setting/get... no param
    * **/
    const getSettings = async() => {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/admin/setting/get`,null,
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then(res => {
            if(res && res.data){
                console.log(res);
                setPackageCommission(res.data);
            }
        })
    }

    /*
    * 설정 수정 ... /admin/setting/set-up {id, packageCommission}
    * **/
    const setSettings = async() => {
        const req = {
            id: packageCommission.id,
            packageCommission: packageCommisionInput
        }
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/admin/setting/set-up`,req,
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then(res => {
            // 다시호출
            getSettings();
        })

    }

    useEffect(() => {
        if(accessToken){
            getSettings();
        }
    }, [accessToken])

    return (
        <Grid container sx={{width:"100%", display:"flex", mt:"3rem", px:"3rem", mb:"3rem"}}>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mb:"3rem"}}>
                <Typography sx={{fontSize:"2rem", fontWeight:"700"}}>설정</Typography>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>여행 수수료</TableCell>
                            <TableCell align="left">
                                {!editPackageCommission && packageCommission &&
                                    <>
                                    <Typography sx={{display:"inline"}}>{packageCommission.packageCommission}</Typography>
                                        <IconButton onClick={() => {
                                            setEditPackageCommission(true);
                                            setPackageCommisionInput(packageCommission.packageCommission);
                                        }}>
                                            <EditIcon />
                                        </IconButton>
                                </>}
                                {editPackageCommission && (
                                    <>
                                        <TextField value={packageCommisionInput} type={"number"} onChange={(event) => setPackageCommisionInput(event.target.value)} variant={"standard"}/>
                                        <IconButton
                                            onClick={() => {
                                                setEditPackageCommission(false);
                                                setPackageCommisionInput(0);
                                            }}
                                        >
                                            <ClearIcon/>
                                        </IconButton>
                                        <IconButton
                                            onClick={() => {
                                                setSettings();
                                                setEditPackageCommission(false);
                                            }}
                                        >
                                            <CheckIcon/>
                                        </IconButton>
                                    </>
                                ) }
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}

export default Settings;