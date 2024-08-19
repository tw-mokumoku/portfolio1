import './App.css';
import { getPrefersColorScheme } from './Function/ThemeController';
/* Page */
import { Home } from './Page/home';
/* react */
import React from 'react';
import { Routes, Route } from "react-router-dom";
import { DashBoard } from './Page/dashboard';
import { DiscordAuth } from './Page/discordoauth';
import { ServerEdit } from './Page/serveredit';
import { ServerView } from './Page/serverview';
import { TagView } from './Page/tagview';
import { SearchResult } from './Page/searchresult';

import './i18n/i18n';
import { Setting } from './Page/setting';
import { JPHome } from './Page/countryPages/jpHome';
import { ENHome } from './Page/countryPages/enHome';
import { Ranking } from './Page/ranking';

function App() {
    return (
        <div className="App" data-bs-theme={"dark"}>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/dashboard" element={<DashBoard />} />
                <Route exact path="/discordauth" element={<DiscordAuth />} />
                <Route exact path="/server/edit/:id" element={<ServerEdit />} />
                <Route exact path="/server/:id" element={<ServerView />} />
                <Route exact path="/tag/:name" element={<TagView />} />
                <Route path="/search" element={<SearchResult />} />
                <Route path="/ranking" element={<Ranking />} />
                <Route exact path="/setting" element={<Setting />} />
                <Route exact path="/jp" element={<JPHome />} />
                <Route exact path="/en" element={<ENHome />} />
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