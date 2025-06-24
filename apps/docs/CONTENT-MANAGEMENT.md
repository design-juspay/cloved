# Content Management & Search Integration Guide

This guide explains how to add new MDX files and content that will automatically work with the search functionality in both local development and deployed versions.

## 🔄 How Search Auto-Updates Work

### **Automatic Content Detection**
The search system automatically detects and indexes:
- ✅ **New MDX files** added to `/content/docs/`
- ✅ **New sections** and headings in existing files
- ✅ **Updated content** in any MDX file
- ✅ **New directories** and subdirectories

### **Search Index Generation**
- **Local Development**: Search index updates automatically when you save files
- **Deployed Version**: Search index regenerates during each build/deployment

## 📝 Adding New Content

### 1. **Adding New MDX Files**

Create new files in the `/content/docs/` directory:

```bash
# Example: Adding a new component documentation
touch content/docs/components/NewComponent.mdx
```

**File Structure Example:**
```
content/docs/
├── index.mdx                    # Main docs page
├── getting-started.mdx          # Getting started guide
├── components/
│   ├── meta.json               # Navigation metadata
│   ├── Button.mdx              # Existing component
│   ├── Alert.mdx               # Existing component
│   └── NewComponent.mdx        # ← Your new file
└── guides/                     # ← New section
    ├── meta.json
    ├── installation.mdx
    └── configuration.mdx
```

### 2. **MDX File Format**

Each MDX file should follow this structure:

```mdx
---
title: Your Page Title
description: Brief description for search results
---

# Your Page Title

Your content here will be automatically indexed for search.

## Section 1

This section content will be searchable.

## Section 2

This section content will also be searchable.

### Subsection

Even subsections are indexed for search.
```

### 3. **Navigation Metadata**

Update or create `meta.json` files for navigation:

```json
{
  "title": "Components",
  "pages": [
    "Button",
    "Alert", 
    "NewComponent"
  ]
}
```

## 🔍 What Gets Indexed for Search

The search system automatically indexes:

### **Page-Level Content**
- ✅ **Page titles** (from frontmatter `title`)
- ✅ **Page descriptions** (from frontmatter `description`)
- ✅ **Page URLs** (automatically generated)

### **Content-Level Indexing**
- ✅ **All text content** in the MDX body
- ✅ **Headings** (H1, H2, H3, H4, H5, H6)
- ✅ **Paragraph text**
- ✅ **List items**
- ✅ **Code block content**
- ✅ **Table content**

### **Component Content**
- ✅ **Custom component text** (like BlendTypeTable)
- ✅ **Component props and descriptions**
- ✅ **Code examples**

## 🚀 Development Workflow

### **Local Development**
1. **Add/Edit Content**: Create or modify MDX files
2. **Auto-Reload**: Next.js automatically detects changes
3. **Search Updates**: Search index updates automatically
4. **Test Search**: Search functionality works immediately

```bash
# Start development server
npm run dev

# Add new content - search updates automatically!
# No additional steps needed
```

### **Deployment Workflow**
1. **Add/Edit Content**: Create or modify MDX files
2. **Commit Changes**: Git commit your new content
3. **Deploy**: Run deployment command
4. **Search Index Rebuilds**: Automatically includes new content

```bash
# Deploy to staging (includes new content)
npm run deploy:staging

# Test search on staging
# https://docs-staging.web.app

# Deploy to production
npm run deploy:production
```

## 📁 Content Organization Examples

### **Adding a New Component**
```bash
# 1. Create the MDX file
echo '---
title: DatePicker
description: A date picker component for form inputs
---

# DatePicker

A flexible date picker component.

## Usage

```jsx
<DatePicker onChange={handleDateChange} />
```

## Props

- `onChange`: Function called when date changes
- `value`: Current selected date
' > content/docs/components/DatePicker.mdx

# 2. Update navigation
# Edit content/docs/components/meta.json to include "DatePicker"

# 3. Search automatically includes it!
```

### **Adding a New Section**
```bash
# 1. Create new directory
mkdir content/docs/api-reference

# 2. Create meta.json
echo '{
  "title": "API Reference",
  "pages": ["overview", "authentication", "endpoints"]
}' > content/docs/api-reference/meta.json

# 3. Add content files
echo '---
title: API Overview
description: Overview of our API endpoints
---

# API Overview

Our API provides access to all platform features.
' > content/docs/api-reference/overview.mdx

# 4. Search automatically indexes the new section!
```

## 🔧 Advanced Search Features

### **Custom Search Tags** (Optional)
You can add custom tags to frontmatter for better search categorization:

```mdx
---
title: Button Component
description: A versatile button component
tags: ["component", "ui", "form", "interactive"]
---
```

### **Search-Optimized Content**
Write content with search in mind:

```mdx
# Good for Search
## Installation Guide
Install the component using npm or yarn.

## Button Props
The Button component accepts these properties:
- variant: primary, secondary, danger
- size: small, medium, large

# Also Good
### Common Use Cases
- Form submissions
- Navigation actions
- Call-to-action buttons
```

## ✅ Verification Checklist

After adding new content, verify search works:

### **Local Development**
- [ ] Start dev server: `npm run dev`
- [ ] Add new MDX file with content
- [ ] Open search dialog (Cmd/Ctrl + K)
- [ ] Search for terms from your new content
- [ ] Verify results appear

### **Deployed Version**
- [ ] Deploy to staging: `npm run deploy:staging`
- [ ] Visit staging URL
- [ ] Test search functionality
- [ ] Deploy to production: `npm run deploy:production`

## 🎯 Key Points

1. **No Manual Steps**: Search indexing is completely automatic
2. **Real-Time Updates**: Local development updates search immediately
3. **Build-Time Generation**: Deployed versions rebuild search index on each deployment
4. **Full Content Coverage**: All text content in MDX files is searchable
5. **Structured Data**: Headings, sections, and metadata are properly indexed

The search system is designed to "just work" - add content and it becomes searchable automatically! 🚀
