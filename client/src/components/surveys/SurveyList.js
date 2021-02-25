import React from 'react';
import { useSurveysState } from '../../contexts/Surveys';

const SurveyList = () => {
  const { surveys } = useSurveysState();
  console.log(surveys);
  return (
    <div>
      {surveys &&
        surveys.map(
          ({
            _id,
            title,
            subject,
            body,
            yes,
            no,
            dateSent,
          }) => {
            return (
              <div
                class="card blue-grey darken-1"
                key={_id}
              >
                <div class="card-content white-text">
                  <span class="card-title">
                    {title}
                  </span>
                  <p>{body}</p>
                  <p className="right ita">
                    Sent on:{' '}
                    {(dateSent
                      ? new Date(dateSent)
                      : new Date()
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div class="card-action">
                  <a>YES: {yes}</a>
                  <a>NO: {no}</a>
                </div>
              </div>
            );
          }
        )}
    </div>
  );
};

export default SurveyList;
