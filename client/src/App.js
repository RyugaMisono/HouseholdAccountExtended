import React from 'react';
import './App.css';

import AppNavbar from "./components/AppNavbar"
import AddItem from './components/AddItem'
import MonthlyItems from './components/MonthlyItems';
import ColorDefinition from './components/ColorDefinition';

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <div style={{ width: "80%", margin: "10px auto" }}>
        <AddItem />
        <MonthlyItems />
        <ColorDefinition />
      </div>
    </div>
  );
}

export default App;
