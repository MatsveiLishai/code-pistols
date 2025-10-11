import { useCallback, useEffect, useReducer } from 'react';

const STORAGE_KEY = 'tinderBetOnboarding';

const ACTIONS = {
  SET_STEP: 'SET_STEP',
  SET_LEAGUES: 'SET_LEAGUES',
  SET_GAMBLING_LEVEL: 'SET_GAMBLING_LEVEL',
  COMPLETE_ONBOARDING: 'COMPLETE_ONBOARDING',
  SKIP_CUSTOMIZATION: 'SKIP_CUSTOMIZATION',
  RESET_ONBOARDING: 'RESET_ONBOARDING',
  LOAD_FROM_STORAGE: 'LOAD_FROM_STORAGE',
};

export const ONBOARDING_STEPS = {
  WELCOME: 'welcome',
  LEAGUES: 'leagues',
  GAMBLING_LEVEL: 'gamblingLevel',
  COMPLETED: 'completed',
};

export const GAMBLING_LEVELS = {
  CASUAL: 'casual',
  REGULAR: 'regular',
  PRO: 'pro',
};

const GAMBLING_LEVEL_CONFIG = {
  [GAMBLING_LEVELS.CASUAL]: {
    label: 'Casual',
    description: 'Low risk bets',
    maxOdds: 1.5,
  },
  [GAMBLING_LEVELS.REGULAR]: {
    label: 'Regular',
    description: 'Medium risk bets',
    maxOdds: 2.5,
  },
  [GAMBLING_LEVELS.PRO]: {
    label: 'Pro',
    description: 'High risk bets',
    minOdds: 2.5,
  },
};

function createInitialState() {
  return {
    currentStep: ONBOARDING_STEPS.WELCOME,
    selectedLeagues: [],
    gamblingLevel: GAMBLING_LEVELS.REGULAR,
    isCompleted: false,
  };
}

function onboardingReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_STEP:
      return { ...state, currentStep: action.payload };

    case ACTIONS.SET_LEAGUES:
      return { ...state, selectedLeagues: action.payload };

    case ACTIONS.SET_GAMBLING_LEVEL:
      return { ...state, gamblingLevel: action.payload };

    case ACTIONS.COMPLETE_ONBOARDING:
      return { ...state, isCompleted: true, currentStep: ONBOARDING_STEPS.COMPLETED };

    case ACTIONS.SKIP_CUSTOMIZATION:
      return {
        ...state,
        selectedLeagues: [], // Will use default popular leagues
        gamblingLevel: GAMBLING_LEVELS.REGULAR,
        isCompleted: true,
        currentStep: ONBOARDING_STEPS.COMPLETED,
      };

    case ACTIONS.RESET_ONBOARDING:
      return createInitialState();

    case ACTIONS.LOAD_FROM_STORAGE:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    // Failed to load onboarding state from storage
    return null;
  }
}

function saveToStorage(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    // Failed to save onboarding state to storage
  }
}

export function useTinderBetOnboarding() {
  const [state, dispatch] = useReducer(onboardingReducer, null, () => {
    const stored = loadFromStorage();
    return stored || createInitialState();
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToStorage(state);
  }, [state]);

  const goToStep = useCallback(step => {
    dispatch({ type: ACTIONS.SET_STEP, payload: step });
  }, []);

  const nextStep = useCallback(() => {
    const stepOrder = [
      ONBOARDING_STEPS.WELCOME,
      ONBOARDING_STEPS.LEAGUES,
      ONBOARDING_STEPS.GAMBLING_LEVEL,
      ONBOARDING_STEPS.COMPLETED,
    ];
    const currentIndex = stepOrder.indexOf(state.currentStep);
    if (currentIndex < stepOrder.length - 1) {
      dispatch({ type: ACTIONS.SET_STEP, payload: stepOrder[currentIndex + 1] });
    }
  }, [state.currentStep]);

  const previousStep = useCallback(() => {
    const stepOrder = [
      ONBOARDING_STEPS.WELCOME,
      ONBOARDING_STEPS.LEAGUES,
      ONBOARDING_STEPS.GAMBLING_LEVEL,
      ONBOARDING_STEPS.COMPLETED,
    ];
    const currentIndex = stepOrder.indexOf(state.currentStep);
    if (currentIndex > 0) {
      dispatch({ type: ACTIONS.SET_STEP, payload: stepOrder[currentIndex - 1] });
    }
  }, [state.currentStep]);

  const setSelectedLeagues = useCallback(leagues => {
    dispatch({ type: ACTIONS.SET_LEAGUES, payload: leagues });
  }, []);

  const setGamblingLevel = useCallback(level => {
    dispatch({ type: ACTIONS.SET_GAMBLING_LEVEL, payload: level });
  }, []);

  const completeOnboarding = useCallback(() => {
    dispatch({ type: ACTIONS.COMPLETE_ONBOARDING });
  }, []);

  const skipCustomization = useCallback(() => {
    dispatch({ type: ACTIONS.SKIP_CUSTOMIZATION });
  }, []);

  const resetOnboarding = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_ONBOARDING });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const getOddsFilter = useCallback(() => {
    const config = GAMBLING_LEVEL_CONFIG[state.gamblingLevel];
    return {
      minOdds: config.minOdds || null,
      maxOdds: config.maxOdds || null,
    };
  }, [state.gamblingLevel]);

  return {
    ...state,
    goToStep,
    nextStep,
    previousStep,
    setSelectedLeagues,
    setGamblingLevel,
    completeOnboarding,
    skipCustomization,
    resetOnboarding,
    getOddsFilter,
    gamblingLevelConfig: GAMBLING_LEVEL_CONFIG[state.gamblingLevel],
  };
}
