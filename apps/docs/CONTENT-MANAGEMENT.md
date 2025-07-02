# Content Management Guide

Quick guide for adding and managing MDX content in the documentation site.

## 🔄 How Search Works

The search system automatically indexes all MDX content:
- **Local Development**: Updates automatically when you save files
- **Deployed Version**: Rebuilds during each deployment
- **Coverage**: All text, headings, and metadata in MDX files

## 📝 Adding New Content

### 1. Create MDX File

Add files to `/content/docs/` directory:

```bash
# Example: New component documentation
touch apps/docs/content/docs/components/NewComponent.mdx
```

### 2. MDX File Format

```mdx
---
title: Component Name
description: Brief description for search results
---

# Component Name

Your content here is automatically searchable.

## Usage

```jsx
<ComponentName prop="value" />
```

## Props

- `prop`: Description of the prop
```

### 3. Update Navigation

Edit the appropriate `meta.json` file:

```json
{
  "title": "Components",
  "defaultOpen": true,
  "pages": ["Button", "Alert", "NewComponent"]
}
```

## 📁 Current Content Structure

```
content/docs/
├── index.mdx                    # Home page
├── meta.json                    # Main navigation
└── components/
    ├── meta.json               # Component navigation
    ├── Alert.mdx               # ✅ Available
    ├── Avatar.mdx              # ✅ Available
    ├── Button.mdx              # ✅ Available
    ├── Checkbox.mdx            # ✅ Available
    ├── DatePicker.mdx          # ✅ Available
    ├── Modal.mdx               # ✅ Available
    ├── Tabs.mdx                # ✅ Available
    └── TextInput.mdx           # ✅ Available
```

## 🚀 Development Workflow

### Adding New Component Documentation

```bash
# 1. Create MDX file
echo '---
title: NewComponent
description: A new component for the design system
---

# NewComponent

Description of the component.

## Usage

```jsx
import { NewComponent } from "blend-v1";

<NewComponent />
```
' > apps/docs/content/docs/components/NewComponent.mdx

# 2. Update navigation
# Edit apps/docs/content/docs/components/meta.json

# 3. Test locally
pnpm docs:dev

# 4. Deploy
pnpm deploy:staging
```

### Adding New Section

```bash
# 1. Create directory and meta.json
mkdir apps/docs/content/docs/guides
echo '{
  "title": "Guides",
  "pages": ["getting-started", "theming"]
}' > apps/docs/content/docs/guides/meta.json

# 2. Add content files
echo '---
title: Getting Started
description: How to get started with the design system
---

# Getting Started

Welcome to our design system.
' > apps/docs/content/docs/guides/getting-started.mdx

# 3. Update main navigation
# Edit apps/docs/content/docs/meta.json to include "guides"
```

## 🔍 Search Features

### What Gets Indexed
- ✅ Page titles and descriptions
- ✅ All headings (H1-H6)
- ✅ Paragraph text
- ✅ Code examples
- ✅ List items

### Search Optimization Tips
- Use descriptive headings
- Include relevant keywords in descriptions
- Structure content with clear sections
- Add code examples for components

## ✅ Quick Checklist

When adding new content:

- [ ] Create MDX file with proper frontmatter
- [ ] Update relevant `meta.json` for navigation
- [ ] Test locally with `pnpm docs:dev`
- [ ] Verify search works for new content
- [ ] Deploy to staging: `pnpm deploy:staging`
- [ ] Test on staging environment
- [ ] Deploy to production: `pnpm deploy:production`

## 🎯 Key Points

1. **Automatic Indexing**: All MDX content is automatically searchable
2. **Real-Time Updates**: Local development updates search immediately  
3. **Build-Time Generation**: Deployed versions rebuild search on each deployment
4. **No Manual Steps**: Just add MDX files and update navigation

The search system works automatically - add content and it becomes searchable! 🚀
