# Vercel Deployment Setup Guide

Complete step-by-step guide to deploy Aura to Vercel with CI/CD.

## 📋 Prerequisites

Before starting, ensure you have:
1. GitHub account with this repository access
2. Vercel account (https://vercel.com/signup)
3. Node.js 18+ installed locally

## 🚀 Step 1: Connect GitHub to Vercel

### 1.1 Create Vercel Account
- Go to https://vercel.com/signup
- Sign up with GitHub (recommended)
- Authorize Vercel to access your GitHub account

### 1.2 Import Project
- Click "Add New..." → "Project"
- Select "Continue with GitHub"
- Find and select `aura` repository
- Click "Import"

## ⚙️ Step 2: Configure Project Settings

### 2.1 Framework Preset
- Framework: **Other**
- Build Command: **npm run build** (should auto-detect)
- Output Directory: **dist**
- Install Command: **npm install**

### 2.2 Root Directory
- Root Directory: **.** (current directory)

## 🔐 Step 3: Set Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```
VITE_APP_NAME = Aura
VITE_LOG_LEVEL = info
VITE_FEATURE_FACIAL_RECOGNITION = true
VITE_FEATURE_VOICE_JOURNALING = true
VITE_FEATURE_AI_INSIGHTS = true
VITE_FEATURE_GAMES = true
```

### Optional Monitoring Variables
```
VITE_SENTRY_DSN = (leave empty if not using)
VITE_ANALYTICS_ID = (leave empty if not using)
```

**Apply to:**
- Production
- Preview
- Development (optional)

## 🔄 Step 4: GitHub Actions & CI/CD Setup

### 4.1 Generate Vercel Token
1. Go to https://vercel.com/account/tokens
2. Click "Create Token"
3. Name: `GITHUB_ACTIONS`
4. Expiration: (set as needed)
5. Copy the token

### 4.2 Add GitHub Secrets
1. Go to GitHub Repository → Settings → Secrets and Variables → Actions
2. Click "New repository secret"
3. Add these secrets:

**Secret 1: VERCEL_TOKEN**
- Name: `VERCEL_TOKEN`
- Value: (paste token from step 4.1)

**Secret 2: VERCEL_ORG_ID**
- Go to Vercel → Settings → General
- Find Organization ID
- Name: `VERCEL_ORG_ID`
- Value: (your org ID)

**Secret 3: VERCEL_PROJECT_ID**
- Go to Vercel → Project → Settings
- Find Project ID
- Name: `VERCEL_PROJECT_ID`
- Value: (your project ID)

### 4.3 Verify GitHub Actions
- Go to GitHub Repository → Actions
- Should see "CI/CD Pipeline" workflow
- Check that recent commits have passed all checks

## ✅ Step 5: Test Deployment

### 5.1 Trigger Deployment
```bash
# Make a test commit to main branch
git add .
git commit -m "Enable production deployment"
git push origin main
```

### 5.2 Monitor Deployment
1. Check GitHub Actions → CI/CD Pipeline (should pass all checks)
2. Go to Vercel → Deployments
3. Wait for deployment to complete
4. Click deployment to see live URL

### 5.3 Verify Live Site
- Open the deployment URL
- Test all features:
  - ✅ Sign up / Login
  - ✅ Interactive diary
  - ✅ Mood tracking
  - ✅ Breathing exercises
  - ✅ Games
  - ✅ Facial recognition (if enabled)

## 🌐 Step 6: Configure Custom Domain (Optional)

### 6.1 Connect Domain
1. Vercel Dashboard → Project → Settings → Domains
2. Add domain
3. Choose domain registration or point DNS

### 6.2 Update DNS
Follow Vercel's DNS instructions for your domain registrar

## 📊 Step 7: Monitor & Manage

### 7.1 Performance Monitoring
- Vercel Analytics → Real User Monitoring
- Check:
  - Page load times
  - Core Web Vitals
  - Traffic sources

### 7.2 Logs & Debugging
- Vercel Dashboard → Deployments → Logs
- Check for build errors
- Review runtime logs

### 7.3 Automatic Builds
- Every push to `main` auto-deploys
- Every PR creates preview deployment
- Automatic rollback if build fails

## 🔧 Step 8: Advanced Configuration

### 8.1 Regional Deployment
Vercel Dashboard → Settings → Edge Network
- Configure regions for global distribution

### 8.2 Team Collaboration
Settings → Team
- Add team members
- Assign roles

### 8.3 Build Optimization
Configuration in `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

## 🚨 Troubleshooting

### Build Fails

**Issue**: "npm: command not found"
**Solution**: Node version in Vercel settings (set to 18.x)

**Issue**: "ENOENT: no such file or directory"
**Solution**: Check `outputDirectory` is set to `dist`

### Deployment Issues

**Issue**: "Deployment exceeded timeout"
**Solution**: Optimize build, check for large dependencies

**Issue**: "Environment variables not working"
**Solution**: Redeploy after adding variables

### Performance Issues

**Issue**: Slow page load
**Solution**: 
- Check Vercel Analytics
- Optimize images
- Review bundle size: `npm run build:analyze`

## 📞 Support

### Vercel Support
- Docs: https://vercel.com/docs
- Community: https://github.com/vercel/next.js/discussions
- Status: https://www.vercelstatus.com

### Common Issues
- https://vercel.com/docs/troubleshooting
- https://vercel.com/guides

## ✨ You're Ready!

Your Aura application is now:
- ✅ Deployed to production
- ✅ Set up with CI/CD pipeline
- ✅ Monitored for performance
- ✅ Auto-deploying on updates

### Next Steps
1. Share your live site
2. Monitor performance via Vercel Analytics
3. Collect user feedback
4. Iterate and improve

---

**Deployment Complete!** 🎉

Your site is now live at your Vercel URL and auto-deploys on every push to `main`.
