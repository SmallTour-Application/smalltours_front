import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import {
    Button, Collapse,
    createTheme, Divider,
    FormControl,
    Grid, InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    ThemeProvider,
    TextField
} from "@mui/material";
import styles from './css/TopNav.module.css';
import {useEffect, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import dayjs from "dayjs";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    clearAccessToken,
    setSearchEnd,
    setSearchKeyword, setSearchLocation,
    setSearchPeople, setSearchStart,
    setSearchTrigger,
    setSearchType
} from "../redux/actions";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cookies from "js-cookie"


const pages = ["강의", "테마별 강의", "소개", "검색"];

// 국내여행 지역 리스트
const domesticList = ["제주", "부산", "경상도", "전라도", "강원도", "수도권(서울/경기/인천)"];
// 해외여행 지역 리스트
const overseasList = ["동아시아", "유럽", "북미", "남미", "동남아", "중동", "아프리카"];


export default function TopBar() {

    const accessToken = useSelector((state) => state.accessToken);

    const role = useSelector((state) => state.role);

    const navigate = useNavigate();

    const dispatch = useDispatch();// redux dispatch

    const keyword = useSelector((state) => state.searchKeyword); // 검색어(리덕스)

    const type = useSelector((state) => state.searchType) // 검색타입(리덕스)

    const [clickLocation, setClickLocation] = useState(false); // 지역 설정 버튼을 클릭했을때 값 변경
    const [clickPeople, setClickPeople] = useState(false); // 지역 설정 버튼을 클릭했을때 값 변경
    const [clickDate, setClickDate] = useState(false); // 지역 설정 버튼을 클릭했을때 값 변경

    const [domestic, setDomestic] = useState(0); // 국내여행
    const [overseas, setOverseas] = useState(0); // 해외여행

    const location = useSelector((state) => state.searchLocation) // 지역(리덕스)
    const people = useSelector((state) => state.searchPeople) // 성인 인원수(리덕스)

    const startDate = useSelector((state) => state.searchStart) // 출발일
    const endDate = useSelector((state) => state.searchEnd) // 종료일
    const [minDate, setMinDate] = useState(0);


    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleChange = (event) => {
        dispatch(setSearchType(event.target.value));
    };

    // 지역 선택 클릭했을 때
    const handleChangeLocation = () => {
        const temp = clickLocation;
        setClickDate(false);
        setClickPeople(false);
        setClickLocation(false);
        setTimeout(() => {
            setClickLocation(!temp)
        }, 500)
        console.log("지역클릭");
    };

    // 인원수 클릭했을 때
    const handleChangePeople = () => {
        const temp = clickPeople;
        setClickDate(false);
        setClickLocation(false);
        setClickPeople(false);
        setTimeout(() => {
            setClickPeople(!temp)
        }, 500)
        console.log("인원수클릭");
    };

    // 날짜 클릭했을 때
    const handleChangeDate = () => {
        const temp = clickDate;
        setClickPeople(false);
        setClickLocation(false);
        setClickDate(false);
        setTimeout(() => {
            setClickDate(!temp)

        }, 500)
        console.log("인원수클릭");
    };

    // 국내여행
    const handleDomestic = () => {
        console.log("국내 클릭");
        if(domestic === 0){
            setOverseas(0);
            setDomestic(1);
        }else{
            setDomestic(0);
        }
    }

    // 해외
    const handleOverseas = () => {
        console.log("국내 클릭");
        if(overseas === 0){
            setDomestic(0);
            setOverseas(1);
        }else{
            setOverseas(0);
        }
    }

    const handleRegion = (param) => {
        console.log(param);
        dispatch(setSearchLocation(param))
    }

    // 날짜체크
    const dateCheck = (t, e) => {
        let check = null;
        if(t === null){
            check = startDate;
        }else{
            check = t;
        }
        //선택한 endDate가 startDate보다 같거나 이전이면 false
        console.log(
            `e.year = ${e.get("year")} , startDay.year = ${check.get("year")}`
        );
        console.log(
            `e.month = ${e.get("month")} , startDay.month = ${check.get("month")}`
        );
        console.log(
            `e.day = ${e.get("date")} , startDay.day = ${check.get("date")}`
        );
        if (e.get("year") < check.get("year")) {
            return false;
        }
        if (e.get("month") < check.get("month")) {
            return false;
        }
        if (e.get("date") < check.get("date")) {
            return false;
        }
        console.log('검사문제없음');
        return true;
    };

    // 날짜 바뀔때 체크
    useEffect(() => {
        console.log(`변화 : ${startDate}, ${endDate}`);
    }, [startDate, endDate])



    // 검색버튼 눌렀을 때 이동
    const handleSearch = () => {
        //window.location.replace(`/search?keyword=${keyword}&people=${adult}&start=${startDate.format('YYYY-MM-DD').toString()}&end=${endDate.format('YYYY-MM-DD').toString()}&loc=${region}&sort=0&type=0&page=1`)
        dispatch(setSearchTrigger(true)); // 검색 트리거를 true로 변경해 검색 컴포넌트에서 api 호출을 수행하도록 함
        navigate(`/search`)
    }

    // 로그아웃
    const logout = () => {
        dispatch(clearAccessToken()); // 리덕스에서 토큰 제거
        Cookies.remove('accessToken'); // 쿠키에 들어있던 accessToken 제거
        // 이동
        navigate("/login");
    }

    // 디버깅용
    useEffect(() => {
        console.log(`type value : ${type}`);
    },[])

    // 리덕스 초기화(직렬화된 값으로 초기화)
    useEffect(() => {
        if(startDate === null || endDate === null){
            dispatch(setSearchStart(dayjs().toISOString()))
            dispatch(setSearchEnd(dayjs().toISOString()))
        }
    }, [])


    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed" sx={{px: {xs:"3%", md:"10%", lg:"20%"} ,backgroundColor: "#FFFFFF",
                direction:"flex", justifyContent:"center", alignItems:"center", py:"0.3rem", zIndex:999
            }}
                display={"flex"} justifyContent={"center"} alignItmes={"center"}
            >
                <Container maxWidth="xl" sx={{padding:{xs:0, md:0}, height:"100%"}}>
                    <Toolbar disableGutters>
                        <span
                            noWrap
                            style={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}
                            onClick={() => navigate("/main")}
                        >
                            <b className={styles.font_logo}>SMALLTOUR</b>
                        </span>


                        <Grid direction="flex"
                             justifyContent="center"
                             alignItems="center"
                              container
                             sx={{
                                 flexGrow: 1,
                                 height: '100%',
                                 display: {xs: 'none', md: 'flex', alignItems: 'center'}
                             }}>
                            <Grid container item xs={12} justifyContent="center" alignItems="center" spacing={0}
                                  sx={{flexGrow: 1, height: '100%', px:"1rem"}}>
                                {/* 검색바 **/}
                                <Grid container
                                      item
                                      direction="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      xs={12}
                                      sx={{
                                          width: "100%",

                                          backgroundColor: "#85BEFF",
                                          aspectRatio: {lg:"10/1", xl:"13/1"},
                                          borderRadius: "50vw",
                                          boxShadow: 3,
                                          zIndex:2,
                                          px:"0.5rem"
                                      }}>
                                    {/* type **/}
                                    <Grid item
                                          direction="flex"
                                          justifyContent="center"
                                          alignItems="center"
                                          xs={2}
                                          sx={{display: "flex", alignItems: "center", justifyContent: "center", height: '50%',}}
                                    >
                                        <Box
                                            direction="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            sx={{
                                                width:"100%",
                                                height:"100%",
                                                borderRadius: '30px',
                                                backgroundColor: '#3972B3',
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                            }}
                                        >
                                            <Select
                                                onChange={handleChange}
                                                label="type"
                                                fullWidth
                                                value={type}
                                                defaultValue={type}

                                                sx={{
                                                    '& fieldset': {
                                                        border: 'none',
                                                        margin: 0,
                                                        padding: 0,
                                                        direction: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: "center"
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        color: '#fff',
                                                    },
                                                }}
                                            >
                                                <MenuItem value={0}>패키지</MenuItem>
                                                <MenuItem value={1}>가이드</MenuItem>
                                            </Select>
                                        </Box>
                                    </Grid>
                                    {/* 키워드 입력하는 곳 **/}
                                    <Grid item
                                          direction="flex"
                                          justifyContent="center"
                                          alignItems="center"
                                          xs={4}
                                          sx={{display: "flex", alignItems: "center", justifyContent: "center",
                                              borderRight: type === 0 ? 1 : 0, borderColor:"#D3D3D3", height: '50%'
                                          }}>
                                        <TextField
                                            onChange={(e) => dispatch(setSearchKeyword(e.target.value))}
                                            value={keyword}
                                            sx={{
                                                '& fieldset': {
                                                    border: 'none',
                                                    margin: 0,
                                                    padding: 0,
                                                    direction: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: "center"
                                                },
                                                '& .MuiInputBase-input': {
                                                    color: '#000',
                                                },
                                            }}
                                            id="outlined-basic" variant="outlined" />
                                    </Grid>

                                    {/* 지역 **/}
                                    <Grid item
                                          direction="flex"
                                          justifyContent="center"
                                          alignItems="center"
                                          xs={1}
                                          sx={{display: "flex", alignItems: "center", justifyContent: "center",
                                              borderRight: type === 0 ? 1 : 0, borderColor:"#D3D3D3", height: '50%'
                                          }}>
                                        {type === 0 && (
                                            <Box
                                                direction="flex"
                                                justifyContent="center"
                                                alignItems="center"
                                                sx={{backgroundColor:clickLocation === false ? '' : 'white',
                                                    borderRadius:'20px',
                                                    width:"80%",
                                                    height:"100%",
                                                    display: "flex", alignItems: "center", justifyContent: "center"
                                                }}
                                                onClick={() => handleChangeLocation()}
                                            >
                                                <Typography
                                                    sx={{color:"#000000", fontWeight:"700",cursor: 'default'}}
                                                >
                                                    지역
                                                </Typography>
                                            </Box>
                                        )}
                                    </Grid>

                                    {/* 인원 **/}
                                    <Grid item
                                          direction="flex"
                                          justifyContent="center"
                                          alignItems="center"
                                          xs={1}
                                          sx={{display: "flex", alignItems: "center", justifyContent: "center",
                                              borderRight: type === 0 ? 1 : 0, borderColor:"#D3D3D3", height: '50%',
                                          }}>
                                        {type === 0 && (
                                            <Box
                                                direction="flex"
                                                justifyContent="center"
                                                alignItems="center"
                                                sx={{backgroundColor:clickPeople === false ? '' : 'white',
                                                    borderRadius:'20px',
                                                    width:"80%",
                                                    height:"100%",
                                                    display: "flex", alignItems: "center", justifyContent: "center"
                                                }}
                                                onClick={() => handleChangePeople()}
                                            >
                                                <Typography
                                                    sx={{color:"#000000", fontWeight:"700", cursor: 'default'}}
                                                >
                                                    인원
                                                </Typography>
                                            </Box>
                                        )}

                                    </Grid>

                                    {/* 날짜 **/}
                                    <Grid item
                                          direction="flex"
                                          justifyContent="center"
                                          alignItems="center"
                                          xs={1}
                                          sx={{display: "flex", alignItems: "center", justifyContent: "center",
                                              height: '50%',
                                          }}>
                                        {type === 0 && (
                                            <Box
                                                direction="flex"
                                                justifyContent="center"
                                                alignItems="center"
                                                sx={{backgroundColor:clickDate === false ? '' : 'white',
                                                    borderRadius:'20px',
                                                    width:"80%",
                                                    height:"100%",
                                                    display: "flex", alignItems: "center", justifyContent: "center"
                                                }}
                                                onClick={() => handleChangeDate()}
                                            >
                                                <Typography
                                                    sx={{color:"#000000", fontWeight:"700", cursor: 'default'}}
                                                >
                                                    날짜
                                                </Typography>
                                            </Box>
                                        )}

                                    </Grid>
                                    {/* 검색버튼 **/}
                                    <Grid item
                                          direction="flex"
                                          justifyContent="center"
                                          alignItems="center"
                                          xs={3}
                                          sx={{display: "flex", alignItems: "center", justifyContent: "center", height: '80%',}}
                                    >
                                        <Box
                                            direction="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            sx={{
                                                width:"100%",
                                                height:"100%",
                                                borderRadius: '30vw',
                                                backgroundColor: '#3972B3',
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                            }}
                                        >
                                            <Button
                                                onClick={() => handleSearch()}
                                                fullWidth

                                                sx={{
                                                    '& fieldset': {
                                                        border: 'none',
                                                        margin: 0,
                                                        padding: 0,
                                                        direction: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: "center"
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        color: '#fff',
                                                    },
                                                }}
                                            >
                                                <Typography sx={{color:"#FFFFFF", fontWeight:"900"}}>
                                                    검색
                                                </Typography>
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>

                            </Grid>



                            {/* 지역 클릭하면 나오는 바 **/}

                            <Collapse in={clickLocation}>
                                <Grid container item xs={12} justifyContent="center" alignItems="center" spacing={0}
                                      sx={{flexGrow: 1, height: '100%', zIndex:1}}>

                                    <Grid container
                                          item
                                          direction="flex"
                                          justifyContent="center"
                                          alignItems="center"
                                          sx={{
                                              width: "30vw",
                                              height:"100%",
                                              backgroundColor: "#85BEFF",
                                              aspectRatio: "10/1",
                                              borderRadius: "5vw",
                                              px:"0.5rem"
                                          }}>
                                        {/* 국내해외 **/}
                                        <Grid container item xs={3}
                                              direction="flex"
                                              justifyContent="center"
                                              alignItems="center"
                                              sx={{height:"100%", display: "flex", alignItems: "center", justifyContent: "center",}}
                                        >
                                            <Grid item
                                                  direction="flex"
                                                  justifyContent="center"
                                                  alignItems="center"
                                                  xs={6}
                                                  sx={{display: "flex", alignItems: "center", justifyContent: "center",
                                                      borderRight: 1, borderColor:"#D3D3D3", height: '50%',
                                                  }}>
                                                <Box
                                                    direction="flex"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    sx={{backgroundColor:domestic === 0 ? '' : 'white',
                                                        borderRadius:'20px',
                                                        width:"80%",
                                                        height:"100%",
                                                        display: "flex", alignItems: "center", justifyContent: "center"
                                                    }}
                                                    onClick={() => handleDomestic()}
                                                >
                                                    <Typography
                                                        sx={{color:"#000000", fontWeight:"700", cursor: 'default'}}
                                                    >
                                                        국내
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item
                                                  direction="flex"
                                                  justifyContent="center"
                                                  alignItems="center"
                                                  xs={6}
                                                  sx={{display: "flex", alignItems: "center", justifyContent: "center",
                                                      height: '50%',
                                                  }}>
                                                <Box
                                                    direction="flex"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    sx={{backgroundColor:overseas === 0 ? '' : 'white',
                                                        borderRadius:'50px',
                                                        width:"80%",
                                                        height:"100%",
                                                        display: "flex", alignItems: "center", justifyContent: "center"
                                                    }}
                                                    onClick={() => handleOverseas()}
                                                >
                                                    <Typography
                                                        sx={{color:"#000000", fontWeight:"700", cursor: 'default'}}
                                                    >
                                                        해외
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>

                                        {domestic === 0 && overseas === 0 && (
                                            <Grid item xs={9}></Grid>
                                        )}

                                        {/* 국내 **/}
                                        {domestic === 1 && (
                                            <Grid container item xs={9}
                                                  direction="flex"
                                                  justifyContent="center"
                                                  alignItems="center"
                                                  sx={{
                                                      flexGrow: 1,
                                                      height: '80%',
                                                      display: {xs: 'none', md: 'flex', alignItems: 'center'},
                                                      backgroundColor:"#3972B3",
                                                      borderRadius:"50px",
                                                  }}>
                                                {domesticList.map((item) => (
                                                    <Box
                                                        direction="flex"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        sx={{backgroundColor:location === item ? 'white' : '',
                                                            borderRadius:'10px',
                                                            height:"80%",
                                                            display: "flex", alignItems: "center", justifyContent: "center"
                                                        }}
                                                        onClick={() => handleRegion(item)}
                                                    >
                                                        <Typography
                                                            sx={{color: location === item ? 'black' : 'white',
                                                                fontWeight: "700", cursor: 'default', mx:"0.3rem"}}
                                                        >
                                                            {item}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Grid>
                                        )}

                                        {/* 해외 **/}
                                        {overseas === 1 && (
                                            <Grid container item xs={9}
                                                  direction="flex"
                                                  justifyContent="center"
                                                  alignItems="center"
                                                  sx={{
                                                      flexGrow: 1,
                                                      height: '80%',
                                                      display: {xs: 'none', md: 'flex', alignItems: 'center'},
                                                      backgroundColor:"#3972B3",
                                                      borderRadius:"50px",
                                                  }}>
                                                {overseasList.map((item) => (
                                                    <Box
                                                        direction="flex"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        sx={{backgroundColor:location === item ? 'white' : '',
                                                            borderRadius:'10px',
                                                            height:"80%",
                                                            display: "flex", alignItems: "center", justifyContent: "center"
                                                        }}
                                                        onClick={() => handleRegion(item)}
                                                    >
                                                        <Typography
                                                            sx={{color: location === item ? 'black' : 'white',
                                                                fontWeight: "700", cursor: 'default', mx:"0.3rem"}}
                                                        >
                                                            {item}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Grid>
                                        )}
                                    </Grid>
                                </Grid>
                            </Collapse>


                            {/* 인원수 클릭하면 나오는 바 **/}

                            <Collapse in={clickPeople}>
                                <Grid container item xs={12} justifyContent="center" alignItems="center" spacing={0}
                                      sx={{flexGrow: 1, height: '100%', zIndex:1}}>
                                    <Grid container
                                          item
                                          direction="flex"
                                          justifyContent="center"
                                          alignItems="center"
                                          sx={{
                                              width: "80%",
                                              height:"100%",
                                              backgroundColor: "#85BEFF",
                                              aspectRatio: "3/1",
                                              borderRadius: "10px",
                                              px:"3rem",
                                              py:"1rem"
                                          }}>
                                        {/* 성인 **/}
                                        <Grid item xs={6}>
                                            <Typography sx={{color:"#000000", fontWeight:"900", fontSize:"1rem"}}>
                                                인원
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                disabled
                                                fullWidth
                                                variant="outlined"
                                                sx={{
                                                    "& .MuiInputBase-input.Mui-disabled": {
                                                        WebkitTextFillColor: "#000000",
                                                    },
                                                }}
                                                InputProps={{
                                                    inputProps: {
                                                        style: { textAlign: "center" },
                                                    },
                                                    disableUnderline: true,
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <IconButton onClick={(e) => dispatch(setSearchPeople(people - 1))}>
                                                                <RemoveIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={(e) => dispatch(setSearchPeople(people + 1))}>
                                                                <AddIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                value={people}
                                                onChange={(e) => dispatch(setSearchPeople(e.target.value))}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Collapse>


                            {/* 날짜선택 **/}

                            <Collapse in={clickDate}>
                                <Grid container item xs={12} justifyContent="center" alignItems="center" spacing={0}
                                      sx={{flexGrow: 1, height: '100%', zIndex:1}}>
                                    <Grid container
                                          item
                                          direction="flex"
                                          justifyContent="center"
                                          alignItems="center"
                                          sx={{
                                              width: "80%",
                                              height:"100%",
                                              backgroundColor: "#85BEFF",
                                              aspectRatio: "3/1",
                                              borderRadius: "10px",
                                              px:"3rem",
                                              py:"1rem"
                                          }}>
                                        {/* 시작일 **/}
                                        <Grid item xs={6}>
                                            <Typography sx={{color:"#000000", fontWeight:"900", fontSize:"1rem"}}>
                                                출발일
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                    label="출발일"
                                                    inputFormat="MM/DD/YYYY"
                                                    value={dayjs(startDate)}
                                                    onChange={(e) => {
                                                        const tempDate = dayjs(e)
                                                        if (e && tempDate < endDate) {
                                                            // 입력된 날짜가 종료일보다 이전이면
                                                            dispatch(setSearchStart(tempDate.toISOString()))
                                                            setMinDate(minDate + 1)
                                                        } else if(e) {
                                                            // 입력된 날짜가 종료일과 같거나 이후이면
                                                            dispatch(setSearchStart(tempDate.toISOString()))
                                                            setMinDate(minDate + 1)
                                                            dispatch(setSearchEnd(tempDate.toISOString()))  // endDate도 들어온 날짜로 변경
                                                        }
                                                    }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        {/* 종료일 **/}
                                        <Grid item xs={6}>
                                            <Typography sx={{color:"#000000", fontWeight:"900", fontSize:"1rem"}}>
                                                종료일
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} key={startDate}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                    key={minDate}
                                                    label="종료일"
                                                    inputFormat="MM/DD/YYYY"
                                                    value={dayjs(endDate)}
                                                    minDate={dayjs(startDate)}
                                                    disablePast
                                                    onChange={(e) => {
                                                        const tempDate = dayjs(e)
                                                        if (e && startDate > tempDate) {
                                                            // 입력된 날짜가 시작일보다 이전이면
                                                            dispatch(setSearchEnd(tempDate.toISOString()))
                                                        }else if(e) {
                                                            // 입력된 날짜가 시작일보다 이후이면
                                                            dispatch(setSearchEnd(tempDate.toISOString()))
                                                        }
                                                    }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Collapse>


                        </Grid>

                        <IconButton onClick={() => role === 0 ? navigate("/my/info") : navigate("/guide/main/info")}>
                            <AccountCircleIcon sx={{fontSize:"3rem"}} />
                        </IconButton>

                        <Box display="flex"
                             justifyContent="center"
                             alignItems="center"
                             onClick={() => accessToken ? logout() : navigate("/login")}
                             sx={{
                                 borderRadius: '15vw',
                                 border: 1,
                                 borderColor: "#A2A2A2",
                                 height: "100%",
                                 m: 0,
                                 px:"1rem",
                                 py:"0.5rem"
                             }}>
                            <Typography sx={{whiteSpace:"nowrap", color:"#000000"}}>{accessToken?"로그아웃":"로그인"}</Typography>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>

    );
}
