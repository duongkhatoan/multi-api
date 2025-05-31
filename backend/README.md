# Multi-API Integration Backend

A Node.js + Express backend service that integrates and normalizes data from multiple public APIs, providing a unified REST API for cryptocurrency, weather, and news data.

## 🚀 Features

- **Multi-API Integration**: Fetches data from CoinGecko, OpenWeather, and NewsAPI
- **Data Normalization**: Unified response format across different data sources
- **Rate Limiting**: 5 requests per minute protection against abuse
- **Database Storage**: MongoDB with Prisma ORM for data persistence
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive error handling and logging
- **Filtering Support**: Price range filtering for crypto data, city selection for weather, keyword search for news

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **ORM**: Prisma
- **Rate Limiting**: express-rate-limit
- **HTTP Client**: Axios
- **Environment**: dotenvx

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- API Keys for:
  - [CoinGecko API](https://www.coingecko.com/en/api)
  - [OpenWeather API](https://openweathermap.org/api)
  - [NewsAPI](https://newsapi.org/)

## 🚀 Quick Start

### 1. Installation

```bash
# Clone the repository
git clone <repository-url>
cd backend

# Install dependencies
npm install
# or
yarn install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```bash
# Copy from example
cp .env.example .env
```

Configure your environment variables:

```env
# Database
DATABASE_URL="mongodb://localhost/weather_report_development?directConnection=true"

# Server
PORT=4000
NODE_ENV="development"

# External APIs
OPENWEATHER_API_KEY="your_openweather_api_key"
NEWS_API_KEY="your_newsapi_key"
COIN_GECKO_API_KEY="your_coingecko_api_key"

# API URLs (Optional - have defaults)
COIN_GECKO_API_URL="https://api.coingecko.com/api/v3"
NEWS_API_URL="https://newsapi.org/v2"
OPENWEATHER_API_URL="https://api.openweathermap.org/data/2.5"
```

### 3. Database Setup

```bash
# Push database schema
yarn run db:push

```

### 4. Development

```bash
# Start development server with hot reload
yarn run dev

# Build for production
yarn run build

```

## 📚 API Documentation

### Base URL

```
http://localhost:4000/api
```

### Endpoints

#### Get Aggregated Data

```http
GET /api/aggregated-data
```

**Query Parameters:**

- `crypto` (string): Cryptocurrency ID (default: "bitcoin")
- `city` (string): City name for weather (default: "Hanoi")
- `newsQuery` (string): News search keyword (default: "technology")
- `minPrice` (number): Minimum crypto price filter
- `maxPrice` (number): Maximum crypto price filter
- `cryptoLimit` (number): Number of cryptocurrencies to fetch

**Example Request:**

```bash
curl "http://localhost:4000/api/aggregated-data?crypto=ethereum&city=Tokyo&newsQuery=blockchain&minPrice=1000&maxPrice=5000"
```

**Example Response:**

```json
{
  "success": true,
  "data": {
    "crypto": {
      "name": "Ethereum",
      "symbol": "ETH",
      "price": 2500.5,
      "marketCap": 300000000000
    },
    "weather": {
      "city": "Tokyo",
      "temperature": 25,
      "condition": "Clear",
      "humidity": 60,
      "windSpeed": 5.2
    },
    "latest_news": {
      "title": "Blockchain Technology Advances",
      "source": "TechNews",
      "url": "https://example.com/blockchain-news",
      "description": "Latest developments in blockchain...",
      "publishedAt": "2025-05-31T10:00:00Z",
      "category": "blockchain"
    }
  },
  "timestamp": "2025-05-31T10:00:00Z"
}
```

#### Health Check

```http
GET /api/health
```

Returns service status and timestamp.

## 🔧 Project Structure

```
src/
├── api/
│   ├── controllers/     # Request handlers
│   └── routes/         # Route definitions
├── services/           # Business logic and external API integration
├── database/           # Database connection and seeding
├── utils/             # Utilities and middleware
├── types/             # TypeScript type definitions
└── index.ts           # Application entry point
```

## 🛡️ Rate Limiting

The API implements rate limiting to prevent abuse:

- **Limit**: 5 requests per minute per IP
- **Window**: 60 seconds
- **Response**: 429 status with retry information

## 📝 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:push` - Push database schema
- `npm run db:seed` - Seed database with sample data
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run prettier` - Format code with Prettier

## 🔒 Security Features

- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Validates all incoming requests
- **Error Handling**: Sanitized error responses
- **Environment Variables**: Sensitive data protection

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**

   - Ensure MongoDB is running
   - Check DATABASE_URL in .env file

2. **API Key Errors**

   - Verify all API keys are valid and active
   - Check API key permissions and rate limits

3. **Port Already in Use**
   - Change PORT in .env file
   - Kill process using the port: `lsof -ti:4000 | xargs kill`
