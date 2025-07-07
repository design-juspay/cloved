# Storybook Deployment Guide

This guide explains how to deploy the Storybook app to Firebase hosting alongside the documentation site.

## Overview

The Storybook is deployed as a subdirectory of the main documentation site:
- Documentation: https://blend-staging.web.app/
- Storybook: https://blend-staging.web.app/storybook/

## Deployment Architecture

1. **Single Firebase Project**: Both docs and storybook are deployed to the same Firebase project (`storybook-452807`)
2. **Path-based Routing**: Firebase rewrites handle routing to the correct app based on the URL path
3. **Combined Build**: The deployment script builds both apps and combines them into a single output directory

## Quick Deployment

### Deploy to Staging (with Storybook)
```bash
# From the root directory
pnpm deploy:staging-with-storybook
```

### Deploy to Production (with Storybook)
```bash
# From the root directory
pnpm deploy:production-with-storybook
```

## Manual Deployment Steps

If you need to deploy manually:

1. **Build the documentation site**:
   ```bash
   cd apps/docs
   npm run build
   ```

2. **Build the Storybook**:
   ```bash
   cd apps/storybook
   pnpm build-storybook
   ```

3. **Copy Storybook to docs output**:
   ```bash
   cd apps/docs
   mkdir -p out/storybook
   cp -r ../storybook/storybook-static/* out/storybook/
   ```

4. **Deploy to Firebase**:
   ```bash
   # For staging
   firebase deploy --only hosting:blend-staging
   
   # For production
   firebase deploy --only hosting:blend-prod
   ```

## Configuration Details

### Firebase Configuration (`apps/docs/firebase.json`)

The Firebase configuration includes special rewrites for the Storybook:

```json
{
  "rewrites": [
    {
      "source": "/storybook/**",
      "destination": "/storybook/index.html"
    },
    {
      "source": "**",
      "destination": "/index.html"
    }
  ]
}
```

This ensures that:
- Requests to `/storybook/*` are served from the Storybook app
- All other requests are served from the documentation app

### Deployment Script (`apps/docs/deploy-with-storybook.sh`)

The deployment script automates the entire process:
1. Builds the documentation site
2. Builds the Storybook
3. Copies Storybook build to the docs output directory
4. Deploys everything to Firebase

## Available Scripts

### Root `package.json`
- `pnpm deploy:staging-with-storybook` - Deploy both docs and storybook to staging
- `pnpm deploy:production-with-storybook` - Deploy both docs and storybook to production

### `apps/docs/package.json`
- `npm run deploy:staging-with-storybook` - Deploy with storybook to staging
- `npm run deploy:production-with-storybook` - Deploy with storybook to production

## Troubleshooting

### Permission Denied Error
If you get a permission denied error when running the deployment script:
```bash
chmod +x apps/docs/deploy-with-storybook.sh
```

### Firebase Not Found
Make sure Firebase CLI is installed:
```bash
npm install -g firebase-tools
```

### Authentication Issues
Login to Firebase:
```bash
firebase login
```

### Build Failures
- Ensure all dependencies are installed: `pnpm install`
- Clear build caches if needed: `pnpm clean`

## URLs

- **Staging Documentation**: https://blend-staging.web.app/
- **Staging Storybook**: https://blend-staging.web.app/storybook/
- **Production Documentation**: https://blend-prod.web.app/
- **Production Storybook**: https://blend-prod.web.app/storybook/

## Notes

- The Storybook is served from a subdirectory, so all assets are relative to `/storybook/`
- Both apps share the same Firebase hosting configuration for caching and headers
- The deployment script ensures both apps are always deployed together for consistency
