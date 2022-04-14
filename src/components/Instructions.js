import React from 'react';

function Instructions({handleClick}) {
  return (
    <div className="instructions">
      <h1>Instructions</h1>
      <p>Click on a colour to increase your score but you can't click on a colour twice! Let's test your memory!</p>
      <button onClick={handleClick}>Let's Go!</button>
    </div>
  );
}

export default Instructions;