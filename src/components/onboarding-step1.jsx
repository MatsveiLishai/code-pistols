import React from 'react';

export function OnboardingStep1({ onMakeBet, onCustomizeFeed, freeBetsLeft }) {
  return (
    <div className="sb-TinderBet-onboardingStep sb-TinderBet-onboardingStep1">
      <div className="sb-TinderBet-onboardingContent">
        <div className="sb-TinderBet-onboardingIcon">🎁</div>

        <h2 className="sb-TinderBet-onboardingTitle">Welcome to Tinder Bet!</h2>

        <p className="sb-TinderBet-onboardingDescription">
          Get started with <strong>{freeBetsLeft} FREE BETS</strong> to try our new swipeable betting experience.
        </p>

        <p className="sb-TinderBet-onboardingSubtext">
          Swipe right to accept a bet, swipe left to pass. It&apos;s that simple!
        </p>

        <div className="sb-TinderBet-onboardingActions">
          <button className="sb-TinderBet-button sb-TinderBet-button--primary" type="button" onClick={onMakeBet}>
            Start Betting
          </button>

          <button
            className="sb-TinderBet-button sb-TinderBet-button--secondary"
            type="button"
            onClick={onCustomizeFeed}>
            Customize Feed
          </button>
        </div>
      </div>
    </div>
  );
}
