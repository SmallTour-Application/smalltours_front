import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import Dashboard from "./Dashboard";
import {createTheme, ThemeProvider} from "@mui/material";
import CustomerSearch from "./CustomerSearch";
import PackageSearch from "./PackageSearch";
import ReservationSearch from "./ReservationSearch";
import CustomerInfo from "./CustomerInfo";
import PackageInfo from "./PackageInfo";
import EducationSearch from "./EducationSearch";
import ReservationInfo from "./ReservationInfo";
import EducationInfo from "./EducationInfo";
import Settings from "./Settings";
import Report from "./Report";

const AdminPanel = () => {
    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flex: 1 }}>
                    <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="customer/search" element={<CustomerSearch />} />
                        <Route path="package/search" element={<PackageSearch />} />
                        <Route path="reservation/search" element={<ReservationSearch />} />
                        {/*멤버 정보**/}
                        <Route path="customer/info/:value" element={<CustomerInfo />} />
                        {/* 패키지 정보 **/}
                        <Route path="package/info/:value" element={<PackageInfo />} />
                        <Route path="education/search" element={<EducationSearch />} />
                        {/* 예약 정보 **/}
                        <Route path="reservation/info/:value" element={<ReservationInfo />} />
                        {/** 교육정보 */}
                        <Route path="education/info/:value" element={<EducationInfo />} />
                        {/*settings**/}
                        <Route path={"settings"} element={<Settings/>} />
                        <Route path={"report"} element={<Report/>} />

                    </Routes>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default AdminPanel;