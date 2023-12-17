const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('public'));


app.post('/submit-form', (req, res) => {
  
  const { photo, description, phone, location } = req.body;

  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'evanskarani076@gmail.com', 
      pass: '37600273' 
    }
  });

  
  const mailOptions = {
    from: 'your-email@gmail.com', 
    to: 'evanskarani076@gmail.com',
    subject: 'New Form Submission',
    html: `
      <p><strong>Photo:</strong> ${photo}</p>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Phone number:</strong> ${phone}</p>
      <p><strong>Location:</strong> ${location}</p>
    `
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ success: false, message: 'Error sending email.' });
    }
    return res.status(200).json({ success: true, message: 'Email sent successfully.' });
  });
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
