# 🚀 Firebase Deployment Guide - Multi-Environment Setup

This guide shows how to deploy your Fumadocs documentation to Firebase Hosting with staging and production environments.

## 📍 Command Locations

You can run deployment commands from **two locations**:

### **From Project Root** (Recommended)
```bash
# From /Users/deepanshu.kumar/Desktop/cloved/
npm run deploy:staging
npm run deploy:production
npm run deploy:all
```

### **From Docs Directory**
```bash
# From /Users/deepanshu.kumar/Desktop/cloved/apps/docs/
npm run deploy:staging
npm run deploy:production
npm run deploy:all
```

## 🔧 Initial Setup (One-Time)

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Setup Hosting Sites & Targets
```bash
# First, create the hosting sites in Firebase
firebase hosting:sites:create blend-staging --project=storybook-452807
firebase hosting:sites:create blend-prod --project=storybook-452807

# Then setup hosting targets
# From project root
npm run docs:setup

# OR from docs directory
cd apps/docs
npm run setup:hosting
```

## 🚀 Deployment Commands

### **Deploy to Staging**
```bash
# From project root (recommended)
npm run deploy:staging

# OR from docs directory
cd apps/docs && npm run deploy:staging
```

### **Deploy to Production**
```bash
# From project root (recommended)
npm run deploy:production

# OR from docs directory
cd apps/docs && npm run deploy:production
```

### **Deploy to Both Environments**
```bash
# From project root (recommended)
npm run deploy:all

# OR from docs directory
cd apps/docs && npm run deploy:all
```

## 🌐 Environment URLs

After deployment, your documentation will be available at:

### **Staging Environment**
- **URL**: `https://blend-staging.web.app`
- **Purpose**: Testing and review
- **Cache**: 1 hour (faster updates)

### **Production Environment**
- **URL**: `https://blend-prod.web.app`
- **Purpose**: Live documentation
- **Cache**: 1 year (optimal performance)

## 📋 Complete Workflow

### **Development to Production Workflow**
```bash
# 1. Start local development
npm run docs:dev

# 2. Make changes to MDX files in apps/docs/content/docs/
# 3. Test locally (search works automatically)

# 4. Deploy to staging for testing
npm run deploy:staging

# 5. Test on staging environment
# Visit: https://blend-staging.web.app

# 6. Deploy to production
npm run deploy:production

# 7. Live on production
# Visit: https://blend-prod.web.app
```

## 🔍 Search Functionality

### **Automatic Search Updates**
- ✅ **Local Development**: Search updates automatically when you save MDX files
- ✅ **Staging/Production**: Search index rebuilds during each deployment
- ✅ **New Content**: All new MDX files are automatically searchable
- ✅ **No Manual Steps**: Everything happens automatically

### **Adding New Content**
```bash
# 1. Add new MDX file
echo '---
title: New Component
description: A new component
---

# New Component

This content will be automatically searchable!' > apps/docs/content/docs/components/NewComponent.mdx

# 2. Update navigation (optional)
# Edit apps/docs/content/docs/components/meta.json

# 3. Deploy (search automatically includes new content)
npm run deploy:staging
```

## 🛠️ Available Scripts

### **From Project Root**
| Command | Description |
|---------|-------------|
| `npm run docs:dev` | Start local development server |
| `npm run docs:build` | Build docs for production |
| `npm run deploy:staging` | Deploy to staging environment |
| `npm run deploy:production` | Deploy to production environment |
| `npm run deploy:all` | Deploy to both environments |
| `npm run docs:setup` | Setup Firebase hosting targets |

### **From apps/docs/ Directory**
| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server |
| `npm run build` | Build docs for production |
| `npm run deploy:staging` | Deploy to staging environment |
| `npm run deploy:production` | Deploy to production environment |
| `npm run deploy:all` | Deploy to both environments |
| `npm run setup:hosting` | Setup Firebase hosting targets |

## 🔧 Troubleshooting

### **"Missing script" Error**
If you get `Missing script: "deploy:staging"`:
- ✅ **Solution**: Make sure you're using the updated root `package.json`
- ✅ **Alternative**: Run from docs directory: `cd apps/docs && npm run deploy:staging`

### **Firebase Not Logged In**
```bash
firebase login
```

### **Hosting Targets Not Set**
```bash
npm run docs:setup
```

### **Build Errors**
```bash
# Clean and rebuild
npm run clean
npm install
npm run docs:build
```

## 📁 Project Structure

```
cloved/                          # ← You are here (project root)
├── package.json                 # ← Contains deployment scripts
├── apps/
│   └── docs/                    # ← Docs app
│       ├── package.json         # ← Also contains deployment scripts
│       ├── firebase.json        # ← Firebase configuration
│       ├── .firebaserc          # ← Project configuration
│       └── content/docs/        # ← Your MDX content
└── packages/
```

## 🎯 Quick Start

```bash
# 1. One-time setup
npm run docs:setup

# 2. Deploy to staging
npm run deploy:staging

# 3. Test on https://blend-staging.web.app

# 4. Deploy to production
npm run deploy:production

# 5. Live on https://blend-prod.web.app
```

## 🔗 Firebase Console

- **Project**: `storybook-452807`
- **Console**: https://console.firebase.google.com/project/storybook-452807
- **Hosting**: https://console.firebase.google.com/project/storybook-452807/hosting

---

**🎉 You're all set!** Your documentation now has multi-environment deployment with automatic search indexing.
