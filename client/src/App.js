import { Route,Routes } from 'react-router-dom';
import { NavBar } from './components/navbar/navbar';
import { LandingPage } from './containers/landing/landing'
import { PostPage } from './containers/postpage/postpage';
import  FeedPage  from './containers/feedpage/FeedPage';


function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route exact path={'/'} element={<LandingPage/>}/>
        <Route exact path={'/post/:IdPost'} element={<PostPage/>}/>
        <Route exact path={'/feed'} element={<FeedPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
