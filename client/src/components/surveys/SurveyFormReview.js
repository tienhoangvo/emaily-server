import React, {
  useEffect,
  useState,
} from 'react';
import { useSurveyFormState } from '../../contexts/SurveyForm';
import FIELDS from './formFields';
import * as actions from '../../actions';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const SurveyFormReview = (props) => {
  const {
    toggleIsON,
    surveyData,
  } = useSurveyFormState();

  const [
    redirectToSurveys,
    setRedirectToSurveys,
  ] = useState(false);

  const cancelTokenSource = axios.CancelToken.source();

  const onSubmit = async () => {
    try {
      await props.submitSurvey(
        surveyData,
        cancelTokenSource.token,
        setRedirectToSurveys
      );

      setRedirectToSurveys(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      console.log('cancel token');
      cancelTokenSource.cancel();
    };
  }, []);

  if (redirectToSurveys)
    return <Redirect to="/surveys" />;

  return (
    <div>
      <h5>Please confirm your entries</h5>

      {FIELDS.map(({ labelName, inputName }) => {
        const inputValue = surveyData[inputName];

        return (
          <div>
            <label>{labelName}</label>
            <div>
              {Array.isArray(inputValue) &&
              inputValue.length > 1
                ? inputValue.join(', ')
                : inputValue}
            </div>
          </div>
        );
      })}

      <button
        className="btn-flat yellow dark-text left"
        onClick={() => toggleIsON()}
      >
        <i className="material-icons left">
          navigate_before
        </i>
        BACK
      </button>

      <button
        className="btn-flat teal white-text right"
        onClick={onSubmit}
      >
        Send
        <i className="material-icons right">
          send
        </i>
      </button>
    </div>
  );
};

export default connect(
  null,
  actions
)(SurveyFormReview);
