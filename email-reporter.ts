import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import nodemailer from 'nodemailer';

class EmailReporter implements Reporter {
  async onEnd(result: { status: string }) {
    // Only trigger action if the overall test suite execution failed
    if (result.status === 'failed' || result.status === 'timedout') {
      await this.sendFailureEmail();
    }
  }

  private async sendFailureEmail() {
    console.log(`Pass: ${process.env.GOOGLE_APP_PASSWORD}`);
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "dimitrije.cna@gmail.com",
            pass: process.env.GOOGLE_APP_PASSWORD,
        },
    });

    const mailOptions = {
      from: 'dimitrije.cna@gmail.com', //'"Playwright Automation" <automation@nenasilje.org>',
      to: 'dimitrije@nenasilje.org',
      subject: 'Alert: Playwright Test Run Failed',
      text: 'One or more Playwright tests failed in the latest run. Please check the CI pipeline or local HTML reports.',
      html: '<p>🚨 <strong>Alert:</strong> One or more Playwright tests failed in the latest run.</p><p>Please check your CI pipeline or local HTML reports for details.</p>',
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Failure alert email sent successfully.');
    } catch (error) {
      console.error('Failed to send failure notification email:', error);
    }
  }
}

export default EmailReporter;
