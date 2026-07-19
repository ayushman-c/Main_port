import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import Cursor from './components/ui/Cursor'
import ErrorBoundary from './components/ui/ErrorBoundary'

// Lazy-loaded pages
const Home          = lazy(() => import('./pages/Home'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const ResumePreview = lazy(() => import('./pages/ResumePreview'))
const NotFound      = lazy(() => import('./pages/NotFound'))

// Page transition wrapper
const pageVariants = {
  initial:  { opacity: 0, y: 8 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit:     { opacity: 0, y: -4, transition: { duration: 0.2, ease: 'easeIn' } },
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/"              element={<Home />} />
          <Route path="/projects/:id"  element={<ProjectDetail />} />
          <Route path="/resume"        element={<ResumePreview />} />
          <Route path="/404"           element={<NotFound />} />
          <Route path="*"              element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <div
        className="w-6 h-6 rounded-full border-2 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-zinc-100 animate-spin"
        aria-label="Loading"
        role="status"
      />
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <Cursor />
          <Suspense fallback={<PageLoader />}>
            <AnimatedRoutes />
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
