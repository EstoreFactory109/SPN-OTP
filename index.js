const express = require('express');
const speakeasy = require('speakeasy');
const app = express();

const PORT = process.env.PORT || 3000;
const OTP_SECRET = process.env.OTP_SECRET || 'YOUR_SECRET_KEY_HERE';

app.get('/', (req, res) => {
  const token = speakeasy.totp({
    secret: OTP_SECRET,
    encoding: 'base32'
  });

  const timeRemaining = 30 - (Math.floor(Date.now() / 1000) % 30);

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OTP Generator</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .container {
          background: white;
          border-radius: 20px;
          padding: 60px 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          text-align: center;
          max-width: 500px;
          width: 100%;
        }
        h1 {
          color: #333;
          margin-bottom: 30px;
          font-size: 28px;
        }
        .otp-code {
          font-size: 64px;
          font-weight: bold;
          color: #667eea;
          letter-spacing: 8px;
          margin: 30px 0;
          font-family: 'Courier New', monospace;
        }
        .info {
          color: #666;
          font-size: 16px;
          margin: 10px 0;
        }
        .timer {
          margin-top: 20px;
          font-size: 18px;
          color: #764ba2;
          font-weight: 600;
        }
        .progress-bar {
          width: 100%;
          height: 8px;
          background: #e0e0e0;
          border-radius: 4px;
          margin-top: 20px;
          overflow: hidden;
        }
        .progress {
          height: 100%;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          transition: width 1s linear;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🔐 OTP Generator</h1>
        <div class="otp-code" id="otp">${token}</div>
        <div class="info">Generated at: ${new Date().toLocaleString()}</div>
        <div class="timer">Refreshes in: <span id="countdown">${timeRemaining}</span> seconds</div>
        <div class="progress-bar">
          <div class="progress" id="progress"></div>
        </div>
      </div>

      <script>
        let timeLeft = ${timeRemaining};
        const totalTime = 30;
        
        function updateProgress() {
          const percentage = (timeLeft / totalTime) * 100;
          document.getElementById('progress').style.width = percentage + '%';
        }
        
        updateProgress();
        
        const countdown = setInterval(() => {
          timeLeft--;
          document.getElementById('countdown').textContent = timeLeft;
          updateProgress();
          
          if (timeLeft <= 0) {
            location.reload();
          }
        }, 1000);
      </script>
    </body>
    </html>
  `;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(\`OTP Generator running on port \${PORT}\`);
});
