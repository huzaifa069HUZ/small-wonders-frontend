# Admin Dashboard Setup Guide

Follow these steps exactly to activate your new Admin Dashboard.

## Part 1: Firebase Setup (Database & Login)
1.  Go to [Firebase Console](https://console.firebase.google.com/) and create a new project named **"Small Wonders School"**.
2.  **Enable Authentication**:
    *   Click **Build** > **Authentication** > **Get Started**.
    *   Select **Email/Password** > Enable it > Save.
    *   Click **Users** tab > **Add User** > Enter your email and a strong password (this will be your admin login).
3.  **Enable Database**:
    *   Click **Build** > **Firestore Database** > **Create Database**.
    *   Choose location (e.g., `asia-south1` or `nam5`).
    *   Start in **Test Mode** (we will secure it later).
4.  **Get Configuration**:
    *   Click the **Gear Icon** (Project Settings) > **General**.
    *   Scroll down to "Your apps". Click the **</> (Web)** icon.
    *   Nickname: "School Website".
    *   Copy the `firebaseConfig` object (the part inside `const firebaseConfig = { ... }`).
    *   **PASTE** this config into `js/firebase-config.js` in your project code (I will create this file for you).

## Part 2: Vercel Setup (Storage)
1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Select your **small-wonders-frontend** project.
3.  Click **Storage** tab > **Create Database**.
4.  Select **Blob** > **Continue**.
5.  Name it (e.g., `swsk-photos`) > **Create**.
6.  Once created, go to **Settings** > **Environment Variables**.
7.  You should see `BLOB_READ_WRITE_TOKEN` automatically added. If not, copy it from the Storage page and add it manually.
8.  **Redeploy** your project for the changes to take effect (Go to Deployments > Redeploy).

## Part 3: Using the Dashboard
1.  Navigate to `https://your-site.vercel.app/admin/login.html`.
2.  Login with the email/password you created in Firebase.
3.  Upload photos! They will appear instantly in your gallery.
