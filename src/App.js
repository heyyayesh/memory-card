import './App.css';
import React, { useState } from 'react';
import Game from './components/Game';
import Instructions from './components/Instructions';

function App() {
  const [showInstructions, setShowInstructions] = useState(true);
  
  const handleLetsGoClick = () => {
    setShowInstructions(false);
  }

  return (
    // If showInstructions is true render instructions page else render main page.
    showInstructions ? <Instructions handleClick={handleLetsGoClick} /> : <Game />
  );
}

export default App;
