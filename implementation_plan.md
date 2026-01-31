# Admin Dashboard & Dynamic Gallery Implementation Plan

## Goal
Create a secure Admin Dashboard that allows you to upload, delete, and manage photos in the Gallery section without touching the code.

## Technology Stack (Vercel Integration)
Yes! We can use **Vercel Blob Storage**.

1.  **Firebase Authentication** (Free): For secure login.
2.  **Firebase Database** (Free): To store photo metadata (caption, category).
3.  **Vercel Blob Storage** (Free): To store the image files.
    - **Pros**: 
        - Built into your hosting.
        - Serves images very fast (CDN).
    - **Cons (Free Tier Limits)**:
        - **Total Storage**: 250 MB (approx 1,000 optimized photos).
        - **Bandwidth**: 5 GB / month.

**Recommendation**: This is the most professional approach. If you exceed 250MB later, you can delete old photos or upgrade.

## Proposed Changes

### 1. Structure Changes
- **Delete** hardcoded images in `gallery.html`.
- **New** `admin/` folder containing:
    - `index.html` (Login page)
    - `dashboard.html` (The control panel)
- **New** `js/firebase-config.js` (Shared configuration)

### 2. User Flow
1.  **Visitor**: Opens `gallery.html`. The page connects to Firebase, downloads the list of photos, and displays them automatically.
2.  **Admin (You)**:
    - Go to `/admin`.
    - Log in with your email/password.
    - See a list of current photos.
    - Click "Upload Photo", select a file, choose a category (Events, School, etc.).
    - The photo instantly appears on the live site.

## Step-by-Step Plan

### Phase 1: Setup
- [ ] Create a new project on [console.firebase.google.com](https://console.firebase.google.com).
- [ ] Enable **Authentication** (Email/Password).
- [ ] Enable **Firestore Database**.
- [ ] Install `@vercel/blob` in your project.
- [ ] Get Vercel **BLOB_READ_WRITE_TOKEN**.

### Phase 2: Frontend Implementation
- [ ] Create `js/firebase-config.js`.
- [ ] Create `api/upload-photo.js` (Serverless function to handle secure uploads to Vercel Blob).
- [ ] Create `admin/login.html`.
- [ ] Create `admin/dashboard.html`.
- [ ] Update `gallery.html`.

### Phase 3: Security Rules
- [ ] Configure Firebase Security Rules.
- [ ] Secure the Vercel Upload API with a password/token check.

## User Review Required
> [!IMPORTANT]
> You will need to create the Firebase project yourself to get the API keys. I will guide you through this process. Are you ready to proceed with Firebase?
