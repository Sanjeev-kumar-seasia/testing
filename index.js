// index.js
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Serve a simple page displaying the environment variable MESSAGE
app.get('/', (req, res) => {
  const message = process.env.MESSAGE || 'No message set!';
  res.send(`
    <html>
      <body>
        <h1>${message}</h1>
      </body>
    </html>
  `);
});

// Start the server on the port from the .env file
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
