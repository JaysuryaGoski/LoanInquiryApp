import { useAuthContext } from '../auth/AuthProvider';
import  { useState } from 'react';
import { useParams } from 'react-router-dom';
import Detail from '../components/Detail';

export default function ServicePage() {
    const { serviceId } = useParams();
    const { state, setServices } = useAuthContext();
    const isAuth = Boolean(state.token);
    const [show, setShow] = useState(false);
    const [detail, setDetail] = useState({ type: "", max: 0, min: 0, tenure: 0, rate: 0 });
    const service = (state.services.filter(ser => ser.id === Number(serviceId)))[0];

    const addDetail = async (data) => {
        const savedServiceResponse = await fetch(
            `http://localhost:7070/api/v1/services/${serviceId}/detail`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${state.token}`
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        if (savedServiceResponse.status === 201) {
            const newService = await savedServiceResponse.json();
            const removedOldService = state.services.filter(ser => ser.id !== Number(serviceId));
            setServices([...removedOldService, newService]);
            setShow(false);
        } else {
            console.log("Something went wrong");
        }
    };

    return (
        service ? (
            <div className="p-6">
                <h2 className="text-3xl font-bold">{service.type}</h2>
                <p className="text-gray-600">{service.description}</p>
                {isAuth && state.user.role === "ADMIN" ? (
                    <button 
                        className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
                        onClick={() => setShow(!show)}
                    >
                        Add Details
                    </button>
                ) : null}

                {show && (
                    <form 
                        onSubmit={(e) => {
                            e.preventDefault();
                            addDetail(detail);
                        }} 
                        className="mt-6 space-y-6 bg-gray-100 p-6 rounded-md"
                    >
                        <fieldset className="space-y-4">
                            <legend className="text-lg font-semibold">Add Detail</legend>
                            <div>
                                <label htmlFor="typeOfService" className="block text-sm font-medium text-gray-700">Type</label>
                                <input 
                                    id="typeOfService" 
                                    type="text" 
                                    required 
                                    value={detail.type} 
                                    onChange={(e) => setDetail({ ...detail, "type": e.target.value })} 
                                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                            <div className="flex space-x-4">
                                <div>
                                    <label htmlFor="min" className="block text-sm font-medium text-gray-700">Min</label>
                                    <input 
                                        id="min" 
                                        type="number" 
                                        required 
                                        value={detail.min} 
                                        onChange={(e) => setDetail({ ...detail, "min": e.target.value })} 
                                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="max" className="block text-sm font-medium text-gray-700">Max</label>
                                    <input 
                                        id="max" 
                                        type="number" 
                                        required 
                                        value={detail.max} 
                                        onChange={(e) => setDetail({ ...detail, "max": e.target.value })} 
                                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="tenure" className="block text-sm font-medium text-gray-700">Tenure</label>
                                <input 
                                    id="tenure" 
                                    type="number" 
                                    required 
                                    value={detail.tenure} 
                                    onChange={(e) => setDetail({ ...detail, "tenure": e.target.value })} 
                                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                            <div>
                                <label htmlFor="rate" className="block text-sm font-medium text-gray-700">Rate</label>
                                <input 
                                    id="rate" 
                                    type="number" 
                                    required 
                                    value={detail.rate} 
                                    onChange={(e) => setDetail({ ...detail, "rate": e.target.value })} 
                                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                                Add
                            </button>
                        </fieldset>
                    </form>
                )}

                <hr className="my-6" />

                {service.detail.map(det => <Detail details={det} key={det.id} />)}
            </div>
        ) : null
    );
}
