import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Checkbox, FormControl,
    FormControlLabel, FormLabel,
    Grid, MenuItem, Modal, Paper,
    Radio,
    RadioGroup, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow,
    TextField,
    Typography
} from "@mui/material";
import {useSelector} from "react-redux";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

function CustomerSearch(props) {
    const [memberMailOpen, setMemberMailOpen] = useState(false);
    const [roleMailOpen, setRoleMailOpen] = useState(false);
    const [memberEmail, setMemberEmail] = useState([]); // 이메일
    const [memberId, setMemberId] = useState([]); // memberId
    const [profile, setProfile] = useState(null);
    const [memberAddOpen, setMemberAddOpen] = useState(false);
    const [joinRole, setJoinRole] = useState(0); // 회원가입 시 선택한 역할

    const accessToken = useSelector((state) => state.accessToken); // 엑세스 토큰

    const location = useLocation();
    const navigate = useNavigate();

    // 현재의 URL 파라미터를 가져옵니다.
    const params = new URLSearchParams(location.search);

    // 상태를 URL에서 가져옵니다.
    const page = params.get('page');

    // 상태 변경 시 URL을 업데이트합니다.
    function handleSearch(newPage) {
        params.set('page', newPage);
        navigate({ search: params.toString() });
    }

    const pageSize = 10; // 페이지 사이즈

    // states
    const [role, setRole] = useState([]); // 기본값은 빈배열. 0:일반회원 1:미인증가이드 2:가이드 3:관리자

    const [memberResult, setMemberResult] = useState(null); // 회원 검색 결과

    const [memberCheck, setMemberCheck] = useState([]); // 회원 선택


    // role checkbox에서 배열로 state에 넣어줄 func
    const handleCheckboxChange = (event) => {
        if (event.target.checked) {
            setRole(prev => [...prev, event.target.name]);
        } else {
            setRole(prev => prev.filter(item => item !== event.target.name));
        }
    };

    // 회원 검색 메서드
    const searchMember = async(memberName, memberEmail, memberTel, memberBirth, page) => {
        let name = "";
        let email = "";
        let tel = ""
        let birth = "";
        if(memberName){
            name = `memberName=${memberName}&`
        }
        if(memberEmail){
            email = `memberEmail=${memberEmail}&`
        }
        if(memberTel){
            tel = `memberTel=${memberTel}&`
        }
        if(memberBirth){
            birth = `birthDay=${memberBirth}&`
        }
        console.log("회원검색...")
        console.log(`${process.env.REACT_APP_API_URL}/admin/member/search/member?${name}${email}${tel}${birth}page=${page}&size=${pageSize}`)
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/admin/member/search/member?${name}${email}${tel}${birth}page=${page}&size=${pageSize}`,
            {},
    {
            headers: {
                Authorization: `${accessToken}`,
            }
            }
        ).then((res) => {
            // res.data가 있는지 없는지 체크합니다.
            if(res.data){
                console.log(res.data);
                // 현재 페이지가 1페이지이면 memberResult를 업데이트 하고 아니면 concat으로 추가합니다.
                if(page === 1){
                    setMemberResult(res.data);
                    // memberCheck를 res.data.contentMember의 길이만큼 false로 초기화합니다.
                    setMemberCheck(Array(res.data.contentMember.length).fill(false));
                    setMemberEmail(Array(res.data.contentMember.length).fill(""));
                    setMemberId(Array(res.data.contentMember.length).fill(0));
                }else{
                    setMemberResult(memberResult.concat(res.data));
                    // res.data.contentMember의 길이만큼 false로 초기화된 배열을 memberCheck 뒤에 붙입니다.
                    setMemberCheck(memberCheck.concat(Array(res.data.contentMember.length).fill(false)));
                }
            }
        }).catch((err) => {
            alert("검색결과가 없습니다.")
        })
    }

    /**
     * 선택회원 이메일 보내기
     * */
    const selectSendEmail = async(content, email, title, memberId) => {
        const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/send/email?memberId=${memberId}`,
            {
                content: content,
                email: email,
                title: title
            },
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then((res) => {
            if(res && res.data){
                console.log(res);
                alert("이메일을 전송했습니다.")
            }
        }).catch((err) => console.log(err))
    }

    /**
     * 가이드 메일 전송...
     * /admin/send/email/guide/all
     * */
    const sendGuideEmail = async(content, title) => {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/admin/send/email/guide/all`,
            {
                content: content,
                title: title,
                sendAll: true
            },
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then((res) => {
            if(res && res.data){
                console.log(res);
                alert("이메일을 전송했습니다.")
            }
        }).catch((err) => console.log(err))
    }

    /**
     * 회원 메일 전송
     * */
    const sendMemberEmail = async(content, title) => {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/admin/send/email/member/all`,
            {
                content: content,
                title: title,
                sendAll: true
            },
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then((res) => {
            if(res && res.data){
                console.log(res);
                alert("이메일을 전송했습니다.")
            }
        }).catch((err) => console.log(err))
    }

    useEffect(() => {
        // role 변화를 테스트합니다.
        console.log(role)
    }, [role])

    const mailBody = (
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
            <Grid container sx={{width:"100%"}}>
                <Grid item xs={12} sx={{display:"flex", justifyContent:"center"}}>
                    <Typography>
                        메일전송
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", py:"1rem"}}>
                    <Typography>
                        제목
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{display:"flex", justifyContent:"center"}}>
                    <TextField label={"제목"} id={"memberMailTitle"}
                               InputLabelProps={{
                                   shrink: true, // 이 속성은 날짜 선택기의 레이블이 항상 위로 올라가게 합니다.
                               }}
                               sx={{
                                   height: '30px', // 높이 지정
                                   '& .MuiOutlinedInput-root': {
                                       height: '100%', // 높이를 100%로 지정하여 TextField의 높이와 동일하게 만듭니다.
                                   },
                                   width:"100%"
                               }}
                    />
                </Grid>
                <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", py:"1rem"}}>
                    <Typography>
                        내용
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{display:"flex", justifyContent:"center"}}>
                    <TextField label={"내용"} id={"memberMailContent"}
                               multiline
                               rows={5}
                               InputLabelProps={{
                                   shrink: true, // 이 속성은 날짜 선택기의 레이블이 항상 위로 올라가게 합니다.
                               }}
                               sx={{width:'100%'}}
                    />
                </Grid>
                {/** 전송버튼과 취소버튼 */}
                <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-end", py:"1rem"}}>
                    <Button
                        sx={{
                            backgroundColor: 'skyblue', // 버튼의 배경색을 하늘색으로 설정합니다.
                            ':hover': {
                                backgroundColor: 'deepskyblue', // 마우스 오버시 버튼의 배경색을 조금 더 진한 하늘색으로 설정합니다.
                            },
                            color: 'white', // 버튼의 텍스트 색상을 흰색으로 설정합니다.
                            padding: '3px 3px', // 버튼의 패딩을 설정합니다.
                            borderRadius: '5px', // 버튼의 모서리를 둥글게 만듭니다.
                        }}
                        onClick={() => {
                            // modal 닫기
                            setMemberMailOpen(false);
                        }}
                    >
                        <Typography>취소</Typography>
                    </Button>
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
                            // 전송하기
                            // 각 textField의 id로 값을 가져옵니다.
                            const memberMailTitle = document.getElementById("memberMailTitle").value;
                            const memberMailContent = document.getElementById("memberMailContent").value;
                            //memberCheck의 true인 idx만 가져와서 memberEmail의 해당 idx의 값을 가져온 후 selectSendEmail 메서드를 호출합니다.
                            try {
                                memberCheck.forEach((item, idx) => {
                                    if(item){
                                        selectSendEmail(memberMailContent, memberEmail[idx], memberMailTitle, memberId[idx])
                                    }
                                })
                                alert("메일을 전송했습니다.")
                            }catch(e) {
                                alert("메일 발송에 실패했습니다.")
                            }

                            // textfield 초기화
                            document.getElementById("memberMailTitle").value = "";
                            document.getElementById("memberMailContent").value = "";
                            // modal 닫기
                            setMemberMailOpen(false)
                        }}
                    >
                        <Typography>전송</Typography>
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )

    const roleMailBody = (
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
            <Grid container sx={{width:"100%"}}>
                <Grid item xs={12} sx={{display:"flex", justifyContent:"center"}}>
                    <Typography>
                        메일전송
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", py:"1rem"}}>
                    <Typography>
                        제목
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{display:"flex", justifyContent:"center"}}>
                    <TextField label={"제목"} id={"memberMailTitle"}
                               InputLabelProps={{
                                   shrink: true, // 이 속성은 날짜 선택기의 레이블이 항상 위로 올라가게 합니다.
                               }}
                               sx={{
                                   height: '30px', // 높이 지정
                                   '& .MuiOutlinedInput-root': {
                                       height: '100%', // 높이를 100%로 지정하여 TextField의 높이와 동일하게 만듭니다.
                                   },
                                   width:"100%"
                               }}
                    />
                </Grid>
                <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", py:"1rem"}}>
                    <Typography>
                        내용
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{display:"flex", justifyContent:"center"}}>
                    <TextField label={"내용"} id={"memberMailContent"}
                               multiline
                               rows={5}
                               InputLabelProps={{
                                   shrink: true, // 이 속성은 날짜 선택기의 레이블이 항상 위로 올라가게 합니다.
                               }}
                               sx={{width:'100%'}}
                    />
                </Grid>
                {/** 전송버튼과 취소버튼 */}
                <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-end", py:"1rem"}}>
                    <Button
                        sx={{
                            backgroundColor: 'skyblue', // 버튼의 배경색을 하늘색으로 설정합니다.
                            ':hover': {
                                backgroundColor: 'deepskyblue', // 마우스 오버시 버튼의 배경색을 조금 더 진한 하늘색으로 설정합니다.
                            },
                            color: 'white', // 버튼의 텍스트 색상을 흰색으로 설정합니다.
                            padding: '3px 3px', // 버튼의 패딩을 설정합니다.
                            borderRadius: '5px', // 버튼의 모서리를 둥글게 만듭니다.
                        }}
                        onClick={() => {
                            // modal 닫기
                            setMemberMailOpen(false);
                        }}
                    >
                        <Typography>취소</Typography>
                    </Button>
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
                            // 전송하기
                            // 각 textField의 id로 값을 가져옵니다.
                            const memberMailTitle = document.getElementById("memberMailTitle").value;
                            const memberMailContent = document.getElementById("memberMailContent").value;
                            //memberCheck의 true인 idx만 가져와서 memberEmail의 해당 idx의 값을 가져온 후 selectSendEmail 메서드를 호출합니다.
                            try {
                                // role을 forEach로 돌려서 0이면 일반회원, 1이면 가이드로 메일을 보냅니다.
                                role.forEach((item) => {
                                    if(item === "0"){
                                        sendMemberEmail(memberMailContent, memberMailTitle);
                                    }
                                    if(item === "1"){
                                        sendGuideEmail(memberMailContent, memberMailTitle);
                                    }
                                })
                                alert("메일을 전송했습니다.")
                            }catch(e) {
                                alert("메일 발송에 실패했습니다.")
                            }

                            // textfield 초기화
                            document.getElementById("memberMailTitle").value = "";
                            document.getElementById("memberMailContent").value = "";
                            // modal 닫기
                            setRoleMailOpen(false)
                        }}
                    >
                        <Typography>전송</Typography>
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        let gender = Array.from(document.getElementsByName('gender')).find(radio => radio.checked)?.value || 0;
        if (joinRole === '' || joinRole === undefined) {
            alert('역할을 선택해주세요.');
            return;
        }
        formData.append('birthDay', document.getElementById('birthDay').value);
        formData.append('email', document.getElementById('email').value);
        formData.append('gender', gender);
        formData.append('name', document.getElementById('name').value);
        formData.append('nickName', document.getElementById('nickName').value);
        formData.append('password', document.getElementById('password').value);
        const profileImgRequest = document.getElementById('profileImgRequest').files[0];
        if (profileImgRequest) {
            formData.append('profileImgRequest', profileImgRequest);
        }
        formData.append('role', joinRole);
        formData.append('tel', document.getElementById('tel').value);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/member/add/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `${accessToken}`,
                }
            });
            console.log(response.data);
            // 성공 시 로직
            // modal 닫기
            setMemberAddOpen(false);
            // alert
            alert("회원을 등록했습니다.")
        } catch (error) {
            console.error('회원 등록 실패:', error);
            // 실패 시 로직
            // alert
            alert("회원 등록에 실패했습니다.")
        }
    };

    const textFieldStyle = { margin: '10px 0', width: '100%' };

    const handleRoleChange = (e) => {
        const roleElement = document.getElementById('role');
        roleElement.setAttribute('data-value', e.target.value); // 선택된 값을 data-value 속성으로 설정
    };

    const memberAddBody = (
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
            <form onSubmit={handleSubmit}>
                <TextField id="birthDay" label="생일" type="date" variant="outlined" style={textFieldStyle} InputLabelProps={{ shrink: true }} />
                <TextField id="email" label="이메일" type="email" variant="outlined" style={textFieldStyle} />
                <FormControl component="fieldset">
                    <FormLabel component="legend">성별</FormLabel>
                    <RadioGroup name="gender" defaultValue="0">
                        <FormControlLabel value="0" control={<Radio />} label="남성" />
                        <FormControlLabel value="1" control={<Radio />} label="여성" />
                    </RadioGroup>
                </FormControl>
                <TextField id="name" label="이름" variant="outlined" style={textFieldStyle} />
                <TextField id="nickName" label="닉네임" variant="outlined" style={textFieldStyle} />
                <TextField id="password" label="비밀번호" type="password" variant="outlined" style={textFieldStyle} />
                <input type="file" id="profileImgRequest" style={{ display: 'block', margin: '10px 0' }} />
                <TextField
                    id="role"
                    select
                    label="역할"
                    value={joinRole}
                    onChange={(e) => setJoinRole(e.target.value)}
                    variant="outlined"
                    style={textFieldStyle}
                >
                    <MenuItem value={0}>일반회원</MenuItem>
                    <MenuItem value={1}>미등록가이드</MenuItem>
                    <MenuItem value={2}>가이드</MenuItem>
                    <MenuItem value={3}>관리자</MenuItem>
                </TextField>
                <TextField id="tel" label="전화번호" variant="outlined" style={textFieldStyle} />
                <Button type="submit" variant="contained" color="primary" style={{ margin: '20px 0' }}>
                    등록
                </Button>
            </form>
        </Box>
    )


    return (
        <Grid container sx={{width:"100%", display:"flex", mt:"3rem", px:"3rem"}}>
            <Modal
                open={memberAddOpen}

                onClose={() => setMemberAddOpen(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                {memberAddBody}
            </Modal>
            <Modal
                open={memberMailOpen}

                onClose={() => setMemberMailOpen(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                {mailBody}
            </Modal>
            <Modal
                open={roleMailOpen}

                onClose={() => setRoleMailOpen(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                {roleMailBody}
            </Modal>
            <Grid item xs={6} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                <Typography sx={{fontSize:"2rem", fontWeight:"700"}}>회원검색</Typography>
            </Grid>
            <Grid item xs={6} sx={{display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
                <Button
                    sx={{
                        backgroundColor: 'skyblue', // 버튼의 배경색을 하늘색으로 설정합니다.
                        ':hover': {
                            backgroundColor: 'deepskyblue', // 마우스 오버시 버튼의 배경색을 조금 더 진한 하늘색으로 설정합니다.
                        },
                        color: 'white', // 버튼의 텍스트 색상을 흰색으로 설정합니다.
                        padding: '10px 20px', // 버튼의 패딩을 설정합니다.
                        borderRadius: '5px', // 버튼의 모서리를 둥글게 만듭니다.
                    }}
                    onClick={() => {
                        // modal 열기
                        setMemberAddOpen(true);
                    }}
                >
                    <Typography>회원 추가</Typography>
                </Button>
                <Button
                    sx={{
                        ml:"1rem",
                        backgroundColor: 'skyblue', // 버튼의 배경색을 하늘색으로 설정합니다.
                        ':hover': {
                            backgroundColor: 'deepskyblue', // 마우스 오버시 버튼의 배경색을 조금 더 진한 하늘색으로 설정합니다.
                        },
                        color: 'white', // 버튼의 텍스트 색상을 흰색으로 설정합니다.
                        padding: '10px 20px', // 버튼의 패딩을 설정합니다.
                        borderRadius: '5px', // 버튼의 모서리를 둥글게 만듭니다.
                    }}
                    onClick={() => {
                        // modal 열기
                        setMemberMailOpen(true);
                    }}
                >
                    <Typography>선택회원 메일 발송</Typography>
                </Button>
            </Grid>
            {/* 회원타입 **/}
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <Typography sx={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                    <b style={{fontSize:"1.3rem", fontWeight:"600"}}>회원타입</b>
                        <Checkbox
                            name={0}
                            value={0}
                            onChange={handleCheckboxChange}
                            sx={{ml:"1rem"}}
                        />
                        일반회원
                        <Checkbox
                            name={1}
                            value={1}
                            onChange={handleCheckboxChange}
                            sx={{ml:"1rem"}}
                        />
                        가이드
                        <Checkbox
                            name={2}
                            value={2}
                            onChange={handleCheckboxChange}
                            sx={{ml:"1rem"}}
                        />
                        관리자
                </Typography>
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
                        setRoleMailOpen(true)
                    }}
                >
                    <Typography>메일 발송</Typography>
                </Button>
            </Grid>
            {/* 가입기간 **/}
            <Grid item xs={6} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <Typography sx={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                    고객명
                    <TextField id={"customerName"} variant={"outlined"} size={"small"}
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
                    전화번호
                    <TextField id={"customerTel"} variant={"outlined"}
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
                    이메일
                    <TextField id={"customerEmail"} variant={"outlined"}
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
                    생년월일
                    <TextField id={"customerBirth"} variant={"outlined"}
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
                        // 각 textField의 id로 값을 가져옵니다.
                        const memberName = document.getElementById("customerName").value;
                        const memberTel = document.getElementById("customerTel").value;
                        const memberEmail = document.getElementById("customerEmail").value;
                        const memberBirth = document.getElementById("customerBirth").value;
                        // 검색 메서드를 호출합니다.
                        // 최초 검색시에는 1페이지를 호출합니다.
                        searchMember(memberName, memberEmail, memberTel, memberBirth, 1).then(
                            (res) => {
                                // 성공 시 url의 page를 1로 변경합니다.
                                handleSearch(1)
                            }
                        )
                    }}
                >
                    <Typography>검색</Typography>
                </Button>
            </Grid>

            {/* 이 아래는 검색 후에만 보이게 합니다. **/}

            <Grid item xs={6} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <Typography sx={{fontSize:"1.3rem", fontWeight:"700", display: 'inline'}}>검색결과</Typography>
                {memberResult && (
                    <Typography sx={{fontSize:"1.3rem", fontWeight:"700", display: 'inline', color:"gray", ml:"1rem"}}>{memberResult.count}건</Typography>
                )}
            </Grid>
            <Grid item xs={6} sx={{display:"flex", justifyContent:"flex-end", alignItems:"center", mt:"1rem"}}>
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
                        // memberCheck의 모든 값을 true로 변경합니다.
                        setMemberCheck(memberCheck.map((item) => {
                            return true;
                        }
                        ))
                    }}
                >
                    <Typography>전체 선택</Typography>
                </Button>
                <Button
                    sx={{
                        ml:"1rem",
                        backgroundColor: 'skyblue', // 버튼의 배경색을 하늘색으로 설정합니다.
                        ':hover': {
                            backgroundColor: 'deepskyblue', // 마우스 오버시 버튼의 배경색을 조금 더 진한 하늘색으로 설정합니다.
                        },
                        color: 'white', // 버튼의 텍스트 색상을 흰색으로 설정합니다.
                        padding: '5px 20px', // 버튼의 패딩을 설정합니다.
                        borderRadius: '5px', // 버튼의 모서리를 둥글게 만듭니다.
                    }}
                    onClick={() => {
                        // memberCheck의 모든 값을 false로 변경합니다.
                        setMemberCheck(memberCheck.map((item) => {
                                return false;
                            }))
                    }}
                >
                    <Typography>선택 해제</Typography>
                </Button>
            </Grid>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>선택</TableCell>
                                <TableCell>멤버 ID</TableCell>
                                <TableCell>생년월일</TableCell>
                                <TableCell>가입일</TableCell>
                                <TableCell>이메일</TableCell>
                                <TableCell>이름</TableCell>
                                <TableCell>전화번호</TableCell>
                                <TableCell>Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {memberResult && memberResult.contentMember.map((member, idx) => {
                                return(
                                    <TableRow key={idx} onClick={() => navigate(`/admin/customer/info/${member.id}`)}>
                                        <TableCell><Checkbox checked={memberCheck[idx]} onClick={(e) => e.stopPropagation()} onChange={
                                            (e) => {
                                                e.stopPropagation(); // 이벤트 전파 중지
                                                // memberCheck의 해당 idx만 e.target.value로 변경합니다.
                                                setMemberCheck(memberCheck.map((item, index) => {
                                                    if(index === idx){
                                                        return e.target.checked;
                                                    }else{
                                                        return item;
                                                    }
                                                }))
                                                // memberEmail의 해당 idx만 member.memberEmail로 변경합니다.
                                                setMemberEmail(memberEmail.map((item, index) => {
                                                    if(index === idx){
                                                        return member.memberEmail;
                                                    }else{
                                                        return item;
                                                    }
                                                }))
                                                // memberId도
                                                setMemberId(memberId.map((item, index) => {
                                                    if(index === idx){
                                                        return member.id;
                                                    }else{
                                                        return item;
                                                    }
                                                }))
                                            }
                                        } /></TableCell>
                                        <TableCell>{member.id}</TableCell>
                                        <TableCell>{member.birthDay}</TableCell>
                                        <TableCell>{member.joinDay}</TableCell>
                                        <TableCell>{member.memberEmail}</TableCell>
                                        <TableCell>{member.memberName}</TableCell>
                                        <TableCell>{member.memberTel}</TableCell>
                                        <TableCell>
                                            {member.role === 0 && "일반회원"}
                                            {member.role === 1 && "미인증가이드"}
                                            {member.role === 2 && "가이드"}
                                            {member.role === 3 && "관리자"}
                                        </TableCell>
                                    </TableRow>
                                )

                        })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

export default CustomerSearch;