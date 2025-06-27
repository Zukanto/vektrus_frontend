import React from 'react';
import {Sidebar} from './components/App/sidebar';
import ContentPlanner from './components/planner/ContentPlanner';
import {CalendarProvider} from './context/CalendarContext';
import {ModalProvider} from './context/ModalContext';
import {PostProvider} from './context/PostContext';

function App() {
    return (
        <ModalProvider>
            <PostProvider>
                <CalendarProvider>
                    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-white to-[#F4FCFE]">
                        <div className="flex row h-full">
                            <div className={`z-20 inline-flex h-full`}>
                                <Sidebar/>
                            </div>
                            <ContentPlanner/>
                        </div>
                    </div>

                </CalendarProvider>
            </PostProvider>
        </ModalProvider>
    );
}

export default App;