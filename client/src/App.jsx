import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import ServicePage from './pages/ServicePage';
import EMICalculator from './pages/EMICalculator';
import JoinPage from './pages/JoinPage';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/services/:serviceId" element={<ServicePage />} />
                <Route path="/emi-calculator" element={<EMICalculator />} />
                <Route path="/join" element={<JoinPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/update-profile" element={<UpdateProfile />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
}

export default App;
