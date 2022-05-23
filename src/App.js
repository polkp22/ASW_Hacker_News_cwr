import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import News from './Components/News';
import Threads from './Components/Threads';
import SubmissionDetails from './Components/SubmissionDetails';
import Submissions from './Components/Submissions';
import Comments from './Components/Comments';
import UpvotedSubmissions from './Components/UpvotedSubmissions';
import UpvotedComments from './Components/UpvotedComments';
/* import SubmissionListItem from './Components/SubmissionListItem'; */

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Navbar user="108072218470064233500"/>
          <main>
            <Routes>
              <Route path="/" element={<News/>} />
              <Route path="/threads" element={<Threads/>} />
              <Route path="/submissions/:id/" element={<SubmissionsParamWrapper/>} />
              <Route path="/submissions/user/:id/" element={<UserSubmissionsParamWrapper/>} />
              <Route path="/comments/:id/" element={<CommentsParamWrapper/>} />
              <Route path="/upvotedSubmissions" element={<UpvotedSubmissions/>} />
              <Route path="/upvotedComments" element={<UpvotedComments/>} />
              <Route path="/profile/:id/" element={<ProfileParamWrapper/>} />
            </Routes>
          </main>
        </BrowserRouter>
    </div>
  );
}

function SubmissionsParamWrapper() {
  let {id} = useParams();
  return <SubmissionDetails id={id}/>;
}

function UserSubmissionsParamWrapper() {
  let {id} = useParams();
  return <Submissions id={id}/>;
}

function CommentsParamWrapper() {
  let {id} = useParams();
  return <Comments id={id}/>;
}

function ProfileParamWrapper() {
  let {id} = useParams();
  return <Profile id={id}/>;
}

export default App;