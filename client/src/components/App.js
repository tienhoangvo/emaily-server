import React, { useEffect } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import { SurveyFormProvider } from '../contexts/SurveyForm';
import { SurveysProvider } from '../contexts/Surveys';
const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_KEY
);

const App = (props) => {
  useEffect(() => {
    props.fetchUser();
  }, [props]);

  return (
    <Elements stripe={stripePromise}>
      <div className="container">
        <div className="row">
          <Router>
            <div>
              <Header />
              <Switch>
                <Route path="/surveys/new">
                  <SurveyFormProvider>
                    <SurveyNew />
                  </SurveyFormProvider>
                </Route>
                <Route path="/surveys">
                  <SurveysProvider>
                    <Dashboard />
                  </SurveysProvider>
                </Route>
                <Route path="/">
                  <Landing />
                </Route>
              </Switch>
            </div>
          </Router>
        </div>
      </div>
    </Elements>
  );
};

export default connect(null, actions)(App);
