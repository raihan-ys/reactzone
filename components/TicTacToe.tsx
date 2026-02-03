import {useState} from 'react';

// Square that will build up the board
function Square({value, onSquareClick}) {
  return (
    <button className="square bg-danger text-white border-dark rounded" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// This parent component is keeping all the children Square's state
function Board() {
  // Set all squares to null initially and update function when clicked
  const [squares, setSquares] = useState(Array(9).fill(null));

  // Handle on square click
  function handleClick(i) {
    // Create a copy of squares array to modify
    const nextSquares = squares.slice();
      

    // Update the square component from the modified copy
    setSquares(nextSquares);
  }

	return (
		<>
			<div className="board-row">
        {/*
          Create a function that calls handleClick(i) because if we just pass handleClick(i) 
          on the props, the function will run before the user click on it (we calling the function right away).
        */}
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

function TicTacToe() {
  return <Board />;
}

export default TicTacToe;