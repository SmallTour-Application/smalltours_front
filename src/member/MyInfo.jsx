import React, {useState} from 'react';
import testImg from "../images/test.png";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box, Button, Checkbox, Collapse,
    createTheme, Divider, FormControlLabel,
    Grid, Radio, RadioGroup,
    TextField,
    ThemeProvider
} from "@mui/material";
import TopBar from "../component/TopNav";
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function MyInfo(props) {

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    const [tel, setTel] = useState("01000000000"); // 전화번호

    const [pwEdit, setPwEdit] = useState(false); // 비밀번호 편집 시 true
    const [telEdit, setTelEdit] = useState(false); // 전화번호 편집 시 true

    // 전화번호 변경 시 숫자만 들어가게
    const handleTelChange = (e) => {
        const value = e.target.value;

        // 입력된 값이 숫자인지 확인
        if (!isNaN(value)) {
            setTel(value);
        }
    }

    return (
        <Grid content item xs={12}>
            <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems={"center"} sx={{mb: "2rem"}}>
                <Typography sx={{fontSize: "2rem", fontWeight: "700"}}>
                    개인정보
                </Typography>
            </Grid>
            <Grid container item xs={12} sx={{ border:2,borderColor: "#DDDDDD", borderRadius: "1vw" , overflow:"hidden"}}>
                {/* 이름 **/}
                <Grid xs={12} item container>
                    <Grid item xs={6} md={4} lg={3} display={"flex"} justifyContent="flex-start" alignItems={"center"}
                        sx={{backgroundColor:"#F5F5F5", py:"1rem", pl:"2rem"}}
                    >
                        <Typography sx={{fontWeight: "700", fontSize: "1rem"}}>이름</Typography>
                    </Grid>
                    <Grid item xs={6} md={8} lg={9} display={"flex"} justifyContent="flex-start" alignItems={"center"}
                        sx={{py:"1rem", pl:"2rem"}}
                    >
                        <Typography sx={{fontWeight: "500", fontSize: "1rem"}}
                                    display={"flex"} justifyContent="flex-start" alignItems={"center"}
                        >
                            이지훈<EditIcon/>
                        </Typography>
                    </Grid>
                </Grid>

                {/* 아이디 **/}
                <Grid xs={12} item container>
                    <Grid item xs={6} md={4} lg={3} display={"flex"} justifyContent="flex-start" alignItems={"center"}
                          sx={{backgroundColor:"#F5F5F5", py:"1rem", pl:"2rem"}}
                    >
                        <Typography sx={{fontWeight: "700", fontSize: "1rem"}}>아이디</Typography>
                    </Grid>
                    <Grid item xs={6} md={8} lg={9} display={"flex"} justifyContent="flex-start" alignItems={"center"}
                          sx={{py:"1rem", pl:"2rem"}}
                    >
                        <Typography sx={{fontWeight: "500", fontSize: "1rem"}}
                                    display={"flex"} justifyContent="flex-start" alignItems={"center"}
                        >
                            dlwl2023@kyungmin.ac.kr<EditIcon/>
                        </Typography>
                    </Grid>
                </Grid>

                {/* 비밀번호 **/}
                <Grid xs={12} item container>
                    <Grid item xs={6} md={4} lg={3} display={"flex"} justifyContent="flex-start" alignItems={"center"}
                          sx={{backgroundColor:"#F5F5F5", py:"1rem", pl:"2rem"}}
                    >
                        <Typography sx={{fontWeight: "700", fontSize: "1rem"}}>비밀번호</Typography>
                    </Grid>
                    <Grid item xs={6} md={8} lg={9} display={"flex"} justifyContent="flex-start" alignItems={"center"}
                          sx={{py:"1rem", pl:"2rem"}}
                    >
                        <Typography sx={{fontWeight: "500", fontSize: "1rem"}}
                                    display={"flex"} justifyContent="flex-start" alignItems={"center"}
                        >
                            {pwEdit === false && "**********"}
                            {pwEdit === true && (
                                <TextField variant="standard" sx={{mr: "1rem"}} type={"password"}/>
                            )}
                            {/* 편집 버튼 눌렀을 시에는 TextField로 변환 **/}
                            {pwEdit === false && (
                                <EditIcon onClick={() => pwEdit === true ? setPwEdit(false) : setPwEdit(true)}/>
                            )}
                        </Typography>
                    </Grid>
                </Grid>

                {/* 비밀번호 확인 - 비밀번호 옆 편집 버튼 눌렀을 시에만 활성화**/}
                <Grid xs={12} container item>
                    <Collapse in={pwEdit} sx={{width:"100%"}}>
                        <Grid xs={12} item container>
                            <Grid item xs={6} md={4} lg={3} display={"flex"} justifyContent="flex-start"
                                  alignItems={"center"}
                                  sx={{backgroundColor:"#F5F5F5", py:"1rem", pl:"2rem"}}
                            >
                                <Typography sx={{fontWeight: "700", fontSize: "1rem"}}>비밀번호확인</Typography>
                            </Grid>
                            <Grid item xs={6} md={8} lg={9} display={"flex"} justifyContent="flex-start"
                                  alignItems={"center"}
                                  sx={{py:"1rem", pl:"2rem"}}
                            >
                                <Typography sx={{fontWeight: "500", fontSize: "1rem"}}
                                            display={"flex"} justifyContent="flex-start" alignItems={"center"}
                                >
                                    <TextField variant="standard" sx={{mr: "1rem"}} type={"password"}/>
                                    {pwEdit === true && (
                                        <CloseIcon onClick={() => setPwEdit(false)}/>
                                    )}
                                    <CheckIcon />
                                </Typography>
                            </Grid>
                        </Grid>
                    </Collapse>
                </Grid>


                {/* 전화번호 **/}
                <Grid xs={12} item container>
                    <Grid item xs={6} md={4} lg={3} display={"flex"} justifyContent="flex-start" alignItems={"center"}
                          sx={{backgroundColor:"#F5F5F5", py:"1rem", pl:"2rem"}}
                    >
                        <Typography sx={{fontWeight: "700", fontSize: "1rem"}}>전화번호</Typography>
                    </Grid>
                    <Grid item xs={6} md={8} lg={9} display={"flex"} justifyContent="flex-start" alignItems={"center"}
                          sx={{py:"1rem", pl:"2rem"}}
                    >
                        <Typography sx={{fontWeight: "500", fontSize: "1rem"}}
                                    display={"flex"} justifyContent="flex-start" alignItems={"center"}
                        >
                            {telEdit === false && tel}
                            {telEdit === true && (
                                <TextField variant="standard" sx={{mr: "1rem"}}
                                    value={tel} onChange={handleTelChange}
                                />
                            )}
                            {/* 편집 버튼 눌렀을 시에는 TextField로 변환 **/}
                            {telEdit === true && (
                                <CloseIcon onClick={() => setTelEdit(false)} />
                            )}
                            {telEdit === true && (
                                <CheckIcon/>
                            )}
                            {telEdit === false && (
                                <EditIcon onClick={() => setTelEdit(true)}/>
                            )}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default MyInfo;