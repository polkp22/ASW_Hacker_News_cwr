import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import News from './Components/News';
import Threads from './Components/Threads';
import Submissions from './Components/Submissions';
import Comments from './Components/Comments';
import UpvotedSubmissions from './Components/UpvotedSubmissions';
import UpvotedComments from './Components/UpvotedComments';
/* import SubmissionListItem from './Components/SubmissionListItem'; */

function App() {
  return (
    <div className="App">
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
              <Route path="/profile/:id/" element={<ProfileParamWrapper/>} />
            </Routes>
          </main>
        </BrowserRouter>
    </div>
  );
}

function ProfileParamWrapper() {
  let {id} = useParams();
  return <Profile id={id}/>;
}

export default App;