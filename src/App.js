import React, {useState, useEffect} from 'react';
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
//stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';

function App() {

  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
          setWidth(window.innerWidth);
  }

  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const isMobile = (width <= 600);

  return (
    <div className="App">
        <Profile/>
        <BrowserRouter>
          <Navbar/>
          <main>
            <Routes>
              <Route path="/" element={<News/>} />
              <Route path="/threads" element={<Threads/>} />
              <Route path="/submissions" element={<Submissions/>} />
              <Route path="/comments" element={<Comments/>} />
              <Route path="/upvotedSubmissions" element={<UpvotedSubmissions/>} />
              <Route path="/upvotedComments" element={<UpvotedComments/>} />
            </Routes>
          </main>
        </BrowserRouter>
    </div>
  );
}

export default App;