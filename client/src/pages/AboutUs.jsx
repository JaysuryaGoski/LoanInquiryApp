import React from 'react';

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-7xl mx-auto text-center px-4">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">About Us</h2>
                <p className="text-lg text-gray-600 mb-8">
                    Our mission is to provide the highest quality services to our clients. With years of experience in the industry, we are dedicated to helping our customers achieve their goals.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold text-blue-700 mb-4">Our Vision</h3>
                        <p className="text-gray-600">
                            To become the go-to platform for reliable and innovative services across various domains.
                        </p>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold text-blue-700 mb-4">Our Mission</h3>
                        <p className="text-gray-600">
                            To empower individuals and businesses by providing top-notch services that are tailored to their specific needs.
                        </p>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold text-blue-700 mb-4">Our Values</h3>
                        <p className="text-gray-600">
                            We prioritize quality, integrity, and customer satisfaction in every service we offer.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
