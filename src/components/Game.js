import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const SIZE = 15;

function Game() {
  const [colours, setColours] = useState([]);
  // Stores all the selected colors in an array.
  const [selectedColors, setSelectedColors] = useState([]); 
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState(false);
  const [highscore, setHighscore] = useState(localStorage.getItem('highscore') || 0);
  const [hintShown, setHintShown] = useState(false);

  // useEffect to fetch the colors array from remote endpoint.
  useEffect(() => {
    async function getColours() {
      const response = await fetch(`https://apis.scrimba.com/hexcolors?count=${SIZE}`);
      const json = await response.json();
      const data = json.colors;
      setColours(data);
    }
    getColours();
  }, []);

  const randomize = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

  // The game is over when a selected color is selected again.
  const checkGameOver = (id) => {
    return (selectedColors.includes(id));
  }

  const handleClick = (e) => {
    // Check for game over condition
    if (checkGameOver(e.target.id)) {
      setGameOver(true);
      return;
    }
    
    // Push the color to selected colors array.
    setSelectedColors(prev => [...prev, e.target.id]);
    
    // Increase the score.
    if(!gameOver) setScore(prevScore => ++prevScore);
  }

  // useEffect to check for winning condition after every score update.
  useEffect(() => {
    if (score === SIZE) setGameWon(true);
    setHighscore(prev =>  score > prev ? score : prev);
  }, [score, colours]);

  // useEffect to store highscore in localstorage after every highscore state update.
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

  // Make the hihtShown state true for 500ms.
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

  return (
    colours.length > 0 ? elems : <h1 className='loading'>Loading...</h1>
  )
}

export default Game;