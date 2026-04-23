import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center font-inter font-semibold transition-all duration-300 cursor-pointer rounded-pill focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary';

  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary-dark focus:ring-primary shadow-md hover:shadow-card-hover hover:-translate-y-0.5',
    secondary:
      'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
    accent:
      'bg-accent text-white hover:bg-primary-dark focus:ring-accent shadow-md hover:shadow-card-hover hover:-translate-y-0.5',
    ghost:
      'bg-white text-primary border border-gray-200 hover:border-primary hover:bg-bg-light',
    white:
      'bg-white text-primary hover:bg-bg-light shadow-md hover:shadow-card-hover',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
