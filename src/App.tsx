import TicTacToe from '../components/TicTacToe.tsx';

function App() {
  // TODO: Create a main menu that list all the games
  return <>
    <h4 className="text-primary" id="welcome-text">Welcome to Reactzone!</h4>
    <h5>Choose a game:</h5>
    <ul style={{ listStyleType: 'square' }}>
      <li>City Quiz</li>
      <li>Tic Tac Toe (2 Players)</li>
    </ul>

    <TicTacToe />
  </>
}

export default App;