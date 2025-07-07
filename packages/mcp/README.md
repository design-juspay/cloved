# Blend MCP Server

A Model Context Protocol (MCP) server for the Blend Design System that provides AI assistants with tools to work with Blend components.

## 🚀 Quick Start

### Running the MCP Server

There are several ways to run the Blend MCP server:

#### 1. Direct Execution

```bash
cd packages/mcp
node index.js
```

#### 2. Using npm script

```bash
cd packages/mcp
npm run inspector
```

#### 3. Using the binary

```bash
cd packages/mcp
npx blend
```

### Testing the Server

To test all tools and verify functionality:

```bash
cd packages/mcp
node -e "
import('./metaReader.js').then(async ({ listAvailableComponents, getComponentMeta }) => {
  console.log('📋 Available components:', (await listAvailableComponents()).length);
  console.log('✅ Button meta loaded:', !!(await getComponentMeta('Button')).componentName);
  console.log('🎉 MCP Server is working!');
}).catch(console.error);
"
```

## 🛠️ Available Tools

The server provides 5 main tools:

### 1. `list_blend_components`

Lists all available Blend components.

**Usage:**

```json
{
  "name": "list_blend_components",
  "arguments": {}
}
```

### 2. `get_blend_component_props`

Gets detailed props information for a component.

**Usage:**

```json
{
  "name": "get_blend_component_props",
  "arguments": {
    "componentName": "Button"
  }
}
```

### 3. `generate_blend_component`

Generates React JSX code for a component.

**Usage:**

```json
{
  "name": "generate_blend_component",
  "arguments": {
    "componentName": "Button",
    "props": {
      "text": "Click me",
      "buttonType": "ButtonTypeV2.PRIMARY"
    },
    "includeImports": true
  }
}
```

### 4. `scaffold_dashboard_section`

Generates complete dashboard sections.

**Usage:**

```json
{
  "name": "scaffold_dashboard_section",
  "arguments": {
    "sectionType": "fintech_kpi_summary_with_chart",
    "options": {
      "title": "Financial Dashboard",
      "kpis": [
        {
          "title": "Revenue",
          "value": "$2.5M",
          "changeValue": 12,
          "changeDirection": "positive"
        }
      ]
    }
  }
}
```

### 5. `generate_component_documentation`

Generates Markdown documentation for components.

**Usage:**

```json
{
  "name": "generate_component_documentation",
  "arguments": {
    "componentName": "Alert"
  }
}
```

## 🔧 Configuration

### Environment Variables

- `BLEND_LIBRARY_PATH`: Path to Blend component library (default: current project)
- `BLEND_LIBRARY_PACKAGE_NAME`: Package name for imports (default: "blend-v1")
- `META_PATH`: Path to meta files (default: "../../apps/docs/meta")

### Setting Custom Paths

```bash
export BLEND_LIBRARY_PATH="/path/to/your/components"
export BLEND_LIBRARY_PACKAGE_NAME="your-package-name"
node index.js
```

## 🏗️ Integration with AI Assistants

### Claude Desktop Integration

Add to your Claude Desktop config:

```json
{
  "mcpServers": {
    "blend": {
      "command": "node",
      "args": ["/path/to/packages/mcp/index.js"],
      "env": {
        "BLEND_LIBRARY_PATH": "/path/to/your/components"
      }
    }
  }
}
```

### Cline Integration

The server works automatically with Cline when running in the project directory.

### Other MCP Clients

The server follows the standard MCP protocol and works with any MCP-compatible client.

## 📊 Supported Components

The server supports all 34 Blend components:

- Accordion, Alert, Avatar, AvatarGroup
- Breadcrumb, Button, ButtonGroup, ButtonGroupV2, ButtonV2
- Charts, Checkbox, DataTable, DateRangePicker
- Directory, Dropdown, GradientBlur, Inputs
- Menu, Modal, MultiSelect, Popover, Primitives
- Radio, Select, Sidebar, SingleSelect, Snackbar
- SplitTag, StatCard, Switch, Tabs, Tags, Text, Tooltip

## 🔍 Debugging

### Enable Debug Logging

```bash
DEBUG=mcp* node index.js
```

### Check Server Status

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | node index.js
```

### Validate Meta Files

```bash
node -e "
import('./metaReader.js').then(async ({ listAvailableComponents }) => {
  const components = await listAvailableComponents();
  console.log(\`Found \${components.length} components with meta files\`);
}).catch(console.error);
"
```

## 📁 Project Structure

```
packages/mcp/
├── index.js              # Main MCP server
├── metaReader.js          # Meta file reader
├── generateMetaFiles.js   # Meta file generator
├── package.json          # Dependencies
└── README.md             # This file

apps/docs/meta/           # Component meta files
├── button.context.ts     # Button component meta
├── alert.context.ts      # Alert component meta
└── ...                   # All 34 component meta files
```

## 🚨 Troubleshooting

### Common Issues

1. **"No such file or directory" error**
   - Check that `BLEND_LIBRARY_PATH` points to the correct components directory
   - Verify the path exists and contains component folders

2. **"No meta file found" error**
   - Ensure meta files exist in `apps/docs/meta/`
   - Check that component names match exactly (case-sensitive)

3. **Import errors**
   - Verify `BLEND_LIBRARY_PACKAGE_NAME` matches your package name
   - Check that the package is properly installed

### Getting Help

If you encounter issues:

1. Check the console output for detailed error messages
2. Verify all environment variables are set correctly
3. Test individual components with the debugging commands above
4. Ensure all meta files are present and valid

## 📝 Development

### Adding New Components

1. Create a meta file in `apps/docs/meta/`
2. Follow the existing meta file structure
3. Test with `get_blend_component_props` tool

### Updating Meta Files

Use the generator script:

```bash
node generateMetaFiles.js
```

This will automatically create meta files for any missing components.
