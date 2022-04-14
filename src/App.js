/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const SIZE = 15;

function App() {
  const [colours, setColours] = useState([]);

  useEffect(() => {
    async function getColours() {
      const response = await fetch(`https://apis.scrimba.com/hexcolors?count=${SIZE}`);
      const json = await response.json();
      const data = json.colors;
      setColours(data);
    }
    getColours();
  }, []);

  const [selectedColors, setSelectedColors] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState(false);
  const [highscore, setHighscore] = useState(localStorage.getItem('highscore') || 0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [hintShown, setHintShown] = useState(false);

  const randomize = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const checkGameOver = (id) => {
    return (selectedColors.includes(id));
  }

  const handleClick = (e) => {
    if (checkGameOver(e.target.id)) {
      setGameOver(true);
      return;
    }
    
    setSelectedColors(prev => [...prev, e.target.id]);
    
    if(!gameOver) setScore(prevScore => ++prevScore);
  }

  useEffect(() => {
    if (score === SIZE) setGameWon(true);
    setHighscore(prev =>  score > prev ? score : prev);
  }, [score, colours]);

  useEffect(() => {
    localStorage.setItem('highscore', highscore);
  }, [highscore]);

  const handleNewGameClick = () => {
    setGameOver(false);
    setGameWon(false);
    setSelectedColors([]);
    setScore(0);
  }

  const handleColorBlindBtnClick = () => {
    setColorBlindMode(prev => !prev);
  }

  const handleLetsGoClick = () => {
    setShowInstructions(false);
  }

  const handleHintClick = () => {
    setHintShown(true);
    setTimeout(() => {
      setHintShown(false);
    }, 500);
  }

  const elems = (
    <div className='container'>
      {gameWon && <Confetti />}
      <div className='header'>
        <h3>Highscore: {highscore}</h3>
        <button className='colorblindBtn' onClick={handleColorBlindBtnClick}>Colorblind mode: {colorBlindMode ? 'On' : 'Off'}</button>
        <button className='hint' onClick={handleHintClick}>Hint</button>
      </div>

      <h1>Score: {score}</h1>
      <main>
      {
        randomize(colours).map(color => {
          return(
            <div
              style={{backgroundColor: `${color.value}`}}
              id={color.value}
              key={color.value}
              onClick={handleClick}
              className={hintShown && selectedColors.includes(color.value) ? 'hinted' : ''}
            >
              {colorBlindMode && <p>{color.value}</p>}
            </div>
          )
        })
      }
      </main>

      {gameOver && <h1>You Lose! Your score is {score}!</h1>}
      {gameWon && <h1>Contratulations! Your score is {score}!</h1>}
      {(gameOver || gameWon) && <button className='newGameBtn' onClick={handleNewGameClick}>New Game</button>}
    </div>
  );

  const instructions = (
    <div className="instructions">
      <h1>Instructions</h1>
      <p>Click on a colour to increase your score but you can't click on a colour twice! Let's test your memory!</p>
      <button onClick={handleLetsGoClick}>Let's Go!</button>
    </div>
  );

  console.log(hintShown);
  return (
    showInstructions ? instructions :
    colours.length > 0 ? elems : <h1 className='loading'>Loading...</h1>
  );
}

export default App;
