import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./components/App/landingPage";
import ChatPage from "./components/App/chatPage";
import HubPage from "./components/App/hubPage";
import ProfilePage from "./components/App/profilePage";
import ContentPlanner from "./contentPlanner";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/chatPage" element={<ChatPage/>} />
            <Route path="/hubPage" element={<HubPage/>} />
            <Route path="/profilePage" element={<ProfilePage/>} />
            <Route path="/contentPlanner" element={<ContentPlanner/>} />
        </Routes>
    </BrowserRouter>
)
