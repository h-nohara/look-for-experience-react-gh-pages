import React, { Component } from 'react';
import { render } from 'react-dom';

import './App.css'
import TopNavBar from './components/TopNavBar';
import BottomNavBar from './components/BottomNavBar';
import Feed from './components/Feed';

export function App() {
  return (
    <div id="wholeContainer">
      <TopNavBar />
      <Feed />
      <BottomNavBar />
    </div>
  );
}

