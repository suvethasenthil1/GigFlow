import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGigs } from '../store/gigSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { gigs, isLoading } = useSelector((state) => state.gigs);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minBudget: '',
    maxBudget: ''
  });

  useEffect(() => {
    dispatch(fetchGigs(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading gigs...</div>;
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Find Your Perfect Freelance Gig
        </h1>
        <p className="text-gray-600">Connect with clients and grow your freelance career</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-2xl font-bold text-blue-600">{gigs.length}</h3>
          <p className="text-gray-600">Active Gigs</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-2xl font-bold text-green-600">500+</h3>
          <p className="text-gray-600">Freelancers</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-2xl font-bold text-purple-600">1000+</h3>
          <p className="text-gray-600">Projects Completed</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-2xl font-bold text-orange-600">4.8★</h3>
          <p className="text-gray-600">Average Rating</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="search"
            placeholder="Search gigs..."
            value={filters.search}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2"
          />
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2"
          >
            <option value="">All Categories</option>
            <option value="web-development">Web Development</option>
            <option value="mobile-development">Mobile Development</option>
            <option value="design">Design</option>
            <option value="writing">Writing</option>
            <option value="marketing">Marketing</option>
          </select>
          <input
            type="number"
            name="minBudget"
            placeholder="Min Budget"
            value={filters.minBudget}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2"
          />
          <input
            type="number"
            name="maxBudget"
            placeholder="Max Budget"
            value={filters.maxBudget}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Gigs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gigs.map((gig) => (
          <div key={gig._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold">{gig.title}</h3>
              {gig.urgency === 'high' && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                  URGENT
                </span>
              )}
            </div>
            <p className="text-gray-600 mb-4 line-clamp-3">{gig.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold text-green-600">${gig.budget}</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                {gig.category}
              </span>
            </div>
            
            {/* Skills */}
            {gig.skills && gig.skills.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {gig.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                  {gig.skills.length > 3 && (
                    <span className="text-xs text-gray-500">+{gig.skills.length - 3} more</span>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
              <span>by {gig.client.name}</span>
              <div className="flex items-center space-x-3">
                <span>👁 {gig.views || 0}</span>
                <span>💼 {gig.bidCount || 0} bids</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              {gig.deadline && (
                <span className="text-xs text-gray-500">
                  Deadline: {new Date(gig.deadline).toLocaleDateString()}
                </span>
              )}
              <Link
                to={`/gig/${gig._id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}}
      </div>

      {gigs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No gigs found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Home;