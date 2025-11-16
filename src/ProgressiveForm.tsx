import { useActionState } from 'react';

interface FormState {
    message: string;
    success: boolean;
}

// Server action that works both with and without JavaScript
async function contactAction(_prevState: FormState, formData: FormData): Promise<FormState> {
    // Simulate server processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    const name = formData.get('name') as string;
    const message = formData.get('message') as string;

    // Simple validation
    if (!name?.trim() || !message?.trim()) {
        return {
            message: 'Both name and message are required.',
            success: false
        };
    }

    // Simulate successful submission
    return {
        message: `Thanks for your message, ${name}! We'll get back to you soon.`,
        success: true
    };
}

export default function ProgressiveForm() {
    const [state, formAction] = useActionState(contactAction, {
        message: '',
        success: false
    });

    return (
        <div className="progressive-form">
            <h2>Contact Us (Progressive Enhancement)</h2>
            <p>
                This form works with or without JavaScript thanks to React's{' '}
                <code>useActionState</code> and progressive enhancement.
            </p>

            <form action={formAction}>
                <div>
                    <label htmlFor="contact-name">Name:</label>
                    <input
                        type="text"
                        id="contact-name"
                        name="name"
                        placeholder="Your name"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="contact-message">Message:</label>
                    <textarea
                        id="contact-message"
                        name="message"
                        placeholder="Your message"
                        rows={4}
                        required
                    />
                </div>

                <button type="submit">Send Message</button>
            </form>

            {state.message && (
                <div className={`message ${state.success ? 'success' : 'error'}`}>
                    {state.message}
                </div>
            )}
        </div>
    );
}