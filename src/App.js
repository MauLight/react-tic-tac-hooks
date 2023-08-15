import React, { useEffect, useState } from 'react';
import './App.css';
import { Block } from './components/block';
import { Patterns } from './components/patterns';

function App() {


  //Create state for board, current player, the result of the game, declaring a winner.
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [winner, setWinner] = useState(false);
  const [title, setTitle] = useState("TIC-TAC-TOE");
  const [gameStart, setGameStart] = useState(true);

  const chooseBlock = (block) => { //block = index of block pressed (position between 0 and 8).

    if (gameStart) {
      setGameStart(false);
      const filterBoard1 = board.filter((elem, i) => elem === "X" && i === block)
      const filterBoard2 = board.filter((elem, i) => elem === "O" && i === block)

      if (filterBoard1.length > 0 || filterBoard2.length > 0) {
        setGameStart(true)
        return -1
      }

      const playerBoard = board.map((val, index) => { //val = X or O chosen.
        if (index === block && val === "") {
          return "X";
        }
        return val;
      });

      setBoard(playerBoard)

      const chosenWinner = checkWinner(playerBoard, 'human')

      if (!chosenWinner && !checkTie(playerBoard)) {
        console.log("AI THINKING STUFF")
        setTimeout(() => setTitle("AI IS THINKING..."), 1000);
        setTimeout(() => aiChoose(playerBoard), 3000);
        setTimeout(() => setTitle("YOUR TURN"), 3500);
      }
      else {
        return -1;
      }


    }
  }

  const checkWinner = (board, player) => {

    console.log(board)

    let winningPattern = false
    let veredict = false

    Patterns.forEach(pattern => {

      const possibleWinner = board[pattern[0]]
      if (possibleWinner === '') {
        return
      }

      winningPattern = true

      pattern.forEach(val => {
        if (board[val] !== possibleWinner) {
          winningPattern = false
        }
      })

      if (winningPattern) {
        veredict = true
        alert(`Winner is ${player}`)
        setWinner(true)
      }

    })

    return veredict

  }

  const checkAboutToWin = (board, player) => {
    let auxArr = []

    Patterns.forEach((pattern) => {
      let aux = 0
      const possibleWinner = board[pattern[0]];
      if (possibleWinner === "") {
        return false
      }

      pattern.forEach((val) => {

        if (board[val] === possibleWinner) {
          aux++
        }

        if (aux === 2) {
          console.log('almost win!') //Notification?
          auxArr = [
            {
              value: board[pattern[0]],
              index: pattern[0]
            },
            {
              value: board[pattern[1]],
              index: pattern[1]
            },
            {
              value: board[pattern[2]],
              index: pattern[2]
            },
          ]
        }

      })
    })

    return auxArr.filter(elem => elem.value === '')
  }

  const checkAboutToWinAi = (board) => {

    let auxArr = []

    Patterns.forEach((pattern) => {
      let aux = 0

      pattern.forEach((val) => {

        if (board[val] === 'O') {
          aux++
        }

        if (aux === 2) {
          console.log('Ai almost wins!') //Notification?
          auxArr = [
            {
              value: board[pattern[0]],
              index: pattern[0]
            },
            {
              value: board[pattern[1]],
              index: pattern[1]
            },
            {
              value: board[pattern[2]],
              index: pattern[2]
            },
          ]
        }
      })
    })

    return auxArr.filter(elem => elem.value === '')
  }

  const checkTie = (board) => {

    let veredict = false

    const checkTie = board.every((block) => block !== "" && winner === false);

    if (checkTie) {
      alert("It's a tie, no winners!")
      setTitle("TIC-TAC-TOE");
      setWinner(true)
      veredict = true
    }

    return veredict

  }


  const aiChoose = (arr) => {

    const emptySpots = [];
    let newArr = arr.map(elem => elem);

    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i] === "") {
        emptySpots.push(i);
      }
    };

    const aiAboutToWin = checkAboutToWinAi(newArr)

    if (aiAboutToWin.length > 0) {
      const move = parseInt(aiAboutToWin[0].index)
      newArr[move] = "O"
    }

    const aboutToWin = checkAboutToWin(newArr)

    if (aboutToWin.length > 0) {
      const move = parseInt(aboutToWin[0].index)
      newArr[move] = "O"
    }
    else {
      let randomNumber = Math.floor(Math.random() * emptySpots.length);
      newArr[emptySpots[randomNumber]] = "O"
    }

    if (!checkWinner(newArr, 'AI') && !checkTie(newArr)) {
      setBoard(newArr);
      setGameStart(true);
    }
  }

  useEffect(() => {
    if (winner) {

      setTitle("TIC-TAC-TOE");
      setBoard(["", "", "", "", "", "", "", "", ""]);
      setWinner(false);
      setGameStart(true);

    }
  }, [winner])

  return (
    <div className="Game">
      <div className='title'>
        <h1>{title}</h1>
      </div>
      <div className='board rounded-3'>

        <div className='boardrow  rounded-3'>
          <Block val={board[0]} chooseBlock={() => { chooseBlock(0) }} />
          <Block val={board[1]} chooseBlock={() => { chooseBlock(1) }} />
          <Block val={board[2]} chooseBlock={() => { chooseBlock(2) }} />
        </div>
        <div className='boardrow  rounded-3'>
          <Block val={board[3]} chooseBlock={() => { chooseBlock(3) }} />
          <Block val={board[4]} chooseBlock={() => { chooseBlock(4) }} />
          <Block val={board[5]} chooseBlock={() => { chooseBlock(5) }} />
        </div>
        <div className='boardrow  rounded-3'>
          <Block val={board[6]} chooseBlock={() => { chooseBlock(6) }} />
          <Block val={board[7]} chooseBlock={() => { chooseBlock(7) }} />
          <Block val={board[8]} chooseBlock={() => { chooseBlock(8) }} />
        </div>
      </div>
    </div>
  );
}

export default App;
