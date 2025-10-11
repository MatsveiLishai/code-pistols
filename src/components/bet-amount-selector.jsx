import React, { useCallback } from 'react';

import { PREDEFINED_AMOUNTS } from '../hooks/use-bet-amount';

export function BetAmountSelector({
  amount,
  customAmount,
  freeBetsLeft,
  validationError,
  balance,
  onAmountSelect,
  onCustomAmountChange,
  onCustomAmountApply,
  showFreeBets,
}) {
  const handlePredefinedClick = useCallback(
    value => () => {
      onAmountSelect(value);
    },
    [onAmountSelect]
  );

  const handleCustomChange = useCallback(
    e => {
      onCustomAmountChange(e.target.value);
    },
    [onCustomAmountChange]
  );

  const handleCustomKeyDown = useCallback(
    e => {
      if (e.key === 'Enter') {
        onCustomAmountApply();
      }
    },
    [onCustomAmountApply]
  );

  return (
    <div className="sb-TinderBet-betAmountSelector">
      {showFreeBets && freeBetsLeft > 0 && (
        <div className="sb-TinderBet-freeBetsInfo">
          <span className="sb-TinderBet-freeBetsIcon">🎁</span>
          <span className="sb-TinderBet-freeBetsText">
            {freeBetsLeft} free {freeBetsLeft === 1 ? 'bet' : 'bets'} remaining
          </span>
        </div>
      )}

      <div className="sb-TinderBet-amountSection">
        <div className="sb-TinderBet-amountHeader">
          <span className="sb-TinderBet-amountLabel">Bet Amount</span>

          {balance !== null && balance !== undefined && (
            <span className="sb-TinderBet-balance">Balance: {balance}</span>
          )}
        </div>

        <div className="sb-TinderBet-predefinedAmounts">
          {PREDEFINED_AMOUNTS.map(value => (
            <button
              key={value}
              className={`sb-TinderBet-amountButton ${amount === value ? 'sb-TinderBet-amountButton--selected' : ''}`}
              type="button"
              onClick={handlePredefinedClick(value)}>
              {value}
            </button>
          ))}
        </div>

        <div className="sb-TinderBet-customAmountWrapper">
          <input
            className="sb-TinderBet-customAmountInput"
            id="bet-amount"
            placeholder="Custom amount"
            type="number"
            value={customAmount}
            onChange={handleCustomChange}
            onKeyDown={handleCustomKeyDown}
          />
          <button
            className="sb-TinderBet-button sb-TinderBet-button--small"
            type="button"
            onClick={onCustomAmountApply}>
            Apply
          </button>
        </div>

        {validationError && <div className="sb-TinderBet-validationError">{validationError}</div>}

        {amount !== null && <div className="sb-TinderBet-selectedAmount">Selected: {amount}</div>}
      </div>
    </div>
  );
}
