import React from 'react';

const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <div
      className={`bg-white rounded-card shadow-card ${
        hover ? 'hover:shadow-card-hover hover:-translate-y-1' : ''
      } transition-all duration-300 p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const ServiceCard = ({ icon, title, services, className = '' }) => (
  <Card className={`flex flex-col gap-4 ${className}`} hover>
    <div className="w-12 h-12 rounded-xl bg-bg-light flex items-center justify-center text-primary text-2xl">
      {icon}
    </div>
    <h3 className="font-manrope text-xl font-700 text-text-primary">{title}</h3>
    <ul className="space-y-2">
      {services.map((service, i) => (
        <li key={i} className="flex items-center gap-2 text-text-muted text-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
          {service}
        </li>
      ))}
    </ul>
    <a
      href="/book-appointment"
      className="mt-auto text-primary font-semibold text-sm hover:text-primary-dark transition-colors duration-200 inline-flex items-center gap-1"
    >
      Book Now <span>→</span>
    </a>
  </Card>
);

export const TestimonialCard = ({ name, review, rating = 5, role = '' }) => (
  <Card className="flex flex-col gap-4" hover>
    <div className="flex gap-1">
      {Array.from({ length: rating }).map((_, i) => (
        <span key={i} className="text-star text-lg">★</span>
      ))}
    </div>
    <p className="text-text-muted italic leading-relaxed">"{review}"</p>
    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
        {name.charAt(0)}
      </div>
      <div>
        <p className="font-manrope font-600 text-text-primary text-sm">{name}</p>
        {role && <p className="text-text-muted text-xs">{role}</p>}
      </div>
    </div>
  </Card>
);

export default Card;
