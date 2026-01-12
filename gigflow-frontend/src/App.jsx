import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { getMe } from './store/authSlice';
import Navbar from './components/Navbar';
import SimpleHome from './pages/SimpleHome';
import LandingPage from './pages/LandingPage';
import BrowseGigs from './pages/BrowseGigs';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import GigDetails from './pages/GigDetails';
import CreateGig from './pages/CreateGig';
import Profile from './pages/Profile';

import PostGig from './pages/PostGig';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<SimpleHome />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/gigs" element={<BrowseGigs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/gig/:id" element={<GigDetails />} />
            <Route path="/create-gig" element={<CreateGig />} />
            <Route path="/post-gig" element={<PostGig />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;