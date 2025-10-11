import React from 'react';

import { BetAmountSelector } from './bet-amount-selector';

export function BetAmountPrompt({
  amount,
  customAmount,
  validationError,
  balance,
  onAmountSelect,
  onCustomAmountChange,
  onCustomAmountApply,
  onContinue,
}) {
  const canContinue = amount !== null;

  return (
    <div className="sb-TinderBet-betAmountPrompt">
      <div className="sb-TinderBet-promptContent">
        <div className="sb-TinderBet-promptIcon">💰</div>

        <h2 className="sb-TinderBet-promptTitle">Set Your Bet Amount</h2>

        <p className="sb-TinderBet-promptDescription">
          You&apos;ve used all your free bets. Please set a bet amount to continue betting.
        </p>

        <BetAmountSelector
          amount={amount}
          balance={balance}
          customAmount={customAmount}
          freeBetsLeft={0}
          showFreeBets={false}
          validationError={validationError}
          onAmountSelect={onAmountSelect}
          onCustomAmountApply={onCustomAmountApply}
          onCustomAmountChange={onCustomAmountChange}
        />

        <div className="sb-TinderBet-promptActions">
          <button
            className="sb-TinderBet-button sb-TinderBet-button--primary"
            disabled={!canContinue}
            type="button"
            onClick={onContinue}>
            Continue to Feed
          </button>
        </div>
      </div>
    </div>
  );
}
