/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [colors, setColors] = useState([
    {
      name: 'red',
      isSelected: false
    },
    {
      name: 'blue',
      isSelected: false
    },
    {
      name: 'green',
      isSelected: false
    },
    {
      name: 'yellow',
      isSelected: false
    },
    {
      name: 'pink',
      isSelected: false
    }
  ]);

  const [selectedColors, setSelectedColors] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

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

  const checkGameWon = () => {
    return score === colors.length;
  }

  const handleClick = (e) => {
    if (checkGameOver(e.target.id)) {
      setGameOver(true);
      return;
    }

    setColors(prevColors => prevColors.map(color => {
      if (color.name === e.target.id) color.isSelected = true;
      return color;
    }));
    
    setSelectedColors(prev => [...prev, e.target.id]);
    
    setScore(prevScore => ++prevScore);
  }

  useEffect(() => {
    if (checkGameWon()) setGameWon(true);
  }, [score]);

  const handleNewGameClick = () => {
    setGameOver(false);
    setGameWon(false);
    setSelectedColors([]);
    setScore(0);
  }

  const elems = (
    <div>
      <h1>Score: {score}</h1>
      <main>
      {
        randomize(colors).map(color => {
          return <div className={color.name} id={color.name} key={color.name} onClick={handleClick}></div>
        })
      }
      </main>
      {gameOver && <h1>You Lose! Your score is {score}!</h1>}
      {gameWon && <h1>Contratulations! Your score is {score}!</h1>}
      {(gameOver || gameWon) && <button onClick={handleNewGameClick}>New Game</button>}
    </div>
  );

  return (
    elems
  )
}


export default App;
