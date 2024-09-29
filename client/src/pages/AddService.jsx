import React, { useState } from 'react';
import { useAuthContext } from 'auth/AuthProvider';

export default function AddService() {
    const { state, setServices } = useAuthContext();
    const [service, setService] = useState({ type: "", description: "" });

    const addService = async (data) => {
        const savedServiceResponse = await fetch(
            'http://localhost:7070/api/v1/services',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${state.token}`,
                },
                method: 'POST',
                body: JSON.stringify(data),
            }
        );
        const newService = await savedServiceResponse.json();
        if (savedServiceResponse.status === 201) {
            setServices([...state.services, newService]);
            setService({ type: "", description: "" });
        } else {
            console.log("Something went wrong");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addService(service);
                }}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
            >
                <fieldset className="space-y-6">
                    <legend className="text-2xl font-bold mb-6">Add New Service</legend>
                    <div>
                        <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">Service Type</label>
                        <input
                            id="serviceType"
                            type="text"
                            required
                            value={service.type}
                            onChange={(e) => setService({ ...service, type: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            required
                            value={service.description}
                            onChange={(e) => setService({ ...service, description: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            rows="4"
                        />
                    </div>
                    <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
                        Add Service
                    </button>
                </fieldset>
            </form>
        </div>
    );
}
