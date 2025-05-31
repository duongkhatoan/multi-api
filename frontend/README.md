# Multi-API Integration Dashboard

A modern React dashboard that displays aggregated data from multiple APIs including cryptocurrency prices, weather information, and latest news. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Real-time Data Dashboard**: Live cryptocurrency, weather, and news data
- **Advanced Filtering**: Filter crypto by price range, select cities for weather, search news by keywords
- **Responsive Design**: Mobile-first design with card-based layout
- **Modern UI/UX**: Built with Radix UI components and Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **State Management**: URL-based state with SWR for data fetching
- **Error Handling**: Comprehensive error states and loading indicators
- **Performance**: Optimized with Next.js App Router and automatic code splitting

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Data Fetching**: SWR
- **Form Handling**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js (v18 or higher)
- Backend API running (see backend README)

## 🚀 Quick Start

### 1. Installation

```bash
# Install dependencies
npm install
# or
yarn install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### 3. Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at `http://localhost:3000`

## 🎨 Features Overview

### Dashboard Components

#### 🪙 Crypto Card
- Displays cryptocurrency information (name, symbol, price, market cap)
- Real-time price updates
- Price range filtering support

#### 🌤️ Weather Card
- Current weather conditions for selected city
- Temperature, humidity, wind speed
- Multiple city options

#### 📰 News Card
- Latest news articles based on search keywords
- Article title, source, description, and link
- Keyword-based filtering

#### 🔧 Filter Panel
- **Cryptocurrency Filter**: Select specific coins or filter by price range
- **City Selection**: Choose from major cities worldwide
- **News Search**: Enter keywords to find relevant news
- **Price Range**: Set minimum and maximum price filters for crypto
- **Form Validation**: Real-time validation with error messages

### 🎯 Advanced Features

#### URL State Management
- All filters are synchronized with URL parameters
- Shareable URLs with current filter state
- Browser back/forward navigation support

#### Data Fetching Strategy
- **SWR**: Automatic revalidation and caching
- **Error Retry**: Automatic retry on failed requests
- **Background Updates**: Fresh data without blocking UI

#### Responsive Design
- Mobile-first approach
- Adaptive grid layouts
- Touch-friendly interface

## 🗂️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── ui/               # Base UI components (button, card, input, etc.)
│   ├── common/           # Shared components (ErrorComponent, EmptyState)
│   └── features/
│       └── dashboard/    # Dashboard-specific components
├── lib/                  # Utility libraries
├── services/             # API service layers
├── types/               # TypeScript type definitions
└── utils/               # Helper utilities
```

### Component Architecture

#### `/ui` Components
Basic UI primitives following atomic design principles:
- `button.tsx` - Reusable button component
- `card.tsx` - Card container component
- `input.tsx` - Form input component
- `select.tsx` - Dropdown select component
- `skeleton.tsx` - Loading skeleton component

#### `/common` Components
Shared components used across features:
- `ErrorComponent.tsx` - Error state display
- `EmptyState.tsx` - Empty state with call-to-action
- `LoadingError.tsx` - Loading spinner and error states

#### `/features/dashboard` Components
Dashboard-specific components:
- `Dashboard.tsx` - Main dashboard container
- `FilterPanel.tsx` - Advanced filtering interface
- `CryptoCard.tsx` - Cryptocurrency data display
- `WeatherCard.tsx` - Weather information display
- `NewsCard.tsx` - News article display
- `DashboardSkeleton.tsx` - Loading state for dashboard

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS with custom configuration for:
- Custom color palette
- Component variants
- Responsive breakpoints
- Animation utilities

### SWR Configuration
- **Revalidation**: Automatic background updates
- **Error Retry**: Exponential backoff strategy
- **Cache Strategy**: Memory-based with automatic cleanup

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient theme
- **Secondary**: Neutral grays
- **Success**: Green variants
- **Error**: Red variants
- **Warning**: Orange variants

### Typography
- **Headings**: Inter font family
- **Body**: Inter font family
- **Code**: Mono font family

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔍 Usage Examples

### Basic Usage
1. Open the dashboard at `http://localhost:3000`
2. View real-time data from all three sources
3. Use filters to customize the data display

### Advanced Filtering
```typescript
// Example filter state
{
  crypto: "ethereum",
  city: "Tokyo", 
  newsQuery: "blockchain",
  minPrice: 1000,
  maxPrice: 5000
}
```

### URL State
```
http://localhost:3000?crypto=bitcoin&city=New%20York&newsQuery=technology&minPrice=40000&maxPrice=50000
```

## 🛡️ Error Handling

The application implements comprehensive error handling:

- **Network Errors**: Retry mechanisms with user feedback
- **Validation Errors**: Real-time form validation
- **API Errors**: Graceful degradation with error messages
- **Loading States**: Skeleton components during data fetching

## 🚀 Performance Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js optimized images
- **Bundle Analysis**: Webpack bundle analyzer
- **SWR Caching**: Intelligent data caching
- **Static Generation**: Pre-rendered pages where possible

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Error**
   - Ensure backend server is running on port 4000
   - Check NEXT_PUBLIC_API_URL in .env.local

2. **Build Errors**
   - Clear Next.js cache: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check for conflicting CSS classes

### Development Tools

- **Next.js DevTools**: Built-in development debugging
- **React DevTools**: Browser extension for component inspection
- **SWR DevTools**: Data fetching debugging

---

Built with ❤️ using Next.js and modern web technologies.
