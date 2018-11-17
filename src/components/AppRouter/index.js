import React from 'react';
import Home from '../../containers/Home';
import Bills from '../../containers/Bills';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class AppRouter extends React.Component {
  render() {
    return (
      <Router>
          <Route exact path="/" component={Home} />]
      </Router>
    );
  }
}

export default AppRouter;
