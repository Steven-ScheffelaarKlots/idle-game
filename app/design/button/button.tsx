import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './button.module.css';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  size = 'large',
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  startIcon,
  endIcon,
  className,
  ...props
}) => {
  // Combine classnames for the button
  const buttonClasses = [
    styles.button,
    styles[`size-${size}`],
    styles[`variant-${variant}`],
    fullWidth ? styles.fullWidth : '',
    disabled ? styles.disabled : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={buttonClasses} 
      disabled={disabled}
      {...props}
    >
      {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
      {children}
      {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
    </button>
  );
};

export default Button;
