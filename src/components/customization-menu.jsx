import React, { useCallback, useState } from 'react';

import { BetAmountSelector } from './bet-amount-selector';
import { OnboardingStep2 } from './onboarding-step2';
import { OnboardingStep3 } from './onboarding-step3';

const noop = () => {};

export function CustomizationMenu({
  isOpen,
  selectedLeagues,
  gamblingLevel,
  betAmount,
  customAmount,
  freeBetsLeft,
  validationError,
  balance,
  onClose,
  onSave,
  onSetLeagues,
  onSetGamblingLevel,
  onSetAmount,
  onSetCustomAmount,
  onApplyCustomAmount,
}) {
  const [activeTab, setActiveTab] = useState('leagues');
  const [localLeagues, setLocalLeagues] = useState(selectedLeagues);
  const [localLevel, setLocalLevel] = useState(gamblingLevel);

  const handleSave = useCallback(() => {
    onSetLeagues(localLeagues);
    onSetGamblingLevel(localLevel);
    onSave();
    onClose();
  }, [localLeagues, localLevel, onSetLeagues, onSetGamblingLevel, onSave, onClose]);

  const handleTabClick = useCallback(
    tab => () => {
      setActiveTab(tab);
    },
    []
  );

  const handleOverlayClick = useCallback(
    e => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div className="sb-TinderBet-customizationMenu">
      <div
        aria-label="Close customization menu"
        className="sb-TinderBet-customizationOverlay"
        role="button"
        tabIndex={-1}
        onClick={handleOverlayClick}
        onKeyDown={handleOverlayClick}
      />
      <div className="sb-TinderBet-customizationContent">
        <div className="sb-TinderBet-customizationHeader">
          <h2 className="sb-TinderBet-customizationTitle">Customize Your Feed</h2>
          <button className="sb-TinderBet-customizationClose" type="button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="sb-TinderBet-customizationTabs">
          <button
            className={`sb-TinderBet-customizationTab ${
              activeTab === 'leagues' ? 'sb-TinderBet-customizationTab--active' : ''
            }`}
            type="button"
            onClick={handleTabClick('leagues')}>
            Leagues
          </button>
          <button
            className={`sb-TinderBet-customizationTab ${
              activeTab === 'level' ? 'sb-TinderBet-customizationTab--active' : ''
            }`}
            type="button"
            onClick={handleTabClick('level')}>
            Gambling Level
          </button>
          <button
            className={`sb-TinderBet-customizationTab ${
              activeTab === 'amount' ? 'sb-TinderBet-customizationTab--active' : ''
            }`}
            type="button"
            onClick={handleTabClick('amount')}>
            Bet Amount
          </button>
        </div>

        <div className="sb-TinderBet-customizationBody">
          {activeTab === 'leagues' && (
            <OnboardingStep2
              selectedLeagues={localLeagues}
              onBack={noop}
              onContinue={handleSave}
              onLeaguesChange={setLocalLeagues}
            />
          )}

          {activeTab === 'level' && (
            <OnboardingStep3
              gamblingLevel={localLevel}
              onBack={noop}
              onComplete={handleSave}
              onGamblingLevelChange={setLocalLevel}
            />
          )}

          {activeTab === 'amount' && (
            <BetAmountSelector
              amount={betAmount}
              balance={balance}
              customAmount={customAmount}
              freeBetsLeft={freeBetsLeft}
              validationError={validationError}
              showFreeBets
              onAmountSelect={onSetAmount}
              onCustomAmountApply={onApplyCustomAmount}
              onCustomAmountChange={onSetCustomAmount}
            />
          )}
        </div>

        <div className="sb-TinderBet-customizationActions">
          <button className="sb-TinderBet-button sb-TinderBet-button--secondary" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="sb-TinderBet-button sb-TinderBet-button--primary" type="button" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
