import { Route,Routes } from 'react-router-dom';
import { NavBar } from './components/navbar/navbar';
import { LandingPage } from './containers/landing/landing'
import  FeedPage from './containers/feedpage/FeedPage.jsx'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route exact path={'/'} element={<LandingPage/>}/>
        <Route exact path={'/feed'} element={<FeedPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
