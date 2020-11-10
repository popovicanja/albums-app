import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Albums from './pages/Albums/Albums';
import Artist from './pages/Artist/Artist';
import NotFound from './pages/NotFound/NotFound';

import './App.css';
import './styles/global.css';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Albums />
        </Route>
        <Route path="/artist/:artistId">
          <Artist />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
