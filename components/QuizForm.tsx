import { useState } from "react";

export default function QuizForm() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  // This function is called when the form is submitted.
  if (status === 'success') {
    return <h1>That's right</h1>
  }

  // Handle the form submission.
  async function handleSubmit (e) {
    e.preventDefault();
    setStatus('submitting');

    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleTextareaChange (e) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>City Quiz</h2>

      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>

      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        <button disabled={
          answer.length === 0 ||
          status === 'submitting'
        }>
          Submit
        </button>
        {error !== null &&
          <p className="text-danger">
            {error.message}
          </p>
        } 
      </form>
    </>
  );
}

function submitForm (answer) {
  // Pretend it's hitting the network
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase !== 'lima';

      if (shouldError) {
        reject(new Error('Wrong answer.Try again!'))
      } else {
        resolve('');
      }
    }, 1500);
  });
}
