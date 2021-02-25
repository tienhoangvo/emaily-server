const helper = require('@sendgrid/mail');
const keys = require('../config/keys');

helper.setApiKey(keys.SENDGRID_KEY);

const Mailer = async (survey, template) => {
  const { subject, recipients } = survey;
  const msg = {
    from: keys.SENDGRID_SENDER, // Change to your verified sender
    subject: subject,
    html: template,
    personalizations: recipients.map(
      ({ email }) => ({ to: [{ email }] })
    ),
    trackingSettings: {
      clickTracking: {
        enable: true,
      },
      openTracking: {
        enable: true,
      },
      subscriptionTracking: {
        enable: true,
      },
    },
  };

  try {
    await helper.send(msg);
    console.log('--EMAIL SENT!');
  } catch (error) {
    console.log('--EMAIL SENDING ERROR', error);
  }
};
module.exports = Mailer;
