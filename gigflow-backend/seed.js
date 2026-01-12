const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Gig = require('./models/Gig');

const sampleUsers = [
  {
    name: 'John Client',
    email: 'client@test.com',
    password: 'password123',
    role: 'client'
  },
  {
    name: 'Sarah Freelancer',
    email: 'freelancer@test.com',
    password: 'password123',
    role: 'freelancer'
  }
];

const sampleGigs = [
  {
    title: 'Build a React E-commerce Website',
    description: 'I need a modern e-commerce website built with React.js and Node.js. The site should have user authentication, product catalog, shopping cart, and payment integration.',
    budget: 2500
  },
  {
    title: 'Mobile App UI/UX Design',
    description: 'Looking for a talented designer to create modern UI/UX designs for a fitness tracking mobile app. Need wireframes, mockups, and interactive prototypes.',
    budget: 1200
  },
  {
    title: 'Content Writing for Tech Blog',
    description: 'Need experienced tech writer to create 10 high-quality blog posts about web development trends, AI, and cybersecurity. Each post should be 1500+ words.',
    budget: 800
  },
  {
    title: 'Flutter Mobile App Development',
    description: 'Develop a cross-platform mobile app for food delivery service. Features include user registration, restaurant listings, order tracking, and payment gateway.',
    budget: 3500
  },
  {
    title: 'Digital Marketing Campaign',
    description: 'Create and manage a comprehensive digital marketing campaign for a startup. Includes social media strategy, content creation, and ad management.',
    budget: 1500
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Gig.deleteMany({});
    console.log('Cleared existing data');

    // Create sample users
    const users = await User.create(sampleUsers);
    console.log('Created sample users');

    // Create sample gigs (assign to first client)
    const clientUser = users.find(user => user.role === 'client');
    const gigsWithOwner = sampleGigs.map(gig => ({
      ...gig,
      ownerId: clientUser._id
    }));

    await Gig.create(gigsWithOwner);
    console.log('Created sample gigs');

    console.log('✅ Database seeded successfully!');
    console.log('Test accounts:');
    console.log('Client: client@test.com / password123');
    console.log('Freelancer: freelancer@test.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();