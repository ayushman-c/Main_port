import { lazy, Suspense } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Skills from '../components/sections/Skills'
import Projects from '../components/sections/Projects'
import Resume from '../components/sections/Resume'
import Contact from '../components/sections/Contact'
import { useLenis } from '../hooks/useLenis'

// Lazy-load heavier sections
const GitHub         = lazy(() => import('../components/sections/GitHub'))
const CodingProfiles = lazy(() => import('../components/sections/CodingProfiles'))

function SectionFallback() {
  return (
    <div className="py-24 flex items-center justify-center" aria-hidden="true">
      <div className="w-6 h-6 rounded-full border-2 border-zinc-300 dark:border-zinc-700 border-t-zinc-900 dark:border-t-zinc-100 animate-spin" />
    </div>
  )
}

export default function Home() {
  useLenis()

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Suspense fallback={<SectionFallback />}>
          <GitHub />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CodingProfiles />
        </Suspense>
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
