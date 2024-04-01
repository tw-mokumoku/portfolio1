import './App.css';
import { getPrefersColorScheme } from './Function/ThemeController';
/* Page */
import { Home } from './Page/home';
/* react */
import React from 'react';
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="App" data-bs-theme={getPrefersColorScheme()}>
            <Routes>
                <Route exact path="/" element={<Home />} />
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

