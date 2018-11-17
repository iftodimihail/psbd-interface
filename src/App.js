import React, { Component } from 'react';
import AppLayout from "./components/App";
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <AppLayout/>
      </BrowserRouter>
    );
  }
}

export default App;
