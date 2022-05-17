import React from 'react';
import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import News from './Components/News';
import Threads from './Components/Threads';
import Submissions from './Components/Submissions';
import Comments from './Components/Comments';
import UpvotedSubmissions from './Components/UpvotedSubmissions';
import UpvotedComments from './Components/UpvotedComments';


function App() {
  return (
    <div className="App">
       <Profile/>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<News/>} />
            <Route path="/threads" element={<Threads/>} />
            <Route path="/submissions" element={<Submissions/>} />
            <Route path="/comments" element={<Comments/>} />
            <Route path="/upvotedSubmissions" element={<UpvotedSubmissions/>} />
            <Route path="/upvotedComments" element={<UpvotedComments/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;