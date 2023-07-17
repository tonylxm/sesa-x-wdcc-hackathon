import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
