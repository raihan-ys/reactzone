import ListGroup from '../components/ListGroup';

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
    <ListGroup heading='Top 3 Cities in West Sumatra' items={ ['Padang', 'Bukittinggi', 'Payakumbuh'] } onSelectItem={ [] } />
  </div>
}

// The export default keywords specify the main component in the file (JavaScript).
export default App;