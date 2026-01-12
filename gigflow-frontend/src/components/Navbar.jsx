import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for user in localStorage
    const userData = localStorage.getItem('gigflow_user');
    const token = localStorage.getItem('gigflow_token');
    
    if (userData && token) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('gigflow_user');
    localStorage.removeItem('gigflow_token');
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            🚀 GigFlow
          </Link>
          
          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`hover:text-blue-600 transition ${
                isActive('/') ? 'text-blue-600 font-semibold' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/gigs" 
              className={`hover:text-blue-600 transition ${
                isActive('/gigs') ? 'text-blue-600 font-semibold' : 'text-gray-700'
              }`}
            >
              Browse Gigs
            </Link>
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className={`hover:text-blue-600 transition ${
                  isActive('/dashboard') ? 'text-blue-600 font-semibold' : 'text-gray-700'
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {user?.role === 'client' && (
                  <Link 
                    to="/post-gig" 
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition font-medium"
                  >
                    + Post Gig
                  </Link>
                )}
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <span className="hidden md:block">{user?.name}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-3 border-b">
                      <p className="font-medium text-gray-800">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                      <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mt-1">
                        {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                      </span>
                    </div>
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition">
                      👤 Profile
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition">
                      ⚙️ Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                    >
                      🚪 Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-blue-600 transition font-medium"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition font-medium"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;