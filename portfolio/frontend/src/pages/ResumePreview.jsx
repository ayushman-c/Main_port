import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const RESUME_URL = '/assets/resume/resume.pdf'

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12 19 5 12 12 5"/>
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}

const handleDownload = async () => {
  try {
    await fetch((import.meta.env.VITE_API_URL || '') + '/api/resume/download', { method: 'POST' }).catch(() => {})
  } catch { /* silent */ }
}

export default function ResumePreview() {
  const mainRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.from('.resume-preview-reveal', {
        y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1, delay: 0.1,
      })
    }, mainRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <Navbar />
      <main ref={mainRef} className="min-h-screen pt-24 pb-20">
        <div className="container-wide">
          {/* Header */}
          <div className="resume-preview-reveal flex items-center justify-between mb-6 gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <BackIcon />
              Back to Portfolio
            </Link>

            <div className="flex items-center gap-3">
              <a
                href={RESUME_URL}
                download="Ayushman_Chakraborty_Resume.pdf"
                onClick={handleDownload}
                className="btn btn-primary"
                aria-label="Download resume as PDF"
              >
                <DownloadIcon />
                Download PDF
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Open in new tab ↗
              </a>
            </div>
          </div>

          {/* Title */}
          <div className="resume-preview-reveal mb-6">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Resume</h1>
            <p className="text-sm text-zinc-500 mt-0.5">Ayushman Chakraborty — Full Stack · Blockchain · AI/ML Developer</p>
          </div>

          {/* PDF Iframe */}
          <div className="resume-preview-reveal card overflow-hidden">
            <iframe
              src={RESUME_URL}
              title="Ayushman Chakraborty Resume"
              className="w-full"
              style={{ height: 'calc(100vh - 220px)', minHeight: '600px' }}
              aria-label="Resume PDF preview"
            />

            {/* Fallback message */}
            <noscript>
              <div className="p-8 text-center">
                <p className="text-zinc-500 mb-4">PDF preview requires JavaScript.</p>
                <a href={RESUME_URL} download className="btn btn-primary">
                  Download PDF
                </a>
              </div>
            </noscript>
          </div>

          {/* Footer notice */}
          <p className="resume-preview-reveal text-xs text-zinc-400 text-center mt-4">
            If the PDF doesn&apos;t load,{' '}
            <a
              href={RESUME_URL}
              download="Ayushman_Chakraborty_Resume.pdf"
              onClick={handleDownload}
              className="underline hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
            >
              click here to download it directly
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
