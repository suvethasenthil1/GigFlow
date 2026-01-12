import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LandingPage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const features = [
    {
      icon: '💼',
      title: 'Post Your Project',
      description: 'Describe your project and get proposals from talented freelancers'
    },
    {
      icon: '🎯',
      title: 'Find Perfect Match',
      description: 'Browse through proposals and hire the best freelancer for your needs'
    },
    {
      icon: '💰',
      title: 'Secure Payments',
      description: 'Safe and secure payment system with milestone-based releases'
    },
    {
      icon: '⭐',
      title: 'Quality Work',
      description: 'Get high-quality work delivered on time with our rating system'
    }
  ];

  const categories = [
    { name: 'Web Development', count: '150+ gigs', color: 'bg-blue-100 text-blue-800' },
    { name: 'Mobile Apps', count: '80+ gigs', color: 'bg-green-100 text-green-800' },
    { name: 'Design', count: '120+ gigs', color: 'bg-purple-100 text-purple-800' },
    { name: 'Writing', count: '90+ gigs', color: 'bg-orange-100 text-orange-800' },
    { name: 'Marketing', count: '60+ gigs', color: 'bg-pink-100 text-pink-800' },
    { name: 'Data Science', count: '40+ gigs', color: 'bg-indigo-100 text-indigo-800' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Find the Perfect Freelancer for Your Project
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with talented professionals worldwide. Post your project and get quality work delivered on time.
          </p>
          <div className="flex justify-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-blue-600 mb-2">500+</h3>
              <p className="text-gray-600">Active Freelancers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-green-600 mb-2">1,200+</h3>
              <p className="text-gray-600">Projects Completed</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-purple-600 mb-2">98%</h3>
              <p className="text-gray-600">Client Satisfaction</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-orange-600 mb-2">4.9⭐</h3>
              <p className="text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How GigFlow Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to="/gigs"
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm ${category.color}`}>
                      {category.count}
                    </span>
                  </div>
                  <div className="text-2xl">→</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied clients and freelancers</p>
          {!isAuthenticated && (
            <div className="flex justify-center space-x-4">
              <Link
                to="/register?role=client"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Hire Freelancers
              </Link>
              <Link
                to="/register?role=freelancer"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
              >
                Find Work
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;