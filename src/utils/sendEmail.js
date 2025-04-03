import nodemailer from 'nodemailer';

import { getEnvVar } from './getEnvVar.js';

const transporter = nodemailer.createTransport({
  host: getEnvVar('SMTP_HOST'),
  port: getEnvVar('SMTP_PORT'),
  secure: false,
  auth: {
    user: getEnvVar('SMTP_USER'),
    pass: getEnvVar('SMTP_PASSWORD'),
  },
});

export function sendEmail(to, subject, content) {
  return transporter.sendMail({
    from: getEnvVar('SENDER_EMAIL'),
    to,
    subject,
    html: content,
  });
}
