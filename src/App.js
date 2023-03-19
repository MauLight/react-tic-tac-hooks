import React, { useEffect, useState } from 'react';
import './App.css';
import { Block } from './components/block';
import { Patterns } from './components/patterns';

function App() {


  //Create state for board, current player, the result of the game, declaring a winner.
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("");
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const [winner, setWinner] = useState(false);
  const [title, setTitle] = useState("TIC-TAC-TOE");
  const [gameStart, setGameStart] = useState(true);
  const [aiBoard, setAiBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [winnerBoard, setWinnerBoard] = useState(["", "", "", "", "", "", "", "", ""]);

  useEffect(() => { //check if there's a winner or a tie after every render, also changes current player.
    setWinnerBoard(board);
    checkWinner();
    checkTie();

  }, [board, winnerBoard]);

  const chooseBlock = (block) => { //block = index of block pressed (position between 0 and 8).

    if (gameStart) {
      setGameStart(false);
      setPlayer("Human");
      const playerBoard = board.map((val, index) => { //val = X or O chosen.
        if (index === block && val === "") {
          return "X";
        }
        return val;
      });

      console.log(playerBoard);
      setBoard(playerBoard);

      if (!winner) {
        setTimeout(() => setTitle("AI IS THINKING..."), 1000);
        setTimeout(() => aiChoose(playerBoard), 3000);
        setTimeout(() => setTitle("YOUR TURN"), 4500);
      }
      else {
        return;
      }


    }
  }

  const checkWinner = () => {

    Patterns.forEach((pattern) => {
      const possibleWinner = winnerBoard[pattern[0]];
      if (possibleWinner === "") return;
      let foundWinningPattern = true;
      pattern.forEach((val) => {
        if (winnerBoard[val] !== possibleWinner) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        setWinner(true);
        setResult({ winner: player, state: "won" });


        console.log(player);
        console.log(result.winner);
        alert(`Game Over! Winner is ${player}`);
        setResult({ winner: "none", state: "none" });

        setTitle("TIC-TAC-TOE");
        setBoard(["", "", "", "", "", "", "", "", ""]);
        setWinner(false);
        setGameStart(true);
        foundWinningPattern = false;

      }

    })
  }

  const checkTie = () => {
    //let filled = false;
    const checkTie = board.every((block) => block !== "" && winner === false);

    if (checkTie) {
      console.log(board)
      alert("It's a tie, no winners!")
      setResult({
        winner: "No winners",
        state: "Tie"
      })
      setResult({ winner: "none", state: "none" });

      setTitle("TIC-TAC-TOE");
      setBoard(["", "", "", "", "", "", "", "", ""]);
      setWinner(false);
      setGameStart(true);

    }
  }


  const aiChoose = (arr) => {

    console.log(winner);
    setPlayer("AI");

    const emptySpots = [];
    let newArr = arr.map(elem => elem);

    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i] === "") {
        emptySpots.push(i);
      }
    };

    console.log(emptySpots);

    let randomNumber = Math.floor(Math.random() * emptySpots.length);
    console.log(randomNumber);
    console.log(emptySpots[randomNumber]);

    newArr[emptySpots[randomNumber]] = "O";
    console.log(newArr[emptySpots[randomNumber]]);
    setBoard(newArr);
    setAiBoard(newArr);
    setGameStart(true);

    console.log(newArr);
  }

  return (
    <div className="App">
      <div className='title'>
        <h1>{title}</h1>
      </div>
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
