import { useAuthContext } from '../auth/AuthProvider';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const { setLogin } = useAuthContext();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const location = useLocation();

    const login = async (data) => {
        const savedUserResponse = await fetch(
            "http://localhost:7070/api/v1/auth/login",
            {
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify(data),
            }
        );

        const savedUser = await savedUserResponse.json();

        if (savedUserResponse.status === 200) {
            setLogin(savedUser);
            setMessage("Login successful! Redirecting to your profile...");
            setTimeout(() => {
                navigate('/profile');
            }, 3000);  // Redirect after 3 seconds
        } else {
            setMessage("Error: Invalid login credentials.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const data = { email, password };
                    login(data);
                }}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
            >
                <fieldset className="space-y-6">
                    <legend className="text-2xl font-bold mb-6">Login</legend>
                    {message && (
                        <div className={`p-4 mb-4 text-center ${message.includes("successful") ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
                            {message}
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
                        Login
                    </button>
                </fieldset>
            </form>
        </div>
    );
}
