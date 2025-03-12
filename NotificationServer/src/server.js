const express = require('express');
const admin = require('./firebase-admin');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Endpoint to send notification
app.post('/send-notification', async (req, res) => {
  const { token, title, body } = req.body;

  if (!token || !title || !body) {
    return res.status(400).send('Missing required fields: token, title, body');
  }

  const message = {
    notification: {
      title,
      body,
    },
    token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
    res.status(200).send('Notification sent successfully');
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Error sending notification');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});