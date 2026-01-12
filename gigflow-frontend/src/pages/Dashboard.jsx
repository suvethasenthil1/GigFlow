import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMyGigs } from '../store/gigSlice';
import { fetchMyBids } from '../store/bidSlice';

const Dashboard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { myGigs } = useSelector((state) => state.gigs);
  const { myBids } = useSelector((state) => state.bids);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user?.role === 'client') {
      dispatch(fetchMyGigs());
    } else {
      dispatch(fetchMyBids());
    }
  }, [isAuthenticated, user, dispatch, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          {user?.role === 'client' ? 'Manage your gigs and review bids' : 'Track your bids and find new opportunities'}
        </p>
      </div>

      {user?.role === 'client' ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">My Gigs</h2>
            <button
              onClick={() => navigate('/create-gig')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Post New Gig
            </button>
          </div>

          <div className="grid gap-6">
            {myGigs.map((gig) => (
              <div key={gig._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{gig.title}</h3>
                    <p className="text-gray-600 mt-2">{gig.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-green-600">${gig.budget}</span>
                    <div className={`mt-2 px-3 py-1 rounded text-sm ${
                      gig.status === 'open' ? 'bg-green-100 text-green-800' :
                      gig.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {gig.status.replace('_', ' ').toUpperCase()}
                    </div>
                  </div>
                </div>
                
                {gig.hiredFreelancer && (
                  <div className="mt-4 p-3 bg-blue-50 rounded">
                    <p className="text-sm text-blue-800">
                      Hired: {gig.hiredFreelancer.name}
                    </p>
                  </div>
                )}

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => navigate(`/gig/${gig._id}`)}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {myGigs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">You haven't posted any gigs yet.</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-6">My Bids</h2>

          <div className="grid gap-6">
            {myBids.map((bid) => (
              <div key={bid._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{bid.gig.title}</h3>
                    <p className="text-gray-600 mt-2">{bid.proposal}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-green-600">${bid.amount}</span>
                    <div className={`mt-2 px-3 py-1 rounded text-sm ${
                      bid.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      bid.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {bid.status.toUpperCase()}
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-500">
                  Delivery: {bid.deliveryTime} days
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => navigate(`/gig/${bid.gig._id}`)}
                    className="text-blue-600 hover:underline"
                  >
                    View Gig
                  </button>
                </div>
              </div>
            ))}
          </div>

          {myBids.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">You haven't placed any bids yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;