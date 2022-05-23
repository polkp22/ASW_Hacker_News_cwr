import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import News from './Components/News';
import SubmissionDetails from './Components/SubmissionDetails';
import Submissions from './Components/Submissions';
import Comments from './Components/Comments';
import UpvotedSubmissions from './Components/UpvotedSubmissions';
import UpvotedComments from './Components/UpvotedComments';

let session = {logged_user: "108072218470064233500"};

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Navbar user={session.logged_user}/>
          <main>
            <Routes>
              <Route path="/" element={<News/>} />
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
  return <Submissions session={session} id={id}/>;
}

function CommentsParamWrapper() {
  let {id} = useParams();
  return <Comments session={session} id={id}/>;
}

function ProfileParamWrapper() {
  let {id} = useParams();
  return <Profile id={id}/>;
}

export default App;