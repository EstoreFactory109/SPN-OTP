# OTP Generator - Step by Step Setup Guide

## 📋 What You'll Need

1. Your authenticator **SECRET KEY** (the code you used to set up 2FA)
2. A GitHub account (free)
3. A Render account (free)

---

## 🚀 Step-by-Step Instructions

### STEP 1: Get Your Authenticator Secret Key

**If you're setting up a NEW authenticator:**
- When you add a new account to Google Authenticator or any authenticator app
- You'll see a QR code AND a text key (usually 16-32 characters)
- **Copy that text key** - this is your SECRET KEY
- Example: `JBSWY3DPEHPK3PXP` or `4S62BZNFXXSZLCRO`

**If you already have an authenticator set up:**
- You'll need to reset 2FA on that service to get the secret key again
- Or check if the service shows your secret key in settings

---

### STEP 2: Create a GitHub Repository

1. Go to https://github.com
2. Click the **"+"** button (top right) → **"New repository"**
3. Name it: `otp-generator` (or any name you like)
4. Make it **Public**
5. Click **"Create repository"**

---

### STEP 3: Upload Files to GitHub

**Option A - Using GitHub Web Interface (Easiest):**

1. In your new repository, click **"uploading an existing file"**
2. Download these two files I created for you (see below)
3. Drag and drop both files to GitHub
4. Click **"Commit changes"**

**Option B - Using Git Commands:**
```bash
git clone https://github.com/YOUR-USERNAME/otp-generator.git
cd otp-generator
# Copy the index.js and package.json files here
git add .
git commit -m "Initial commit"
git push
```

---

### STEP 4: Deploy to Render

1. Go to https://render.com
2. Sign up (you can use GitHub to sign in)
3. Click **"New +"** → **"Web Service"**
4. Click **"Connect a repository"**
   - Authorize Render to access your GitHub
   - Select your `otp-generator` repository
5. Configure the service:
   - **Name:** `otp-generator-myapp` (choose any unique name)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`
6. Click **"Advanced"** → Add Environment Variable:
   - **Key:** `OTP_SECRET`
   - **Value:** (paste your authenticator secret key here)
7. Click **"Create Web Service"**

---

### STEP 5: Wait for Deployment

- Render will build and deploy your app (takes 2-5 minutes)
- Watch the logs - when you see "OTP Generator running on port 3000", it's ready!
- Your app will be available at: `https://otp-generator-myapp.onrender.com`

---

### STEP 6: Use Your OTP Generator

1. Open your Render URL in any browser
2. You'll see your OTP code automatically generated
3. It auto-refreshes every 30 seconds
4. Bookmark it for easy access!

---

## 🔒 Security Notes

- Your secret key is stored securely in Render environment variables
- Only you can access your Render dashboard
- The public URL shows only the current OTP code (not the secret)
- Anyone with the URL can see the current OTP, so keep it private!

---

## 🛠️ Troubleshooting

**"OTP doesn't match":**
- Make sure your secret key is correct
- Check your device's time is synchronized
- Try regenerating the secret key from the service

**"Deploy failed":**
- Check the build logs in Render dashboard
- Make sure both `index.js` and `package.json` are uploaded

**Need help?**
- Check Render logs for error messages
- Verify your environment variable is set correctly

---

## 📱 Multiple Accounts

To create OTP generators for multiple accounts:
1. Repeat STEP 4-6 with a different name
2. Use a different secret key for each service
3. You'll get different URLs for each account

---

## ✨ Features

- ✅ Auto-refreshing OTP codes
- ✅ Beautiful, clean interface
- ✅ Works on any device
- ✅ No Google Authenticator extension needed
- ✅ Free hosting on Render

---

Good luck! 🎉
