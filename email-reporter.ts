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
    if (!process.env.GOOGLE_APP_PASSWORD) {
      console.error('GOOGLE_APP_PASSWORD is not set - skipping failure notification email.');
      return;
    }
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "dimitrije.cna@gmail.com",
            pass: process.env.GOOGLE_APP_PASSWORD,
        },
    });

    // Swallow low-level SMTP errors so a mail failure can never crash the run.
    transporter.on('error', (err) => console.error('SMTP transport error:', err.message));

    var mailOptions = {
      from: 'dimitrije.cna@gmail.com', //'"Playwright Automation" <automation@nenasilje.org>',
      to: 'dimitrije@nenasilje.org',
      subject: 'Proveravač Sajtova: nenasilje.org ima potencijalni problem',
      text: 'Jedan ili više testova sajta nisu uspešno završeni!',
      html: '<p>🚨 <strong>Pažnja:</strong> </p>Jedan ili više testova sajta nisu uspešno završeni! Proverite <a href="https://itdimi.github.io/E2ETestsNenasilje/">IZVEŠTAJ</a>',
    };
    for (var mail of [
      'dimitrije@nenasilje.org', 
      //'nenad@nenasilje.org', 
      //'urednici@nenasilje.org'
    ]) {
      mailOptions.to = mail;
      try {
        await transporter.sendMail(mailOptions);
        console.log('Failure alert email sent successfully.');
      } catch (error) {
        console.error('Failed to send failure notification email:', error);
      }
    }
  }
}

export default EmailReporter;
