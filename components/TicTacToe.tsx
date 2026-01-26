import useState from 'react';

function Square({ value }) {
  const [isClicked, setIsClicked] = useState(false);

  return ( 
    <button 
      className="btn btn-danger" 
      onClick={() => setIsClicked(true)}
    >
      {value}
    </button>
  );
}

function Board() {
	return (
		<>
			<div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div className="board-row">
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div className="board-row">
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
	);
}

function TicTacToe() {
  return <Board />;
}

export default TicTacToe;