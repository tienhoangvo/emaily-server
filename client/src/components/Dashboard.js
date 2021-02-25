import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';
import { useSurveysState } from '../contexts/Surveys';

const Dashboard = () => {
  const { surveys } = useSurveysState();
  return (
    <div>
      <SurveyList surveys={surveys} />
      <div className="fixed-action-btn">
        <Link
          to="/surveys/new/"
          className="btn-floating btn-large red"
        >
          <i className="large material-icons">
            add
          </i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
