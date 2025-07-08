import React from 'react';
import { ButtonV2, ButtonSizeV2, ButtonTypeV2, ButtonSubTypeV2 } from 'blend-v1';
import { ChevronRight, Download, Heart } from 'lucide-react';

const ResponsiveButtonDemo = () => {
  return (
    <div style={{ padding: '40px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '40px', fontSize: '32px', fontWeight: 'bold' }}>
        Responsive Button Demo
      </h1>
      
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>
          Resize your browser to see responsive behavior
        </h2>
        <p style={{ marginBottom: '20px', color: '#666' }}>
          • Mobile (&lt;768px): Smaller padding, compact height<br />
          • Tablet (768-1023px): Medium sizing<br />
          • Desktop (≥1024px): Standard sizing
        </p>
      </div>

      {/* Size Variations */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600' }}>
          Size Variations
        </h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <ButtonV2
            text="Small Button"
            size={ButtonSizeV2.SMALL}
            buttonType={ButtonTypeV2.PRIMARY}
          />
          <ButtonV2
            text="Medium Button"
            size={ButtonSizeV2.MEDIUM}
            buttonType={ButtonTypeV2.PRIMARY}
          />
          <ButtonV2
            text="Large Button"
            size={ButtonSizeV2.LARGE}
            buttonType={ButtonTypeV2.PRIMARY}
          />
        </div>
      </section>

      {/* Type Variations */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600' }}>
          Type Variations
        </h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <ButtonV2
            text="Primary"
            size={ButtonSizeV2.MEDIUM}
            buttonType={ButtonTypeV2.PRIMARY}
          />
          <ButtonV2
            text="Secondary"
            size={ButtonSizeV2.MEDIUM}
            buttonType={ButtonTypeV2.SECONDARY}
          />
          <ButtonV2
            text="Danger"
            size={ButtonSizeV2.MEDIUM}
            buttonType={ButtonTypeV2.DANGER}
          />
          <ButtonV2
            text="Success"
            size={ButtonSizeV2.MEDIUM}
            buttonType={ButtonTypeV2.SUCCESS}
          />
        </div>
      </section>

      {/* With Icons */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600' }}>
          With Icons
        </h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <ButtonV2
            text="Download"
            leadingIcon={<Download size={16} />}
            size={ButtonSizeV2.MEDIUM}
            buttonType={ButtonTypeV2.PRIMARY}
          />
          <ButtonV2
            text="Continue"
            trailingIcon={<ChevronRight size={16} />}
            size={ButtonSizeV2.MEDIUM}
            buttonType={ButtonTypeV2.SECONDARY}
          />
          <ButtonV2
            leadingIcon={<Heart size={16} />}
            size={ButtonSizeV2.MEDIUM}
            buttonType={ButtonTypeV2.DANGER}
            subType={ButtonSubTypeV2.ICON_ONLY}
          />
        </div>
      </section>

      {/* States */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600' }}>
          States
        </h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <ButtonV2
            text="Normal"
            size={ButtonSizeV2.MEDIUM}
            buttonType={ButtonTypeV2.PRIMARY}
          />
          <ButtonV2
            text="Loading"
            size={ButtonSizeV2.MEDIUM}
            buttonType={ButtonTypeV2.PRIMARY}
            loading
          />
          <ButtonV2
            text="Disabled"
            size={ButtonSizeV2.MEDIUM}
            buttonType={ButtonTypeV2.PRIMARY}
            disabled
          />
        </div>
      </section>

      {/* Full Width on Mobile */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600' }}>
          Full Width Example
        </h3>
        <div style={{ maxWidth: '400px' }}>
          <ButtonV2
            text="Full Width Button"
            size={ButtonSizeV2.MEDIUM}
            buttonType={ButtonTypeV2.PRIMARY}
            fullWidth
          />
        </div>
      </section>

      {/* Inline Buttons */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600' }}>
          Inline Buttons
        </h3>
        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
          This is a paragraph with an{' '}
          <ButtonV2
            text="inline button"
            size={ButtonSizeV2.SMALL}
            buttonType={ButtonTypeV2.PRIMARY}
            subType={ButtonSubTypeV2.INLINE}
          />{' '}
          that adapts to different screen sizes.
        </p>
      </section>

      {/* Responsive Behavior Showcase */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600' }}>
          Responsive Behavior Details
        </h3>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Size</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Mobile</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Tablet</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Desktop</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: '12px' }}>Small</td>
                <td style={{ padding: '12px' }}>
                  <code>padding: 4px 8px</code><br />
                  <code>height: 32px</code><br />
                  <code>font: 12px</code>
                </td>
                <td style={{ padding: '12px' }}>
                  <code>padding: 6px 16px</code><br />
                  <code>height: 36px</code><br />
                  <code>font: 14px</code>
                </td>
                <td style={{ padding: '12px' }}>
                  <code>padding: 8px 20px</code><br />
                  <code>height: 40px</code><br />
                  <code>font: 14px</code>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: '12px' }}>Medium</td>
                <td style={{ padding: '12px' }}>
                  <code>padding: 6px 12px</code><br />
                  <code>height: 36px</code><br />
                  <code>font: 14px</code>
                </td>
                <td style={{ padding: '12px' }}>
                  <code>padding: 10px 20px</code><br />
                  <code>height: 44px</code><br />
                  <code>font: 16px</code>
                </td>
                <td style={{ padding: '12px' }}>
                  <code>padding: 12px 24px</code><br />
                  <code>height: 48px</code><br />
                  <code>font: 18px</code>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px' }}>Large</td>
                <td style={{ padding: '12px' }}>
                  <code>padding: 8px 16px</code><br />
                  <code>height: 40px</code><br />
                  <code>font: 16px</code>
                </td>
                <td style={{ padding: '12px' }}>
                  <code>padding: 12px 24px</code><br />
                  <code>height: 48px</code><br />
                  <code>font: 18px</code>
                </td>
                <td style={{ padding: '12px' }}>
                  <code>padding: 16px 32px</code><br />
                  <code>height: 56px</code><br />
                  <code>font: 20px</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ResponsiveButtonDemo;
