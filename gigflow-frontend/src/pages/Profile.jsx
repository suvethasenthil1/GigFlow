import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    bio: '',
    skills: '',
    hourlyRate: '',
    location: '',
    experience: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user?.profile) {
      setProfile({
        bio: user.profile.bio || '',
        skills: user.profile.skills?.join(', ') || '',
        hourlyRate: user.profile.hourlyRate || '',
        location: user.profile.location || '',
        experience: user.profile.experience || ''
      });
    }
  }, [user, isAuthenticated, navigate]);

  const handleSave = async () => {
    try {
      const updatedProfile = {
        ...profile,
        skills: profile.skills.split(',').map(s => s.trim()).filter(s => s),
        hourlyRate: profile.hourlyRate ? Number(profile.hourlyRate) : undefined
      };
      
      await api.put('/auth/profile', updatedProfile);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const StarRating = ({ rating }) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-2 text-sm text-gray-600">
        {rating?.toFixed(1)} ({user?.rating?.count || 0} reviews)
      </span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-gray-600">{user?.email}</p>
              <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm mt-1">
                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {user?.rating && (
          <div className="mb-6">
            <StarRating rating={user.rating.average} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            {isEditing ? (
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                rows="4"
              />
            ) : (
              <p className="text-gray-700">{profile.bio || 'No bio added yet'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.skills}
                onChange={(e) => setProfile({...profile, skills: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="React, Node.js, MongoDB"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.skills.split(',').filter(s => s.trim()).map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>

          {user?.role === 'freelancer' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate ($)</label>
              {isEditing ? (
                <input
                  type="number"
                  value={profile.hourlyRate}
                  onChange={(e) => setProfile({...profile, hourlyRate: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              ) : (
                <p className="text-gray-700">${profile.hourlyRate || 'Not set'}/hour</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({...profile, location: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              />
            ) : (
              <p className="text-gray-700">{profile.location || 'Not specified'}</p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-blue-600">{user?.completedProjects || 0}</h3>
            <p className="text-gray-600">Completed Projects</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-green-600">
              {user?.rating?.average?.toFixed(1) || '0.0'}
            </h3>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-purple-600">
              {user?.isVerified ? 'Verified' : 'Unverified'}
            </h3>
            <p className="text-gray-600">Account Status</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;