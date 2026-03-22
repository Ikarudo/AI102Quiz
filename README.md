# AI-102 Exam Practice — GitHub Pages + Firebase

A self-hosted exam practice tool with an admin dashboard showing signups, attempts, and question difficulty analytics.

---

## Files

```
index.html          → The quiz (open this to practise)
admin.html          → Admin dashboard (password protected)
firebase-config.js  → Your Firebase credentials (edit this first)
README.md           → This file
```

---

## Setup in 10 minutes

### Step 1 — Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → name it (e.g. `ai102-quiz`) → Continue
3. Disable Google Analytics if you don't need it → **Create project**

### Step 2 — Enable Firestore

1. In the Firebase console sidebar: **Build → Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (you can tighten rules later)
4. Pick any region → **Enable**

### Step 3 — Enable Anonymous Auth

1. Sidebar: **Build → Authentication → Get started**
2. Click **Anonymous** → toggle **Enable** → Save

### Step 4 — Get your config

1. Sidebar: **Project Settings** (gear icon) → **General**
2. Scroll to **Your apps** → click **</>** (Web app)
3. Register the app → copy the `firebaseConfig` object

### Step 5 — Edit firebase-config.js

Open `firebase-config.js` and paste your config:

```js
const FIREBASE_CONFIG = {
  apiKey:            "AIzaSy...",
  authDomain:        "ai102-quiz.firebaseapp.com",
  projectId:         "ai102-quiz",
  storageBucket:     "ai102-quiz.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abc123"
};

const ADMIN_PASSWORD = "your-secret-password";
```
Don't Forget to Run NPM Install

### Step 6 — Deploy to GitHub Pages

1. Create a new **public** GitHub repository (e.g. `ai102-quiz`)
2. Upload **all 4 files** to the repo root:
   - `index.html`
   - `admin.html`
   - `firebase-config.js`
   - `README.md`
3. Go to **Settings → Pages → Source → Deploy from branch → main / root**
4. Wait ~60 seconds → your site is live at:
   ```
   https://YOUR-USERNAME.github.io/ai102-quiz/
   ```

### Step 7 — Share with students

Send them: `https://YOUR-USERNAME.github.io/ai102-quiz/`

### Step 8 — View the admin dashboard

Go to: `https://YOUR-USERNAME.github.io/ai102-quiz/admin.html`

Enter the password you set in `firebase-config.js`.

---

## What the admin dashboard shows

| Metric | Description |
|--------|-------------|
| Total Users | Unique people who opened the quiz |
| Total Attempts | Questions answered (any type) |
| Overall Accuracy | % correct across all MC questions |
| Total Sessions | Total quiz opens |
| Set Usage | Which question set is most used |
| Accuracy by Type | MC vs Hotspot vs Drag & Drop |
| Hardest Questions | Questions with lowest correct % (min 3 attempts) |
| Recent Users | Names + last seen |
| All Questions | Full per-question stats, sortable |

---

## Firestore data structure (auto-created)

```
/users/{uid}           → name, lastSeen, sessions
/attempts/{auto}       → uid, qid, qnum, qtype, correct, timestamp
/questions/{qid}       → qnum, qtype, attempts, correct, incorrect
/stats/global          → totalSessions, totalAttempts, totalCorrect
/stats/sets            → set1, set2, set3 open counts
```

---

## Firestore security rules (optional, recommended)

In Firebase Console → Firestore → Rules, replace with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Anyone can write their own user doc and attempts
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
    match /attempts/{doc} {
      allow create: if request.auth != null;
    }
    // Question stats: anyone can increment
    match /questions/{qid} {
      allow read, write: if request.auth != null;
    }
    match /stats/{doc} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## Notes

- **No server required** — fully static, runs on GitHub Pages
- **Progress is saved locally** (localStorage) and tracked in Firebase
- **Anonymous users** are tracked by Firebase UID even without a name
- The quiz works offline after first load (images are embedded)
- Firebase free tier (Spark plan) supports up to 50k reads/day — more than enough for a class
