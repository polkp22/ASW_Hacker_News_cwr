import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import News from './Components/News';
import SubmissionDetails from './Components/SubmissionDetails';
import Submissions from './Components/Submissions';
import Comments from './Components/Comments';
import UpvotedSubmissions from './Components/UpvotedSubmissions';
import UpvotedComments from './Components/UpvotedComments';

const session = {logged_user: "108072218470064233500"};

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Navbar user={session.logged_user}/>
          <main>
            <Routes>
              <Route path="/" element={<News/>} />
              <Route path="/submissions/:id/" element={<SubmissionsParamWrapper/>} />
              <Route path="/submissions/user" element={<Submissions session={session} id={session.logged_user}/>} />
              <Route path="/submissions/user/:id/" element={<UserSubmissionsParamWrapper/>} />
              <Route path="/comments" element={<Comments session={session} id={session.logged_user}/>} />
              <Route path="/comments/:id/" element={<CommentsParamWrapper/>} />
              <Route path="/upvotedSubmissions" element={<UpvotedSubmissions id={session.logged_user}/>} />
              <Route path="/upvotedComments" element={<UpvotedComments id={session.logged_user}/>} />
              <Route path="/profile" element={<Profile session={session} />} />
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
  return <Profile session={session} id={id}/>;
}

export default App;