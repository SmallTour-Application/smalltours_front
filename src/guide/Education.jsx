import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import {
    Button,
    Slider,
    Box,
    ThemeProvider,
    createTheme,
    Tooltip,
    Modal,
    RadioGroup,
    Radio,
    Paper,
    MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import Grid from '@mui/material/Grid';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";

function ValueLabelComponent(props) {
    const { children, open, value } = props;

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={formatTime(value)}>
            {children}
        </Tooltip>
    );
}

function Education(props) {

    const accessToken = useSelector((state) => state.accessToken); // 저장되어있는 accessToken

    const navigate = useNavigate();

    const playerWrapperRef = useRef();
    const playerRef = useRef(null);

    const [result, setResult] = useState(null);

    const [videoUrl, setVideoUrl] = useState("");

    const [playing, setPlaying] = useState(false);
    const [played, setPlayed] = useState(0);
    const [seeking, setSeeking] = useState(false);
    const [volume, setVolume] = useState(0.3);
    const [maxPlayed, setMaxPlayed] = useState(0); // 최대로 본 시점

    const [duration, setDuration] = useState(0); // 전체영상길이
    const [currentTime, setCurrentTime] = useState(0); // 현재재생위치

    const [chgValue, setChgValue] = useState(true);

    // 교육리스트
    const [eduList, setEduList] = useState(null);
    const [eduId, setEduId] = useState(0);
    const [eduStart, setEduStart] = useState("");
    const [eduEnd, setEduEnd] = useState("");
    const [eduIdx, setEduIdx] = useState(99);


    // 현재 재생 위치 가져오기
    const handleTimeChange = (event, newValue) => {
        setCurrentTime(newValue);
    };

    // 전체 영상 길이 가져오기
    const handleDuration = (duration) => {
        setDuration(duration);
    };


    const handlePlayPause = () => {
        setPlaying(!playing);
    }

    const handleSeek = (_, newValue) => {
        setSeeking(false);
        // 사용자가 시크바를 이용하여 재생 위치를 변경할 때 호출
        // newValue가 최대 시간(maxPlayed)보다 작거나 같다면, 재생 위치 변경
        // 그렇지 않다면, maxPlayed 위치로 이동
        // 시간 변경 시 마다 문제 체크
        if (newValue <= maxPlayed) {
            console.log(`handleSeek ${newValue}`)
            setCurrentTime(newValue);
            playerRef.current.seekTo(newValue);
        } else {
            playerRef.current.seekTo(maxPlayed);
        }
    }

    const handleVolumeChange = (_, newValue) => {
        setVolume(newValue);
    }

    const handleProgress = () => {
        if (chgValue === true) {
            setChgValue(false);
            playerRef.current.seekTo(currentTime);
        } else {
            setCurrentTime(playerRef.current.getCurrentTime());
        }
        if (currentTime > maxPlayed) {
            setMaxPlayed(playerRef.current.getCurrentTime());
        }
    };

    // 플레이어가 준비되면 재생위치를 옮김
    const handleReady = () => {
        playerRef.current.seekTo(maxPlayed);
    };

    // 전체화면 만들기
    const toggleFullScreen = (element) => {
        if (!element) {
            console.log("full스크린안됨");
            alert("풀스크린을 지원하지 않는 브라우저입니다. 이음코딩은 크롬 브라우저 최신버전을 권장합니다.")
            return;
        }
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }

    useEffect(() => {
        if (currentTime > 1 && currentTime === duration) {
            alert("시청을 마쳤습니다.")
        }
    }, [currentTime])


    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    useEffect(() => {
        if (currentTime > 1 && currentTime === duration) {
            alert("시청을 마쳤습니다.")
        }
    }, [currentTime])

    // 교육리스트 가져오기
    const getEdu = async () => {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/education/list`, null, {
                headers: {'Authorization': `${accessToken}`,}
            }
        ).then((res) => {
            console.log("교육리스트 가져오기")
            console.log(res)
                if (res.data) {
                    const temp = [];
                    res.data.forEach((item) => {
                        if(item.state === 0 || item.state === 2 || item.state === 3){
                            temp.push(item)
                        }
                    }
                    )
                    setEduList(temp)
                }
            }
        ).catch((err) => {
            console.log(err)
        })
    }

    // 시청결과 전송하기
    const videoResult = async (id, paramMax) => {
        const hours = Math.floor(paramMax / 3600);
        const minutes = Math.floor((paramMax % 3600) / 60);
        const seconds = Math.floor(paramMax % 60);
        console.log(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/education/log/view/result`,
            {
                lastView: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
                educationId: id
            },
            {headers: {Authorization: `${accessToken}`,}}
        )
        console.log(response)
        console.log("서버에 마지막 시간 전송 완료")

    }

    // maxplayed 변경 시 서버로 마지막 시간 전송
    useEffect(() => {
        if (maxPlayed > 1) {
            // if(chgCount < 1){
            //     if (playerRef && playerRef.current) {
            //         console.log(`최초 시작지점 설정 : ${maxPlayed}`)
            //         setCurrentTime(maxPlayed-1)
            //         playerRef.current.seekTo(maxPlayed-1);
            //         chgCount++;
            //     }
            // }
            videoResult(eduId, maxPlayed);
            // maxplayed 보다 테스트 시간이 크면 테스트 했는지 체크합니다.

        }
    }, [maxPlayed])
    // 동영상 정보 가져오기
    const getVideo = async (id) => {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/education/view?id=${id}`, null, {
                headers: {'Authorization': `${accessToken}`,}
            }
        ).then((res) => {
                if (res.data) {
                    setVideoUrl(res.data.videoPath)
                    let [hours, minutes, seconds] = res.data.educationLogDTO.lastView.split(":").map(Number);
                    setMaxPlayed(hours * 3600 + minutes * 70 + seconds);
                    setCurrentTime(hours * 3600 + minutes * 60 + seconds)
                }
            }
        )
    }
    useEffect(() => {
        if (accessToken) {
            getEdu()
        }
    }, [accessToken])

    // videoUrl이 바뀌면 영상 재생 정지
    useEffect(() => {
        setPlaying(false)
    }, [videoUrl])

    return (
        <Grid container item xs={12}>
            <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems={"center"} sx={{mb: "2rem"}}>
                <Typography sx={{fontSize: "2rem", fontWeight: "700"}}>
                    온라인 교육
                </Typography>
            </Grid>
            {/* 교육 목록 넣을 곳 **/}
            <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems={"center"} sx={{mb: "2rem"}}>
                <FormControl sx={{ m: 1, minWidth: 200 }}> {/* 너비를 늘려줍니다 */}
                    <InputLabel id="demo-simple-select-label">교육선택</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={eduIdx}
                        label="교육선택"
                        onChange={(e) => {
                            setEduIdx(e.target.value)
                            setEduId(eduList[parseInt(e.target.value)].id)
                            setEduStart(eduList[e.target.value].startDay)
                            setEduEnd(eduList[e.target.value].endDay)
                        }}
                    >
                        {eduList && eduList.map((item, idx) => (
                            <MenuItem key={idx} value={idx}>{item.title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    sx={{
                        ml: "1rem",
                        backgroundColor: 'skyblue',
                        ':hover': {
                            backgroundColor: 'deepskyblue',
                        },
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        display: 'block', // 버튼을 블록 요소로 만들어 전체 너비를 차지하게 합니다.
                    }}
                    onClick={() => {
                        if (eduId === 99) {
                            alert("교육을 선택해주세요.")
                        } else {
                            getVideo(eduId)
                        }
                    }}
                >
                    <Typography>선택 교육 듣기</Typography>
                </Button>
            </Grid>
            {eduStart !== "" && eduEnd !== "" && (
                <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems={"center"} sx={{mb: "2rem"}}>
                    <Typography sx={{fontSize: "1rem", fontWeight: "700", color: "#A2A2A2"}}>
                        수강기간 : {eduStart} ~ {eduEnd}
                    </Typography>
                </Grid>
            )}
            {videoUrl && (
                <Grid item container xs={12}>
                    <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems={"center"} sx={{mb: "2rem"}}>
                        <div ref={playerWrapperRef}>
                            <Box sx={{width: "100%", aspectRatio: "16/9"}}>
                                <ReactPlayer
                                    url={videoUrl}
                                    ref={playerRef}
                                    playing={playing}
                                    controls={false}
                                    volume={volume}
                                    width={"100%"}
                                    height={"100%"}
                                    onDuration={handleDuration}
                                    onProgress={handleProgress}
                                />
                            </Box>
                        </div>
                    </Grid>
                    <Grid item xs={10} display={"flex"} justifyContent="center" alignItems={"center"}>
                        <Button variant="contained" color="primary" onClick={handlePlayPause} sx={{mr: "1rem"}}>
                            {playing ? <PauseIcon/> : <PlayArrowIcon/>}
                        </Button>
                        <Slider
                            components={{
                                ValueLabel: ValueLabelComponent
                            }}
                            min={0}
                            max={duration}
                            step={1}
                            value={currentTime}
                            onChange={handleSeek}
                            valueLabelDisplay="auto"
                        />
                        <Button variant="contained" color="primary"
                                onClick={() => playerWrapperRef.current && toggleFullScreen(playerWrapperRef.current)}>full</Button>
                    </Grid>
                    <Grid item xs={2} display={"flex"} justifyContent="center" alignItems={"center"}>
                        <VolumeDownIcon/>
                        <Slider value={volume} onChange={handleVolumeChange}
                                min={0}
                                max={0.999999}
                                step={0.0001}
                                aria-labelledby="continuous-slider"/>
                        <VolumeUpIcon/>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
}

export default Education;