import { Route,Routes } from 'react-router-dom';
import { NavBar } from './components/navbar/navbar';
import  PostPage  from './containers/detailPage/detailPage';
import  FeedPage  from './containers/feedpage/FeedPage';
import { PostForm } from './components/postform/postform';
import  LoginPage  from './containers/loginpage/LoginPage';
import { BrowserRouter } from "react-router-dom";
import ProfilePage from './containers/profilePage/profilePage';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path={'/'} element={[<NavBar/>,<FeedPage/>]}/>
        <Route exact path={'/profile/:profileId'} element={[<ProfilePage/>, <NavBar/>]}/>
        <Route exact path={'/create'} element={[<NavBar/>,<PostForm/>]}/>
        <Route exact path={'/post/:IdPost'} element={[<PostPage/>, <NavBar/>]}/>
        <Route exact path={'/login'} element={<LoginPage/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
