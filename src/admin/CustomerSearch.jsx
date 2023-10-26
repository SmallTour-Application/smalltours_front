import React, {useEffect, useState} from 'react';
import {Button, Checkbox, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

function CustomerSearch(props) {
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
        const data = {
            ...(memberName && { memberName: memberName }),
            ...(memberEmail && { memberEmail: memberEmail }),
            ...(memberTel && { memberTel: memberTel }),
            ...(memberBirth && { memberBirth: memberBirth }),
            size: pageSize,
            page: page
        };
        const response = await axios.post(
            `http://localhost:8099/admin/member/search/member`,
            data,
    {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
            }
        ).then((res) => {
            // res.data가 있는지 없는지 체크합니다.
            if(res.data){
                console.log(res.data);
            }
            // 현재 페이지가 1페이지이면 memberResult를 업데이트 하고 아니면 concat으로 추가합니다.
            if(page === 1){
                setMemberResult(res.data);
            }else{
                setMemberResult(memberResult.concat(res.data));
            }
        })
    }

    useEffect(() => {
        // role 변화를 테스트합니다.
        console.log(role)
    }, [role])


    return (
        <Grid container sx={{width:"100%", display:"flex", mt:"3rem", px:"3rem"}}>
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
                        미인증가이드
                        <Checkbox
                            name={2}
                            value={2}
                            onChange={handleCheckboxChange}
                            sx={{ml:"1rem"}}
                        />
                        가이드
                        <Checkbox
                            name={3}
                            value={3}
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
                            // 성공 시 url의 page를 1로 변경합니다.
                            handleSearch(1);
                        )
                    }}
                >
                    <Typography>검색</Typography>
                </Button>
            </Grid>

            {/* 이 아래는 검색 후에만 보이게 합니다. **/}

            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <Typography sx={{fontSize:"1.3rem", fontWeight:"700", display: 'inline'}}>검색결과</Typography>
                <Typography sx={{fontSize:"1.3rem", fontWeight:"700", display: 'inline', color:"gray", ml:"1rem"}}>N건</Typography>
            </Grid>
        </Grid>
    );
}

export default CustomerSearch;