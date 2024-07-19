import './App.css';
import { getPrefersColorScheme } from './Function/ThemeController';
/* Page */
import { Home } from './Page/home';
/* react */
import React from 'react';
import { Routes, Route } from "react-router-dom";
import { DashBoard } from './Page/dashboard';
import { DiscordAuth } from './Page/discordoauth';

function App() {
    return (
        <div className="App" data-bs-theme={getPrefersColorScheme()}>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/dashboard" element={<DashBoard />} />
                <Route exact path="/discordauth" element={<DiscordAuth />} />
            </Routes>
        </div>
    );
}
/*
                <Route exact path="/Search" element={<Search />} />
                <Route exact path="/Server" element={<Server />} />
                <Route exact path="/Review" element={<Review />} />
                <Route exact path="/Updates" element={<Updates />} />
                <Route exact path="/DailyActiveRatio" element={<DailyActiveRatio />} />
                <Route exact path="/MonthlyActiveRatio" element={<MonthlyActiveRatio />} />
                <Route exact path="/YearlyActiveRatio" element={<YearlyActiveRatio />} />
*/

export default App;