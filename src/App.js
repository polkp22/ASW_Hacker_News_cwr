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
import SubmissionListItem from './Components/SubmissionListItem';


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
            <Route path="/submissionListItem" element={<SubmissionListItem 
              id = '12345'
              googleId = '67890'
              title = 'My first ever submission'
              type = 'url'
              username = 'Paquito El Chocolatero'
              points = {10}
              createdAt = '6 days ago'
              comments = {4}
              url = 'https://google.com'
              upvoted = {true}

              isMobile = {true}

              handleCommentClick = {(id)=>{console.log("Show details for submission ", id)}}
              handleAuthorClick = {(googleId) => {console.log("Show profile for user ", googleId)}}
            />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;