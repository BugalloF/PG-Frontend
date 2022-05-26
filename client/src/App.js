import { Route,Routes } from 'react-router-dom';
import { NavBar } from './components/navbar/navbar';
import { PostPage } from './containers/postpage/postpage';
import  FeedPage  from './containers/feedpage/FeedPage';
import { PostForm } from './components/postform/postform';


function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route exact path={'/'} element={<FeedPage/>}/>
        <Route exact path={'/post/:IdPost'} element={<PostPage/>}/>
        <Route exact path={'/create'} element={<PostForm/>}/>
        
      </Routes>
    </div>
  );
}

export default App;
