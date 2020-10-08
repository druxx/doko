import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Routes from './routes/Routes'
import NavigationBar from './components/NavigationBar';

function App() {
  
  return (
    <HashRouter>
    <div>
      <NavigationBar />
      <Switch>
        {Routes.map((route) => (
          <Route exact path={route.path} key={route.path}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </div>
    </HashRouter>
  );



}

export default App;
