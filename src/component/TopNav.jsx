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


const pages = ["강의", "테마별 강의", "소개", "검색"];

// 국내여행 지역 리스트
const domesticList = ["제주", "부산", "경상도", "전라도", "강원도", "수도권(서울/경기/인천)"];
// 해외여행 지역 리스트
const overseasList = ["동아시아", "유럽", "북미", "남미", "동남아", "중동", "아프리카"];


export default function TopBar() {

    const [sort, setSort] = useState("기본값");

    const [clickLocation, setClickLocation] = useState(false); // 지역 설정 버튼을 클릭했을때 값 변경
    const [clickPeople, setClickPeople] = useState(false); // 지역 설정 버튼을 클릭했을때 값 변경
    const [clickDate, setClickDate] = useState(false); // 지역 설정 버튼을 클릭했을때 값 변경

    const [domestic, setDomestic] = useState(0); // 국내여행
    const [overseas, setOverseas] = useState(0); // 해외여행

    const [region, setRegion] = useState("") // 지역
    const [adult, setAdult] = useState(0); // 성인 인원수
    const [child, setChild] = useState(0); // 어린이
    const [infant, setInfant] = useState(0); // 유아
    const [startDate, setStartDate] = useState(dayjs())
    const [endDate, setEndDate] = useState(dayjs())


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
        setSort(event.target.value);
    };

    // 지역 선택 클릭했을 때
    const handleChangeLocation = () => {
        console.log("지역클릭");
        if(clickLocation === false){
            setClickLocation(true);
        }else{
            setClickLocation(false);
        }
    };

    // 인원수 클릭했을 때
    const handleChangePeople = () => {
        console.log("인원수클릭");
        if(clickPeople === false){
            setClickPeople(true);
        }else{
            setClickPeople(false);
        }
    };

    // 날짜 클릭했을 때
    const handleChangeDate = () => {
        console.log("날짜 클릭");
        if(clickDate === false){
            setClickDate(true);
        }else{
            setClickDate(false);
        }
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
        setRegion(param);
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
        if(!dateCheck(null, endDate)){
            setEndDate(startDate);
        }
    }, [startDate, endDate])


    return (
        <ThemeProvider theme={theme}>
            <AppBar position="relative" sx={{px: {xs:"3%", md:"10%", lg:"20%"} ,backgroundColor: "#FFFFFF",
                direction:"flex", justifyContent:"center", alignItems:"center", py:"0.3rem", zIndex:999
            }}
                display={"flex"} justifyContent={"center"} alignItmes={"center"}
            >
                <Container maxWidth="xl" sx={{padding:{xs:0, md:0}, height:"100%"}}>
                    <Toolbar disableGutters>
                        <span
                            noWrap
                            component="a"
                            href="/"
                            style={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}
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
                                      sx={{
                                          width: "100%",

                                          backgroundColor: "#85BEFF",
                                          aspectRatio: {lg:"10/1", xl:"13/1"},
                                          borderRadius: "30px",
                                          boxShadow: 3,
                                          zIndex:2,
                                          px:"0.5rem"
                                      }}>
                                    {/* sort **/}
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
                                                label="정렬"
                                                fullWidth
                                                defaultValue={sort}

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
                                                <MenuItem value="기본값">기본값</MenuItem>
                                                <MenuItem value="최신순">최신순</MenuItem>
                                                <MenuItem value="평점순">평점순</MenuItem>
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
                                              borderRight: 1, borderColor:"#D3D3D3", height: '50%'
                                          }}>
                                        <TextField
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
                                              borderRight: 1, borderColor:"#D3D3D3", height: '50%'
                                          }}>
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
                                    </Grid>
                                    {/* 지역 **/}
                                    <Grid item
                                          direction="flex"
                                          justifyContent="center"
                                          alignItems="center"
                                          xs={1}
                                          sx={{display: "flex", alignItems: "center", justifyContent: "center",
                                              borderRight: 1, borderColor:"#D3D3D3", height: '50%',
                                          }}>
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
                                                borderRadius: '30px',
                                                backgroundColor: '#3972B3',
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                            }}
                                        >
                                            <Button
                                                onChange={handleChange}
                                                label="정렬"
                                                fullWidth
                                                defaultValue={sort}

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
                                              borderRadius: "40px",
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
                                                        sx={{backgroundColor:region === item ? 'white' : '',
                                                            borderRadius:'10px',
                                                            height:"80%",
                                                            display: "flex", alignItems: "center", justifyContent: "center"
                                                        }}
                                                        onClick={() => handleRegion(item)}
                                                    >
                                                        <Typography
                                                            sx={{color: region === item ? 'black' : 'white',
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
                                                        sx={{backgroundColor:region === item ? 'white' : '',
                                                            borderRadius:'10px',
                                                            height:"80%",
                                                            display: "flex", alignItems: "center", justifyContent: "center"
                                                        }}
                                                        onClick={() => handleRegion(item)}
                                                    >
                                                        <Typography
                                                            sx={{color: region === item ? 'black' : 'white',
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
                                              width: "30vw",
                                              height:"100%",
                                              backgroundColor: "#85BEFF",
                                              aspectRatio: "3/1",
                                              borderRadius: "40px",
                                              px:"3rem",
                                              py:"1rem"
                                          }}>
                                        {/* 성인 **/}
                                        <Grid item xs={6}>
                                            <Typography sx={{color:"#000000", fontWeight:"900", fontSize:"1rem"}}>
                                                성인(만 13세 이상)
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
                                                            <IconButton onClick={(e) => setAdult(adult - 1)}>
                                                                <RemoveIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={(e) => setAdult(adult + 1)}>
                                                                <AddIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                value={adult}
                                                onChange={(e) => setAdult(e.target.value)}
                                            />
                                        </Grid>

                                        {/* 어린이 **/}
                                        <Grid item xs={6}>
                                            <Typography sx={{color:"#000000", fontWeight:"900", fontSize:"1rem"}}>
                                                어린이(만 2~12세)
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
                                                            <IconButton onClick={(e) => setChild(child - 1)}>
                                                                <RemoveIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={(e) => setChild(child + 1)}>
                                                                <AddIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                value={adult}
                                                onChange={(e) => setChild(e.target.value)}
                                            />
                                        </Grid>

                                        {/* 유아 **/}
                                        <Grid item xs={6}>
                                            <Typography sx={{color:"#000000", fontWeight:"900", fontSize:"1rem"}}>
                                                유아(만 2세 미만)
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
                                                            <IconButton onClick={(e) => setInfant(infant - 1)}>
                                                                <RemoveIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={(e) => setInfant(infant + 1)}>
                                                                <AddIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                value={adult}
                                                onChange={(e) => setInfant(e.target.value)}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Collapse>


                            {/* 인원수 클릭하면 나오는 바 **/}

                            <Collapse in={clickDate}>
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
                                              aspectRatio: "3/1",
                                              borderRadius: "40px",
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
                                                    inputFormat="MM-DD-YYYY"
                                                    value={startDate}
                                                    onChange={(e) => {
                                                        if (dateCheck(e, endDate)) {
                                                            setStartDate(e);
                                                        }else {
                                                            setStartDate(e);
                                                            setEndDate(e);
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
                                        <Grid item xs={6}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                    label="종료일"
                                                    inputFormat="MM/DD/YYYY"
                                                    value={endDate}
                                                    minDate={startDate} // 출발일 이후의 날짜만 선택 가능하도록 설정
                                                    disablePast // 출발일 이전의 날짜는 선택할 수 없도록 설정
                                                    onChange={(e) => {
                                                        console.log(e);
                                                        if (startDate <= e) {
                                                            console.log("여기걸림")
                                                            setEndDate(e);
                                                        }else {
                                                            setEndDate(startDate);
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
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{width:"10%", aspectRatio: "3/1"}}>
                            <Box display="flex"
                                 justifyContent="center"
                                 alignItems="center"
                                 onClick={() => console.log(endDate)}
                                 sx={{
                                     borderRadius: '15vw',
                                     border: 1,
                                     borderColor: "#000000",
                                     height: "100%",
                                     m: 0,
                                     width:"100%"
                                 }}>
                                <b className={styles.font_menu}>로그인</b>
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>

    );
}
