# 🚀 Firebase Deployment Guide

Quick guide to deploy your Fumadocs documentation to Firebase Hosting with staging and production environments.

## 🔧 One-Time Setup

### 1. Install Firebase CLI & Login
```bash
npm install -g firebase-tools
firebase login
```

### 2. Setup Hosting Targets
```bash
# Create hosting sites (if not already created)
firebase hosting:sites:create blend-staging --project=storybook-452807
firebase hosting:sites:create blend-prod --project=storybook-452807

# Setup targets
pnpm docs:setup
```

## 🚀 Deployment Commands

All commands use `pnpm` and can be run from the project root:

```bash
# Deploy to staging
pnpm deploy:staging

# Deploy to production  
pnpm deploy:production

# Deploy to both environments
pnpm deploy:all
```

## 🌐 Environment URLs

- **Staging**: `https://blend-staging.web.app` (1 hour cache)
- **Production**: `https://blend-prod.web.app` (1 year cache)

## 📋 Development Workflow

```bash
# 1. Local development
pnpm docs:dev

# 2. Test changes locally
# 3. Deploy to staging
pnpm deploy:staging

# 4. Test on staging environment
# 5. Deploy to production
pnpm deploy:production
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm docs:dev` | Start local development server |
| `pnpm docs:build` | Build docs for production |
| `pnpm deploy:staging` | Deploy to staging environment |
| `pnpm deploy:production` | Deploy to production environment |
| `pnpm deploy:all` | Deploy to both environments |
| `pnpm docs:setup` | Setup Firebase hosting targets |

## 🔧 Troubleshooting

### Firebase Not Logged In
```bash
firebase login
```

### Hosting Targets Not Set
```bash
pnpm docs:setup
```

### Build Errors
```bash
pnpm clean
pnpm install
pnpm docs:build
```

## 📁 Project Structure

```
cloved/                          # ← Project root
├── package.json                 # ← Contains deployment scripts
├── apps/
│   └── docs/                    # ← Documentation app
│       ├── package.json         # ← Docs-specific scripts
│       ├── firebase.json        # ← Firebase configuration
│       ├── .firebaserc          # ← Project configuration
│       └── content/docs/        # ← MDX content
└── packages/blend/              # ← Component library
```

## 🎯 Quick Start

```bash
# One-time setup
pnpm docs:setup

# Deploy to staging
pnpm deploy:staging

# Deploy to production
pnpm deploy:production
```

**Firebase Console**: https://console.firebase.google.com/project/storybook-452807
