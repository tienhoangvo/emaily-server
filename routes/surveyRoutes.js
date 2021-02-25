const requireCredits = require('../middlewares/requireCredits');
const requireLoggedIn = require('../middlewares/requireLogin');
const Survey = require('../models/surveyModel');
const sendMail = require('./../services/Mailer');
const surveyTemplate = require('./../services/emailTemplates/surveyTemplate');
const surveyRouter = require('express').Router();
const { URL } = require('url');
const { Path } = require('path-parser');

surveyRouter.get(
  '/:surveyId/:choice',
  (req, res) => {
    res.send('Thank for voting');
  }
);

surveyRouter
  .route('/webhooks')
  .post((req, res, next) => {
    console.log(req.body);
    const path = new Path(
      '/api/surveys/:surveyId/:choice'
    );
    const events = req.body.reduce(
      (acc, { email, url }) => {
        const { pathname } = new URL(url);

        const match = path.test(pathname);

        if (match) {
          const { surveyId, choice } = match;

          const existing = acc.some(
            (el) =>
              el.email === email &&
              el.surveyId === surveyId
          );

          return existing
            ? acc
            : [
                ...acc,
                { email, surveyId, choice },
              ];
        }
      },
      []
    );

    for (const {
      email,
      surveyId,
      choice,
    } of events) {
      Survey.findOneAndUpdate(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: {
              email,
              responded: false,
            },
          },
        },
        {
          $set: {
            'recipients.$.responded': true,
          },
          $inc: {
            [choice]: 1,
          },
          lastResponded: Date.now(),
        }
      ).exec();
    }

    console.log({ events });
    res.send({});
  });

surveyRouter
  .route('/')
  .get(requireLoggedIn, async (req, res) => {
    const surveys = await Survey.find({
      _user: req.user._id,
    })
      .select({ recipients: 0 })
      .sort({ _id: -1 });

    res.status(200).json(surveys);
  })
  .post(
    requireLoggedIn,
    requireCredits,
    async (req, res) => {
      console.log('AAAAAA', req.body);
      const {
        title,
        subject,
        body,
        recipients,
      } = req.body;

      const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.map((email) => ({
          email: email.trim(),
        })),
        _user: req.user._id,
        dateSent: Date.now(),
      });

      // Greate place to send an email

      try {
        await sendMail(
          survey,
          surveyTemplate(survey)
        );

        await survey.save();
        req.user.credits -= 1;

        const user = await req.user.save();

        res.send(user);
      } catch (error) {
        res.status(422).send(err);
      }
    }
  );

module.exports = surveyRouter;
