# Small Wonders - Vercel Deployment Guide

You have successfully migrated your backend to Vercel Serverless Functions! This means you can host both your HTML frontend and your backend API in the same place.

## ✅ What Was Done
1. **Created `api/` folder**: Contains `contact.js` and `admission.js` which handle email sending.
2. **Updated `index.html`**: Points to `/api/contact` instead of the old Render URL.
3. **Updated `inquiry/admission.html`**: Points to `/api/admission` instead of the old Render URL.
4. **Created `package.json`**: Describes the dependencies (`nodemailer`) needed for Vercel.

## 🚀 How to Deploy

### Option 1: Using Vercel Dashboard (Recommended)
1. Push your code to GitHub.
2. Go to [Vercel.com](https://vercel.com) and click **"Add New..."** > **"Project"**.
3. Import your `small-wonders-school` repository.
4. **CRITICAL STEP**: Before clicking Deploy, look for the **"Environment Variables"** section.
5. Add the following variables (same as used previously):
   
   | Key | Value |
   |-----|-------|
   | `GMAIL_USER` | `swskpt.enquiry@gmail.com` |
   | `GMAIL_PASS` | `inho xvch lzfb ayei` |
   | `SCHOOL_EMAIL` | `swskpt@gmail.com` |

6. Click **Deploy**.

### Option 2: Using Vercel CLI
If you have Vercel CLI installed:
1. Run `vercel login`
2. Run `vercel` inside the project folder.
3. Run `vercel env add GMAIL_USER` (paste value).
4. Run `vercel env add GMAIL_PASS` (paste value).
5. Run `vercel env add SCHOOL_EMAIL` (paste value).
6. Run `vercel --prod`.

## 🧪 Testing
Once deployed, visit your Vercel URL (e.g., `https://small-wonders-school.vercel.app`) and try submitting the forms.

## 🛠 Troubleshooting
- **Emails not sending?** Check the Vercel Project Settings > Logs. If you see "Server misconfiguration: Missing email credentials", you forgot to add the Environment Variables.
- **Form spins forever?** Check the Network tab in browser developer tools (F12) to see if the request to `/api/contact` failed.
