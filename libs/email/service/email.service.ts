/**
 * Email Service
 *
 * This service is responsible for sending emails to users.
 * Left for your reference.
 */

import { Service } from 'typedi';

import EmailConfig from '../config/email.config';

@Service()
export class EmailService extends EmailConfig {
  constructor() {
    super();
  }

  async sendEmail(email: string, passedFromHbs: string) {
    try {
      this.transporter.sendMail({
        from: 'FROM_TITLE',
        to: email,
        subject: 'SUBJECT',
        template: 'HBS_TEMPLATE_NAME',
        context: {
          passedFromHbs,
        },
      });
    } catch (error) {
      console.error('Error sending email to ', email, ': ', error);
    }
  }
}

export default EmailService;
