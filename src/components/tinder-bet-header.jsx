import { useCallback } from 'react';

import { DisplayToggleButton } from './slide/DisplayToggleButton';

import './tinder-bet-header.scss';

export const TinderBetHeader = ({ onSettingsClick, isContainMode, onContainModeChange }) => {
  const handleCloseClick = useCallback(() => {
    // Close handler - can be customized
    window.history.back();
  }, []);

  return (
    <div className="sb-TinderBet-header">
      <div className="sb-TinderBet-header-left">
        <button aria-label="Settings" className="sb-TinderBet-header-button" type="button" onClick={onSettingsClick}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 1v6m0 6v6m-5-7H1m6 0h6m6 0h6M7 7l-3-3m3 3l3-3m7 3l3-3m-3 3l-3-3M7 17l-3 3m3-3l3 3m7-3l3 3m-3-3l-3 3"></path>
          </svg>
        </button>
        <DisplayToggleButton isContainMode={isContainMode} onToggle={onContainModeChange} />
      </div>
      <div className="sb-TinderBet-header__live-badge">
        <span className="sb-TinderBet-header__live-dot" />
        <span className="sb-TinderBet-header__live-text">LIVE</span>
      </div>
      <button aria-label="Close" className="sb-TinderBet-header-button" type="button" onClick={handleCloseClick}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
};
