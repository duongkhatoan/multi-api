# Multi-API Integration Project

A full-stack application that demonstrates advanced API integration, data normalization, and modern web development practices. The project consists of a Node.js backend that aggregates data from multiple public APIs and a React frontend dashboard for data visualization.

## 🏗️ Project Overview

This technical demonstration project showcases:
- **Multi-API Integration**: Fetching and normalizing data from CoinGecko, OpenWeather, and NewsAPI
- **Full-Stack Development**: Complete backend API with modern frontend dashboard
- **Rate Limiting**: Protection against API abuse with proper error handling
- **Data Persistence**: MongoDB database with Prisma ORM
- **Modern Frontend**: React with TypeScript, Next.js, and Tailwind CSS
- **Production Ready**: Comprehensive error handling, testing, and deployment configuration

## 🛠 Technology Stack

### Backend
- **Node.js** + **Express.js** - Server runtime and web framework
- **TypeScript** - Type safety and enhanced developer experience
- **MongoDB** + **Prisma** - Database and ORM
- **express-rate-limit** - API rate limiting
- **Axios** - HTTP client for external APIs
- **Zod** - Runtime type validation

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **SWR** - Data fetching and caching
- **React Hook Form** + **Zod** - Form handling and validation

## 📁 Project Structure

```
MultiApi/
├── backend/          # Node.js + Express API
│   ├── src/
│   │   ├── api/             # Controllers and routes
│   │   ├── services/        # Business logic and external API integration
│   │   ├── database/        # Database connection and seeding
│   │   ├── utils/          # Utilities and middleware
│   │   └── types/          # TypeScript definitions
│   ├── prisma/             # Database schema
│   └── package.json
│
└── frontend/         # Next.js React Dashboard
    ├── src/
    │   ├── app/            # Next.js App Router
    │   ├── components/     # Reusable UI components
    │   │   ├── ui/        # Base UI primitives
    │   │   ├── common/    # Shared components
    │   │   └── features/  # Feature-specific components
    │   ├── services/      # API integration
    │   └── lib/          # Utility libraries
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- API Keys for CoinGecko, OpenWeather, and NewsAPI

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your API keys and database URL

# Setup database
npm run db:push

# Start development server
npm run dev
```

Backend will be running at `http://localhost:4000`

### 2. Frontend Setup

```bash
# Navigate to frontend
cd anymind_frontend

# Install dependencies
npm install

# Configure environment
echo "NEXT_PUBLIC_API_URL=http://localhost:4000/api" > .env.local

# Start development server
npm run dev
```

Frontend will be running at `http://localhost:3000`

## 🎯 Features Demonstration

### 1. Multi-API Integration
- **CoinGecko API**: Real-time cryptocurrency data with price filtering
- **OpenWeather API**: Current weather conditions for multiple cities
- **NewsAPI**: Latest news articles with keyword search

### 2. Data Normalization
All external APIs are normalized into a consistent format:

```json
{
  "crypto": {
    "name": "Bitcoin",
    "symbol": "BTC", 
    "price": 42000,
    "marketCap": 800000000000
  },
  "weather": {
    "city": "New York",
    "temperature": 20,
    "condition": "Cloudy",
    "humidity": 65,
    "windSpeed": 12.5
  },
  "latest_news": {
    "title": "Tech Stocks Rally",
    "source": "CNN",
    "url": "https://cnn.com/news/tech-stocks-rally",
    "description": "Market analysis...",
    "publishedAt": "2025-05-31T10:00:00Z"
  }
}
```

### 3. Advanced Filtering
- **Cryptocurrency**: Filter by price range (min/max)
- **Weather**: Select from multiple major cities
- **News**: Search by keywords and categories

### 4. Rate Limiting
- 5 requests per minute per IP address
- Proper error responses with retry information
- Configurable windows and limits

## 📊 API Endpoints

### Primary Endpoint
```http
GET /api/aggregated-data
```

**Query Parameters:**
- `crypto` - Cryptocurrency ID (bitcoin, ethereum, etc.)
- `city` - City name for weather data
- `newsQuery` - Search keywords for news
- `minPrice` - Minimum cryptocurrency price
- `maxPrice` - Maximum cryptocurrency price

**Example:**
```bash
curl "http://localhost:4000/api/aggregated-data?crypto=ethereum&city=Tokyo&newsQuery=blockchain&minPrice=1000&maxPrice=5000"
```

### Utility Endpoints
- `GET /api/health` - Service health check
- `GET /` - API information and available endpoints

## 🧪 Testing

### Backend Testing
```bash
cd anymind_backend
npm test
```

### Frontend Testing
```bash
cd anymind_frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
The backend can be deployed to:
- **Heroku**: `git push heroku main`
- **Railway**: Connect GitHub repository
- **DigitalOcean**: Docker deployment
- **AWS**: Elastic Beanstalk or ECS

### Frontend Deployment
The frontend is optimized for:
- **Vercel**: `vercel deploy` (recommended)
- **Netlify**: Connect GitHub repository
- **AWS**: S3 + CloudFront
- **Docker**: Multi-stage build support

### Environment Variables

**Backend (.env):**
```env
DATABASE_URL=mongodb://...
OPENWEATHER_API_KEY=your_key
NEWS_API_KEY=your_key
COIN_GECKO_API_KEY=your_key
PORT=4000
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

## 🔒 Security Features

- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Zod schema validation
- **Environment Variables**: Secure API key management
- **Error Sanitization**: No sensitive data in error responses
- **CORS Configuration**: Restricted cross-origin requests

## 📈 Performance Optimizations

### Backend
- **Concurrent API Calls**: Promise.allSettled for parallel requests
- **Database Indexing**: Optimized queries with Prisma
- **Response Caching**: Built-in HTTP caching headers
- **Error Boundaries**: Graceful failure handling

### Frontend
- **Code Splitting**: Automatic route-based splitting
- **SWR Caching**: Intelligent data caching and revalidation
- **Image Optimization**: Next.js optimized images
- **Bundle Optimization**: Tree shaking and minification

## 🛡️ Error Handling

- **Network Failures**: Automatic retry with exponential backoff
- **API Rate Limits**: Graceful handling of third-party limits
- **Validation Errors**: Clear user feedback
- **Service Unavailability**: Fallback states and error messages

## 📚 Documentation

- [Backend README](./backend/README.md) - Detailed backend documentation
- [Frontend README](./frontend/README.md) - Frontend component guide
- API Documentation - Available at `/api` endpoint
- Component Storybook - Run `npm run storybook` (if configured)

### Development Guidelines

- **Code Style**: ESLint + Prettier for consistent formatting
- **Commit Messages**: Conventional commits format
- **Testing**: Write tests for new features
- **Documentation**: Update relevant README files

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **CoinGecko** for cryptocurrency data API
- **OpenWeather** for weather data API  
- **NewsAPI** for news content API
- **Vercel** for Next.js framework
- **Prisma** for database toolkit

---

Built with ❤️ as a technical demonstration of modern full-stack development practices.
