# Firebase Deployment Guide

This guide explains how to deploy your Fumadocs documentation to Firebase Hosting with client-side search for both staging and production environments.

## Setup

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Initialize Firebase (if needed)
```bash
npm run firebase:init
```

### 4. Setup Hosting Targets
```bash
npm run setup:hosting
```

This sets up the hosting targets for staging and production environments.

## Deployment

### Deploy to Staging
```bash
npm run deploy:staging
```

### Deploy to Production
```bash
npm run deploy:production
```

### Deploy to Both Environments
```bash
npm run deploy:all
```

Each deployment command will:
1. Build the Next.js app with static export
2. Generate the static search index at `/static.json`
3. Deploy to the specified Firebase Hosting target

### Preview Deployment
```bash
npm run preview
```

## How It Works

### Client-Side Search
- The app now uses **static search** instead of API-based search
- Search index is generated at build time as `/static.json`
- Search works entirely on the client-side (no server required)
- Compatible with Firebase static hosting

### Key Files
- `app/layout.tsx` - Configured with `type: 'static'` search
- `app/static.json/route.ts` - Generates static search index
- `next.config.mjs` - Configured for static export
- `firebase.json` - Firebase hosting configuration
- `.firebaserc` - Project configuration

### Search Features
- ✅ Full-text search across all documentation
- ✅ Works in both development and production
- ✅ No server or cloud functions required
- ✅ Fast client-side performance
- ✅ Supports filtering and tagging (if configured)

## Development

### Local Development
```bash
npm run dev
```

The search will work locally using the same static search mechanism.

### Build Locally
```bash
npm run build
```

This generates the `out/` directory with static files ready for Firebase.

## Troubleshooting

### Search Not Working
1. Ensure the build completed successfully
2. Check that `out/static.json` exists after build
3. Verify Firebase hosting is serving the static files correctly

### Build Errors
1. Make sure all dependencies are installed: `npm install`
2. Check that content files are valid MDX
3. Ensure no dynamic imports or server-side code in components

## Environment URLs

After deployment, your documentation will be available at:

### Production Environment
- **Target**: `docs-production`
- **URL**: `https://docs-production.web.app` (or custom domain if configured)
- **Cache**: Long-term caching (1 year) for optimal performance
- **Use**: Live documentation for end users

### Staging Environment
- **Target**: `docs-staging`
- **URL**: `https://docs-staging.web.app` (or custom domain if configured)
- **Cache**: Short-term caching (1 hour) for faster updates during testing
- **Use**: Testing and review before production deployment

## Firebase Project
- **Project ID**: `storybook-452807`
- **Console**: https://console.firebase.google.com/project/storybook-452807

## Workflow Recommendations

### Development Workflow
1. **Local Development**: `npm run dev`
2. **Test Changes**: Make and test changes locally
3. **Deploy to Staging**: `npm run deploy:staging`
4. **Review on Staging**: Test on staging environment
5. **Deploy to Production**: `npm run deploy:production`

### CI/CD Integration
You can integrate these commands into your CI/CD pipeline:

```yaml
# Example GitHub Actions workflow
- name: Deploy to Staging
  run: npm run deploy:staging
  if: github.ref == 'refs/heads/develop'

- name: Deploy to Production
  run: npm run deploy:production
  if: github.ref == 'refs/heads/main'
```

## Custom Domains (Optional)

To set up custom domains for each environment:

1. **Go to Firebase Console** → Hosting
2. **Add custom domain** for each target:
   - Production: `docs.yourdomain.com`
   - Staging: `docs-staging.yourdomain.com`
3. **Update DNS** records as instructed by Firebase
