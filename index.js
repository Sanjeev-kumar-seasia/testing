const express = require('express');
const AWS = require('aws-sdk');

const app = express();

// Configure AWS SDK
AWS.config.update({ region: 'us-east-1' }); // Replace with your AWS region

const secretsManager = new AWS.SecretsManager();

async function getSecrets(secretName) {
  try {
    const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
    if ('SecretString' in data) {
      return JSON.parse(data.SecretString);
    } else {
      throw new Error('Secret is not in string format.');
    }
  } catch (err) {
    console.error('Error retrieving secrets:', err);
    throw err;
  }
}

(async () => {
  try {
    const secrets = await getSecrets('github_actions');
    const message = secrets.MESSAGE || 'No message set!';
    const port = secrets.PORT || 3000;

    app.get('/', (req, res) => {
      res.send(`
        <html>
          <body>
            <h1>${message}</h1>
          </body>
        </html>
      `);
    });

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start the application:', error);
    process.exit(1);
  }
})();
