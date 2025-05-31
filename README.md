# Multi-API Integration Project

A full-stack application that demonstrates advanced API integration, data normalization, and modern web development practices. The project consists of a Node.js backend that aggregates data from multiple public APIs and a React frontend dashboard for data visualization.

## 🏗️ Project Overview

This technical demonstration project showcases:
- **Multi-API Integration**: Fetching and normalizing data from CoinGecko, OpenWeather, and NewsAPI
- **Full-Stack Development**: Complete backend API with modern frontend dashboard
- **Rate Limiting**: Protection against API abuse with proper error handling
- **Data Persistence**: MongoDB database with Prisma ORM and aggregated data storage
- **Modern Frontend**: React with TypeScript, Next.js 15, and Tailwind CSS
- **Advanced Features**: DataLoaders for efficient database queries, URL-based state management
- **Production Ready**: Comprehensive error handling, testing, and deployment configuration

## 🛠 Technology Stack

### Backend
- **Node.js** + **Express.js** - Server runtime and web framework
- **TypeScript** - Type safety and enhanced developer experience
- **MongoDB** + **Prisma** - Database and ORM with schema folder structure
- **DataLoaders** - Efficient data loading and caching
- **express-rate-limit** - API rate limiting
- **Axios** - HTTP client for external APIs
- **Zod** - Runtime type validation
- **dotenvx** - Enhanced environment variable management

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **SWR** - Data fetching and caching
- **React Hook Form** + **Zod** - Form handling and validation

## 📁 Project Structure

```
multi-api/
├── backend/          # Node.js + Express API
│   ├── src/
│   │   ├── api/             # Controllers and routes
│   │   ├── services/        # Business logic and external API integration
│   │   ├── database/        # Database connection and seeding
│   │   ├── dataloaders/     # DataLoader implementations for efficient queries
│   │   ├── utils/          # Utilities and middleware
│   │   ├── types/          # TypeScript definitions
│   │   ├── helpers/        # Helper functions for formatting and models
│   │   └── validators/     # Input validation schemas
│   ├── prisma/             # Database schema with modular structure
│   │   ├── schema.prisma   # Main schema configuration
│   │   └── aggregated_data.prisma  # Aggregated data models
│   ├── jest/               # Test configuration
│   └── package.json
│
└── frontend/         # Next.js React Dashboard
    ├── src/
    │   ├── app/            # Next.js App Router
    │   ├── components/     # Reusable UI components
    │   │   ├── ui/        # Base UI primitives (Radix UI)
    │   │   ├── common/    # Shared components (Error, Loading, Empty states)
    │   │   └── features/  # Feature-specific components (Dashboard, Cards)
    │   ├── services/      # API integration
    │   ├── lib/          # Utility libraries (axios, SWR, utils)
    │   ├── config/       # Configuration constants
    │   └── utils/        # Utility functions
    └── package.json
```
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

# Optional: Seed database with initial data
npm run db:seed

# Start development server
npm run dev
```

Backend will be running at `http://localhost:4000`

### 2. Frontend Setup

```bash
# Navigate to frontend
cd frontend

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
curl "http://localhost:4000/api/aggregated-data?filters[crypto]=ethereum&filters[city]=Tokyo&filters[newsQuery]=blockchain&filters[minPrice]=1000&filters[maxPrice]=5000"
```

### Utility Endpoints
- `GET /api/health` - Service health check
- `GET /` - API information and available endpoints

## 🗃️ Database Structure

The application uses MongoDB with Prisma ORM and includes:

### AggregatedData Model
```typescript
{
  id: string;
  crypto?: CryptoData;
  weather?: WeatherData;
  news?: NewsData;
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

### Embedded Types
- **CryptoData**: name, symbol, price, marketCap
- **WeatherData**: city, temperature, condition, humidity, windSpeed
- **NewsData**: title, source, url, description, publishedAt, category

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
# or
yarn test
```

### Frontend Testing
```bash
cd frontend
npm test
# or  
yarn test
```

## 📊 Development Scripts

### Backend
- `npm run dev` - Development server with auto-reload and database push
- `npm run build` - Production build with database migration
- `npm run db:push` - Push database schema changes
- `npm run db:seed` - Seed database with initial data
- `npm run lint` - ESLint code quality check
- `npm run prettier` - Code formatting check

### Frontend  
- `npm run dev` - Development server with Turbopack
- `npm run build` - Optimized production build
- `npm run lint` - Next.js ESLint configuration

### Environment Variables

**Backend (.env):**
```env
# Database
DATABASE_URL=mongodb://localhost/app_report_development?directConnection=true

# Server Configuration  
PORT=4000
NODE_ENV=development

# External API Keys
OPENWEATHER_API_KEY=your_openweather_api_key
NEWS_API_KEY=your_newsapi_key
COIN_GECKO_API_KEY=your_coingecko_api_key

# API URLs (Optional - have defaults)
COIN_GECKO_API_URL=https://api.coingecko.com/api/v3
NEWS_API_URL=https://newsapi.org/v2
OPENWEATHER_API_URL=https://api.openweathermap.org/data/2.5
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

### Current Features Status
✅ **Fully Implemented**
- Multi-API integration (CoinGecko, OpenWeather, NewsAPI)
- Real-time data aggregation and normalization
- Advanced filtering with price ranges and keyword search
- MongoDB data persistence with Prisma ORM
- Rate limiting and security measures
- Modern React dashboard with TypeScript
- Responsive design with Tailwind CSS
- Comprehensive error handling

🔧 **Development Ready**
- Testing framework setup (Jest configuration)
- Development and production build processes
- Environment-based configuration
- Database seeding capabilities
- Code quality tools (ESLint, Prettier)

## 📋 Prerequisites & Setup Notes

### System Requirements
- Node.js v18+ (tested with latest LTS)
- MongoDB (local instance or cloud Atlas)
- API keys from external services
- Modern web browser for frontend testing

### Quick Development Setup
1. **Backend First**: Always start with backend setup and database connection
2. **API Keys**: Ensure all external API keys are valid and have sufficient quotas
3. **Database**: MongoDB must be running and accessible via DATABASE_URL
4. **Environment**: Copy and configure .env files for both frontend and backend
5. **Testing**: Use provided health check endpoints to verify API connectivity

---

Built with ❤️ as a technical demonstration of modern full-stack development practices.
