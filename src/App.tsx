import Button from '../components/Button';
import Alert from '../components/Alert';

// App is the parent element.
function App() { 
  return <div>
    <Alert display='none'>This is the alert!</Alert>
    <Button color='danger' onClick={() => console.log('Clicked!')}>
      <h1>Show Alert!</h1>
    </Button>
  </div>
}

export default App;