import { useActionState } from 'react';

// Define types for our form data and state
interface UserProfile {
    name: string;
    email: string;
    age: number;
}

interface FormState {
    message: string;
    errors: Record<string, string>;
    userProfile?: UserProfile;
}

// Action function to handle form submission
async function updateUserProfile(
    _prevState: FormState,
    formData: FormData
): Promise<FormState> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Extract form data
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const age = parseInt(formData.get('age') as string, 10);

    // Initialize errors object
    const errors: Record<string, string> = {};

    // Validation
    if (!name.trim()) {
        errors.name = 'Name is required';
    }

    if (!email.trim()) {
        errors.email = 'Email is required';
    } else if (!email.includes('@')) {
        errors.email = 'Please enter a valid email';
    }

    if (isNaN(age) || age <= 0) {
        errors.age = 'Please enter a valid age';
    }

    // If there are validation errors, return them
    if (Object.keys(errors).length > 0) {
        return {
            message: 'Please fix the errors below',
            errors
        };
    }

    // Simulate successful update
    const userProfile: UserProfile = { name, email, age };

    return {
        message: 'Profile updated successfully!',
        errors: {},
        userProfile
    };
}

export default function ActionStateDemo() {
    const [state, formAction, isPending] = useActionState(updateUserProfile, {
        message: '',
        errors: {}
    });

    return (
        <div className="demo-container">
            <h2>User Profile Update Demo</h2>

            <form action={formAction}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        disabled={isPending}
                    />
                    {state.errors.name && (
                        <span className="error-text">{state.errors.name}</span>
                    )}
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        disabled={isPending}
                    />
                    {state.errors.email && (
                        <span className="error-text">{state.errors.email}</span>
                    )}
                </div>

                <div>
                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        placeholder="Enter your age"
                        disabled={isPending}
                    />
                    {state.errors.age && (
                        <span className="error-text">{state.errors.age}</span>
                    )}
                </div>

                <button type="submit" disabled={isPending}>
                    {isPending ? 'Updating...' : 'Update Profile'}
                </button>
            </form>

            {state.message && (
                <div className={`message ${state.userProfile ? 'success' : 'error'}`}>
                    {state.message}
                </div>
            )}

            {state.userProfile && (
                <div className="profile-result">
                    <h3>Updated Profile:</h3>
                    <p>Name: {state.userProfile.name}</p>
                    <p>Email: {state.userProfile.email}</p>
                    <p>Age: {state.userProfile.age}</p>
                </div>
            )}
        </div>
    );
}