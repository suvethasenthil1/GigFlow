import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const GigDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidData, setBidData] = useState({
    message: '',
    price: ''
  });

  useEffect(() => {
    // Check authentication status
    const userData = localStorage.getItem('gigflow_user');
    const token = localStorage.getItem('gigflow_token');
    
    if (userData && token) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
  }, []);

  const sampleGigs = {
    '1': {
      title: 'Build a React E-commerce Website',
      description: 'I need a modern e-commerce website built with React.js and Node.js. The site should have user authentication, product catalog, shopping cart, and payment integration.',
      budget: 2500,
      status: 'open',
      ownerId: { name: 'John Client' },
      skills: ['React', 'Node.js', 'MongoDB'],
      bids: [
        { id: 1, freelancer: 'Alice Developer', message: 'I can build this for you', price: 2200, status: 'pending' }
      ]
    }
  };

  const gig = sampleGigs[id] || sampleGigs['1'];

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    if (!bidData.message || !bidData.price) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Bid submitted successfully! The client will review your proposal.');
    setShowBidForm(false);
    setBidData({ message: '', price: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{gig.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Posted by {gig.ownerId.name}</span>
                <span className="px-2 py-1 rounded bg-green-100 text-green-800">
                  {gig.status.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">${gig.budget}</div>
              <div className="text-sm text-gray-600">Budget</div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">{gig.description}</p>
          </div>

          {gig.skills && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Skills Required</h2>
              <div className="flex flex-wrap gap-2">
                {gig.skills.map((skill, index) => (
                  <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {isAuthenticated ? (
            <div className="border-t pt-6">
              {!showBidForm ? (
                <button
                  onClick={() => setShowBidForm(true)}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-medium"
                >
                  Place a Bid
                </button>
              ) : (
                <form onSubmit={handleBidSubmit} className="space-y-4">
                  <h3 className="text-xl font-semibold">Submit Your Proposal</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bid Amount ($)
                    </label>
                    <input
                      type="number"
                      value={bidData.price}
                      onChange={(e) => setBidData({...bidData, price: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                      placeholder="Enter your bid amount"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Proposal Message
                    </label>
                    <textarea
                      value={bidData.message}
                      onChange={(e) => setBidData({...bidData, message: e.target.value})}
                      rows="4"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                      placeholder="Describe your approach..."
                      required
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
                    >
                      Submit Bid
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowBidForm(false)}
                      className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="border-t pt-6">
              <p className="text-gray-600 mb-4">Please login to place a bid on this project.</p>
              <button
                onClick={() => navigate('/login')}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-medium"
              >
                Login to Bid
              </button>
            </div>
          )}
        </div>

        {gig.bids && gig.bids.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">Received Bids ({gig.bids.length})</h2>
            
            <div className="space-y-6">
              {gig.bids.map((bid) => (
                <div key={bid.id} className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{bid.freelancer}</h3>
                      <p className="text-gray-600">Experienced Developer</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">${bid.price}</div>
                      <div className="mt-2 px-3 py-1 rounded text-sm bg-yellow-100 text-yellow-800">
                        {bid.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{bid.message}</p>
                  
                  {bid.status === 'pending' && isAuthenticated && (
                    <button
                      onClick={() => toast.success('Freelancer hired successfully!')}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Hire This Freelancer
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GigDetails;