import CityQuiz from '../components/CityQuiz';

function App() {
  // TODO: Create a main menu that list all the games
  return <>
    <h4 className="text-primary" id="welcome-text">Welcome to Reactzone!</h4>
    <h5>Choose a game:</h5>
    <ul style={{ listStyleType: 'square' }}>
      <li>City Quiz</li>
      <li>Tic Tac Toe (2 Players)</li>
    </ul>

    <CityQuiz
      headingStyle="text-primary"
      paragraphStyle="mb-4"
      textareaStyle="border-primary rounded"
      buttonStyle="btn btn-primary"
      errorStyle="text-danger"
     />
  </>
}

export default App;