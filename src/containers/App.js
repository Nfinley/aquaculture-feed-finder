import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from './home/Home';
import FeedDashboard from './feed-view/FeedDashboard';
import logo from '../fish.png';
// import './App.css';


const App = () => (
  <div className="App">
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Aquaculture Feed Finder</h1>
      </header>
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/feed" component={FeedDashboard} />
    </main>
  </div>
)

export default App
