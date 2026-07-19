# Ayushman Chakraborty — Personal Portfolio

A production-grade personal portfolio built with a premium monochrome design language,
GSAP animations, Three.js 3D, and a Node.js/Express backend.

---

## Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + Vite 5 | UI framework & build tool |
| Tailwind CSS 3 | Utility-first styling |
| GSAP 3 | Scroll-triggered & entrance animations |
| Framer Motion | Page transitions |
| Three.js + R3F | 3D floating geometry |
| Lenis | Smooth scrolling |
| React Router v6 | Client-side routing |
| Axios | HTTP client |

### Backend
| Technology | Purpose |
|---|---|
| Node.js 18+ + Express 4 | API server |
| Nodemailer | Contact form emails |
| Helmet | Security headers |
| express-rate-limit | Rate limiting |
| express-validator | Input validation |
| node-cache | GitHub API response caching |
| Winston + Morgan | Structured logging |

---

## Getting Started

### Prerequisites
- Node.js ≥ 18.0.0
- npm ≥ 9.0.0

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your SMTP credentials and GitHub token
npm run dev
```

Runs on `http://localhost:5000`

The Vite dev server proxies all `/api` requests to the backend automatically.

---

## Environment Variables

Copy `backend/.env.example` to `backend/.env`:

```env
PORT=5000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173,https://ayushman.dev

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your_app_password
MAIL_TO=your@gmail.com
MAIL_FROM="Portfolio Contact <your@gmail.com>"

# GitHub
GITHUB_TOKEN=ghp_your_token
GITHUB_USERNAME=ayushman-git

# Admin
ADMIN_SECRET=random_secret_string
```

For Gmail, generate an **App Password** at: https://myaccount.google.com/apppasswords

---

## Project Structure

```
portfolio/
├── frontend/
│   ├── public/
│   │   ├── robots.txt
│   │   ├── sitemap.xml
│   │   ├── favicon.svg
│   │   └── assets/resume/          ← Place resume.pdf here
│   └── src/
│       ├── components/
│       │   ├── layout/             Navbar, Footer
│       │   ├── sections/           Hero, About, Skills, Projects, GitHub, …
│       │   ├── three/              HeroScene, FloatingGeometry
│       │   └── ui/                 Button, Badge, Cursor, MagneticButton, …
│       ├── context/                ThemeContext
│       ├── data/                   projects.js, skills.js
│       ├── hooks/                  useLenis, useGsapReveal, useScrollSpy
│       ├── pages/                  Home, ProjectDetail, ResumePreview, NotFound
│       └── utils/                  cn, formatDate
│
└── backend/
    ├── server.js
    └── src/
        ├── controllers/            contactController, githubController, resumeController, analyticsController
        ├── middleware/             rateLimiter, validate
        ├── routes/                 contact, github, resume, analytics
        ├── services/               emailService, githubService
        └── utils/                  logger
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/contact` | Send contact form email |
| `GET`  | `/api/github/stats` | GitHub user statistics |
| `GET`  | `/api/github/repos` | List public repositories |
| `GET`  | `/api/github/repos/:repo` | Single repository details |
| `POST` | `/api/resume/download` | Track resume download |
| `GET`  | `/api/resume/downloads` | Admin: download count (requires `x-admin-secret` header) |
| `POST` | `/api/analytics/visit` | Track page visit |
| `GET`  | `/api/analytics` | Admin: visitor analytics (requires `x-admin-secret` header) |
| `GET`  | `/api/health` | Health check |

---

## Adding Your Resume

Place your resume PDF at:
```
frontend/public/assets/resume/resume.pdf
```

---

## Deployment

### Frontend (Vercel)

```bash
cd frontend
npm run build
# Deploy the dist/ folder to Vercel
```

Set environment variable in Vercel: none required (all public).

### Backend (Railway / Render / Fly.io)

```bash
cd backend
# Set all .env variables in your platform's dashboard
npm start
```

### Environment update for production

Update `frontend/vite.config.js` proxy target if deploying backend separately,
or set `VITE_API_URL` and update axios base URL accordingly.

---

## Performance

- Code splitting: Three.js scene, GitHub section, and CodingProfiles loaded lazily
- Images: lazy-loaded with proper `alt` attributes
- Fonts: preconnect + display=swap
- Animations: GPU-friendly (transform/opacity only), ScrollTrigger fires once
- `prefers-reduced-motion`: Lenis disabled, animations minimal
- GSAP context cleanup prevents memory leaks

## Accessibility

- Semantic HTML (`header`, `main`, `nav`, `section`, `article`, `footer`)
- `aria-label` on all interactive elements
- Keyboard-navigable (visible focus ring)
- `role="alert"` on form status messages
- `aria-live="polite"` on rotating title
- Color contrast conscious (monochrome palette)
- Custom cursor hidden on touch/keyboard-primary devices via CSS media query

## SEO

- Title and meta description updated per page
- Open Graph + Twitter Card meta tags
- Structured data (`Person` schema)
- `robots.txt` + `sitemap.xml`
- Canonical URL

---

## License

MIT — feel free to fork and adapt.
