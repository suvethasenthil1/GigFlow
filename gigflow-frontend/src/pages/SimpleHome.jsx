import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Start Your
                  <span className="text-yellow-400"> Freelance Career</span>
                  <br />
                  Today!
                </h1>
                <p className="text-xl text-blue-100">
                  Learn high-demand skills and earn $15-50+ per hour working from home. 
                  Join thousands of successful freelancers worldwide.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-lg">Work from anywhere, anytime</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-lg">No experience required - we'll teach you</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-lg">Start earning within 30 days</span>
                </div>
              </div>

              {/* Email Signup */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">Get Started Free Today!</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <Link
                    to="/register"
                    className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition text-center"
                  >
                    Start Now
                  </Link>
                </div>
                <p className="text-sm text-blue-200 mt-2">
                  100% Free • No Credit Card Required • Instant Access
                </p>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-gray-800 font-semibold">Your Earnings Dashboard</h4>
                    <span className="text-green-600 text-sm font-medium">+$2,450 this month</span>
                  </div>
                  
                  {/* Mock Dashboard */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">Data Entry Project</div>
                        <div className="text-sm text-gray-500">TechCorp Inc.</div>
                      </div>
                      <div className="text-green-600 font-bold">$450</div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">Content Writing</div>
                        <div className="text-sm text-gray-500">StartupHub</div>
                      </div>
                      <div className="text-green-600 font-bold">$320</div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">Virtual Assistant</div>
                        <div className="text-sm text-gray-500">Digital Agency</div>
                      </div>
                      <div className="text-green-600 font-bold">$280</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">$1,050</div>
                      <div className="text-sm text-gray-600">Total Earned This Week</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">High-Demand Freelance Skills</h2>
            <p className="text-gray-600">Master these skills and start earning immediately</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Entry</h3>
              <p className="text-gray-600 mb-4">$15-25/hour • High demand • Easy to learn</p>
              <div className="text-sm text-blue-600 font-medium">2,500+ jobs available</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">✍️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Content Writing</h3>
              <p className="text-gray-600 mb-4">$20-40/hour • Creative work • Flexible</p>
              <div className="text-sm text-blue-600 font-medium">1,800+ jobs available</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Virtual Assistant</h3>
              <p className="text-gray-600 mb-4">$18-35/hour • Varied tasks • Growth potential</p>
              <div className="text-sm text-blue-600 font-medium">3,200+ jobs available</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Web Development</h3>
              <p className="text-gray-600 mb-4">$30-80/hour • High paying • Technical</p>
              <div className="text-sm text-blue-600 font-medium">1,500+ jobs available</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Digital Marketing</h3>
              <p className="text-gray-600 mb-4">$25-60/hour • Results-driven • Scalable</p>
              <div className="text-sm text-blue-600 font-medium">2,100+ jobs available</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
              <p className="text-gray-600 mb-4">$16-28/hour • People-focused • Stable</p>
              <div className="text-sm text-blue-600 font-medium">1,900+ jobs available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-gray-600">Real people, real results</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div className="ml-3">
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-sm text-gray-500">Data Entry Specialist</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "I started with zero experience and now earn $3,000+ monthly working part-time from home!"
              </p>
              <div className="text-green-600 font-bold">$3,200/month</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div className="ml-3">
                  <div className="font-semibold">Mike Chen</div>
                  <div className="text-sm text-gray-500">Content Writer</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The training was amazing. I landed my first client within 2 weeks and haven't looked back!"
              </p>
              <div className="text-green-600 font-bold">$2,800/month</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  L
                </div>
                <div className="ml-3">
                  <div className="font-semibold">Lisa Rodriguez</div>
                  <div className="text-sm text-gray-500">Virtual Assistant</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Perfect for busy moms! I work around my kids' schedule and still earn great money."
              </p>
              <div className="text-green-600 font-bold">$2,400/month</div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Change Your Life?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join over 50,000 students who have transformed their careers
          </p>
          
          <div className="max-w-md mx-auto">
            <Link
              to="/register"
              className="block w-full bg-yellow-400 text-blue-900 py-4 px-8 rounded-xl font-bold text-lg hover:bg-yellow-300 transition"
            >
              Start Your Free Training Now
            </Link>
            <p className="text-sm text-blue-200 mt-3">
              No risk • 30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;