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
import LandingPage from "./containers/landingPage/landingPage.jsx";
import MyFeed from "./containers/feedPersonal/feedPersonal";
import Update from "./components/formUpdate/Update";
import FormEditProfile from "./components/FormEditProfile/FormEditProfile";
import ChangePasswordPage from "./containers/ChangePasswordPage/ChangePasswordPage.jsx";
import PanelAdm from "./containers/paneladmin/paneladmin";
import Posts from "./containers/paneladmin/posts/posts";
import Users from "./containers/paneladmin/users/users";
import BannedUsers from "./containers/paneladmin/users/bannedUsers";
import Categories from "./containers/paneladmin/categories/categories";
import Transactions from "./containers/paneladmin/transactions/transactions";



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path={'/'} element={[<NavBar/>,<LandingPage/>]}/>
        <Route exact path={'/paneladm/transactions'} element={[<NavBar/>,<Transactions/>]}/>
        <Route exact path={'/paneladm/bannedusers'} element={[<NavBar/>,<BannedUsers/>]}/>
        <Route exact path={'/paneladm/categories'} element={[<NavBar/>,<Categories/>]}/>
        <Route exact path={'/paneladm/users'} element={[<NavBar/>,<Users/>]}/>
        <Route exact path={'/paneladm/posts'} element={[<NavBar/>,<Posts/>]}/>
        <Route exact path={'/paneladm'} element={[<NavBar/>,<PanelAdm/>]}/>
        <Route exact path={'/profile/:profileId'} element={[<NavBar/>,<ProfilePage/>]}/>
        <Route exact path={'/profile/editProfile/:profileId'} element={[<NavBar/>,<FormEditProfile/>]}/>
        <Route exact path={'/profile/changePassword/:profileId'} element={[<NavBar/>,<ChangePasswordPage/>]}/>
        <Route exact path={'/create'} element={[<NavBar/>,<PostForm/>]}/>
        <Route exact path={'/edit/:idPost'} element={[<NavBar/>,<Update/>]}/>
        <Route exact path={'/post/:idPost'} element={[<NavBar/>,<DetailPage/>]}/>
        <Route exact path={'/login'} element={<LoginPage/>}/>
        <Route exact path={'/register'} element={<RegisterPage/>}/>
        <Route exact path={"/forgot"} element={<ForgotPage/>} />
        <Route exact path={"/reset/:id"} element={<ResetPage/>} />
        <Route exact path={'/feed'} element={[<NavBar/>, <FeedPage/>]}/>
        <Route exact path={'/myfeed'} element={[<NavBar/>, <MyFeed/>]}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
};


export default App;