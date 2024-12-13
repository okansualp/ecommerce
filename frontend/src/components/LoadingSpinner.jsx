import React from 'react';

const LoadingSpinner = ({ size = 'medium', fullScreen = false }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-5 h-5';
      case 'large':
        return 'w-12 h-12';
      default:
        return 'w-8 h-8';
    }
  };

  const spinner = (
    <div className={`${getSizeClasses()} animate-spin`}>
      <div className="h-full w-full rounded-full border-4 border-gray-200 border-t-indigo-600"></div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
