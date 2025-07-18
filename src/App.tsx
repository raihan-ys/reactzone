import QuizForm from '../components/QuizForm'

// App is the parent element.
function App() {
  // This is the child element.
  return <>
    <QuizForm headingStyle='text-danger fw-bold' paragraphStyle='text-secondary' textareaStyle='rounded border-danger' buttonStyle='btn btn-sm btn-danger' errorStyle='text-danger fw-bold' />
  </>
}

export default App;