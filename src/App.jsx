import { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './pages/Home.jsx';
import Study from './pages/Study.jsx';
import StudyOverview from './pages/StudyOverview.jsx';
import StudyReview from './pages/StudyReview.jsx';
import Create from './pages/Create.jsx';

export const JsonDataContext = createContext(null);

export default function App() {
    const [jsonData, setJsonData] = useState(null);
    return (
        <JsonDataContext.Provider value={{jsonData, setJsonData}}>
            <BrowserRouter basename="/reviewer-webapp">
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="create" element={<Create />} />
                        <Route path="study" element={<Study />} />
                        <Route path="study/:url" element={<StudyOverview />} />
                        <Route path="study/:url/review" element={<StudyReview />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </JsonDataContext.Provider>
    )
}
