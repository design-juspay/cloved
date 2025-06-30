#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ErrorCode,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs";
import path from "path";
import { Project, InterfaceDeclaration, TypeAliasDeclaration, SyntaxKind, Node, PropertySignature, JSDocableNode, JSDoc, SymbolFlags, Type, VariableDeclaration, FunctionDeclaration, ClassDeclaration, JSDocTag, VariableStatement } from "ts-morph"; 

const DEFAULT_BLEND_LIBRARY_PATH = "/Users/deepanshu.kumar/Documents/Blend-v1/lib/components/";
const BLEND_LIBRARY_PATH = process.env.BLEND_LIBRARY_PATH || DEFAULT_BLEND_LIBRARY_PATH;

const DEFAULT_BLEND_DEMO_PATH = "/Users/deepanshu.kumar/Documents/Blend-v1/src/demos/";
const BLEND_DEMO_PATH = process.env.BLEND_DEMO_PATH || DEFAULT_BLEND_DEMO_PATH;

const DEFAULT_BLEND_LIBRARY_PACKAGE_NAME = "blend-v1";
const BLEND_LIBRARY_PACKAGE_NAME = process.env.BLEND_LIBRARY_PACKAGE_NAME || DEFAULT_BLEND_LIBRARY_PACKAGE_NAME;

if (process.env.BLEND_LIBRARY_PATH === undefined) {
  console.error(`[INFO] BLEND_LIBRARY_PATH environment variable not set. Using default: ${DEFAULT_BLEND_LIBRARY_PATH}`);
}
if (process.env.BLEND_DEMO_PATH === undefined) {
  console.error(`[INFO] BLEND_DEMO_PATH environment variable not set. Using default: ${BLEND_DEMO_PATH}`);
}
if (process.env.BLEND_LIBRARY_PACKAGE_NAME === undefined) {
  console.error(`[INFO] BLEND_LIBRARY_PACKAGE_NAME environment variable not set. Using default: ${DEFAULT_BLEND_LIBRARY_PACKAGE_NAME}`);
}

interface PropDetail {
  name: string;
  type: string;
  required: boolean;
  description: string;
  category?: string;
  defaultValue?: string;
}

interface ChildComponentRequest {
    componentName: string;
    props: Record<string, any>;
    children?: string | ChildComponentRequest[];
}

// Interfaces for documentation structure
interface PropDetailForDoc extends PropDetail {
  defaultValue?: string;
  // category is inherited from PropDetail
}

interface PropSection {
  sectionTitle?: string;
  props: PropDetailForDoc[];
}

interface ExampleUsage {
  title: string;
  description?: string;
  code: string;
}

// This interface is no longer directly returned by generateComponentDocumentationLogic,
// but it's still useful for understanding the data structure being manually formatted into Markdown.
interface ComponentDocumentation { 
  componentName: string;
  description?: string;
  // demoCode?: string; // demoCode field is no longer used for Markdown output
  features?: string[];
  propsTable?: PropSection[];
  usageExamples?: ExampleUsage[];
}


function formatPropValue(value: any, propTypeString?: string): string {
  const normalizedPropType = propTypeString?.toLowerCase().replace(/\s*\|\s*undefined$/, "").trim();

  if (typeof value === 'string') {
    if (value.startsWith('{') && value.endsWith('}')) {
      return value;
    }
    if (normalizedPropType === 'string' || (normalizedPropType && normalizedPropType.includes("'"))) {
      return `"${value.replace(/"/g, '\\"')}"`;
    }
    return `{${value}}`;
  }

  if (typeof value === 'boolean') return `{${value}}`; 
  if (typeof value === 'number') return `{${value}}`;
  if (typeof value === 'object') return `{${JSON.stringify(value)}}`;
  
  return `{${String(value)}}`; 
}

function getJsDocDescription(node: JSDocableNode): string {
    const jsDocs = node.getJsDocs();
    if (jsDocs.length > 0) {
        let descriptionText = jsDocs.map((doc: JSDoc) => doc.getDescription().trim()).join('\n').trim();
        
        if (!descriptionText) { // If the untagged description is empty
            const descriptionTags = jsDocs.flatMap(doc => 
                doc.getTags().filter(tag => tag.getTagName() === "description")
            ) as JSDocTag[]; // Cast to JSDocTag to access getComment()

            if (descriptionTags.length > 0) {
                const tag = descriptionTags[0]; // Use the first @description tag
                const commentValue = tag.getComment();
                let commentText = "";

                if (typeof commentValue === 'string') {
                    commentText = commentValue.trim();
                } else if (Array.isArray(commentValue)) { 
                    commentText = commentValue.map(c => typeof c === 'string' ? c.trim() : getNodeTextSafe(c)).join(' ').trim();
                } else if (Node.isNode(commentValue)) {
                     commentText = String(commentValue.getText()).trim();
                }
                descriptionText = commentText;
            }
        }
        return descriptionText;
    }
    return "";
}

function getNodeTextSafe(nodeElement: any): string {
    if (Node.isNode(nodeElement) && nodeElement && typeof nodeElement.getText === 'function') {
        return String(nodeElement.getText()).trim();
    }
    return '';
}

function getJsDocTagValues(node: JSDocableNode, tagName: string): string[] {
    const tags = node.getJsDocs().flatMap(doc => doc.getTags().filter(tag => tag.getTagName() === tagName));
    const results: string[] = [];

    for (const tag of tags) { 
        let commentText = "";
        const commentValue = tag.getComment();

        if (typeof commentValue === 'string') {
            commentText = commentValue.trim();
        } else if (Array.isArray(commentValue)) {
            commentText = commentValue.map(c => {
                if (typeof c === 'string') return c.trim();
                return getNodeTextSafe(c); // Use helper
            }).join(' ').trim();
        } else if (Node.isNode(commentValue)) {
            commentText = String( /* @ts-ignore */ commentValue.getText()).trim(); 
        } else {
            // Fallback: commentValue is undefined
            const tagNameNode = tag.getTagNameNode();
            const fullTagText = tag.getText();

            if (tagNameNode && typeof fullTagText === 'string' && fullTagText.length > 0) {
                const tagNameLength = tagNameNode.getWidth();
                if (fullTagText.length > tagNameLength) {
                    const rawComment = fullTagText.substring(tagNameLength);
                    if (typeof rawComment === 'string') {
                        commentText = rawComment.trim();
                    }
                }
            }
        }

        if (typeof commentText === 'string' && commentText.length > 0) {
            results.push(commentText);
        }
    }
    return results;
}


function parsePropsWithTsMorph(componentName: string, filePath: string): { componentDescription: string, props: PropDetail[], declarationNode?: InterfaceDeclaration | TypeAliasDeclaration } {
  const project = new Project({ 
    tsConfigFilePath: "/Users/deepanshu.kumar/Documents/Blend-v1/tsconfig.json", 
    compilerOptions: { esModuleInterop: true }
  });
  const sourceFile = project.addSourceFileAtPath(filePath);
  const props: PropDetail[] = [];
  let componentDescription = "";
  const propInterfaceNames = [`${componentName}Props`, "Props"];
  let declarationNode: InterfaceDeclaration | TypeAliasDeclaration | undefined;
  let propsSpecificDeclarationNode: InterfaceDeclaration | TypeAliasDeclaration | undefined;

  // First, try to find the specific [ComponentName]Props
  const specificPropsName = `${componentName}Props`;
  propsSpecificDeclarationNode = sourceFile.getInterface(specificPropsName) || sourceFile.getTypeAlias(specificPropsName);

  if (propsSpecificDeclarationNode) {
    declarationNode = propsSpecificDeclarationNode;
    componentDescription = getJsDocDescription(declarationNode); // Get description from [ComponentName]Props
  } else {
    // Fallback to generic "Props" if [ComponentName]Props is not found
    declarationNode = sourceFile.getInterface("Props") || sourceFile.getTypeAlias("Props");
    // DO NOT set componentDescription here if we only found generic "Props"
  }

  if (declarationNode) {
    // componentDescription is now set only if propsSpecificDeclarationNode was found
    const type = declarationNode.getType();
    const apparentProperties = type.getApparentProperties();

    for (const propSymbol of apparentProperties) {
      const name = propSymbol.getName();
      const valDecl = propSymbol.getValueDeclaration();

      if (valDecl && valDecl.getSourceFile().getFilePath() === filePath) {
        const propNodeType = valDecl.getType();
        let typeText = propNodeType.getText(valDecl); 

        function getExpandedUnionText(currentType: Type): string | null {
            const mapStringLiteralType = (slt: Type) => slt.isStringLiteral() ? `'${slt.getLiteralValue()}'` : slt.getText(valDecl);
            if (currentType.isUnion()) {
                const unionTypes = currentType.getUnionTypes();
                if (unionTypes.every((ut: Type) => ut.isStringLiteral() || ut.isUndefined())) {
                    return unionTypes.filter((ut: Type) => !ut.isUndefined()).map(mapStringLiteralType).join(' | ');
                }
                for (const ut of unionTypes) {
                    const aliasSymbol = ut.getAliasSymbol();
                    if (aliasSymbol) {
                        const aliasDeclarations = aliasSymbol.getDeclarations();
                        if (aliasDeclarations && aliasDeclarations.length > 0 && Node.isTypeAliasDeclaration(aliasDeclarations[0])) {
                            const aliasTypeNode = aliasDeclarations[0].getTypeNode();
                            if (aliasTypeNode) {
                                const targetType = aliasTypeNode.getType();
                                if (targetType.isUnion() && targetType.getUnionTypes().every((innerUt: Type) => innerUt.isStringLiteral())) {
                                    return targetType.getUnionTypes().map(mapStringLiteralType).join(' | ');
                                }
                            }
                        }
                    }
                }
            }
            const aliasSymbol = currentType.getAliasSymbol();
            if (aliasSymbol) {
                 const aliasDeclarations = aliasSymbol.getDeclarations();
                 if (aliasDeclarations && aliasDeclarations.length > 0 && Node.isTypeAliasDeclaration(aliasDeclarations[0])) {
                    const aliasTypeNode = aliasDeclarations[0].getTypeNode();
                    if (aliasTypeNode) {
                        const targetType = aliasTypeNode.getType();
                        if (targetType.isUnion() && targetType.getUnionTypes().every((innerUt: Type) => innerUt.isStringLiteral())) {
                            return targetType.getUnionTypes().map(mapStringLiteralType).join(' | ');
                        }
                    }
                 }
            }
            return null;
        }
        
        const expandedText = getExpandedUnionText(propNodeType);
        if (expandedText) {
            const originalTypeHadUndefined = propNodeType.isUnion() && propNodeType.getUnionTypes().some((ut:Type) => ut.isUndefined());
            const isOptionalProp = Node.isPropertySignature(valDecl) && valDecl.hasQuestionToken(); 
            if (originalTypeHadUndefined || isOptionalProp) {
                typeText = expandedText.toLowerCase().includes("undefined") ? expandedText : `${expandedText} | undefined`;
            } else {
                typeText = expandedText;
            }
        }

        let defaultValue: string | undefined = undefined;
        let category = "General";

        if (Node.isPropertySignature(valDecl) || Node.isPropertyDeclaration(valDecl)) {
            const initializer = valDecl.getInitializer();
            if (initializer) {
                defaultValue = initializer.getText();
            }
            const categories = getJsDocTagValues(valDecl, "propCategory");
            if (categories.length > 0) {
                category = categories[0];
            }
            
            props.push({
                name: name, 
                type: typeText, 
                required: !valDecl.hasQuestionToken(), 
                description: getJsDocDescription(valDecl),
                defaultValue: defaultValue,
                category: category
            });
        } else {
           const flags = propSymbol.getFlags();
            // For other types of value declarations, attempt to get category if JSDocable
            if (Node.isJSDocable(valDecl)) {
                const categories = getJsDocTagValues(valDecl, "propCategory");
                if (categories.length > 0) {
                    category = categories[0];
                }
            }
           props.push({
              name: name, 
              type: propSymbol.getTypeAtLocation(declarationNode).getText(declarationNode), 
              required: !(flags & SymbolFlags.Optional), 
              description: Node.isJSDocable(valDecl) ? getJsDocDescription(valDecl) : "",
              defaultValue: undefined, // Default value extraction might be complex for non-property signatures
              category: category
          });
        }
      }
    }
  }
  return { componentDescription, props, declarationNode };
}

async function generateComponentDocumentationLogic(componentName: string): Promise<string> {
    const componentLibDir = path.join(BLEND_LIBRARY_PATH, componentName);
    // const demoFilePath = path.join(BLEND_DEMO_PATH, componentName, `${componentName}Demo.tsx`); // Removed demo file path
    
    const typesTsFilePath = path.join(componentLibDir, "types.ts");
    const typesTsxFilePath = path.join(componentLibDir, "types.tsx"); // Check for types.tsx
    const componentFilePath = path.join(componentLibDir, `${componentName}.tsx`);
    const indexFilePath = path.join(componentLibDir, "index.ts");

    let mainSourceFilePath = "";
    // Prioritize types.ts or types.tsx for props and component JSDoc
    if (fs.existsSync(typesTsFilePath)) {
        mainSourceFilePath = typesTsFilePath;
    } else if (fs.existsSync(typesTsxFilePath)) {
        mainSourceFilePath = typesTsxFilePath;
    } else if (fs.existsSync(componentFilePath)) { // Fallback to ComponentName.tsx if no types file
        mainSourceFilePath = componentFilePath;
    } else if (fs.existsSync(indexFilePath)) { // Fallback to index.ts if no types or component file
        mainSourceFilePath = indexFilePath;
    }
    
    if (!mainSourceFilePath) {
        throw new McpError(ErrorCode.InvalidParams, `Source file for component ${componentName} not found. Looked in ${typesTsFilePath}, ${typesTsxFilePath}, ${componentFilePath}, ${indexFilePath}`);
    }

    // Attempt to parse props from the determined mainSourceFilePath
    // parsePropsWithTsMorph will look for [ComponentName]Props or Props in this file.
    let { componentDescription, props: parsedProps, declarationNode } = parsePropsWithTsMorph(componentName, mainSourceFilePath); 
    
    // If componentDescription is empty but we have a declarationNode from parsePropsWithTsMorph,
    // try to get the description directly from it. This is the primary source for the description.
    if (!componentDescription && declarationNode) {
        componentDescription = getJsDocDescription(declarationNode);
    }
    
    // let demoCode = `// Demo code for ${componentName} not found at ${demoFilePath}`; // Demo code logic removed
    // try {
    //     if (fs.existsSync(demoFilePath)) {
    //         demoCode = fs.readFileSync(demoFilePath, 'utf-8');
    //     }
    // } catch (e: any) {
    //     console.warn(`Could not read demo file for ${componentName}: ${e.message}`);
    // }

    let features: string[] = [];
    let usageExamples: ExampleUsage[] = [];

    const projectForJsDocs = new Project({ tsConfigFilePath: "/Users/deepanshu.kumar/Documents/Blend-v1/tsconfig.json" });
    const sourceFileForJsDocs = projectForJsDocs.addSourceFileAtPath(mainSourceFilePath);
    
    let targetNodeForJsDocs: JSDocableNode | undefined;
    
    const interfaceNode = sourceFileForJsDocs.getInterface(`${componentName}Props`);
    if (interfaceNode) targetNodeForJsDocs = interfaceNode;

    if (!targetNodeForJsDocs) {
        const typeAliasNode = sourceFileForJsDocs.getTypeAlias(`${componentName}Props`);
        if (typeAliasNode) targetNodeForJsDocs = typeAliasNode;
    }
    if (!targetNodeForJsDocs) {
        const functionDeclNode = sourceFileForJsDocs.getFunction(componentName);
        if (functionDeclNode) targetNodeForJsDocs = functionDeclNode;
    }
    if (!targetNodeForJsDocs) {
        const classDeclNode = sourceFileForJsDocs.getClass(componentName);
        if (classDeclNode) targetNodeForJsDocs = classDeclNode;
    }
    if (!targetNodeForJsDocs) {
        const varDecl = sourceFileForJsDocs.getVariableDeclaration(componentName);
        if (varDecl) {
            const parentStatement = varDecl.getVariableStatement(); 
            if (parentStatement && Node.isJSDocable(parentStatement)) {
                targetNodeForJsDocs = parentStatement;
            } else if (Node.isJSDocable(varDecl)) { 
                 targetNodeForJsDocs = varDecl;
            }
        }
    }
    
    if (!targetNodeForJsDocs && declarationNode) { 
         const fetchedDeclNodeByName = sourceFileForJsDocs.getInterface(declarationNode.getName()!) || sourceFileForJsDocs.getTypeAlias(declarationNode.getName()!);
         if (fetchedDeclNodeByName) targetNodeForJsDocs = fetchedDeclNodeByName;
    }
   
    // If targetNodeForJsDocs was found and matches a props type, ensure componentDescription comes from it.
    // This logic is now more direct: if targetNodeForJsDocs is found, try to use its description.
    // The parsePropsWithTsMorph already tries to get componentDescription from the props type.
    // This section will primarily serve to ensure features/examples are from the right node,
    // and can act as a fallback or refiner for componentDescription if needed.
    // The componentDescription should now be primarily set from declarationNode via parsePropsWithTsMorph or the block above.
    // The targetNodeForJsDocs is mainly for features and examples.
    
    if (targetNodeForJsDocs) {
        // Fallback for componentDescription if it's still somehow empty
        // and targetNodeForJsDocs might be a more relevant node (e.g. the component function/class itself)
        if (!componentDescription) {
             const descFromTargetNode = getJsDocDescription(targetNodeForJsDocs);
             if (descFromTargetNode) {
                 componentDescription = descFromTargetNode;
             }
        }
        
        features = getJsDocTagValues(targetNodeForJsDocs, "feature");
        const exampleJsDocTags = targetNodeForJsDocs.getJsDocs().flatMap(doc => doc.getTags().filter(tag => tag.getTagName() === "example"));
        usageExamples = exampleJsDocTags.map(tagNode => {
            const tagComment = (tagNode as JSDocTag).getCommentText() || "";
            const lines = tagComment.split(/\r?\n/);
            const title = lines[0]?.trim() || "Example";
            const code = lines.slice(1).join('\n').replace(/^```(tsx|jsx|typescript|javascript)?\s*|```\s*$/g, '').trim();
            return { title, code, description: "" };
        });
    }

    // Group props by category
    const groupedProps: { [key: string]: PropDetailForDoc[] } = {};
    if (parsedProps && parsedProps.length > 0) {
        for (const prop of parsedProps) {
            const category = prop.category || "General";
            if (!groupedProps[category]) {
                groupedProps[category] = [];
            }
            // Ensure all fields for PropDetailForDoc are present
            groupedProps[category].push({
                name: prop.name,
                type: prop.type,
                required: prop.required,
                description: prop.description,
                defaultValue: prop.defaultValue || "-", // Use parsed defaultValue
                category: category, 
            });
        }
    }

    let propsTable: PropSection[] = [];
    if (Object.keys(groupedProps).length > 0) {
        propsTable = Object.entries(groupedProps).map(([categoryTitle, propsInCategory]) => ({
            sectionTitle: categoryTitle,
            props: propsInCategory,
        }));
    } else {
        // If no props were found at all, create a default "Available Props" section
         propsTable.push({
            sectionTitle: "Available Props",
            props: []
        });
    }
    
    // Construct Markdown string
    let md = `# ${componentName} Component Documentation\n\n`;

    md += `## Description\n${componentDescription || "No description available."}\n\n`;

    md += `## Features\n`;
    if (features && features.length > 0 && features[0] !== `// No @feature JSDoc tags found for ${componentName}`) {
        features.forEach(feature => {
            md += `- ${feature}\n`;
        });
    } else {
        md += "No features documented.\n";
    }
    md += "\n";

    md += `## Props\n\n`;
    if (propsTable && propsTable.length > 0 && propsTable[0].props.length > 0) {
        propsTable.forEach(section => {
            md += `### ${section.sectionTitle || "General"}\n\n`;
            md += "| Prop Name     | Type        | Required | Description | Default Value |\n";
            md += "|---------------|-------------|----------|-------------|---------------|\n";
            section.props.forEach(prop => {
                md += `| \`${prop.name}\` | \`${prop.type.replace(/\|/g, '\\|')}\` | ${prop.required} | ${prop.description.replace(/\n/g, ' ')} | \`${prop.defaultValue || "-"}\` |\n`;
            });
            md += "\n";
        });
    } else {
        md += "No props defined for this component.\n\n";
    }

    md += `## Usage Examples\n\n`;
    if (usageExamples && usageExamples.length > 0 && !(usageExamples.length === 1 && usageExamples[0].title === "Basic Usage Example" && usageExamples[0].code === `<${componentName} />` && !targetNodeForJsDocs)) {
        usageExamples.forEach(example => {
            md += `### ${example.title}\n`;
            if (example.description) {
                md += `${example.description}\n\n`;
            }
            md += "```tsx\n";
            md += `${example.code}\n`;
            md += "```\n\n";
        });
    } else {
        md += "No specific usage examples provided. Basic usage:\n";
        md += "```tsx\n";
        md += `<${componentName} />\n`;
        md += "```\n\n";
    }

    // md += `## Demo Code\n\n`; // Demo code section removed
    // md += "```tsx\n";
    // md += `${demoCode || `// No demo code found for ${componentName}`}\n`;
    // md += "```\n";

    return md.trim(); // Trim any trailing newlines
}


function _generateSingleComponentJSX(
    componentName: string,
    componentProps: Record<string, any>,
    childrenInput?: string | ChildComponentRequest[]
): string {
    if (!componentName || typeof componentName !== 'string') {
        throw new McpError(ErrorCode.InvalidParams, "Missing or invalid componentName for (child) component.");
    }
    if (!componentProps || typeof componentProps !== 'object') {
        throw new McpError(ErrorCode.InvalidParams, "Missing or invalid props for (child) component.");
    }

    let propTypesMap = new Map<string, string>();
    const componentDir = path.join(BLEND_LIBRARY_PATH, componentName);
    const possibleFiles = [path.join(componentDir, "types.ts"), path.join(componentDir, "Types.ts"), path.join(componentDir, `${componentName}.tsx`), path.join(componentDir, "index.ts")];
    let foundFilePath = "";
    for (const filePath of possibleFiles) { if (fs.existsSync(filePath)) { foundFilePath = filePath; break; } }
    
    if (foundFilePath) {
        try {
            const { props: parsedPropDetails } = parsePropsWithTsMorph(componentName, foundFilePath);
            parsedPropDetails.forEach(p => propTypesMap.set(p.name, p.type));
        } catch (e: any) {
            console.error(`Could not get prop types for ${componentName} during its own generation: ${e.message}`);
        }
    }

    let propsString = "";
    for (const [key, value] of Object.entries(componentProps)) {
        const propTypeString = propTypesMap.get(key);
        if (typeof value === 'boolean' && value === true && (!propTypeString || propTypeString.toLowerCase().includes('boolean'))) {
            propsString += ` ${key}`;
        } else {
            propsString += ` ${key}=${formatPropValue(value, propTypeString)}`;
        }
    }

    let childrenContent = "";
    if (typeof childrenInput === 'string') {
        childrenContent = childrenInput.trim() !== "" ? `\n  ${childrenInput.split('\n').map(line => `  ${line}`).join('\n')}\n` : "";
    } else if (Array.isArray(childrenInput)) {
        childrenContent = "\n" + childrenInput.map(childReq => 
            _generateSingleComponentJSX(childReq.componentName, childReq.props, childReq.children)
                .split('\n').map(line => `  ${line}`).join('\n') 
        ).join('\n') + "\n";
    }
    
    let componentCode = `<${componentName}${propsString.trimEnd()}`;
    if (childrenContent) {
        componentCode += `>${childrenContent}</${componentName}>`;
    } else {
        componentCode += ` />`;
    }
    return componentCode;
}

function generateFintechKpiSummaryWithChart(options: any, includeImports: boolean): string {
  if (options.title && typeof options.title !== 'string') throw new McpError(ErrorCode.InvalidParams, "options.title must be a string.");
  if (options.kpis) {
    if (!Array.isArray(options.kpis) || !options.kpis.every((kpi: any) => typeof kpi === 'object' && kpi !== null && typeof kpi.title === 'string' && typeof kpi.value === 'string')) {
      throw new McpError(ErrorCode.InvalidParams, "options.kpis must be an array of objects with string 'title' and 'value'.");
    }
  }
  if (options.chartRawData && !Array.isArray(options.chartRawData)) {
    throw new McpError(ErrorCode.InvalidParams, "options.chartRawData must be an array.");
  }
  if (options.chartXKey && typeof options.chartXKey !== 'string') {
    throw new McpError(ErrorCode.InvalidParams, "options.chartXKey must be a string.");
  }
  if (options.chartYKeys && (!Array.isArray(options.chartYKeys) || !options.chartYKeys.every((key: any) => typeof key === 'string'))) {
    throw new McpError(ErrorCode.InvalidParams, "options.chartYKeys must be an array of strings.");
  }
  if (options.chartType && !['line', 'bar', 'pie'].includes(options.chartType.toLowerCase())) {
    throw new McpError(ErrorCode.InvalidParams, "options.chartType must be 'line', 'bar', or 'pie'.");
  }
  ['xAxisLabel', 'yAxisLabel', 'chartHeaderSlotString'].forEach(key => {
    if (options[key] && typeof options[key] !== 'string') {
      throw new McpError(ErrorCode.InvalidParams, `options.${key} must be a string.`);
    }
  });

  const {
    title = "Financial Overview",
    kpis = [ 
      { title: "Total Revenue", value: "$1.2M", changeValue: 15, changeDirection: "positive", variant: "NUMBER" },
      { title: "Net Profit", value: "$300K", changeValue: 8, changeDirection: "positive", variant: "NUMBER" },
      { title: "Active Users", value: "1,500", changeValue: 2, changeDirection: "negative", variant: "NUMBER" },
    ],
    chartRawData = [{ month: "Jan", sales: 120000, profit: 70000 }, { month: "Feb", sales: 150000, profit: 90000 }],
    chartXKey = "month", 
    chartYKeys = ["sales", "profit"], 
    chartType = "line",   
    xAxisLabel = options.chartXKey || "Category",
    yAxisLabel = "Value", 
    chartHeaderSlotString = options.chartTitle || 'Chart Overview' 
  } = options;

  let kpiCardsString = kpis.map((kpi: any) => {
    const changeTypeVal = kpi.changeDirection === "positive" ? "ChangeType.INCREASE" : (kpi.changeDirection === "negative" ? "ChangeType.DECREASE" : undefined);
    const statCardVariantVal = kpi.variant && ["LINE", "PROGRESS_BAR", "BAR", "NUMBER"].includes(kpi.variant.toUpperCase()) 
      ? `StatCardVariant.${kpi.variant.toUpperCase()}` 
      : "StatCardVariant.NUMBER";
    
    let changePropString = "";
    if (changeTypeVal && kpi.changeValue !== undefined) {
        changePropString = `change={{ value: ${Math.abs(Number(kpi.changeValue))}, type: ${changeTypeVal} }}`;
    }

    let chartDataPropString = "";
    if (kpi.chartData && (statCardVariantVal === "StatCardVariant.LINE" || statCardVariantVal === "StatCardVariant.BAR")) {
        const chartDataContent = Array.isArray(kpi.chartData) 
            ? kpi.chartData.map((dp: any) => `{label: "${dp.label}", value: ${dp.value}}`).join(', ')
            : "[]";
        chartDataPropString = `chartData={[${chartDataContent}]}`;
    }
    
    let progressValuePropString = "";
    if (kpi.progressValue !== undefined && statCardVariantVal === "StatCardVariant.PROGRESS_BAR") {
        progressValuePropString = `progressValue={${Number(kpi.progressValue)}}`;
    }

    return `      <div style={{ flex: 1, minWidth: '200px' }}>
        <StatCard
          title="${kpi.title}"
          value="${kpi.value}"
          variant={${statCardVariantVal}}
          ${changePropString}
          ${chartDataPropString}
          ${progressValuePropString}
        />
      </div>`;
  }).join('\n');

  const transformedChartData: any[] = chartRawData.map((item: any) => {
      const dataPointData: { [key: string]: { primary: { label: string; val: number } } } = {};
      for (const yKey of chartYKeys) {
          if (item[yKey] !== undefined) {
              dataPointData[yKey] = { primary: { label: yKey, val: Number(item[yKey]) } };
          }
      }
      return { name: String(item[chartXKey]), data: dataPointData };
  });
  const chartDataString = JSON.stringify(transformedChartData);
  const chartTypeVal = `ChartType.${chartType.toUpperCase()}`;

  let chartString = `    <Charts
      chartHeaderSlot={"${chartHeaderSlotString}"}
      data={${chartDataString}}
      chartType={${chartTypeVal}}
      ${xAxisLabel ? `xAxisLabel="${xAxisLabel}"` : ''}
      ${yAxisLabel ? `yAxisLabel="${yAxisLabel}"` : ''}
    />`;
  
  let code = `
<div>
  <Text variant="heading.lg" style={{ marginBottom: '20px' }}>
    ${title}
  </Text>
  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
${kpiCardsString}
  </div>
  <div style={{ marginTop: '20px' }}>
${chartString}
  </div>
</div>`;

  if (includeImports) {
    const imports = `import { Text, StatCard, Charts, StatCardVariant, ChangeType, ChartType } from "${BLEND_LIBRARY_PACKAGE_NAME}";\n\n`;
    code = imports + code;
  }
  return code.trim();
}

function generateTransactionListWithControls(options: any, includeImports: boolean): string {
  if (options.title && typeof options.title !== 'string') {
    throw new McpError(ErrorCode.InvalidParams, "options.title must be a string for transaction_list_with_controls.");
  }
   if (options.columns && !(typeof options.columns === 'string' || Array.isArray(options.columns))) {
    throw new McpError(ErrorCode.InvalidParams, "options.columns must be an array or a string representing an array.");
  }
  if (options.data && !(typeof options.data === 'string' || Array.isArray(options.data))) {
    throw new McpError(ErrorCode.InvalidParams, "options.data must be an array or a string representing an array.");
  }
  if (options.filters && (!Array.isArray(options.filters) || !options.filters.every((f: any) => typeof f === 'object' && f !== null && typeof f.type === 'string' && typeof f.label === 'string'))) {
    throw new McpError(ErrorCode.InvalidParams, "options.filters must be an array of objects with string 'type' and 'label'.");
  }
  if (options.mainActions && (!Array.isArray(options.mainActions) || !options.mainActions.every((a: any) => typeof a === 'object' && a !== null && typeof a.component === 'string'))) {
    throw new McpError(ErrorCode.InvalidParams, "options.mainActions must be an array of objects with string 'component'.");
  }
  if (options.dataTableIdField && typeof options.dataTableIdField !== 'string') {
    throw new McpError(ErrorCode.InvalidParams, "options.dataTableIdField must be a string.");
  }

  const {
    title = "Transactions",
    columns = '[{ "header": "ID", "field": "id" }, { "header": "Date", "field": "date" }, { "header": "Amount", "field": "amount" }, { "header": "Status", "field": "status" }]', 
    data = '[{ "id": "T001", "date": "2023-01-15", "amount": "$250.00", "status": "Completed" }]',
    filters = [
      { type: 'TextInput', label: 'Search', props: { placeholder: 'Search transactions...' } },
      { type: 'SingleSelect', label: 'Status', props: { placeholder: 'Any Status', items: '[{ "items": [{value: "all", label: "All"}, {value: "completed", label: "Completed"}, {value: "pending", label: "Pending"}]}]' } } 
    ],
    mainActions = [
      { component: 'Button', props: { text: 'Export CSV', buttonType: 'ButtonType.SECONDARY' } },
      { component: 'Button', props: { text: 'Add Transaction', buttonType: 'ButtonType.PRIMARY', style: "{ marginLeft: '10px' }" } }
    ],
    dataTableIdField = "id" 
  } = options;

  const columnsValue = (typeof columns === 'string' && columns.startsWith('[')) ? columns : JSON.stringify(columns);
  const dataValue = (typeof data === 'string' && data.startsWith('[')) ? data : JSON.stringify(data);

  let filterControlsString = filters.map((filter: any) => {
    const filterProps = Object.entries(filter.props || {})
      .map(([key, value]) => `${key}=${formatPropValue(value, '')}`) 
      .join(' ');
    const labelProp = (filter.type === 'SingleSelect' || filter.type === 'TextInput') && filter.label ? `label="${filter.label}"` : '';
    return `    <${filter.type} ${labelProp} ${filterProps} style={{ marginRight: '10px' }} />`;
  }).join('\n');

  let mainActionsString = mainActions.map((action: any) => {
     const actionProps = Object.entries(action.props || {})
      .map(([key, value]) => `${key}=${formatPropValue(value, '')}`)
      .join(' ');
    return `  <${action.component} ${actionProps} />`;
  }).join('\n  ');

  let code = `
<div>
  <Text variant="heading.lg" style={{ marginBottom: '20px' }}>
    ${title}
  </Text>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
${filterControlsString}
    </div>
    <div style={{ display: 'flex', gap: '10px' }}>
${mainActionsString}
    </div>
  </div>
  <DataTable columns={${columnsValue}} data={${dataValue}} idField="${dataTableIdField}" />
</div>`;

  if (includeImports) {
    const usedComponents = new Set<string>(['Text', 'DataTable']);
    filters.forEach((f: any) => usedComponents.add(f.type)); 
    mainActions.forEach((a: any) => usedComponents.add(a.component)); 
    if (Array.from(usedComponents).some(c => c === 'Button')) {
        usedComponents.add('ButtonType');
    }
    const imports = `import { ${Array.from(usedComponents).sort().join(', ')} } from "${BLEND_LIBRARY_PACKAGE_NAME}";\n\n`;
    code = imports + code;
  }
  return code.trim();
}


const server = new Server(
  { name: "blend", version: "0.1.0" },
  { capabilities: { tools: {} } }
);

const childComponentSchema = { 
    type: "object",
    properties: {
        componentName: { type: "string" },
        props: { type: "object", additionalProperties: true },
        children: { type: ["string", "array"], items: { type: "object" } } 
    },
    required: ["componentName", "props"]
};


server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      { name: "list_blend_components", description: "Lists all available components in blend-v1 that can be used.", inputSchema: { type: "object", properties: {}, required: [] }},
      { name: "get_blend_component_props", description: "Retrieves the props and their descriptions for a specified blend-v1 component.", inputSchema: { type: "object", properties: { componentName: { type: "string", description: "The name of the blend-v1 component." } }, required: ["componentName"] }},
      { 
        name: "generate_blend_component", 
        description: "Generates React code for a specified blend-v1 component with given props.", 
        inputSchema: { 
          type: "object", 
          properties: { 
            componentName: { type: "string", description: "The name of the blend-v1 component (e.g., Button, Alert)." }, 
            props: { type: "object", description: "An object of key-value pairs for component props.", additionalProperties: true }, 
            children: { 
              oneOf: [ 
                { type: "string" },
                { type: "array", items: childComponentSchema }
              ],
              description: "String content or an array of child component generation requests." 
            }, 
            includeImports: { type: "boolean", description: "Whether to include necessary import statements. Defaults to true.", default: true }
          }, 
          required: ["componentName", "props"] 
        }
      },
      { name: "scaffold_dashboard_section", description: "Generates React code for common FinTech dashboard section patterns using blend-v1 components.", inputSchema: { type: "object", properties: { sectionType: { type: "string", description: "The type of dashboard section pattern to generate.", enum: ["fintech_kpi_summary_with_chart", "transaction_list_with_controls", "interactive_modal"] }, options: { type: "object", description: "Configuration options specific to the chosen sectionType." }, includeImports: { type: "boolean", description: "Whether to include necessary import statements. Defaults to true.", default: true }}, required: ["sectionType", "options"] }},
      { 
        name: "generate_component_documentation", 
        description: "Generates documentation for a specified blend-v1 component.", 
        inputSchema: { 
          type: "object", 
          properties: { 
            componentName: { type: "string", description: "The name of the blend-v1 component (e.g., Button, Alert)." }
          }, 
          required: ["componentName"] 
        }
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  switch (request.params.name) {
    case "list_blend_components": {
      try {
        const entries = fs.readdirSync(BLEND_LIBRARY_PATH, { withFileTypes: true });
        const componentNames = entries.filter(entry => entry.isDirectory()).map(entry => entry.name);
        return { content: [{ type: "text", text: JSON.stringify(componentNames) }] };
      } catch (error: any) {
        throw new McpError(ErrorCode.InternalError, `Error listing components: ${error.message}`);
      }
    }
    case "get_blend_component_props": {
      const componentName = request.params.arguments?.componentName as string;
      if (!componentName) throw new McpError(ErrorCode.InvalidParams, "Missing componentName argument.");
      const componentDir = path.join(BLEND_LIBRARY_PATH, componentName);
      const possibleFiles = [path.join(componentDir, "types.ts"), path.join(componentDir, "Types.ts"), path.join(componentDir, `${componentName}.tsx`), path.join(componentDir, "index.ts")];
      let foundFilePath = "";
      for (const filePath of possibleFiles) { if (fs.existsSync(filePath)) { foundFilePath = filePath; break; } }
      if (!foundFilePath) throw new McpError(ErrorCode.InvalidParams, `Could not find props file for component ${componentName}. Looked in: ${possibleFiles.join(', ')}`);
      try {
        const parsedPropsResult = parsePropsWithTsMorph(componentName, foundFilePath);
        if (parsedPropsResult.props.length === 0 && !parsedPropsResult.componentDescription) {
             const genericParsedPropsResult = parsePropsWithTsMorph("Props", foundFilePath);
             if (genericParsedPropsResult.props.length > 0 || genericParsedPropsResult.componentDescription) {
                 return { content: [{ type: "text", text: JSON.stringify({componentDescription: genericParsedPropsResult.componentDescription, props: genericParsedPropsResult.props}) }] };
             }
             throw new McpError(ErrorCode.InternalError, `No props found for ${componentName} in ${foundFilePath}.`);
        }
        return { content: [{ type: "text", text: JSON.stringify({componentDescription: parsedPropsResult.componentDescription, props: parsedPropsResult.props}) }] };
      } catch (error: any) {
        if (!(error instanceof McpError)) console.error(`ts-morph parsing error for ${componentName} in ${foundFilePath}:`, error);
        throw new McpError(ErrorCode.InternalError, `Error parsing props for ${componentName} using ts-morph: ${error.message}`);
      }
    }
    case "generate_blend_component": {
      const { componentName, props: componentProps, children, includeImports = true, } = request.params.arguments as { componentName: string; props: Record<string, any>; children?: string | ChildComponentRequest[]; includeImports?: boolean; };
      
      if (!componentName || typeof componentName !== 'string') throw new McpError(ErrorCode.InvalidParams, "Missing or invalid componentName argument.");
      if (!componentProps || typeof componentProps !== 'object') throw new McpError(ErrorCode.InvalidParams, "Missing or invalid props argument.");

      let componentCode = _generateSingleComponentJSX(componentName, componentProps, children);

      if (includeImports) {
        const allComponentNames = new Set<string>([componentName]);
        function collectComponentNames(childInput?: string | ChildComponentRequest[]) {
            if (Array.isArray(childInput)) {
                childInput.forEach(child => {
                    allComponentNames.add(child.componentName);
                    collectComponentNames(child.children);
                });
            }
        }
        collectComponentNames(children);
        componentCode = `import { ${Array.from(allComponentNames).sort().join(', ')} } from "${BLEND_LIBRARY_PACKAGE_NAME}";\n\n${componentCode}`;
      }

      return { content: [{ type: "text", text: componentCode }] };
    }
    case "scaffold_dashboard_section": {
      const { sectionType, options, includeImports = true } = request.params.arguments as { sectionType: string; options: any; includeImports?: boolean; };
      if (!sectionType) throw new McpError(ErrorCode.InvalidParams, "Missing sectionType argument.");
      if (options && typeof options !== 'object') { 
        throw new McpError(ErrorCode.InvalidParams, "options parameter must be an object.");
      }

      let scaffoldedCode = "";
      switch (sectionType) {
        case "fintech_kpi_summary_with_chart":
          scaffoldedCode = generateFintechKpiSummaryWithChart(options || {}, includeImports); 
          break;
        case "transaction_list_with_controls":
          scaffoldedCode = generateTransactionListWithControls(options || {}, includeImports); 
          break;
        // case "interactive_modal": // Placeholder for next improvement
        //   scaffoldedCode = generateInteractiveModal(options || {}, includeImports);
        //   break;
        default:
          throw new McpError(ErrorCode.InvalidParams, `Unknown sectionType: ${sectionType}`);
      }
      return { content: [{ type: "text", text: scaffoldedCode }] };
    }
    case "generate_component_documentation": {
      const componentName = request.params.arguments?.componentName as string;
      if (!componentName) throw new McpError(ErrorCode.InvalidParams, "Missing componentName argument.");
      try {
        const markdownDocumentation = await generateComponentDocumentationLogic(componentName);
        return { content: [{ type: "text", text: markdownDocumentation }] };
      } catch (error: any) {
        if (error instanceof McpError) throw error;
        throw new McpError(ErrorCode.InternalError, `Error generating documentation for ${componentName}: ${error.message}`);
      }
    }
    default:
      throw new McpError( ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Blend MCP server running on stdio"); 
}

main().catch((error) => {
  console.error("Server error:", error.message); 
  process.exit(1);
});
