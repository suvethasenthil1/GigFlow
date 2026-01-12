import { useState } from 'react';
import { Link } from 'react-router-dom';

const BrowseGigs = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const sampleGigs = [
    {
      _id: '1',
      title: 'Build a React E-commerce Website',
      description: 'I need a modern e-commerce website built with React.js and Node.js. The site should have user authentication, product catalog, shopping cart, and payment integration. Looking for experienced developer.',
      budget: { min: 2000, max: 2500 },
      category: 'Web Development',
      skills: ['React', 'Node.js', 'MongoDB', 'Payment Integration'],
      client: { name: 'TechCorp Inc', verified: true, rating: 4.8 },
      bids: 12,
      timePosted: '2 hours ago',
      deadline: '30 days',
      type: 'Fixed Price'
    },
    {
      _id: '2',
      title: 'Mobile App UI/UX Design',
      description: 'Looking for a talented designer to create modern UI/UX designs for a fitness tracking mobile app. Need wireframes, mockups, and interactive prototypes.',
      budget: { min: 800, max: 1200 },
      category: 'Design & Creative',
      skills: ['Figma', 'Adobe XD', 'UI Design', 'Mobile Design'],
      client: { name: 'FitLife Startup', verified: true, rating: 4.9 },
      bids: 8,
      timePosted: '4 hours ago',
      deadline: '14 days',
      type: 'Fixed Price'
    },
    {
      _id: '3',
      title: 'Content Writing for Tech Blog',
      description: 'Need experienced tech writer to create 10 high-quality blog posts about web development trends, AI, and cybersecurity. Each post should be 1500+ words with SEO optimization.',
      budget: { min: 600, max: 800 },
      category: 'Writing & Translation',
      skills: ['Technical Writing', 'SEO', 'Content Strategy', 'Research'],
      client: { name: 'Digital Agency Pro', verified: false, rating: 4.5 },
      bids: 15,
      timePosted: '1 day ago',
      deadline: '21 days',
      type: 'Fixed Price'
    },
    {
      _id: '4',
      title: 'Flutter Mobile App Development',
      description: 'Develop a cross-platform mobile app for food delivery service. Features include user registration, restaurant listings, order tracking, and payment gateway integration.',
      budget: { min: 3000, max: 3500 },
      category: 'Mobile Development',
      skills: ['Flutter', 'Dart', 'Firebase', 'API Integration'],
      client: { name: 'FoodieExpress', verified: true, rating: 4.7 },
      bids: 6,
      timePosted: '3 hours ago',
      deadline: '45 days',
      type: 'Fixed Price'
    },
    {
      _id: '5',
      title: 'Digital Marketing Campaign Setup',
      description: 'Create and manage a comprehensive digital marketing campaign for a startup. Includes social media strategy, content creation, Google Ads, and performance tracking.',
      budget: { min: 1200, max: 1500 },
      category: 'Sales & Marketing',
      skills: ['Digital Marketing', 'Google Ads', 'Social Media', 'Analytics'],
      client: { name: 'StartupHub', verified: true, rating: 4.6 },
      bids: 20,
      timePosted: '6 hours ago',
      deadline: '20 days',
      type: 'Fixed Price'
    },
    {
      _id: '6',
      title: 'WordPress Website Redesign',
      description: 'Redesign existing WordPress website with modern design, better UX, and mobile responsiveness. Need SEO optimization and speed improvements included.',
      budget: { min: 800, max: 900 },
      category: 'Web Development',
      skills: ['WordPress', 'PHP', 'CSS', 'SEO', 'Responsive Design'],
      client: { name: 'Local Business Co', verified: false, rating: 4.3 },
      bids: 18,
      timePosted: '1 day ago',
      deadline: '15 days',
      type: 'Fixed Price'
    },
    {
      _id: '7',
      title: 'Python Data Analysis Script',
      description: 'Need a Python script to analyze sales data and generate automated reports. Should include data visualization with charts and export to PDF functionality.',
      budget: { min: 400, max: 600 },
      category: 'Data Science',
      skills: ['Python', 'Pandas', 'Matplotlib', 'Data Analysis'],
      client: { name: 'DataCorp Solutions', verified: true, rating: 4.9 },
      bids: 9,
      timePosted: '5 hours ago',
      deadline: '10 days',
      type: 'Fixed Price'
    },
    {
      _id: '8',
      title: 'Logo Design for Tech Startup',
      description: 'Create a modern, professional logo for a new tech startup. Need multiple concepts, revisions, and final files in various formats (AI, PNG, SVG).',
      budget: { min: 200, max: 400 },
      category: 'Design & Creative',
      skills: ['Logo Design', 'Adobe Illustrator', 'Brand Identity', 'Creative Design'],
      client: { name: 'InnovateTech', verified: true, rating: 4.8 },
      bids: 25,
      timePosted: '8 hours ago',
      deadline: '7 days',
      type: 'Fixed Price'
    }
  ];

  const categories = [
    'All Categories',
    'Web Development',
    'Mobile Development', 
    'Design & Creative',
    'Writing & Translation',
    'Sales & Marketing',
    'Data Science',
    'Admin Support'
  ];

  const filteredGigs = sampleGigs.filter(gig => {
    const matchesSearch = search === '' || gig.title.toLowerCase().includes(search.toLowerCase()) || 
                         gig.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All Categories' || 
                           gig.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Browse Projects</h1>
          
          {/* Search Bar */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search for projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium">
              Search
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-4 flex-wrap">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">All Budgets</option>
              <option value="0-500">$0 - $500</option>
              <option value="500-1000">$500 - $1,000</option>
              <option value="1000-2500">$1,000 - $2,500</option>
              <option value="2500+">$2,500+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">{filteredGigs.length} projects found</p>
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>Newest First</option>
            <option>Lowest Budget</option>
            <option>Highest Budget</option>
            <option>Most Bids</option>
          </select>
        </div>

        {/* Gigs List */}
        <div className="space-y-6">
          {filteredGigs.map((gig) => (
            <div key={gig._id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <Link to={`/gig/${gig._id}`} className="text-xl font-semibold text-blue-600 hover:text-blue-800 mb-2 block">
                    {gig.title}
                  </Link>
                  <p className="text-gray-600 mb-3 leading-relaxed">{gig.description}</p>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {gig.skills.slice(0, 4).map((skill, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                    {gig.skills.length > 4 && (
                      <span className="text-gray-500 text-sm">+{gig.skills.length - 4} more</span>
                    )}
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-gray-700">{gig.client.name}</span>
                      {gig.client.verified && (
                        <span className="text-green-600">✓</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <span>⭐ {gig.client.rating}</span>
                    </div>
                    <span>{gig.timePosted}</span>
                  </div>
                </div>

                <div className="text-right ml-6">
                  <div className="text-2xl font-bold text-gray-800 mb-1">
                    ${gig.budget.min} - ${gig.budget.max}
                  </div>
                  <div className="text-sm text-gray-500 mb-2">{gig.type}</div>
                  <div className="text-sm text-gray-500 mb-3">
                    <div>{gig.bids} bids</div>
                    <div>Ends in {gig.deadline}</div>
                  </div>
                  <Link
                    to={`/gig/${gig._id}`}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium inline-block"
                  >
                    Bid Now
                  </Link>
                </div>
              </div>

              {/* Category Tag */}
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {gig.category}
                </span>
                <div className="text-sm text-gray-500">
                  Project ID: #{gig._id}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGigs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No projects found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseGigs;