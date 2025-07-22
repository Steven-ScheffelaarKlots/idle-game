import React, { useState } from 'react';
import Button, { ButtonVariant, ButtonSize } from './button';

const ButtonExample: React.FC = () => {
  const [clickCount, setClickCount] = useState<number>(0);
  const [lastButtonClicked, setLastButtonClicked] = useState<string>('None');

  const handleButtonClick = (buttonName: string) => {
    setClickCount(prev => prev + 1);
    setLastButtonClicked(buttonName);
  };

  // Array of button variants
  const variants: ButtonVariant[] = [
    'primary',
    'secondary',
    'danger',
    'success',
    'warning',
    'info'
  ];

  // Array of button sizes
  const sizes: ButtonSize[] = [
    'small',
    'medium',
    'large'
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Button Component Examples</h1>
      
      <div style={{ marginBottom: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
        <p>Click count: <strong>{clickCount}</strong></p>
        <p>Last button clicked: <strong>{lastButtonClicked}</strong></p>
      </div>

      <section style={{ marginBottom: '30px' }}>
        <h2>Button Variants</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {variants.map(variant => (
            <Button
              key={variant}
              variant={variant}
              onClick={() => handleButtonClick(`${variant} button`)}
            >
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Button>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>Button Sizes</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
          {sizes.map(size => (
            <Button
              key={size}
              size={size}
              onClick={() => handleButtonClick(`${size} button`)}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </Button>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>Full Width Buttons</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {variants.map(variant => (
            <Button
              key={`fullwidth-${variant}`}
              variant={variant}
              fullWidth
              onClick={() => handleButtonClick(`full width ${variant} button`)}
            >
              Full Width {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Button>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>Disabled Buttons</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {variants.map(variant => (
            <Button
              key={`disabled-${variant}`}
              variant={variant}
              disabled
            >
              Disabled {variant}
            </Button>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>Buttons with Icons</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <Button
            variant="primary"
            startIcon={<span style={{ fontWeight: 'bold' }}>➕</span>}
            onClick={() => handleButtonClick('Start icon button')}
          >
            Add Item
          </Button>
          <Button
            variant="danger"
            startIcon={<span style={{ fontWeight: 'bold' }}>❌</span>}
            onClick={() => handleButtonClick('End icon button')}
          >
            Delete Item
          </Button>
          <Button
            variant="secondary"
            endIcon={<span style={{ fontWeight: 'bold' }}>↗️</span>}
            onClick={() => handleButtonClick('End icon button')}
          >
            Export
          </Button>
          <Button
            variant="success"
            startIcon={<span style={{ fontWeight: 'bold' }}>✓</span>}
            endIcon={<span style={{ fontWeight: 'bold' }}>➡️</span>}
            onClick={() => handleButtonClick('Both icons button')}
          >
            Complete & Continue
          </Button>
        </div>
      </section>

      <section>
        <h2>Size & Variant Combinations</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
          {sizes.map(size => (
            variants.map(variant => (
              <Button
                key={`${size}-${variant}`}
                size={size}
                variant={variant}
                onClick={() => handleButtonClick(`${size} ${variant} button`)}
              >
                {`${size} ${variant}`}
              </Button>
            ))
          ))}
        </div>
      </section>
    </div>
  );
};

export default ButtonExample;
