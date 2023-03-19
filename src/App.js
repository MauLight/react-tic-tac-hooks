import React, { useEffect, useState } from 'react';
import './App.css';
import { Block } from './components/block';
import { Patterns } from './components/patterns';

function App() {

  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const [winner, setWinner] = useState(false);

  useEffect(() => {
    checkWinner();
    checkTie();

    if (player === "X") {
      setPlayer("O")
    }
    else {
      setPlayer("X")
    };

  }, [board]);

  useEffect(() => {
    if (result.state !== 'none') {
      alert(`Game Over! Winner is ${result.winner}`);
      setResult({ winner: "none", state: "none" });
    }
  })

  const chooseBlock = (block) => {
    setBoard(board.map((val, index) => {
      if (index === block && val === "") {
        return player;
      }
      return val;
    })
    );
  }

  const checkWinner = () => {
    Patterns.forEach((pattern) => {
      const possibleWinner = board[pattern[0]];
      if (possibleWinner === "") return;
      let foundWinningPattern = true;
      pattern.forEach((val) => {
        if (board[val] !== possibleWinner) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        setWinner(true);
        setResult({ winner: player, state: "won" });
        setBoard(["", "", "", "", "", "", "", "", ""]);
        setWinner(false);

      }

    })
  }

  const checkTie = () => {
    //let filled = false;
    const checkTie = board.every((block) => block !== "" && winner == false);

    if (checkTie) {
      console.log(board)
      setResult({
        winner: "No winners",
        state: "Tie"
      })
    }
  }


  return (
    <div className="App">
      <div className='board'>
        <div className='row'>
          <Block val={board[0]} chooseBlock={() => { chooseBlock(0) }} />
          <Block val={board[1]} chooseBlock={() => { chooseBlock(1) }} />
          <Block val={board[2]} chooseBlock={() => { chooseBlock(2) }} />
        </div>
        <div className='row'>
          <Block val={board[3]} chooseBlock={() => { chooseBlock(3) }} />
          <Block val={board[4]} chooseBlock={() => { chooseBlock(4) }} />
          <Block val={board[5]} chooseBlock={() => { chooseBlock(5) }} />
        </div>
        <div className='row'>
          <Block val={board[6]} chooseBlock={() => { chooseBlock(6) }} />
          <Block val={board[7]} chooseBlock={() => { chooseBlock(7) }} />
          <Block val={board[8]} chooseBlock={() => { chooseBlock(8) }} />
        </div>
      </div>
    </div>
  );
}

export default App;
