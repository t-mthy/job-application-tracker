import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import JobLogPage from './pages/JobLogPage';
import JobCreatePage from './pages/JobCreatePage';
import JobEditPage from './pages/JobEditPage';

function App() {
    // Common ancestor state
    const [editJobState, setEditJobState] = useState([]);

    return (
        <div className="App">
            <BrowserRouter>
                <header className="App-header">
                    <h1>Job Application Tracker</h1>
                    <Nav />
                </header>

                <main>
                    <section>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route
                                path="/log"
                                element={
                                    <JobLogPage setEditJob={setEditJobState} />
                                }
                            />
                            <Route
                                path="/log-create"
                                element={<JobCreatePage />}
                            />
                            <Route
                                path="/log-edit"
                                element={
                                    <JobEditPage editJobObj={editJobState} />
                                }
                            />
                        </Routes>
                    </section>
                </main>

                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
