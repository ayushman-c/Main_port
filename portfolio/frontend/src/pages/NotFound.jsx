import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function NotFound() {
  const mainRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.from('.nf-reveal', {
        y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1, delay: 0.15,
      })
    }, mainRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <Navbar />
      <main
        ref={mainRef}
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20"
        aria-label="Page not found"
      >
        {/* 404 number */}
        <p
          className="nf-reveal select-none font-black text-[10rem] md:text-[14rem] leading-none tracking-tighter text-zinc-100 dark:text-zinc-900"
          aria-hidden="true"
        >
          404
        </p>

        <div className="-mt-8 relative z-10">
          <h1 className="nf-reveal text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
            Page Not Found
          </h1>
          <p className="nf-reveal text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mb-8 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="nf-reveal flex flex-wrap items-center justify-center gap-3">
            <Link to="/" className="btn btn-primary btn-lg">
              Go Home
            </Link>
            <Link to="/#projects" className="btn btn-ghost btn-lg">
              View Projects
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
