import React, { useCallback, useState } from 'react';

import { GAMBLING_LEVELS } from '../hooks/use-tinder-bet-onboarding';

const GAMBLING_LEVEL_OPTIONS = [
  {
    id: GAMBLING_LEVELS.CASUAL,
    label: 'Casual',
    description: 'Low risk bets',
    oddsRange: 'Odds up to 1.5',
    icon: '🌱',
  },
  {
    id: GAMBLING_LEVELS.REGULAR,
    label: 'Regular',
    description: 'Medium risk bets',
    oddsRange: 'Odds up to 2.5',
    icon: '⚡',
  },
  {
    id: GAMBLING_LEVELS.PRO,
    label: 'Pro',
    description: 'High risk bets',
    oddsRange: 'Odds 2.5 and above',
    icon: '🔥',
  },
];

export function OnboardingStep3({ gamblingLevel, onGamblingLevelChange, onComplete, onBack }) {
  const [localLevel, setLocalLevel] = useState(gamblingLevel || GAMBLING_LEVELS.REGULAR);

  const handleLevelChange = useCallback(
    levelId => () => {
      setLocalLevel(levelId);
    },
    []
  );

  const handleComplete = useCallback(() => {
    onGamblingLevelChange(localLevel);
    onComplete();
  }, [localLevel, onGamblingLevelChange, onComplete]);

  return (
    <div className="sb-TinderBet-onboardingStep sb-TinderBet-onboardingStep3">
      <div className="sb-TinderBet-onboardingContent">
        <h2 className="sb-TinderBet-onboardingTitle">Set Your Gambling Level</h2>

        <p className="sb-TinderBet-onboardingDescription">
          Choose your preferred risk level. This determines which bets appear in your feed.
        </p>

        <div className="sb-TinderBet-gamblingLevels">
          {GAMBLING_LEVEL_OPTIONS.map(option => (
            <label
              key={option.id}
              className={`sb-TinderBet-gamblingLevel ${
                localLevel === option.id ? 'sb-TinderBet-gamblingLevel--selected' : ''
              }`}
              htmlFor={`level-${option.id}`}>
              <input
                checked={localLevel === option.id}
                className="sb-TinderBet-gamblingLevelRadio"
                id={`level-${option.id}`}
                name="gamblingLevel"
                type="radio"
                value={option.id}
                onChange={handleLevelChange(option.id)}
              />
              <div className="sb-TinderBet-gamblingLevelContent">
                <div className="sb-TinderBet-gamblingLevelIcon">{option.icon}</div>
                <div className="sb-TinderBet-gamblingLevelInfo">
                  <span className="sb-TinderBet-gamblingLevelLabel">{option.label}</span>
                  <span className="sb-TinderBet-gamblingLevelDescription">{option.description}</span>
                  <span className="sb-TinderBet-gamblingLevelOdds">{option.oddsRange}</span>
                </div>
              </div>
            </label>
          ))}
        </div>

        <div className="sb-TinderBet-onboardingActions">
          <button className="sb-TinderBet-button sb-TinderBet-button--secondary" type="button" onClick={onBack}>
            Back
          </button>

          <button className="sb-TinderBet-button sb-TinderBet-button--primary" type="button" onClick={handleComplete}>
            Start Betting
          </button>
        </div>
      </div>
    </div>
  );
}
