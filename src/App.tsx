import { useActionState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ActionStateDemo from './ActionStateDemo'
import ProgressiveForm from './ProgressiveForm'

// Define the action function that will be called when the form is submitted
async function submitForm(_prevState: string | null, formData: FormData): Promise<string> {
  // Simulate an API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  const email = formData.get('email') as string

  // Simple validation
  if (!email || !email.includes('@')) {
    return 'Please enter a valid email address'
  }

  // Simulate successful submission
  return `Thank you for subscribing with ${email}!`
}

function App() {
  const [message, formAction, isPending] = useActionState(submitForm, null)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + useActionState</h1>

      {/* Simple example */}
      <div className="card">
        <h2>Simple Email Subscription</h2>
        <form action={formAction}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              disabled={isPending}
            />
          </div>
          <button type="submit" disabled={isPending}>
            {isPending ? 'Submitting...' : 'Subscribe'}
          </button>
        </form>

        {message && (
          <p className={message.includes('Thank you') ? 'success-message' : 'error-message'}>
            {message}
          </p>
        )}

        <p>
          This example demonstrates the use of the new <code>useActionState</code> hook in React 19.
          It handles form submission with pending states and error/success messages.
        </p>
      </div>

      {/* More complex example */}
      <ActionStateDemo />

      {/* Progressive enhancement example */}
      <ProgressiveForm />

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App