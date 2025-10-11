import { useCallback, useEffect, useReducer } from 'react';

const STORAGE_KEY = 'tinderBetAmount';
const FREE_BETS_STORAGE_KEY = 'tinderBetFreeBets';
const INITIAL_FREE_BETS = 5;

const ACTIONS = {
  SET_AMOUNT: 'SET_AMOUNT',
  SET_CUSTOM_AMOUNT: 'SET_CUSTOM_AMOUNT',
  USE_FREE_BET: 'USE_FREE_BET',
  RESET_FREE_BETS: 'RESET_FREE_BETS',
  SET_VALIDATION_ERROR: 'SET_VALIDATION_ERROR',
  LOAD_FROM_STORAGE: 'LOAD_FROM_STORAGE',
};

export const PREDEFINED_AMOUNTS = [5, 10, 20, 50, 100];
export const DEFAULT_BET_AMOUNT = 10;

function createInitialState() {
  return {
    amount: DEFAULT_BET_AMOUNT,
    customAmount: '',
    freeBetsLeft: INITIAL_FREE_BETS,
    validationError: null,
  };
}

function betAmountReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_AMOUNT:
      return { ...state, amount: action.payload, validationError: null };

    case ACTIONS.SET_CUSTOM_AMOUNT:
      return { ...state, customAmount: action.payload };

    case ACTIONS.USE_FREE_BET:
      return {
        ...state,
        freeBetsLeft: Math.max(0, state.freeBetsLeft - 1),
      };

    case ACTIONS.RESET_FREE_BETS:
      return { ...state, freeBetsLeft: INITIAL_FREE_BETS };

    case ACTIONS.SET_VALIDATION_ERROR:
      return { ...state, validationError: action.payload };

    case ACTIONS.LOAD_FROM_STORAGE:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

function loadFromStorage() {
  try {
    const storedAmount = localStorage.getItem(STORAGE_KEY);
    const storedFreeBets = localStorage.getItem(FREE_BETS_STORAGE_KEY);

    return {
      amount: storedAmount ? parseFloat(storedAmount) : DEFAULT_BET_AMOUNT,
      freeBetsLeft: storedFreeBets ? parseInt(storedFreeBets, 10) : INITIAL_FREE_BETS,
    };
  } catch (error) {
    // Failed to load bet amount state from storage
    return {
      amount: DEFAULT_BET_AMOUNT,
      freeBetsLeft: INITIAL_FREE_BETS,
    };
  }
}

function saveToStorage(amount, freeBetsLeft) {
  try {
    if (amount !== null) {
      localStorage.setItem(STORAGE_KEY, amount.toString());
    }
    localStorage.setItem(FREE_BETS_STORAGE_KEY, freeBetsLeft.toString());
  } catch (error) {
    // Failed to save bet amount state to storage
  }
}

export function useBetAmount({ minBetSize = 1, initialBalance = 1000 } = {}) {
  // Mock balance - в реальном приложении это будет приходить из API или контекста
  const balance = initialBalance;

  const [state, dispatch] = useReducer(betAmountReducer, null, () => {
    const stored = loadFromStorage();
    return { ...createInitialState(), ...stored };
  });

  // Save to localStorage whenever amount or freeBetsLeft changes
  useEffect(() => {
    saveToStorage(state.amount, state.freeBetsLeft);
  }, [state.amount, state.freeBetsLeft]);

  const validateAmount = useCallback(
    amount => {
      const numAmount = parseFloat(amount);

      if (Number.isNaN(numAmount) || numAmount <= 0) {
        return 'Please enter a valid amount';
      }

      if (numAmount < minBetSize) {
        return `Minimum bet amount is ${minBetSize}`;
      }

      if (balance && numAmount > balance) {
        return 'Insufficient balance';
      }

      return null;
    },
    [balance, minBetSize]
  );

  const setAmount = useCallback(
    amount => {
      const error = validateAmount(amount);
      if (error) {
        dispatch({ type: ACTIONS.SET_VALIDATION_ERROR, payload: error });
        return false;
      }

      dispatch({ type: ACTIONS.SET_AMOUNT, payload: amount });
      return true;
    },
    [validateAmount]
  );

  const setCustomAmount = useCallback(value => {
    dispatch({ type: ACTIONS.SET_CUSTOM_AMOUNT, payload: value });
  }, []);

  const applyCustomAmount = useCallback(() => {
    const amount = parseFloat(state.customAmount);
    return setAmount(amount);
  }, [state.customAmount, setAmount]);

  const useFreeBet = useCallback(() => {
    if (state.freeBetsLeft > 0) {
      dispatch({ type: ACTIONS.USE_FREE_BET });
      return true;
    }
    return false;
  }, [state.freeBetsLeft]);

  const resetFreeBets = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_FREE_BETS });
  }, []);

  const clearValidationError = useCallback(() => {
    dispatch({ type: ACTIONS.SET_VALIDATION_ERROR, payload: null });
  }, []);

  const hasFreeBets = state.freeBetsLeft > 0;
  const canPlaceBet = hasFreeBets || state.amount !== null;
  const needsAmountSetup = !hasFreeBets && state.amount === null;

  return {
    amount: state.amount,
    customAmount: state.customAmount,
    freeBetsLeft: state.freeBetsLeft,
    validationError: state.validationError,
    hasFreeBets,
    canPlaceBet,
    needsAmountSetup,
    balance,
    minBetSize,
    setAmount,
    setCustomAmount,
    applyCustomAmount,
    useFreeBet,
    resetFreeBets,
    clearValidationError,
    validateAmount,
  };
}
