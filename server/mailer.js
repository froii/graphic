const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config()


const PORT = process.env.PORT;
const ORIGIN = process.env.CLIENT;
const EMAIL = process.env.EMAIL;
const PASS_EMAIL = process.env.PASS_EMAIL;

const app = express();
app.use(cors({origin: ORIGIN, methods: ['POST'], credentials: false}));

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json())

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", ORIGIN);
  response.header("Access-Control-Allow-Methods", "POST");
  response.header('Access-Control-Allow-Headers', 'Origin, Content-Type');
  next();
});

app.listen(PORT, () => {
  console.log(`Email is listening on port ${PORT}!`);
});

const connect = () => {
  try {
    return nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'login',
        user: EMAIL,
        pass: PASS_EMAIL,
      }
    });
  } catch (e) {
    return console.log('Error: ' + e.name + ":" + e.message);
  }
}

app.post('/save_password', function(req, res) {
  const {email, password, name, user_id } = req.body;

  // if(user_id === user_id_from_bd)

  const output = `
    <div style="color: #2b0f0f;">
       <h3>Hello ${name}</h3>
       <p>You password ( ${password} ) is saved </a></p>
       <strong>Have a good day. </strong>
    </div>
  `;

  let smtpTransport = connect()
  smtpTransport.sendMail({
    from: `<${EMAIL}>`,
    to: email,
    subject: "Save Password",
    html: output
  });

  smtpTransport.verify(function(error) {
    if (error) {
      res.json(error)
    } else {
      res.json({status: 200, message: 'Email sent', password, name, email})
    }
  });
});

app.post('/change_password', function(req, res) {
  const {email, name, password } = req.body;

  const output = `
    <div style="color: #2b0f0f;">
       <h3>Hello ${name}</h3>
       <p>You can <a href="${ORIGIN}/authenticator/reset">change password here </a></p>
       <strong>Have a good day. </strong>
    </div>
  `;

  let smtpTransport = connect()

  smtpTransport.sendMail({
    from: `<${EMAIL}>`,
    to: email,
    subject: "Change Password",
    html: output
  });

  smtpTransport.verify(function(error) {
    if (error) {
      res.json(error)
    } else {
      res.json({status: 200, message: 'Email sent'})
    }
  });
});
