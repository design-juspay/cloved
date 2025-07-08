import React from 'react';
import { PrimitiveButton, ButtonV2, ButtonSizeV2, ButtonTypeV2 } from 'blend-v1';
import styled from 'styled-components';

// Example 1: Custom breakpoint tokens
const CUSTOM_BREAKPOINTS = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1440,
} as const;

// Example 2: Custom responsive tokens
const customButtonTokens = {
  padding: {
    small: {
      mobile: "4px 8px",
      tablet: "6px 12px", 
      desktop: "8px 16px"
    },
    medium: {
      mobile: "6px 12px",
      tablet: "10px 20px",
      desktop: "12px 24px"
    },
    large: {
      mobile: "8px 16px",
      tablet: "12px 24px",
      desktop: "16px 32px"
    }
  },
  fontSize: {
    small: {
      mobile: "12px",
      tablet: "14px",
      desktop: "16px"
    },
    medium: {
      mobile: "14px",
      tablet: "16px",
      desktop: "18px"
    },
    large: {
      mobile: "16px",
      tablet: "18px",
      desktop: "20px"
    }
  }
};

// Example 3: Styled component with custom breakpoints
const CustomBreakpointButton = styled(PrimitiveButton)`
  /* XS: 0-479px */
  padding: 4px 8px;
  font-size: 12px;
  min-height: 28px;
  
  /* SM: 480-767px */
  @media (min-width: ${CUSTOM_BREAKPOINTS.sm}px) {
    padding: 6px 12px;
    font-size: 14px;
    min-height: 32px;
  }
  
  /* MD: 768-1023px */
  @media (min-width: ${CUSTOM_BREAKPOINTS.md}px) {
    padding: 8px 16px;
    font-size: 16px;
    min-height: 40px;
  }
  
  /* LG: 1024-1439px */
  @media (min-width: ${CUSTOM_BREAKPOINTS.lg}px) {
    padding: 10px 20px;
    font-size: 18px;
    min-height: 44px;
  }
  
  /* XL: 1440px+ */
  @media (min-width: ${CUSTOM_BREAKPOINTS.xl}px) {
    padding: 12px 24px;
    font-size: 20px;
    min-height: 48px;
  }
`;

// Example 4: Component that uses custom tokens
const CustomTokenButton: React.FC<{ 
  size?: 'small' | 'medium' | 'large';
  children?: React.ReactNode;
}> = ({ 
  size = 'small',
  children 
}) => {
  const tokens = customButtonTokens.padding[size];
  const fontSize = customButtonTokens.fontSize[size];
  
  return (
    <PrimitiveButton
      padding={tokens}
      fontSize={fontSize}
      background="#6366f1"
      color="white"
      borderRadius="6px"
      border="none"
    >
      {children}
    </PrimitiveButton>
  );
};

const CustomBreakpointsDemo = () => {
  return (
    <div style={{ padding: '40px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '40px', fontSize: '32px', fontWeight: 'bold' }}>
        Custom Breakpoints Demo
      </h1>
      
      {/* Section 1: Default System */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>
          1. Default Breakpoints (Mobile/Tablet/Desktop)
        </h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <ButtonV2
            text="Default Small"
            size={ButtonSizeV2.SMALL}
            buttonType={ButtonTypeV2.PRIMARY}
          />
          <ButtonV2
            text="Default Medium"
            size={ButtonSizeV2.MEDIUM}
            buttonType={ButtonTypeV2.PRIMARY}
          />
          <ButtonV2
            text="Default Large"
            size={ButtonSizeV2.LARGE}
            buttonType={ButtonTypeV2.PRIMARY}
          />
        </div>
        <div style={{ background: 'white', padding: '16px', borderRadius: '8px' }}>
          <code>Breakpoints: mobile (0px), tablet (768px), desktop (1024px)</code>
        </div>
      </section>

      {/* Section 2: Custom Breakpoints via Styled Components */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>
          2. Custom Breakpoints (XS/SM/MD/LG/XL)
        </h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <CustomBreakpointButton
            background="#10b981"
            color="white"
            border="none"
            borderRadius="6px"
          >
            5 Breakpoints
          </CustomBreakpointButton>
        </div>
        <div style={{ background: 'white', padding: '16px', borderRadius: '8px' }}>
          <code>Breakpoints: xs (0px), sm (480px), md (768px), lg (1024px), xl (1440px)</code>
        </div>
      </section>

      {/* Section 3: Custom Tokens */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>
          3. Custom Token-Based Approach
        </h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <CustomTokenButton size="small">
            Custom Tokens
          </CustomTokenButton>
        </div>
        <div style={{ background: 'white', padding: '16px', borderRadius: '8px' }}>
          <pre>{JSON.stringify(customButtonTokens.padding.small, null, 2)}</pre>
        </div>
      </section>

      {/* Section 4: Direct Responsive Values */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>
          4. Direct Responsive Values
        </h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <PrimitiveButton
            padding={{
              mobile: "6px 12px",
              tablet: "10px 20px",
              desktop: "14px 28px"
            }}
            fontSize={{
              mobile: "13px",
              tablet: "15px",
              desktop: "17px"
            }}
            minHeight={{
              mobile: "34px",
              tablet: "42px",
              desktop: "50px"
            }}
            background="#f59e0b"
            color="white"
            border="none"
            borderRadius="6px"
          >
            Direct Values
          </PrimitiveButton>
        </div>
        <div style={{ background: 'white', padding: '16px', borderRadius: '8px' }}>
          <code>
            {`padding={{ mobile: "6px 12px", tablet: "10px 20px", desktop: "14px 28px" }}`}
          </code>
        </div>
      </section>

      {/* Section 5: CSS Variables Approach */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>
          5. CSS Variables for Dynamic Breakpoints
        </h2>
        <div 
          style={{ 
            display: 'flex', 
            gap: '16px', 
            flexWrap: 'wrap', 
            marginBottom: '20px',
            '--custom-tablet': '600px',
            '--custom-desktop': '1200px'
          } as React.CSSProperties}
        >
          <DynamicBreakpointButton
            background="#ef4444"
            color="white"
            border="none"
            borderRadius="6px"
          >
            Dynamic Breakpoints
          </DynamicBreakpointButton>
        </div>
        <div style={{ background: 'white', padding: '16px', borderRadius: '8px' }}>
          <code>--custom-tablet: 600px; --custom-desktop: 1200px;</code>
        </div>
      </section>

      {/* Comparison Table */}
      <section>
        <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>
          Comparison of Approaches
        </h2>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Approach</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Pros</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Cons</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>Default System</td>
                <td style={{ padding: '12px' }}>
                  • Built-in<br />
                  • Type-safe<br />
                  • Consistent
                </td>
                <td style={{ padding: '12px' }}>
                  • Limited to 3 breakpoints<br />
                  • Fixed values
                </td>
                <td style={{ padding: '12px' }}>Standard responsive design</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>Styled Components</td>
                <td style={{ padding: '12px' }}>
                  • Full control<br />
                  • Any breakpoints<br />
                  • CSS-in-JS benefits
                </td>
                <td style={{ padding: '12px' }}>
                  • More code<br />
                  • Per-component setup
                </td>
                <td style={{ padding: '12px' }}>Custom design systems</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>Custom Tokens</td>
                <td style={{ padding: '12px' }}>
                  • Reusable<br />
                  • Centralized<br />
                  • Maintainable
                </td>
                <td style={{ padding: '12px' }}>
                  • Initial setup<br />
                  • Need wrapper components
                </td>
                <td style={{ padding: '12px' }}>Large applications</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>Direct Values</td>
                <td style={{ padding: '12px' }}>
                  • Simple<br />
                  • No setup<br />
                  • Flexible
                </td>
                <td style={{ padding: '12px' }}>
                  • Repetitive<br />
                  • No reusability
                </td>
                <td style={{ padding: '12px' }}>One-off components</td>
              </tr>
              <tr>
                <td style={{ padding: '12px' }}>CSS Variables</td>
                <td style={{ padding: '12px' }}>
                  • Runtime control<br />
                  • Dynamic<br />
                  • Themeable
                </td>
                <td style={{ padding: '12px' }}>
                  • Browser support<br />
                  • Less type safety
                </td>
                <td style={{ padding: '12px' }}>Dynamic themes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

// Dynamic breakpoint button using CSS variables
const DynamicBreakpointButton = styled(PrimitiveButton)`
  /* Base styles */
  padding: 6px 12px;
  font-size: 14px;
  min-height: 36px;
  
  /* Custom tablet breakpoint from CSS variable */
  @media (min-width: var(--custom-tablet, 768px)) {
    padding: 10px 20px;
    font-size: 16px;
    min-height: 44px;
  }
  
  /* Custom desktop breakpoint from CSS variable */
  @media (min-width: var(--custom-desktop, 1024px)) {
    padding: 14px 28px;
    font-size: 18px;
    min-height: 52px;
  }
`;

export default CustomBreakpointsDemo;
