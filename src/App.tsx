import QuizForm from '../components/QuizForm'

// App is the parent element.
function App() {
  // This is the child element.
  return <>
    <QuizForm headingStyle='text-danger font-weight-bold' paragraphStyle='text-secondary' textareaStyle='rounded border-danger' buttonStyle='btn btn-sm btn-danger' errorStyle='text-danger bold' />
  </>
}

export default App;