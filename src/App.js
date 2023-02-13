import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
// import Navs from './components/Navs';
import Home from './pages/Home';
import Starred from './pages/Starred';
import Show from './pages/Show';

//  This object will be provided as global data to other styled components using context api

const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};
function App() {
  // return <div className="App">Hi</div>;
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/starred">
          <Starred />
        </Route>

        <Route exact path="/show/:id">
          <Show />
        </Route>

        <Route>
          <div>Not found</div>
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
