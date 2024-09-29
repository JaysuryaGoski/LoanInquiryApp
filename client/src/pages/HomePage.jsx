import React from 'react';

export default function HomePage() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-50">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-blue-700 mb-6">Welcome to Our Service Platform</h1>
                <p className="text-lg text-gray-600 mb-8">
                    We offer the best services to meet your needs. Browse through our offerings and find what suits you best.
                </p>
                <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition">
                    Explore Services
                </button>
            </div>
        </div>
    );
}
