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
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword/ResetPassword.jsx";
import MyFeed from "./containers/feedPersonal/feedPersonal";
import Update from "./components/formUpdate/Update";
import PanelAdm from "./containers/paneladmin/paneladmin";
import Posts from "./containers/paneladmin/posts/posts";
import Users from "./containers/paneladmin/users/users";
import Categories from "./containers/paneladmin/categories/categories";



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path={'/paneladm/categories'} element={[<NavBar/>,<Categories/>]}/>
        <Route exact path={'/paneladm/users'} element={[<NavBar/>,<Users/>]}/>
        <Route exact path={'/paneladm/posts'} element={[<NavBar/>,<Posts/>]}/>
        <Route exact path={'/paneladm'} element={[<NavBar/>,<PanelAdm/>]}/>
        <Route exact path={'/'} element={[<NavBar/>,<FeedPage/>]}/>
        <Route exact path={'/profile/:profileId'} element={[<NavBar/>,<ProfilePage/>]}/>
        <Route exact path={'/create'} element={[<NavBar/>,<PostForm/>]}/>
        <Route exact path={'/edit/:idPost'} element={[<NavBar/>,<Update/>]}/>
        <Route exact path={'/post/:idPost'} element={[<NavBar/>,<DetailPage/>]}/>
        <Route exact path={'/login'} element={<LoginPage/>}/>
        <Route exact path={'/register'} element={<RegisterForm/>}/>
        <Route exact path={"/forgot"} element={<ForgotPassword/>} />
        <Route exact path={"/reset/:id"} element={<ResetPassword/>} />
        <Route exact path={'/feed'} element={<MyFeed/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
};


export default App;