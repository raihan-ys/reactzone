import {useState} from 'react';

// Square that will build up the board
function Square( {value, onSquareClick, isWinningSquare} ) {
  return (
    <button className={`square ${isWinningSquare ? "bg-success" : "bg-danger"} text-white border-dark rounded`} onClick={onSquareClick}>
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
  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo?.player;
  const winningLine = winnerInfo?.line;
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
        Create a function that calls handleClick(id) because if we just pass handleClick(id) 
        on the props, the function will run before the user click on it (we calling the function right away).
      */}
			{ Array.from( { length: 3 } ).map((_, row) => (
        <div key={row} className="board-row">
          { Array.from( { length: 3 } ).map((_, col) => {
            const id = row * 3 + col;
            return (
              <Square
                key={col}
                value={squares[id]}
                onSquareClick={ () => handleClick(id) }
                isWinningSquare={winningLine?.includes(id)} // Check if the square is part of winning line
              />
            );
          })}
        </div>
      ))}
    </>
	);
}

export default function Game() {
  const [history, setHistory] = useState( [Array(9).fill(null)] ); // Store moves
  const [currentMove, setCurrentMove] = useState(0);
  const oIsNext = currentMove % 2 === 0; // Switch turn
  const currentSquares = history[currentMove]; // Render the final move
  const [isAscending, setIsAscending] = useState(true); // Order of move buttons

  // Update the game
  function handlePlay(nextSquares) {
    // Create a copy of history array up to current move so player can go back to this move later
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    // Update current move
    setCurrentMove(nextHistory.length - 1);
  }

  // Transform history array to an array of react elements
  const moves = history.map((squares, move) => {
    const description = move > 0
      ? "Go to move #" + move
      : "Go to game start";

    return { move, description };
  });

  // Sort moves order
  const sortedMoves = isAscending ? moves : [...moves].reverse();

  // Create move buttons
  const moveList = sortedMoves.map(( { move, description } ) => (
    <li key={move}>
      <button className="btn btn-sm btn-info mb-1" onClick={() => setCurrentMove(move)}>
        {description}
      </button>
    </li>
  ));


  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board oIsNext={oIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <button className="btn btn-sm btn-secondary mb-2" onClick={() => setIsAscending(!isAscending)}>
            Sort moves: {isAscending ? "Ascending ↑" : "Descending ↓"}
          </button>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {moveList}
          </ul>
          <span>{"You are at move # " + (currentMove + 1)}</span>
        </div>
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
      return {
        player: squares[a], // Winner X or O
        line: [a, b, c], // Winning line
      };
    }
  }

  return null;
}