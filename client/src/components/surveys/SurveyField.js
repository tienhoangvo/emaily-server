import React from 'react';
import { useSurveyFormState } from '../../contexts/SurveyForm';

const SurveyField = ({
  inputName,
  labelName,
  register,
  error,
}) => {
  const inputId = labelName
    .trim()
    .toLowerCase()
    .split(' ')
    .join('-');

  const { surveyData } = useSurveyFormState();

  console.log(surveyData);
  return (
    <div style={{ marginBottom: '10px' }}>
      <label for={inputId}>{labelName}</label>
      <input
        id={inputId}
        name={inputName}
        type="text"
        ref={register}
        defaultValue={surveyData[inputName]}
      />
      {error && (
        <span
          className="red-text"
          data-error="right"
          data-success="wrong"
          role="alert"
        >
          {Array.isArray(error)
            ? error.reduce(
                (prev, curr) =>
                  curr
                    ? !prev
                      ? curr.message
                      : `${prev}, ${curr.message}`
                    : prev,
                ''
              )
            : error.message}
        </span>
      )}
    </div>
  );
};

export default SurveyField;
