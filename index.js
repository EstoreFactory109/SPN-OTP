const express = require('express');
const speakeasy = require('speakeasy');
const app = express();

const PORT = process.env.PORT || 3000;
const OTP_SECRET = process.env.OTP_SECRET || 'YOUR_SECRET_KEY_HERE';

function getOTPData() {
  const token = speakeasy.totp({
    secret: OTP_SECRET,
    encoding: 'base32'
  });
  const remaining = 30 - (Math.floor(Date.now() / 1000) % 30);
  return { token, remaining };
}

app.get('/api/otp', (req, res) => {
  const { token, remaining } = getOTPData();
  res.json({ otp: token, secondsRemaining: remaining });
});

app.get('/', (req, res) => {
  const { token, remaining } = getOTPData();

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Amazon AU OTP</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #0f1923 0%, #1a2a3a 50%, #0d2137 100%);
      font-family: 'Segoe UI', sans-serif;
    }
    .card {
      background: rgba(255,255,255,0.07);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,153,0,0.2);
      border-radius: 24px;
      padding: 48px 56px;
      text-align: center;
      box-shadow: 0 24px 60px rgba(0,0,0,0.5);
      min-width: 340px;
    }
    .amazon-logo {
      font-size: 1.6rem;
      font-weight: 800;
      color: #fff;
      letter-spacing: -0.5px;
      margin-bottom: 4px;
    }
    .amazon-logo span { color: #ff9900; }
    .name-badge {
      display: inline-block;
      background: rgba(255,153,0,0.15);
      color: #ff9900;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 4px 12px;
      border-radius: 100px;
      margin-bottom: 6px;
    }
    .account {
      color: rgba(255,255,255,0.35);
      font-size: 0.75rem;
      margin-bottom: 28px;
      letter-spacing: 0.3px;
    }
    h1 {
      color: #e2e8f0;
      font-size: 0.85rem;
      font-weight: 500;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 28px;
      opacity: 0.6;
    }
    .otp {
      font-size: 3.8rem;
      font-weight: 700;
      letter-spacing: 10px;
      color: #ff9900;
      font-variant-numeric: tabular-nums;
      margin-bottom: 28px;
      text-shadow: 0 0 30px rgba(255,153,0,0.4);
    }
    .progress-wrap {
      background: rgba(255,255,255,0.08);
      border-radius: 100px;
      height: 6px;
      margin-bottom: 12px;
      overflow: hidden;
    }
    .progress-bar {
      height: 100%;
      border-radius: 100px;
      background: linear-gradient(90deg, #ff9900, #ffba3b);
      transition: width 1s linear;
    }
    .timer { color: #a0aec0; font-size: 0.85rem; margin-bottom: 32px; }
    .timer span { color: #ff9900; font-weight: 600; }
    button {
      background: linear-gradient(135deg, #ff9900, #e47911);
      color: #111;
      border: none;
      padding: 12px 32px;
      border-radius: 12px;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      letter-spacing: 0.5px;
      transition: transform 0.15s, box-shadow 0.15s;
    }
    button:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,153,0,0.35); }
    .copied { background: linear-gradient(135deg, #38a169, #276749) !important; color: white !important; }
    .footer { margin-top: 24px; color: rgba(255,255,255,0.2); font-size: 0.72rem; }
  </style>
</head>
<body>
  <div class="card">
    <div class="amazon-logo">amazon<span>.au</span></div>
    <div class="name-badge">AU</div>
    <div class="account">amazon@estorefactory.com.au</div>
    <h1>One-Time Password</h1>
    <div class="otp" id="otp">${token}</div>
    <div class="progress-wrap">
      <div class="progress-bar" id="bar" style="width:${(remaining / 30) * 100}%"></div>
    </div>
    <div class="timer">Refreshes in <span id="countdown">${remaining}</span>s</div>
    <button id="copyBtn" onclick="copyOTP()">📋 Copy Code</button>
    <div class="footer">Auto-refreshes every 30 seconds</div>
  </div>

  <script>
    let countdown = ${remaining};

    function copyOTP() {
      const otp = document.getElementById('otp').textContent.trim();
      navigator.clipboard.writeText(otp).then(() => {
        const btn = document.getElementById('copyBtn');
        btn.textContent = '✅ Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = '📋 Copy Code';
          btn.classList.remove('copied');
        }, 2000);
      });
    }

    async function refresh() {
      const res = await fetch('/api/otp');
      const data = await res.json();
      document.getElementById('otp').textContent = data.otp;
      countdown = data.secondsRemaining;
      document.getElementById('countdown').textContent = countdown;
      document.getElementById('bar').style.width = ((countdown / 30) * 100) + '%';
    }

    setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        refresh();
        return;
      }
      document.getElementById('countdown').textContent = countdown;
      document.getElementById('bar').style.width = ((countdown / 30) * 100) + '%';
    }, 1000);
  </script>
</body>
</html>`;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`OTP Generator running on port ${PORT}`);
});
