# Figma Code Connect Complete Guide

## Table of Contents
1. [Quick Start](#quick-start)
2. [Overview](#overview)
3. [Initial Setup](#initial-setup)
4. [Project Configuration](#project-configuration)
5. [Adding Code Connect to Components](#adding-code-connect-to-components)
6. [Prop Mapping Guide](#prop-mapping-guide)
7. [Component Examples](#component-examples)
8. [Publishing Code Connect](#publishing-code-connect)
9. [Troubleshooting](#troubleshooting)
10. [Best Practices](#best-practices)
11. [Known Issues](#known-issues)

## Quick Start

### Quick Template
Copy this template and modify for your component:

```typescript
import figma from "@figma/code-connect";
import { YourComponent } from "blend-v1";

figma.connect(
  YourComponent,
  'YOUR_FIGMA_URL_HERE', // Get from Figma: Right-click component → Copy link
  {
    props: {
      // Map your props here
      text: figma.string('text'),
      variant: figma.enum('variant', {
        'primary': 'primary',
        'secondary': 'secondary'
      }),
      disabled: figma.boolean('disabled'),
      icon: figma.boolean('hasIcon', {
        true: figma.instance('icon'),
        false: undefined
      })
    },
    example: ({ text, variant, disabled, icon }) => (
      <YourComponent
        text={text}
        variant={variant}
        disabled={disabled}
        icon={icon}
      />
    ),
    imports: ["import { YourComponent } from 'blend-v1'"],
    links: [
      {
        name: "GitHub",
        url: "https://github.com/design-juspay/cloved/tree/main/packages/blend/lib/components/YourComponent"
      },
      {
        name: "Storybook",
        url: "https://juspay.design/storybook/?path=/docs/components-yourcomponent--docs"
      }
    ]
  }
);
```

### Quick Steps
1. **Get Figma URL**: Right-click component → "Copy link to selection"
2. **Map Props**: Match Figma property names exactly (case-sensitive)
3. **Create Example**: Show component usage
4. **Add Links**: Update component name in URLs
5. **Publish**: Run `npx figma connect publish`

### Publishing Commands
```bash
# Validate your Code Connect
npx figma connect validate

# Publish to Figma
npx figma connect publish

# Unpublish if needed
npx figma connect unpublish
```

## Overview

Figma Code Connect bridges the gap between design and development by showing production-ready code snippets in Figma's Dev Mode. When developers inspect components in Figma, they see the actual code implementation with proper imports, props, and usage examples.

### Benefits
- Designers see how their components translate to code
- Developers get accurate code snippets directly from Figma
- Reduces miscommunication between design and development
- Ensures consistency between design system and codebase

### What Developers See in Figma
- Generated code snippet with correct props
- Import statements
- Links to GitHub and Storybook (note: links may be auto-generated incorrectly)
- **NOT visible**: Code comments, annotations, or descriptions

## Initial Setup

### 1. Install Dependencies

```bash
# Install Figma Code Connect
npm install --save-dev @figma/code-connect

# Or with pnpm
pnpm add -D @figma/code-connect
```

### 2. Get Figma Access Token

1. Go to Figma → Settings → Account → Personal access tokens
2. Create a new token with these scopes:
   - File content (read-only)
   - Code Connect (write)
3. Save the token securely

### 3. Create Configuration File

Create `figma.config.json` in your project root:

```json
{
  "codeConnect": {
    "include": [
      "apps/storybook/stories/**/*.stories.{ts,tsx}",
      "packages/blend/lib/**/*.figma.{ts,tsx}"
    ],
    "exclude": [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**"
    ],
    "parser": "react"
  }
}
```

### 4. Set Up Environment Variables

Create `.env` file:

```bash
FIGMA_ACCESS_TOKEN=your_token_here
```

Add to `.gitignore`:
```
.env
.env.local
```

## Project Configuration

### Directory Structure

```
project-root/
├── figma.config.json
├── .env
├── packages/
│   └── blend/
│       └── lib/
│           └── components/
│               ├── Button/
│               │   ├── Button.tsx
│               │   └── Button.figma.tsx
│               └── Alert/
│                   ├── Alert.tsx
│                   └── Alert.figma.tsx
└── apps/
    └── storybook/
        └── stories/
            └── components/
                └── Button/
                    └── ButtonV2.stories.tsx
```

### Configuration Options

The `figma.config.json` supports:
- `include`: Array of glob patterns for files containing Code Connect
- `exclude`: Array of glob patterns to exclude
- `parser`: Parser to use (`react`, `vue`, etc.)

## Adding Code Connect to Components

### Method 1: In Storybook Stories (Recommended)

Add Code Connect directly in your Storybook story files:

```typescript
// ButtonV2.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import figma from "@figma/code-connect";
import { ButtonV2, ButtonTypeV2, ButtonSizeV2, ButtonSubTypeV2 } from "blend-v1";

// Figma Code Connect configuration
figma.connect(
  ButtonV2, 
  'https://www.figma.com/design/YOUR_FILE_ID?node-id=YOUR_NODE_ID',
  {
    props: {
      // String props
      text: figma.string('text'),
      
      // Enum props
      buttonType: figma.enum('buttonType', {
        'primary': ButtonTypeV2.PRIMARY,
        'secondary': ButtonTypeV2.SECONDARY,
        'danger': ButtonTypeV2.DANGER,
        'success': ButtonTypeV2.SUCCESS
      }),
      
      // Boolean props
      disabled: figma.boolean('disabled'),
      loading: figma.boolean('loading'),
      
      // Conditional props
      leftIcon: figma.boolean('hasLeftIcon', {
        true: figma.instance('leftIcon'),
        false: undefined
      }),
    },
    
    // Example showing how the component is used
    example: ({ text, buttonType, disabled, loading, leftIcon }) => (
      <ButtonV2
        text={text}
        buttonType={buttonType}
        disabled={disabled}
        loading={loading}
        leftIcon={leftIcon}
      />
    ),
    
    // Import statement shown in Figma
    imports: ["import { ButtonV2 } from 'blend-v1'"],
    
    // Documentation links
    links: [
      {
        name: "GitHub",
        url: "https://github.com/design-juspay/cloved/tree/main/packages/blend/lib/components/ButtonV2"
      },
      {
        name: "Storybook", 
        url: "https://juspay.design/storybook/?path=/docs/components-button-buttonv2--docs"
      }
    ]
  }
);

// Rest of your Storybook configuration...
```

### Method 2: Separate Figma Files

Create dedicated `.figma.tsx` files:

```typescript
// Button.figma.tsx
import figma from "@figma/code-connect";
import { Button } from "./Button";

figma.connect(Button, 'FIGMA_URL', {
  // Configuration...
});
```

### Getting the Figma Component URL

1. Open your Figma file
2. Select the component (not an instance)
3. Right-click → "Copy link to selection"
4. The URL will look like: `https://www.figma.com/design/FILE_ID/FILE_NAME?node-id=NODE_ID`

## Prop Mapping Guide

### Basic Prop Types

#### String Props
```typescript
props: {
  label: figma.string('Label Text'),
  placeholder: figma.string('Placeholder')
}
```

#### Boolean Props
```typescript
props: {
  disabled: figma.boolean('Disabled'),
  loading: figma.boolean('Is Loading')
}
```

#### Enum Props
```typescript
props: {
  size: figma.enum('Size', {
    'Small': 'sm',
    'Medium': 'md',
    'Large': 'lg'
  }),
  variant: figma.enum('Variant', {
    'Primary': 'primary',
    'Secondary': 'secondary'
  })
}
```

### Advanced Prop Mappings

#### Conditional Props
```typescript
props: {
  // Map Figma boolean to component prop
  icon: figma.boolean('Has Icon', {
    true: figma.instance('Icon Instance'),
    false: undefined
  })
}
```

#### Nested Props
```typescript
props: {
  // Map multiple Figma properties to one prop
  state: figma.enum('State', {
    'Default': { disabled: false, loading: false },
    'Disabled': { disabled: true, loading: false },
    'Loading': { disabled: false, loading: true }
  })
}
```

#### Instance Props
```typescript
props: {
  // Map Figma component instances
  leftIcon: figma.instance('Left Icon'),
  rightIcon: figma.instance('Right Icon')
}
```

### Handling Figma vs Code Differences

When Figma properties don't match code props exactly:

```typescript
props: {
  // Figma uses "state" variant, code uses "disabled" boolean
  disabled: figma.enum('state', {
    'disabled': true,
    'default': false,
    'hover': false,
    'active': false
  }),
  
  // Figma has "hasIcon", code expects actual icon component
  icon: figma.boolean('hasIcon', {
    true: figma.instance('icon'),
    false: undefined
  }),
  
  // Exclude Figma-only variants
  subType: figma.enum('subType', {
    'default': 'default',
    'iconOnly': 'icon-only',
    // 'plainIcon' exists in Figma but not in code - excluded
  })
}
```

## Component Examples

### Button Component
```typescript
figma.connect(
  ButtonV2,
  'https://www.figma.com/design/FILE_ID?node-id=BUTTON_NODE_ID',
  {
    props: {
      text: figma.string('text'),
      buttonType: figma.enum('buttonType', {
        'primary': ButtonTypeV2.PRIMARY,
        'secondary': ButtonTypeV2.SECONDARY,
        'danger': ButtonTypeV2.DANGER,
        'success': ButtonTypeV2.SUCCESS
      }),
      size: figma.enum('size', {
        'sm': ButtonSizeV2.SMALL,
        'md': ButtonSizeV2.MEDIUM,
        'lg': ButtonSizeV2.LARGE
      }),
      disabled: figma.enum('state', {
        'disabled': true,
        'default': false,
        'hover': false,
        'active': false,
        'focussed': false
      }),
      leftIcon: figma.boolean('hasLeftIcon', {
        true: figma.instance('leftIcon'),
        false: undefined
      }),
      rightIcon: figma.boolean('hasRightIcon', {
        true: figma.instance('rightIcon'),
        false: undefined
      })
    },
    example: ({ text, buttonType, size, disabled, leftIcon, rightIcon }) => (
      <ButtonV2
        text={text}
        buttonType={buttonType}
        size={size}
        disabled={disabled}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
      />
    ),
    imports: ["import { ButtonV2 } from 'blend-v1'"],
    links: [
      {
        name: "GitHub",
        url: "https://github.com/design-juspay/cloved/tree/main/packages/blend/lib/components/ButtonV2"
      },
      {
        name: "Storybook",
        url: "https://juspay.design/storybook/?path=/docs/components-button-buttonv2--docs"
      }
    ]
  }
);
```

### Alert Component
```typescript
figma.connect(
  Alert,
  'https://www.figma.com/design/FILE_ID?node-id=ALERT_NODE_ID',
  {
    props: {
      type: figma.enum('Type', {
        'Info': 'info',
        'Success': 'success',
        'Warning': 'warning',
        'Error': 'error'
      }),
      title: figma.string('Title'),
      description: figma.string('Description'),
      showIcon: figma.boolean('Show Icon'),
      closable: figma.boolean('Closable')
    },
    example: ({ type, title, description, showIcon, closable }) => (
      <Alert
        type={type}
        title={title}
        description={description}
        showIcon={showIcon}
        closable={closable}
      />
    ),
    imports: ["import { Alert } from 'blend-v1'"],
    links: [
      {
        name: "GitHub",
        url: "https://github.com/design-juspay/cloved/tree/main/packages/blend/lib/components/Alert"
      },
      {
        name: "Storybook",
        url: "https://juspay.design/storybook/?path=/docs/components-alert--docs"
      }
    ]
  }
);
```

### Input Component
```typescript
figma.connect(
  Input,
  'https://www.figma.com/design/FILE_ID?node-id=INPUT_NODE_ID',
  {
    props: {
      placeholder: figma.string('Placeholder'),
      value: figma.string('Value'),
      size: figma.enum('Size', {
        'Small': 'sm',
        'Medium': 'md',
        'Large': 'lg'
      }),
      state: figma.enum('State', {
        'Default': { disabled: false, error: false },
        'Disabled': { disabled: true, error: false },
        'Error': { disabled: false, error: true }
      }),
      leftIcon: figma.boolean('Has Left Icon', {
        true: figma.instance('Left Icon'),
        false: undefined
      }),
      rightIcon: figma.boolean('Has Right Icon', {
        true: figma.instance('Right Icon'),
        false: undefined
      })
    },
    example: ({ placeholder, value, size, state, leftIcon, rightIcon }) => (
      <Input
        placeholder={placeholder}
        value={value}
        size={size}
        disabled={state.disabled}
        error={state.error}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
      />
    ),
    imports: ["import { Input } from 'blend-v1'"],
    links: [
      {
        name: "GitHub",
        url: "https://github.com/design-juspay/cloved/tree/main/packages/blend/lib/components/Input"
      },
      {
        name: "Storybook",
        url: "https://juspay.design/storybook/?path=/docs/components-input--docs"
      }
    ]
  }
);
```

### Card Component
```typescript
figma.connect(
  Card,
  'https://www.figma.com/design/FILE_ID?node-id=CARD_NODE_ID',
  {
    props: {
      title: figma.string('Title'),
      description: figma.string('Description'),
      variant: figma.enum('Variant', {
        'Default': 'default',
        'Bordered': 'bordered',
        'Shadow': 'shadow'
      }),
      hasHeader: figma.boolean('Has Header'),
      hasFooter: figma.boolean('Has Footer'),
      headerContent: figma.boolean('Has Header', {
        true: figma.instance('Header Content'),
        false: undefined
      }),
      footerContent: figma.boolean('Has Footer', {
        true: figma.instance('Footer Content'),
        false: undefined
      })
    },
    example: ({ title, description, variant, headerContent, footerContent }) => (
      <Card variant={variant}>
        {headerContent && <Card.Header>{headerContent}</Card.Header>}
        <Card.Body>
          <h3>{title}</h3>
          <p>{description}</p>
        </Card.Body>
        {footerContent && <Card.Footer>{footerContent}</Card.Footer>}
      </Card>
    ),
    imports: ["import { Card } from 'blend-v1'"],
    links: [
      {
        name: "GitHub",
        url: "https://github.com/design-juspay/cloved/tree/main/packages/blend/lib/components/Card"
      },
      {
        name: "Storybook",
        url: "https://juspay.design/storybook/?path=/docs/components-card--docs"
      }
    ]
  }
);
```

### Toggle/Switch Component
```typescript
figma.connect(
  Switch,
  'https://www.figma.com/design/FILE_ID?node-id=SWITCH_NODE_ID',
  {
    props: {
      label: figma.string('Label'),
      checked: figma.boolean('Checked'),
      disabled: figma.boolean('Disabled'),
      size: figma.enum('Size', {
        'sm': 'small',
        'md': 'medium',
        'lg': 'large'
      })
    },
    example: ({ label, checked, disabled, size }) => (
      <Switch
        label={label}
        checked={checked}
        disabled={disabled}
        size={size}
      />
    ),
    imports: ["import { Switch } from 'blend-v1'"],
    links: [
      {
        name: "GitHub",
        url: "https://github.com/design-juspay/cloved/tree/main/packages/blend/lib/components/Switch"
      },
      {
        name: "Storybook",
        url: "https://juspay.design/storybook/?path=/docs/components-switch--docs"
      }
    ]
  }
);
```

## Publishing Code Connect

### 1. Validate Configuration

```bash
npx figma connect validate
```

### 2. Publish to Figma

```bash
npx figma connect publish
```

Or with token:
```bash
npx figma connect publish --token "YOUR_TOKEN"
```

### 3. Create Publishing Script

Add to `package.json`:
```json
{
  "scripts": {
    "figma:validate": "figma connect validate",
    "figma:publish": "figma connect publish",
    "figma:unpublish": "figma connect unpublish"
  }
}
```

Create `publish-code-connect.sh`:
```bash
#!/bin/bash

echo "🎨 Publishing Code Connect to Figma..."

# Load environment variables
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

# Validate first
echo "Validating Code Connect files..."
npx figma connect validate

if [ $? -eq 0 ]; then
  echo "✅ Validation passed!"
  
  # Publish
  echo "Publishing to Figma..."
  npx figma connect publish
  
  if [ $? -eq 0 ]; then
    echo "✅ Successfully published Code Connect!"
  else
    echo "❌ Failed to publish Code Connect"
    exit 1
  fi
else
  echo "❌ Validation failed"
  exit 1
fi
```

## Troubleshooting

### Common Issues

#### 1. Code Connect Not Showing in Figma
- Ensure you're in Dev Mode
- Refresh the Figma file (or close and reopen)
- Check that the component node ID is correct
- Verify the Code Connect was published successfully

#### 2. Props Not Mapping Correctly
- Check that Figma property names match exactly (case-sensitive)
- Verify enum values match Figma variants
- Use browser DevTools in Figma to inspect property names

#### 3. Links Showing Wrong URLs
- This is a known Code Connect limitation
- Links are auto-generated based on module resolution
- Manual links are currently being ignored (bug)

#### 4. "Component not found" Error
- Ensure the Figma URL is correct
- Check that you have access to the Figma file
- Verify the node ID points to a component (not an instance)

### Debugging Tips

1. **Check Figma Properties**
   ```typescript
   // Temporarily add console logging
   example: (props) => {
     console.log('Figma props:', props);
     return <Component {...props} />;
   }
   ```

2. **Validate Individual Files**
   ```bash
   npx figma connect validate path/to/file.tsx
   ```

3. **Test with Simple Props First**
   Start with basic string props before adding complex mappings

### Troubleshooting Checklist
- [ ] Component URL is correct (not an instance)
- [ ] Property names match exactly (case-sensitive)
- [ ] Enum values match Figma variants
- [ ] All required props are mapped
- [ ] Example renders without errors
- [ ] Import statement is correct
- [ ] Links use correct component name

## Best Practices

### 1. Organization
- Keep Code Connect close to components (in story files or separate .figma.tsx files)
- Use consistent naming conventions
- Document prop mappings for team reference

### 2. Prop Mapping
- Map all visual properties from Figma
- Handle Figma-only properties gracefully
- Use meaningful prop transformations
- Start simple: Map basic props first, then add complex ones

### 3. Examples
- Keep examples simple and focused
- Show the most common use case
- Include all required props

### 4. Maintenance
- Update Code Connect when components change
- Validate before publishing
- Keep Figma components and code in sync

### 5. Documentation
- Add comments explaining complex mappings
- Document any Figma vs code differences
- Include setup instructions in README

## Known Issues

### Manual Links Override
**Issue**: Manual links specified in the `links` array are being overridden by auto-generated links.

**Impact**:
- GitHub links point to `/dist/` folder instead of source `/lib/` folder
- Storybook links may point to incorrect paths

**Status**: This is a known limitation/bug in Code Connect. The tool auto-generates links based on module resolution and ignores manual specifications.

**Workaround**: Document correct links in component documentation or README files.

### What's Not Visible in Figma
- Code comments and annotations
- Prop mapping explanations
- Description fields (not supported by Code Connect)

Only the generated code, imports, and links are visible in Figma Dev Mode.

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Publish Code Connect

on:
  push:
    branches: [main]
    paths:
      - 'packages/blend/lib/components/**'
      - 'apps/storybook/stories/**'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          
      - name: Install dependencies
        run: npm ci
        
      - name: Validate Code Connect
        run: npx figma connect validate
        
      - name: Publish to Figma
        env:
          FIGMA_ACCESS_TOKEN: ${{ secrets.FIGMA_ACCESS_TOKEN }}
        run: npx figma connect publish
```

## Summary

Code Connect bridges design and development by showing real code in Figma. While it has some limitations (like auto-generated links), it significantly improves the handoff process between designers and developers.

Key takeaways:
1. Set up once, benefit across the team
2. Keep mappings simple and maintainable
3. Document differences between Figma and code
4. Automate publishing in CI/CD
5. Update regularly as components evolve

## Example Files to Reference

- `apps/storybook/stories/components/Button/ButtonV2.stories.tsx` - Complete working example
- `BUTTONV2_FIGMA_CODE_PROP_DIFFERENCES.md` - Detailed prop mapping documentation
