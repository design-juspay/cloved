import React, { useState, useEffect } from 'react';
import { ButtonV2, ButtonSizeV2, ButtonTypeV2 } from 'blend-v1';

const ButtonSizeComparison = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getBreakpoint = () => {
    if (windowWidth < 768) return 'Mobile';
    if (windowWidth < 1024) return 'Tablet';
    return 'Desktop';
  };

  const getExpectedValues = (size: 'small' | 'medium' | 'large') => {
    const breakpoint = getBreakpoint();
    const values = {
      small: {
        Mobile: { padding: '4px 8px', height: '32px', font: '12px' },
        Tablet: { padding: '6px 16px', height: '36px', font: '14px' },
        Desktop: { padding: '8px 20px', height: '40px', font: '14px' }
      },
      medium: {
        Mobile: { padding: '6px 12px', height: '36px', font: '14px' },
        Tablet: { padding: '10px 20px', height: '44px', font: '16px' },
        Desktop: { padding: '12px 24px', height: '48px', font: '18px' }
      },
      large: {
        Mobile: { padding: '8px 16px', height: '40px', font: '16px' },
        Tablet: { padding: '12px 24px', height: '48px', font: '18px' },
        Desktop: { padding: '16px 32px', height: '56px', font: '20px' }
      }
    };
    return values[size][breakpoint];
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2>Button Size Comparison</h2>
      <p>Current viewport: <strong>{windowWidth}px ({getBreakpoint()})</strong></p>
      
      <div style={{ 
        display: 'flex', 
        gap: '40px', 
        alignItems: 'flex-start',
        marginTop: '40px',
        flexWrap: 'wrap'
      }}>
        {/* Small Button */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <h3>Small</h3>
          <ButtonV2
            text="Small Button"
            size={ButtonSizeV2.SMALL}
            buttonType={ButtonTypeV2.PRIMARY}
          />
          <div style={{ 
            marginTop: '10px', 
            padding: '10px', 
            background: '#f0f0f0', 
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            <strong>Expected:</strong><br />
            Padding: {getExpectedValues('small').padding}<br />
            Height: {getExpectedValues('small').height}<br />
            Font: {getExpectedValues('small').font}
          </div>
        </div>

        {/* Medium Button */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <h3>Medium</h3>
          <ButtonV2
            text="Medium Button"
            size={ButtonSizeV2.MEDIUM}
            buttonType={ButtonTypeV2.PRIMARY}
          />
          <div style={{ 
            marginTop: '10px', 
            padding: '10px', 
            background: '#f0f0f0', 
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            <strong>Expected:</strong><br />
            Padding: {getExpectedValues('medium').padding}<br />
            Height: {getExpectedValues('medium').height}<br />
            Font: {getExpectedValues('medium').font}
          </div>
        </div>

        {/* Large Button */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <h3>Large</h3>
          <ButtonV2
            text="Large Button"
            size={ButtonSizeV2.LARGE}
            buttonType={ButtonTypeV2.PRIMARY}
          />
          <div style={{ 
            marginTop: '10px', 
            padding: '10px', 
            background: '#f0f0f0', 
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            <strong>Expected:</strong><br />
            Padding: {getExpectedValues('large').padding}<br />
            Height: {getExpectedValues('large').height}<br />
            Font: {getExpectedValues('large').font}
          </div>
        </div>
      </div>

      {/* Side by side comparison */}
      <div style={{ marginTop: '60px' }}>
        <h3>Side-by-Side Height Comparison</h3>
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          alignItems: 'center',
          background: '#f5f5f5',
          padding: '20px',
          borderRadius: '8px'
        }}>
          <ButtonV2
            text="Small"
            size={ButtonSizeV2.SMALL}
            buttonType={ButtonTypeV2.PRIMARY}
          />
          <ButtonV2
            text="Medium"
            size={ButtonSizeV2.MEDIUM}
            buttonType={ButtonTypeV2.PRIMARY}
          />
          <ButtonV2
            text="Large"
            size={ButtonSizeV2.LARGE}
            buttonType={ButtonTypeV2.PRIMARY}
          />
          <div style={{ 
            marginLeft: '20px', 
            padding: '10px', 
            background: 'white',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            <strong>Height differences at {getBreakpoint()}:</strong><br />
            Small → Medium: +{parseInt(getExpectedValues('medium').height) - parseInt(getExpectedValues('small').height)}px<br />
            Medium → Large: +{parseInt(getExpectedValues('large').height) - parseInt(getExpectedValues('medium').height)}px
          </div>
        </div>
      </div>

      {/* Visual height ruler */}
      <div style={{ marginTop: '40px' }}>
        <h3>Visual Height Reference</h3>
        <div style={{ position: 'relative', display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ 
              position: 'absolute', 
              left: '-30px', 
              bottom: 0, 
              height: getExpectedValues('small').height,
              width: '20px',
              background: '#007bff',
              opacity: 0.3
            }} />
            <ButtonV2
              text="S"
              size={ButtonSizeV2.SMALL}
              buttonType={ButtonTypeV2.PRIMARY}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ 
              position: 'absolute', 
              left: '-30px', 
              bottom: 0, 
              height: getExpectedValues('medium').height,
              width: '20px',
              background: '#28a745',
              opacity: 0.3
            }} />
            <ButtonV2
              text="M"
              size={ButtonSizeV2.MEDIUM}
              buttonType={ButtonTypeV2.PRIMARY}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ 
              position: 'absolute', 
              left: '-30px', 
              bottom: 0, 
              height: getExpectedValues('large').height,
              width: '20px',
              background: '#dc3545',
              opacity: 0.3
            }} />
            <ButtonV2
              text="L"
              size={ButtonSizeV2.LARGE}
              buttonType={ButtonTypeV2.PRIMARY}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonSizeComparison;
