import React from 'react';
import FlexBetween from './FlexBetween';
import { Link } from 'react-router-dom';

export default function ServiceCard({ service }) {
  return (
    <FlexBetween className="flex-col w-full sm:w-1/4 min-h-80 border border-gray-200 p-4 rounded-lg shadow-md">
      <div className="w-full h-52">
        <img src={`/images/${service.imgUrl}`} alt="logo" className="w-full h-full object-cover rounded-md" />
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-lg">{service.type}</h4>
        <p className="my-2 text-gray-700">{service.description}</p>
        <Link to={`/services/${service.id}`} className="text-blue-500 hover:underline">
          More Details
        </Link>
      </div>
    </FlexBetween>
  );
}
