import axios from 'axios';

import { FETCH_USER } from './types';

console.log({ FETCH_USER });

export const fetchUser = () => async (
  dispatch
) => {
  const { data } = await axios.get(
    '/api/users/current-user'
  );

  dispatch({
    type: FETCH_USER,
    payload: data,
  });
};

export const submitSurvey = (
  surveyData,
  cancelToken,
  setRedirectToSurveys
) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      '/api/surveys',
      {
        ...surveyData,
        cancelToken,
      }
    );

    dispatch({
      type: FETCH_USER,
      payload: data,
    });

    setRedirectToSurveys(true);
  } catch (error) {
    console.dir(error);
    throw error;
  }
};
