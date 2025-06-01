const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text, html }) => {
  // Create reusable transporter object using Ethereal SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "maddison53@ethereal.email",
      pass: "jn7jnAPss4f63QBp6D",
    },
  });

  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to,
    subject,
    text,
    html,
  });

  console.log("Message sent:", info.messageId);
  return info;
};

module.exports = sendEmail;

/*

const sendEmail = require("./mailer");

(async () => {
  await sendEmail({
    to: "bar@example.com",
    subject: "Custom Subject",
    text: "This is plain text",
    html: "<b>This is HTML</b>",
  });
})();

*/