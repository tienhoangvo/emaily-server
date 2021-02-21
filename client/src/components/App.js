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
const SurveyNew = () => <h2>ServeyNew</h2>;
const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_KEY
);

const App = (props) => {
  useEffect(() => {
    props.fetchUser();
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <div className="container">
        <div className="row">
          <Router>
            <div>
              <Header />
              <Switch>
                <Route path="/surveys">
                  <Dashboard />
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
