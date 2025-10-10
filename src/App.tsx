import QuizForm from '../components/QuizForm';

function MyMood() {
  return (
    <h1 className="text-center bold-text mb-0">
      <span>|\_/|</span><br/>
      <span>(*-*)</span><br/>
      <span>(v v)</span><br/>
      <span>¯ ¯</span>
    </h1>
  );
}

function Greeting({ name }: { name: string }) {
  return name === 'Raihan'
    ? <h1>Hello, { name }! You are my best friend!</h1>
    : (name === 'raihan' ? <h1>Hello, { name }! You are my best friend!</h1> : <h1>Hello, {name}!</h1>);
}

// App is the parent element.
function App() {
  // This is the child element.
  return <div className="text-center">
    <MyMood />
    <Greeting name="raihan" />
    <br />
    <QuizForm headingStyle='text-danger font-weight-bold' paragraphStyle='text-secondary' textareaStyle='rounded border-danger' buttonStyle='btn btn-sm btn-danger' errorStyle='text-danger bold' />
  </div>
}

// The export default keywords specify the main component in the file (JavaScript).
export default App;