import React from 'react';
import Home from '../../containers/Home';
import Bills from '../../containers/Bills';
import { Switch, Route } from "react-router-dom";

class AppRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/facturi" component={Bills} />
      </Switch>
    );
  }
}

export default AppRouter;
