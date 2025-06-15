# 🚀 SmartMarketplace - AI-Powered Freelance Mission Generator

> **Transform simple project descriptions into detailed freelance missions using advanced AI technology**

[![.NET](https://img.shields.io/badge/.NET-9.0-512BD4?style=for-the-badge&logo=dotnet)](https://dotnet.microsoft.com/)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

## 🌟 Overview

SmartMarketplace is a full-stack application that revolutionizes freelance project creation by using AI to transform simple, short descriptions into comprehensive, detailed mission specifications. The system leverages multiple AI providers (Gemini, DeepSeek, Mistral) to ensure maximum reliability and quality.

### ✨ Key Features

- **🤖 Multi-AI Intelligence**: Integration with Gemini, DeepSeek, and Mistral AI
- **🔄 Smart Fallback System**: Automatic provider switching for maximum reliability
- **🎨 Modern Glass Morphism UI**: Beautiful, responsive design with smooth animations
- **⚡ High Performance**: Optimized for speed with Next.js 15 and .NET 9
- **🔒 Enterprise Security**: Built-in validation, error handling, and secure API design
- **📱 Fully Responsive**: Perfect experience across all devices
- **🌐 Multi-Language Ready**: Built with internationalization in mind

## 🏗️ Architecture

```
SmartMarketplace/
├── 🎨 frontend/                      # Next.js 15 + React 19 Frontend
│   ├── src/
│   │   ├── app/                      # Next.js App Router
│   │   ├── components/               # React Components
│   │   ├── types/                    # TypeScript Definitions
│   │   └── lib/                      # Utility Functions
│   ├── public/                       # Static Assets
│   ├── package.json                  # Dependencies
│   └── next.config.ts                # Next.js Configuration
├── 🔧 backend/                       # .NET 9 Web API
│   ├── Controllers/                  # REST API Endpoints
│   ├── Models/                       # Domain Models
│   ├── Services/                     # Business Logic
│   ├── Configuration/                # App Settings
│   ├── Program.cs                    # Application Entry Point
│   └── SmartMarketplace.csproj       # Project Configuration
├── .gitignore                        # Git Ignore Rules
└── README.md                         # This File
```

## 🚦 Quick Start

### Prerequisites

- **Node.js** 18.17+ (for frontend)
- **.NET 9.0 SDK** (for backend)
- **Git** for version control
- API keys for at least one AI provider

### 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/smart-marketplace.git
cd smart-marketplace

# Setup Backend
cd backend
dotnet restore
cp appsettings.example.json appsettings.json
# Edit appsettings.json with your AI API keys

# Setup Frontend
cd ../frontend
npm install
```

### ⚙️ Configuration

#### Backend Configuration

Edit `backend/appsettings.json`:

```json
{
  "AI": {
    "DefaultProvider": "Gemini",
    "Gemini": {
      "ApiKey": "AIzaSy-YOUR_GEMINI_KEY_HERE",
      "BaseUrl": "https://generativelanguage.googleapis.com/v1beta",
      "Model": "gemini-1.5-flash"
    },
    "DeepSeek": {
      "ApiKey": "sk-or-v1-YOUR_DEEPSEEK_KEY_HERE",
      "BaseUrl": "https://api.openrouter.ai/v1",
      "Model": "deepseek/deepseek-r1:free"
    },
    "Mistral": {
      "ApiKey": "YOUR_MISTRAL_KEY_HERE",
      "BaseUrl": "https://api.mistral.ai/v1",
      "Model": "mistral-small-2503"
    }
  }
}
```

### 🏃‍♂️ Running the Application

#### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
dotnet run
# API will be available at https://localhost:7289
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Frontend will be available at http://localhost:3000
```

#### Production Build

**Backend:**
```bash
cd backend
dotnet publish -c Release -o out
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

## 🔌 API Documentation

### Base URLs
- **Development**: `https://localhost:7289`
- **Production**: Configure in deployment

### Main Endpoints

#### POST `/api/Mission/generate`
Generate a detailed mission from simple input.

**Request:**
```json
{
  "simpleInput": "React developer Paris 5000€ remote 6 months",
  "preferredProvider": "Gemini"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Senior React Developer - Paris (Remote)",
    "description": "🎯 PROJECT CONTEXT:\nDevelopment of a modern React application...",
    "country": "France",
    "city": "Paris",
    "workMode": "REMOTE",
    "duration": 6,
    "estimatedDailyRate": 500.00,
    "domain": "Frontend Development",
    "requiredExpertises": ["React", "TypeScript", "Next.js"]
  },
  "provider": "Gemini"
}
```

### Supported AI Providers

| Provider | Model | Strengths |
|----------|-------|-----------|
| 🧠 **Google Gemini** | `gemini-1.5-flash` | Fast & reliable generation |
| 🔍 **DeepSeek R1** | `deepseek-r1:free` | Advanced reasoning capabilities |
| 🇫🇷 **Mistral AI** | `mistral-small-2503` | European AI with GDPR compliance |

## 🎨 Frontend Features

- **Glass Morphism Design**: Modern, elegant UI with glass effects
- **Responsive Layout**: Optimized for desktop, tablet, and mobile
- **Real-time Generation**: Live AI processing with progress indicators
- **Smooth Animations**: Custom CSS animations and transitions
- **Form Validation**: Client-side validation with helpful error messages
- **Copy to Clipboard**: Easy sharing of generated missions

## 🔧 Backend Features

- **Multi-Provider AI**: Seamless switching between AI providers
- **Error Handling**: Comprehensive error handling and logging
- **CORS Support**: Configured for frontend integration
- **Swagger Documentation**: Interactive API documentation at `/swagger`
- **Structured Logging**: Detailed logging for debugging and monitoring
- **Model Validation**: Automatic request/response validation

## 🚀 Deployment

### Docker Deployment (Recommended)

**Backend Dockerfile:**
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["SmartMarketplace.csproj", "."]
RUN dotnet restore
COPY . .
RUN dotnet build -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SmartMarketplace.dll"]
```

**Frontend Dockerfile:**
```dockerfile
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM base AS runtime
COPY --from=build /app/.next ./.next
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables

**Backend:**
```env
AI__Gemini__ApiKey=your_gemini_key
AI__DeepSeek__ApiKey=your_deepseek_key
AI__Mistral__ApiKey=your_mistral_key
ASPNETCORE_ENVIRONMENT=Production
```

**Frontend:**
```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini** for fast and reliable AI generation
- **DeepSeek** for advanced reasoning capabilities
- **Mistral AI** for European AI compliance
- **Next.js Team** for the amazing React framework
- **Microsoft** for the robust .NET platform

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/smart-marketplace/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

**Made with ❤️ by the SmartMarketplace Team** 