import axios from 'axios';
import {
  createContext,
  useContext,
  useReducer,
  useState,
} from 'react';

const SurveyFormContext = createContext();

export const useSurveyFormState = () => {
  const context = useContext(SurveyFormContext);

  if (context === undefined) {
    throw new Error(
      'useSurveyFormState must be used within a SurveyFormProvider'
    );
  }

  return context;
};

export const SurveyFormProvider = ({
  children,
}) => {
  const [surveyData, setSurveyData] = useState(
    {}
  );

  const [isOn, toggleIsON] = useReducer(
    (state) => !state,
    false
  );

  return (
    <SurveyFormContext.Provider
      value={{
        isOn,
        toggleIsON,
        surveyData,
        setSurveyData,
      }}
    >
      {children}
    </SurveyFormContext.Provider>
  );
};
