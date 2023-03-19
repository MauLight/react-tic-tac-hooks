import React, { useEffect, useState } from 'react';
import './App.css';
import { Block } from './components/block';
import { Patterns } from './components/patterns';

function App() {


  //Create state for board, current player, the result of the game, declaring a winner.
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("X");
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const [winner, setWinner] = useState(false);
  const [title, setTitle] = useState("TIC-TAC-TOE");
  const [gameStart, setGameStart] = useState(false);
  const [aiBoard, setAiBoard] = useState([]);

  useEffect(() => { //check if there's a winner or a tie after every render, also changes current player.
    //setGameStart(false);
    checkWinner();
    checkTie();

    /*
    if (player === "X") {
      setPlayer("O");
    }
    else {
      setPlayer("X");
    }; */

  }, [board]);

  useEffect(() => {
    if (result.state !== 'none') {
      alert(`Game Over! Winner is ${result.winner}`);
      setResult({ winner: "none", state: "none" });
    }
  });

  const chooseBlock = (block) => { //block = index of block pressed (position between 0 and 8).
    setGameStart(true);
    const playerBoard = board.map((val, index) => { //val = X or O chosen.
      if (index === block && val === "") {
        return player;
      }
      return val;
    });

    console.log(playerBoard);
    aiChoose(playerBoard);


    //aiChoose();

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
    const checkTie = board.every((block) => block !== "" && winner === false);

    if (checkTie) {
      console.log(board)
      setResult({
        winner: "No winners",
        state: "Tie"
      })
    }
  }


  const aiChoose = (arr) => {
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
    setGameStart(false);

    console.log(newArr);


    /*
        let randomNumber = Math.floor(Math.random() * 8) + 1;
        if (board[randomNumber] === "" && gameStart && player === "O") {
          const filterFunction = (value, index) => {
            if (value === "" && index === randomNumber) {
              return player;
            }
            else {
              return value;
            }
          }
          const aiBoard = board.map(filterFunction);
          console.log(aiBoard);
          setBoard(aiBoard);
          setGameStart(false); 
        } */
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
