import React, { useState } from 'react';
import { useAuthContext } from '../auth/AuthProvider';

export default function UpdateProfile() {
    const { state, setLogin } = useAuthContext();
    const [name, setName] = useState(state.user.name || "");
    const [email, setEmail] = useState(state.user.email || "");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const updatedUserData = {
            name,
            email,
            password,
        };

        const response = await fetch('http://localhost:7070/api/v1/auth/update-profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${state.token}`,
            },
            body: JSON.stringify(updatedUserData),
        });

        if (response.status === 200) {
            const updatedUser = await response.json();
            setLogin({ ...state, user: updatedUser });
            setMessage('Profile updated successfully!');
        } else {
            setMessage('Error updating profile. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleUpdateProfile}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6"
            >
                <h1 className="text-2xl font-bold text-center">Update Profile</h1>
                {message && (
                    <div
                        className={`p-4 text-center ${
                            message.includes('success') ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                        }`}
                    >
                        {message}
                    </div>
                )}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
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
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password (leave blank to keep current password)
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
}
