// Dependencies
import React from "react";
import {Route, Routes} from "react-router-dom";
import "react-loader-spinner";
// Files
import NavBar from './components/navbar/navbar';
import FeedPage from './containers/feedpage/FeedPage';
import PostForm from './components/postform/postform.jsx';
import {BrowserRouter} from "react-router-dom";
import ProfilePage from './containers/profilePage/profilePage';
import DetailPage from './containers/detailPage/detailPage';
import LoginPage from "./containers/loginpage/LoginPage.jsx";
import RegisterForm from "./components/RegisterForm/RegisterForm.jsx";



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path={'/'} element={[<NavBar/>,<FeedPage/>]}/>
        <Route exact path={'/profile/:profileId'} element={[<NavBar/>,<ProfilePage/>]}/>
        <Route exact path={'/create'} element={[<NavBar/>,<PostForm/>]}/>
        <Route exact path={'/post/:idPost'} element={[<NavBar/>,<DetailPage/>]}/>
        <Route exact path={'/login'} element={<LoginPage/>}/>
        <Route exact path={'/register'} element={<RegisterForm/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
};


export default App;