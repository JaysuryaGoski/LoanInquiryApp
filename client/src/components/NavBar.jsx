import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../auth/AuthProvider';

export default function NavBar() {
    const { state, setLogin } = useAuthContext();
    const isAuth = Boolean(state.token);
    const navigate = useNavigate();

    const handleLogout = () => {
        setLogin(null);  // Clear authentication state
        navigate('/login');  // Navigate to login after logout
    };

    return (
        <nav className="bg-blue-700 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">Civil Finloan</Link>
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/about" className="text-white hover:text-gray-200">About Us</Link>
                    </li>
                    <li className="relative group">
                        <span className="text-white cursor-pointer hover:text-gray-200">Services</span>
                        <ul className="absolute hidden group-hover:block bg-white text-black shadow-lg mt-2 rounded">
                            <li><Link to="/services/1" className="block px-4 py-2 hover:bg-gray-200">Service 1</Link></li>
                            <li><Link to="/services/2" className="block px-4 py-2 hover:bg-gray-200">Service 2</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/emi-calculator" className="text-white hover:text-gray-200">EMI Calculator</Link>
                    </li>
                    {isAuth ? (
                        <>
                            <li>
                                <Link to="/profile" className="text-white hover:text-gray-200">Profile</Link>
                            </li>
                            <li>
                                <Link to="/update-profile" className="text-white hover:text-gray-200">Update Profile</Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="text-white hover:text-gray-200">Logout</button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/join" className="text-white hover:text-gray-200">Join as a member</Link>
                        </li>
                    )}
                </ul>
                {!isAuth && (
                    <button onClick={() => navigate('/login')} className="bg-white text-blue-700 py-2 px-4 rounded hover:bg-gray-100">
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
}
