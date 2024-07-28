import { createTransport } from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

import {
  MAIL_HOST,
  MAIL_USER,
  MAIL_PASS,
} from '../../common/constant/dotenv.constant';

class EmailConfig {
  public transporter: any;
  constructor() {
    this.transporter = createTransport({
      service: MAIL_HOST,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });

    const hbsOptions: any = {
      viewEngine: {
        defaultLayout: false,
      },
      viewPath: './libs/email/templates/',
    };

    this.transporter.use('compile', hbs(hbsOptions));
  }
}

export default EmailConfig;
