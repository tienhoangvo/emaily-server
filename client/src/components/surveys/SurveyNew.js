import React, { useReducer } from 'react';
import { useSurveyFormState } from '../../contexts/SurveyForm';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

const SurveyNew = () => {
  const { isOn } = useSurveyFormState();
  return (
    <div>
      {isOn ? (
        <SurveyFormReview />
      ) : (
        <SurveyForm />
      )}
    </div>
  );
};

export default SurveyNew;
