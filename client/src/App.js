import { Route,Routes } from 'react-router-dom';
import { NavBar } from './components/navbar/navbar';
import { LandingPage } from './containers/landing/landing'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route exact path={'/'} element={<LandingPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
