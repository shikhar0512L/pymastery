# 🐍 PyMastery

**Learn Python by playing — from a 7th grader's first line of code to building your own ML models.**

An interactive, browser-based Python learning platform. No installs, no signups required to start. Real code execution, interactive visualizations, and a full curriculum covering Python fundamentals through Machine Learning.

🔗 **Live:** [pymastery-in.web.app](https://pymastery-in.web.app)

---

## ✨ Features

- **7 learning modules, 85+ interactive lessons** — Python → OOP → Linear Algebra → Calculus → NumPy → Pandas → Machine Learning
- **Real Python execution in-browser** — Powered by Pyodide (CPython + NumPy + Pandas + Matplotlib + scikit-learn)
- **Interactive graphs & simulations** — see gradient descent actually descend, watch eigenvectors move, drag sliders and watch models learn
- **Math rendering** — LaTeX support via KaTeX
- **5 challenge types** — MCQ, predict-output, code-fill, code-challenge, numeric-answer
- **Progressive unlock + XP tracking** — gamified learning with streaks and accuracy
- **AI assistant** — in-app helper with 270+ knowledge entries across Python, Math, and ML
- **Google sign-in + cloud sync** — progress persists across devices via Clerk + Firebase
- **Free forever** — no ads, no paywall

---

## 🎯 Why PyMastery?

Most platforms teach either **Python** OR **Math** OR **Machine Learning**. Almost none connect them.

PyMastery is different. It shows you how a **matrix** becomes a **gradient descent step**. How a **derivative** becomes **backpropagation**. How the math you learn in one module is exactly what powers the model you build in the next.

Every concept has a challenge. Every code block has a Run button. Every math idea is visualized.

---

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS |
| Routing | React Router v7 |
| State | Zustand (with localStorage persist) |
| Code Execution | Pyodide (WebAssembly CPython) |
| Math Rendering | KaTeX |
| Auth | Clerk |
| Backend | Firebase (Firestore + Hosting + Analytics) |
| Service Worker | Custom Pyodide caching |

---
## 📁 Project Structure

```
src/
├── components/              UI components
│   ├── lesson/              Lesson renderers, code blocks, challenges, graphs, simulations
│   ├── assistant/           In-app AI assistant
│   └── ...
├── data/                    Learning content (fully data-driven)
│   ├── python/              Python basics + OOP
│   ├── linear-algebra/      Vectors → eigenvalues
│   ├── calculus/            Functions → gradient descent
│   ├── numpy/               Arrays → tensors
│   ├── pandas/              Series → capstone
│   ├── ml/                  Machine Learning
│   └── assistant/           Assistant knowledge base
├── hooks/                   Custom React hooks
├── lib/                     Pyodide, Firebase, analytics, assistant search
├── pages/                   Route pages
└── store/                   Zustand stores
```

---

## 🚀 Run Locally

```bash
# 1. Clone
git clone https://github.com/shikhar0512L/pymastery.git
cd pymastery

# 2. Install dependencies
npm install

# 3. Create .env.local with your own keys:
#    (Get from Clerk dashboard + Firebase console)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxx

VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx

# 4. Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Build & Deploy

```bash
npm run build          # Production build → dist/
npm run preview        # Local preview of production build
firebase deploy        # Deploy to Firebase Hosting
```

---

## 🎓 Design Principles

1. **Show, don't tell.** Every abstract concept has a visualization.
2. **Learn by doing.** Every lesson has challenges. Every code block runs.
3. **Connect the dots.** Math → code → ML, all in one flow.
4. **Zero barriers.** No install, no signup required to start. Auth is optional.
5. **Beginner friendly, expert deep.** 7th grader can start; ML practitioner can go deep.

---

## 📄 License

MIT — free to use, modify, and learn from.

---

## 👤 Author

**Shikhar Singh**

- 🌐 Portfolio: [shikhar-singh-in.web.app](https://shikhar-singh-in.web.app)
- 💼 LinkedIn: [linkedin.com/in/shikhar-singh](https://www.linkedin.com/in/shikhar-singh)
- 🐙 GitHub: [@shikhar0512L](https://github.com/shikhar0512L)

---

⭐ If you find this useful, consider giving the repo a star!