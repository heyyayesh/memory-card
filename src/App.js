/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import React, { useEffect, useState } from 'react';

const SIZE = 12;

function App() {
  // const [colors, setColors] = useState([
  //   {
  //     name: 'red',
  //     isSelected: false
  //   },
  //   {
  //     name: 'blue',
  //     isSelected: false
  //   },
  //   {
  //     name: 'green',
  //     isSelected: false
  //   },
  //   {
  //     name: 'yellow',
  //     isSelected: false
  //   },
  //   {
  //     name: 'pink',
  //     isSelected: false
  //   },
  //   {
  //     name: 'aqua',
  //     isSelected: false
  //   },
  //   {
  //     name: 'grey',
  //     isSelected: false
  //   },
  //   {
  //     name: 'black',
  //     isSelected: false
  //   },
  //   {
  //     name: 'orange',
  //     isSelected: false
  //   },
  // ]);
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
  const [highscore, setHighscore] = useState(0);

  const randomize = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const checkGameOver = (id) => {
    return (selectedColors.includes(id))
  }

  const handleClick = (e) => {
    if (checkGameOver(e.target.id)) {
      setGameOver(true);
      return;
    }
    
    setSelectedColors(prev => [...prev, e.target.id]);
    
    setScore(prevScore => ++prevScore);
  }

  useEffect(() => {
    if (score === SIZE) setGameWon(true);
    setHighscore(prev =>  score > prev ? score : prev);
  }, [score, colours]);

  const handleNewGameClick = () => {
    setGameOver(false);
    setGameWon(false);
    setSelectedColors([]);
    setScore(0);
  }

  const handleColorBlindBtnClick = () => {
    setColorBlindMode(prev => !prev);
  }

  const elems = (
    <div className='container'>
      <button className='colorblindBtn' onClick={handleColorBlindBtnClick}>Colorblind mode: {colorBlindMode ? 'on' : 'off'}</button>
      <h3>Highscore: {highscore}</h3>
      <h1>Score: {score}</h1>
      <main>
      {
        randomize(colours).map(color => {
          return <div style={{backgroundColor: `${color.value}`}} id={color.value} key={color.value} onClick={handleClick}>{colorBlindMode && <p>{color.value}</p>}</div>
        })
      }
      </main>
      {gameOver && <h1>You Lose! Your score is {score}!</h1>}
      {gameWon && <h1>Contratulations! Your score is {score}!</h1>}
      {(gameOver || gameWon) && <button className='newGameBtn' onClick={handleNewGameClick}>New Game</button>}
    </div>
  );

  console.log(colours);
  return (
    colours.length > 0 ? elems : <h1 className='loading'>Loading...</h1>
  );
}

export default App;
