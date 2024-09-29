import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function JoinPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: "", password: "" });

    const registerUser = async (data) => {
        const savedUserResponse = await fetch(
            'http://localhost:7070/api/v1/auth/register',
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data),
            }
        );
        if (savedUserResponse.status === 201) {
            navigate('/login');
        } else {
            console.log("Something went wrong");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    registerUser(user);
                }}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
            >
                <fieldset className="space-y-6">
                    <legend className="text-2xl font-bold mb-6">Join Us</legend>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <button className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition">
                        Join Now
                    </button>
                </fieldset>
            </form>
        </div>
    );
}
