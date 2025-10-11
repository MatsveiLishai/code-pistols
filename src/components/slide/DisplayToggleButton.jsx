import React from 'react';

const DisplayToggleButton = ({ isContainMode, onToggle }) => {
  return (
    <button
      className="sb-Slide__display-toggle"
      title={isContainMode ? 'Switch to Fullscreen' : 'Switch to Letterbox'}
      type="button"
      onClick={onToggle}>
      <svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
        {isContainMode ? (
          // Иконка для переключения в fullscreen режим (развернуть)
          <path
            d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        ) : (
          // Иконка для переключения в letterbox режим (свернуть)
          <path
            d="M4 14h6v6M20 10h-6V4M10 14l-7 7M20 4l-7 7"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        )}
      </svg>
    </button>
  );
};

export { DisplayToggleButton };
