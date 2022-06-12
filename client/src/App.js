// Dependencies
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router-dom";
import "react-loader-spinner";
// Files
import NavBar from './components/navbar/navbar';
import FeedPage from './containers/feedpage/FeedPage';
import PostForm from './components/postform/postform.jsx';
import ProfilePage from './containers/profilePage/profilePage';
import DetailPage from './containers/detailPage/detailPage';
import LoginPage from "./containers/loginpage/LoginPage.jsx";
import RegisterPage from "./containers/RegisterPage/RegisterPage.jsx";
import ForgotPage from "./containers/ForgotPage/ForgotPage.jsx";
import ResetPage from "./containers/ResetPage/ResetPage.jsx";
import MyFeed from "./containers/feedPersonal/feedPersonal";
import Update from "./components/formUpdate/Update";



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path={'/'} element={[<NavBar/>,<FeedPage/>]}/>
        <Route exact path={'/profile/:profileId'} element={[<NavBar/>,<ProfilePage/>]}/>
        <Route exact path={'/create'} element={[<NavBar/>,<PostForm/>]}/>
        <Route exact path={'/edit/:idPost'} element={[<NavBar/>,<Update/>]}/>
        <Route exact path={'/post/:idPost'} element={[<NavBar/>,<DetailPage/>]}/>
        <Route exact path={'/login'} element={<LoginPage/>}/>
        <Route exact path={'/register'} element={<RegisterPage/>}/>
        <Route exact path={"/forgot"} element={<ForgotPage/>} />
        <Route exact path={"/reset/:id"} element={<ResetPage/>} />
        <Route exact path={'/feed'} element={<MyFeed/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
};


export default App;