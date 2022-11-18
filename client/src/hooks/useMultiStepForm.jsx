import { useState } from 'react';

export function useMultiStepForm(steps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  function next() {
    setCurrentStepIndex((index) => {
      if (index >= steps.length - 1) {
        return index;
      }
      return index + 1;
    });
  }
  function back() {
    setCurrentStepIndex((index) => {
      if (index <= 0) {
        return index;
      }
      return index - 1;
    });
  }
  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    back,
    next,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1
  };
}
