# Aura - Production Deployment Guide

## Overview
Aura is a mental health companion application built with React and Vite. This guide covers production deployment, configuration, and CI/CD setup.

## Project Information
- **Name**: Aura - AI Mental Health Companion
- **Version**: 1.0.0
- **Node Version**: >= 18.0.0
- **Package Manager**: npm >= 9.0.0

## Prerequisites

Before deploying to production, ensure you have:

1. **Node.js & npm**
   ```bash
   node --version  # Should be >= 18.0.0
   npm --version   # Should be >= 9.0.0
   ```

2. **Vercel Account** (for hosting)
3. **GitHub Account** (for CI/CD)

## Local Setup

### 1. Clone Repository
```bash
git clone https://github.com/kcroopashetty/aura.git
cd aura
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file based on `.env.example`:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
VITE_APP_NAME=Aura
VITE_LOG_LEVEL=info
VITE_FEATURE_FACIAL_RECOGNITION=true
VITE_FEATURE_VOICE_JOURNALING=true
VITE_FEATURE_AI_INSIGHTS=true
VITE_FEATURE_GAMES=true
```

### 4. Development Server
```bash
npm run dev
```
Visit http://localhost:5173

## Production Build

### Build for Production
```bash
npm run build
```

This creates optimized production build in `dist/` directory with:
- Minified JavaScript and CSS
- Code splitting for optimal caching
- Asset compression
- Source maps (hidden in production)

### Preview Production Build
```bash
npm run preview
```
Visit http://localhost:4173

### Build Analysis
To analyze bundle size:
```bash
npm run build:analyze
```

## Deployment to Vercel

### Option 1: Automatic Deployment via GitHub

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Vercel auto-detects your framework

2. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add all variables from `.env.example`
   - Set `VITE_LOG_LEVEL=info` for production

3. **Deploy**
   - Push to `main` branch
   - Vercel automatically builds and deploys
   - Check deployment status in Vercel dashboard

### Option 2: Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## CI/CD Pipeline Setup

### GitHub Actions Configuration

1. **Set Repository Secrets**
   Go to GitHub: Settings → Secrets and Variables → Actions

   Add these secrets:
   ```
   VERCEL_TOKEN      # Get from Vercel account settings
   VERCEL_ORG_ID     # Your Vercel team ID
   VERCEL_PROJECT_ID # Get from Vercel project settings
   ```

2. **How It Works**
   - Every push to `main` triggers:
     - ✅ Linting checks
     - ✅ Build process
     - ✅ Deployment to Vercel
     - ✅ Security audit
   
   - Pull requests trigger:
     - ✅ Linting checks
     - ✅ Build process
     - ❌ No deployment

### Getting Vercel Credentials

1. **VERCEL_TOKEN**
   - Go to https://vercel.com/account/tokens
   - Create new token
   - Copy and add to GitHub Secrets

2. **VERCEL_ORG_ID & VERCEL_PROJECT_ID**
   - Run `vercel --prod` locally once
   - Check `.vercel/project.json` file
   - Or find in Vercel dashboard project settings

## Production Checklist

Before going live, ensure:

- [ ] Environment variables configured in Vercel
- [ ] Build passes without errors
- [ ] All features tested (breathing, grounding, games, etc.)
- [ ] No console errors in production
- [ ] Performance metrics acceptable
- [ ] Security headers configured (in vercel.json)
- [ ] Cache strategy optimized
- [ ] Error handling in place
- [ ] Monitoring/logging configured

## Performance Optimization

### Build Optimization Done:
✅ Code splitting (React, Router, Charts, Face-API)
✅ Minification with Terser
✅ Tree-shaking of unused code
✅ Asset compression
✅ Caching strategies for immutable assets

### Runtime Optimization:
✅ Lazy component loading via React Router
✅ Image optimization via lazy loading
✅ Local storage for user data persistence
✅ Efficient state management

## Security Features

The application includes:
- ✅ Content Security Policy headers
- ✅ XSS protection headers
- ✅ Frame options (prevent clickjacking)
- ✅ Nosniff headers
- ✅ Referrer policy configuration
- ✅ Camera/Microphone permission restrictions

## Monitoring & Logging

### Environment Variables for Monitoring
```env
# Optional: Add monitoring service
VITE_SENTRY_DSN=your-sentry-dsn  # For error tracking
VITE_ANALYTICS_ID=your-analytics-id  # For usage tracking
```

## Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Vercel Deployment Fails
1. Check build logs in Vercel dashboard
2. Verify environment variables are set
3. Ensure `.vercel` folder is in `.gitignore`

### Performance Issues
```bash
# Analyze bundle size
npm run build:analyze

# Check for large dependencies
npm list
```

## Maintenance

### Regular Tasks
- [ ] Update dependencies monthly: `npm update`
- [ ] Security audit: `npm audit`
- [ ] Check Vercel analytics
- [ ] Review performance metrics
- [ ] Update documentation

### Dependency Updates
```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Update to latest major versions (careful with these)
npm install package@latest
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_APP_NAME | Application name | Aura |
| VITE_LOG_LEVEL | Logging level | info |
| VITE_FEATURE_FACIAL_RECOGNITION | Enable facial mood detection | true |
| VITE_FEATURE_VOICE_JOURNALING | Enable voice recording | true |
| VITE_FEATURE_AI_INSIGHTS | Enable AI responses | true |
| VITE_FEATURE_GAMES | Enable interactive games | true |
| VITE_API_BASE_URL | API endpoint (if applicable) | https://api.example.com |
| VITE_SENTRY_DSN | Error tracking service | Optional |
| VITE_ANALYTICS_ID | Analytics service ID | Optional |

## Support

For issues or questions:
1. Check GitHub Issues
2. Review Vercel documentation: https://vercel.com/docs
3. Check application logs in browser console
4. Review Vercel deployment logs

## License

MIT License - See LICENSE file for details

---

**Last Updated**: February 20, 2026
**Status**: Production Ready ✨
