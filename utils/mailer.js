const nodeMailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const transporterDetails = smtpTransport({
  host: "mail.ghorbany.dev",
  port: 2525,
  secure: true,
  auth: {
    user: "sajad.haghparast@yahoo.com",
    pass: "H@gh242556",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.sendEmail = (email, fullname, subject, message) => {
  const transporter = nodeMailer.createTransport(transporterDetails);
  transporter.sendMail({
    from: "sajad.haghparast@yahoo.com",
    to: email,
    subject: subject,
    html: `<h1> سلام ${fullname}</h1>
            <p>${message}</p>`,
  });
};
