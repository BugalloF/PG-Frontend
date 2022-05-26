import { Route,Routes } from 'react-router-dom';
import { NavBar } from './components/navbar/navbar';
import { PostPage } from './containers/postpage/postpage';
import  FeedPage  from './containers/feedpage/FeedPage';
import { PostForm } from './components/postform/postform';
import  LoginPage  from './containers/loginpage/LoginPage';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path={'/'} element={<FeedPage/>}/>
        <Route exact path={'/post/:IdPost'} element={<PostPage/>}/>
        <Route exact path={'/create'} element={<PostForm/>}/>
        <Route exact path={'/'} element={[<LandingPage/>, <NavBar/>]}/>
        <Route exact path={'/post/:IdPost'} element={[<PostPage/>, <NavBar/>]}/>
        <Route exact path={'/feed'} element={[<FeedPage/>,<NavBar/>]}/>
        <Route exact path={'/login'} element={<LoginPage/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
