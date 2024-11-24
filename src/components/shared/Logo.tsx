import React from 'react';
import { MapPin } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizes = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12'
  };

  return (
    <div className={`${sizes[size]} ${className} flex items-center`}>
      <MapPin className="text-red-600 w-full h-full" />
    </div>
  );
};