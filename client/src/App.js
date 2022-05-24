import { Route,Routes } from 'react-router-dom';
import { NavBar } from './components/navbar/navbar';
import { LandingPage } from './containers/landing/landing'
import { PostPage } from './containers/postpage/postpage';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route exact path={'/'} element={<LandingPage/>}/>
        <Route exact path={'/post/:IdPost'} element={<PostPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
