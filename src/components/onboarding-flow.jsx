import React from 'react';

import { ONBOARDING_STEPS } from '../hooks/use-tinder-bet-onboarding';

import { OnboardingStep1 } from './onboarding-step1';
import { OnboardingStep2 } from './onboarding-step2';
import { OnboardingStep3 } from './onboarding-step3';

export function OnboardingFlow({
  currentStep,
  selectedLeagues,
  gamblingLevel,
  freeBetsLeft,
  onSkipCustomization,
  onNextStep,
  onPreviousStep,
  onSetLeagues,
  onSetGamblingLevel,
  onComplete,
}) {
  const renderStep = () => {
    switch (currentStep) {
      case ONBOARDING_STEPS.WELCOME:
        return (
          <OnboardingStep1 freeBetsLeft={freeBetsLeft} onCustomizeFeed={onNextStep} onMakeBet={onSkipCustomization} />
        );

      case ONBOARDING_STEPS.LEAGUES:
        return (
          <OnboardingStep2
            selectedLeagues={selectedLeagues}
            onBack={onPreviousStep}
            onContinue={onNextStep}
            onLeaguesChange={onSetLeagues}
          />
        );

      case ONBOARDING_STEPS.GAMBLING_LEVEL:
        return (
          <OnboardingStep3
            gamblingLevel={gamblingLevel}
            onBack={onPreviousStep}
            onComplete={onComplete}
            onGamblingLevelChange={onSetGamblingLevel}
          />
        );

      default:
        return null;
    }
  };

  if (currentStep === ONBOARDING_STEPS.COMPLETED) {
    return null;
  }

  return <div className="sb-TinderBet-onboardingFlow">{renderStep()}</div>;
}
