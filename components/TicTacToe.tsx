import {useState} from 'react';

// Square that will build up the board
function Square( {value, onSquareClick} ) {
  return (
    <button className="square bg-danger text-white border-dark rounded" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// This parent component is keeping all the children Square's state
function Board( {oIsNext, squares, onPlay} ) {
  // Handle on square click
  function handleClick(i) {
    // Check winner or is the square filled
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // Create a copy of squares array to modify
    const nextSquares = squares.slice();

    // Check which turn it is
    if (oIsNext) {
      nextSquares[i] = 'O';
    } else {
      nextSquares[i] = 'X'
    }

    // Switch turn and update squares state
    onPlay(nextSquares);
  }

  // Set status
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (oIsNext ? 'O' : 'X');
  }

	return (
		<> 
      <div className="status">{status}</div>
      {/*
        Create a function that calls handleClick(i) because if we just pass handleClick(i) 
        on the props, the function will run before the user click on it (we calling the function right away).
      */}
			<div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
	);
}

export default function Game() {
  // Switch turn
  const [oIsNext, setOIsNext] = useState(true);
  // Store past moves
  const [history, setHistory] = useState( [Array(9).fill(null)] );
  const currentSquares = history[history.length - 1];

  // Update the game
  function handlePlay(nextSquares) {
    setOIsNext(!oIsNext); // Switch turn
    setHistory( [...history, nextSquares] ); // Add current move to history
  }

  // Restart the game
  function restart() {
    setHistory( [Array(9).fill(null)] );
    setOIsNext(true);
  }

  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board oIsNext={oIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          {/* Show past moves */}
          <ol>
            
          </ol>
        </div>
      </div>
      <div>
        <button className="btn btn-secondary mt-2" onClick={restart}>Restart</button>
      </div>
    </>
  );
}

// Calculate the winner
function calculateWinner(squares) {
  // All winning orders
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7 ,8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // Iterate through the winning orders
  for (let i = 0; i < lines.length; i++) {
    // Check if the squares order is the same as one of winning orders
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}