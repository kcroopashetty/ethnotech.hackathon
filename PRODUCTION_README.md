# Aura - Production Ready Mental Health Companion

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkcroopashetty%2Faura)

## 🌿 Overview

Aura is an empathetic AI-powered mental health companion designed to support users through mindfulness, journaling, mood tracking, and interactive coping strategies. Built with React and production-ready for immediate deployment.

## ✨ Features

### Core Functionality
- 📔 **Interactive Diary** - Voice and text journaling with sentiment analysis
- 😊 **Mood Tracking** - Visual mood history with multimodal emotion recognition
- 🧘 **Mindfulness Exercises** - Guided breathing, grounding, and self-compassion techniques
- 🎮 **Calm Games** - Bubble popping, focus tap, and color-matching games
- 💙 **Self-Compassion Tools** - Guided writing prompts and affirmations
- 🔍 **Facial Recognition** - Real-time mood detection via webcam
- 🎤 **Voice Journaling** - Speech-to-text emotional expression
- 🤖 **AI Insights** - Intelligent analysis and compassionate responses

## 🚀 Quick Start

### For Development
```bash
git clone https://github.com/kcroopashetty/aura.git
cd aura
npm install
npm run dev
```

### For Production
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed production setup and Vercel deployment instructions.

## 📋 Requirements

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **Modern Browser**: Chrome, Firefox, Safari, or Edge
- **Webcam** (optional): For facial mood detection
- **Microphone** (optional): For voice journaling

## 🏗️ Architecture

```
src/
├── components/           # React components
│   ├── activities/      # Interactive activity modules
│   └── ...              # Other UI components
├── config/              # Environment-specific configs
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
└── App.jsx              # Main application
```

## 🔧 Environment Variables

Create `.env.local` based on `.env.example`:

```env
VITE_APP_NAME=Aura
VITE_LOG_LEVEL=info
VITE_FEATURE_FACIAL_RECOGNITION=true
VITE_FEATURE_VOICE_JOURNALING=true
VITE_FEATURE_AI_INSIGHTS=true
VITE_FEATURE_GAMES=true
```

## 📦 Key Dependencies

- **React 19.2.0** - UI Framework
- **React Router 7.13** - Client-side routing
- **Recharts 3.7** - Data visualization
- **Face-API** - Facial emotion detection
- **Vite 7.3** - Build tool and dev server

## 🔐 Security Features

- ✅ Content Security Policy headers
- ✅ XSS protection
- ✅ Frame options (prevent clickjacking)
- ✅ Secure cookie handling
- ✅ Camera/Microphone permission restrictions
- ✅ CORS configuration
- ✅ Environment variable isolation

## 📊 Performance

### Build Optimization
- Code splitting (React, Router, Charts, Face-API)
- Minification and compression
- Tree-shaking of unused code
- Optimized chunk caching strategy

### Runtime Optimization
- Lazy loading of components
- Local storage for persistence
- Efficient state management
- Image lazy loading

**Build Size**: ~150-200KB gzipped

## 🚀 Deployment

### Automatic Deployment (GitHub + Vercel)
1. Push to `main` branch
2. GitHub Actions triggers CI/CD pipeline
3. Vercel automatically builds and deploys
4. Visit your live site

### Manual Deployment
```bash
vercel --prod
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📱 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🧪 Testing

```bash
npm run lint           # Lint code
npm run build          # Production build
npm run preview        # Preview production build
npm run build:analyze  # Analyze bundle size
```

## 🔄 CI/CD Pipeline

Automated checks on every push:
- ✅ ESLint validation
- ✅ Build process
- ✅ Deployment (main branch only)
- ✅ Security audit

## 📝 Project Structure

```
aura/
├── public/           # Static assets & ML models
├── src/
│   ├── components/   # React components
│   ├── config/       # Configuration files
│   ├── hooks/        # Custom hooks
│   ├── utils/        # Utility functions
│   ├── App.jsx       # Main component
│   ├── main.jsx      # Entry point
│   └── index.css     # Styles
├── .github/          # GitHub Actions workflows
├── vite.config.js    # Vite configuration
├── vercel.json       # Vercel deployment config
├── .env.example      # Environment template
└── package.json      # Dependencies
```

## 🛠️ Scripts

```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Lint code with ESLint
npm run lint:fix      # Auto-fix linting issues
npm run build:analyze # Analyze bundle size
```

## 🌱 Data Management

- **User Data**: Stored locally in browser (localStorage)
- **Journal Entries**: Client-side encryption (optional)
- **Mood History**: Persistent across sessions
- **No Server Required**: Fully client-side application

### Privacy
- No data sent to external servers by default
- All processing happens locally
- Webcam/Microphone access is user-controlled
- Compliance ready for privacy regulations

## ⚡ Performance Metrics

Target metrics:
- **Lighthouse Score**: 90+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Contributing

1. Clone the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - See LICENSE file

## 🆘 Support & Feedback

For issues or suggestions:
- Create a GitHub issue
- Check existing issues first
- Provide detailed reproduction steps

## ⚠️ Disclaimer

**Aura is not a medical tool.** It's designed for wellness and emotional support only. If you're experiencing a mental health crisis, please contact:
- National Crisis Hotline: 988
- Crisis Text Line: Text HOME to 741741
- International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/

## 🎯 Roadmap

Future features planned:
- [ ] Backend API integration
- [ ] Advanced NLP for sentiment analysis
- [ ] Machine learning mood prediction
- [ ] Social features (anonymous sharing)
- [ ] Music therapy integration
- [ ] Integration with mental health professionals
- [ ] Mobile app (React Native)

## 📢 Version

**Current Version**: 1.0.0
**Last Updated**: February 20, 2026
**Status**: Production Ready ✨

---

Made with ❤️ for mental wellness.
