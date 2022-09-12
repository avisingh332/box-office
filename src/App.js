import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';

function App() {
  // return <div className="App">Hi</div>;
  return (
    <Switch>
      <Route path="/first"> This is my page</Route>
      <Route path="/second">This is my second page</Route>
      <Route>This is Home page</Route>
    </Switch>
  );
}

export default App;
