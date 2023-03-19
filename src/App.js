import React, { useState } from 'react';
import './App.css';
import { Block } from './components/block';

function App() {

  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("X");

  const chooseBlock = (block) => {
    setBoard(board.map((val, index) => {
      if (index === block && val === "") {
        return player;
      }
      return val;
    })
    );

    if (player === "X") {
      setPlayer("O")
    }
    else {
      setPlayer("X")
    };

  }


  return (
    <div className="App">
      <div className='board'>
        <div className='row'>
          <Block val={board[0]} chooseBlock={() => {chooseBlock(0)}} />
          <Block val={board[1]} chooseBlock={() => {chooseBlock(1)}} />
          <Block val={board[2]} chooseBlock={() => {chooseBlock(2)}} />
        </div>
        <div className='row'>
          <Block val={board[3]} chooseBlock={() => {chooseBlock(3)}} />
          <Block val={board[4]} chooseBlock={() => {chooseBlock(4)}} />
          <Block val={board[5]} chooseBlock={() => {chooseBlock(5)}} />
        </div>
        <div className='row'>
          <Block val={board[6]} chooseBlock={() => {chooseBlock(6)}} />
          <Block val={board[7]} chooseBlock={() => {chooseBlock(7)}} />
          <Block val={board[8]} chooseBlock={() => {chooseBlock(8)}} />
        </div>
      </div>
    </div>
  );
}

export default App;
