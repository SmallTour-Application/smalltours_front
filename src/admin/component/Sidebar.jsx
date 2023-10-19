import React, { useEffect } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Drawer,
    Typography,
    Divider,
    ListItemIcon, createTheme, ThemeProvider
} from '@mui/material';
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import MailIcon from '@mui/icons-material/Mail';
import { setIsLoading } from "../../redux/actions";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CategoryIcon from '@mui/icons-material/Category';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import HandymanIcon from '@mui/icons-material/Handyman';
import AssessmentIcon from '@mui/icons-material/Assessment';

const drawerWidth = 240;

const Sidebar = () => {

    const accessToken = useSelector((state) => state.accessToken);
    const role = useSelector((state) => state.role);
    const isLoading = useSelector((state) => state.isLoading);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    useEffect(() => {
        // 이미 로그인 상태인 경우 메인 페이지로 이동
        if (accessToken) {
            if(role === 0){
                navigate("/main")
            }else if(role === 2){
                navigate("/guide/main/info")
            }
        }
    },[accessToken])

    useEffect(() => {
        // 이미 로그인 상태인 경우 메인 페이지로 이동
        if (accessToken) {
            if(role === 0){
                navigate("/main")
            }else if(role === 2){
                navigate("/guide/main/info")
            }
        }
    },[])

    return (
        <ThemeProvider theme={theme}>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h6" sx={{
                        fontWeight: 900,
                        fontSize: "2rem",
                        textAlign: "left",
                        color: "#6CB0FF"
                    }}>SMALLTOUR</Typography>
                </Box>
                <Divider />
                <List>
                    {['고객', '패키지 및 상품', '예약', '배너', '부가기능', '보고서', '설정', '대시보드'].map((text, index) => {
                        const paths = [
                            "/admin/customer/search",
                            "/admin/package/search",
                            "/admin/reservation/search",
                            "/admin/banner",
                            "/admin/feature",
                            "/admin/report",
                            "/admin/settings",
                            "/admin/dashboard",
                        ];
                        return (
                            <ListItem
                                button
                                key={text}
                                onClick={() => navigate(paths[index])}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#405261',
                                        '& .MuiTypography-root': { // ListItemText 내부의 Typography에 접근
                                            color: '#ffffff'
                                        }
                                    }
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: '#B0B0B0', // 기본 아이콘 색상을 설정하였습니다. 원하는 색으로 바꿔주세요.
                                        '&:hover': {
                                            color: '#ffffff'
                                        }
                                    }}
                                >
                                    {index === 0 && <PeopleAltIcon />}
                                    {index === 1 && <CategoryIcon />}
                                    {index === 2 && <BookOnlineIcon />}
                                    {index === 3 && <ViewCarouselIcon />}
                                    {index === 4 && <HandymanIcon />}
                                    {index === 5 && <AssessmentIcon />}
                                    {index === 6 && <SettingsIcon />}
                                    {index === 7 && <DashboardIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    })}
                </List>
            </Drawer>
        </ThemeProvider>

    );
}

export default Sidebar;