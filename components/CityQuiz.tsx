import { useState } from "react";

type props = {
  headingStyle: string;
  paragraphStyle: string;
  textareaStyle: string;
  buttonStyle: string;
  errorStyle: string;
};

export default function CityQuiz({ headingStyle, paragraphStyle, textareaStyle, buttonStyle, errorStyle }: props) {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState< Error | null >(null); // Error state (null if no error) defaults to null
  const [status, setStatus] = useState('typing');

  if (status === 'success') {
    return <h1 className={ headingStyle }>That's right</h1>
  }

  // Handle form submission
  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevent default form submission
    setStatus('submitting');

    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err: Error | unknown) {
      setStatus('typing');
      setError(err instanceof Error ? err : new Error('An unexpected error occurred'));
    }
  }

  function handleTextareaChange (e: React.ChangeEvent<HTMLTextAreaElement>) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2 className={ headingStyle }>City Quiz</h2>

      <p className={ paragraphStyle }>
        In which city is there a billboard that turns air into drinkable water?
      </p>

      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
          className={ textareaStyle }
          placeholder="Type your answer here..."
        />
        <br />
        <button 
          disabled={
            answer.length === 0 ||
            status === 'submitting'
          } 
          className={ buttonStyle }
        >
          Submit
        </button>
        {error !== null &&
          <p className={ errorStyle }>
            {error.message}
          </p>
        } 
      </form>
    </>
  );

  // Pretend it's hitting the network.
  function submitForm (answer: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldError = answer.toLowerCase() !== 'lima';

        if (shouldError) {
          reject(new Error('Wrong answer.Try again!'))
        } else {
          resolve('');
        }
      }, 1500);
    });
  }
}