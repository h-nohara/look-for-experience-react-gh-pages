import React, { Component, createContext } from 'react';

import './App.css'
import TopNavBar from './components/TopNavBar';
import BottomNavBar from './components/BottomNavBar';
import Feed from './components/Feed';


export const AppContext = React.createContext({
  feedFilter: {},
  setFeedFilter: (newVal) => { },
});

export const AppContextProvider = ({ children }) => {
  const context = React.useContext(AppContext);
  const [feedFilter, setFeedFilter] = React.useState(context.feedFilter);
  const contextForChildren = {
    feedFilter, setFeedFilter
  };

  return (
    <AppContext.Provider value={contextForChildren}>
      {children}
    </AppContext.Provider>
  );
};

export function App() {
  return (
    <div id="wholeContainer">
      <AppContextProvider>
        <TopNavBar />
        <Feed />
      </AppContextProvider>
      <BottomNavBar />
    </div>
  );
}