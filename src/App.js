import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navs from './components/Navs';
import Home from './pages/Home';
import Starred from './pages/Starred';

function App() {
  // return <div className="App">Hi</div>;
  return (
    <div>
      <Navs />
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/starred">
          <Starred />
        </Route>
        <Route>Error 404</Route>
      </Switch>
    </div>
  );
}

export default App;
