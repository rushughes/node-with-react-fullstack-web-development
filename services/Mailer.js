const sendGrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map((){ email }) => {
      return new helper.Email(email);
    });
  }

  addClicktracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clicktracking = new helper.Clicktracking(true, true);

    trackingSettings.setClicktracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
}
