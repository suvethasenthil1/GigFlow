# GigFlow Setup Instructions

## Environment Setup

### Backend Environment Variables

1. Copy the example environment file:
```bash
cd gigflow-backend
cp .env.example .env
```

2. Update the `.env` file with your values:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database - Update with your MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/gigflow
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/gigflow

# Authentication - Generate a strong secret key
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# CORS - Frontend URL (keep as is for local development)
FRONTEND_URL=http://localhost:5173
```

### Required Environment Variables:

- **PORT**: Server port (default: 5000)
- **MONGODB_URI**: MongoDB connection string
- **JWT_SECRET**: Secret key for JWT token signing (use a long, random string)
- **NODE_ENV**: Environment mode (development/production)
- **FRONTEND_URL**: Frontend URL for CORS configuration

### MongoDB Setup Options:

1. **Local MongoDB**: Install MongoDB locally and use `mongodb://localhost:27017/gigflow`
2. **MongoDB Atlas**: Create a free cluster at mongodb.com and use the connection string
3. **Docker**: Run `docker run -d -p 27017:27017 mongo:latest`

### JWT Secret Generation:

Generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Quick Start

1. **Install Dependencies:**
```bash
# Backend
cd gigflow-backend
npm install

# Frontend  
cd ../gigflow-frontend
npm install
```

2. **Start Development Servers:**
```bash
# Terminal 1 - Backend
cd gigflow-backend
npm run dev

# Terminal 2 - Frontend
cd gigflow-frontend
npm run dev
```

3. **Access Application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000