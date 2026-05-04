import { useState } from 'react';
import CityQuiz from '../components/CityQuiz.jsx'
import TicTacToe from '../components/TicTacToe.jsx';
import RockPaperScissors from '../components/RockPaperScissors.tsx';
import Snake from '../components/Snake.jsx';

function App() {
  // Set selected game
  const [selected, setSelected] = useState(null);

  return <>
    <h4 className="text-primary mb-3" id="welcome-text">Welcome to Reactzone!</h4>
    <h5>Choose a game:</h5>
    <div className="d-flex mb-4">
      <ul className="list-unstyled d-flex gap-2 flex-grow-1">
        <li>
          <button className="btn btn-outline-primary" onClick={() => setSelected('city')}>City Quiz</button>
        </li>
        <li>
          <button className="btn btn-outline-primary" onClick={() => setSelected('tictactoe')}>Tic Tac Toe (2 Players)</button>
        </li>
        <li>
          <button className="btn btn-outline-primary" onClick={() => setSelected('rps')}>Rock, Paper, Scissors (Vs Com)</button>
        </li>
        <li>
          <button className="btn btn-outline-primary" onClick={() => setSelected('snake')}>Snake</button>
        </li>
      </ul>
      <ul className="list-unstyled d-flex gap-2">
        <li>
          <button className="btn btn-danger" onClick={() => setSelected(null)}>Clear</button>
        </li>
        <li>
          <button className="btn btn-secondary" onClick={() => alert('This is a collection of simple games built with React. Click on any game to play!')}>Help</button>
        </li>
      </ul>
    </div>

    {/* Render the selected game below the list. Switching selection unmounts previous component and resets its state. */}
    <div>
      {selected === 'city' && <CityQuiz headingStyle={'text-primary'} paragraphStyle={'font-weight-bold'} textareaStyle={'rounded'} buttonStyle={'btn btn-primary'} errorStyle={'text-danger'} />}
      {selected === 'tictactoe' && <TicTacToe />}
      {selected === 'rps' && <RockPaperScissors />}
      {selected === 'snake' && <Snake />}
    </div>
  </>
}

export default App;