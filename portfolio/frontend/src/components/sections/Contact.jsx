import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import axios from 'axios'
import SectionHeading from '../ui/SectionHeading'
import MagneticButton from '../ui/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const INITIAL_FORM = { name: '', email: '', message: '' }

const CONTACT_LINKS = [
  {
    label: 'Email',
    value: 'ayushman@example.com',
    href:  'mailto:ayushman@example.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'ayushman-git',
    href:  'https://github.com/ayushman-git',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'ayushman-chakraborty',
    href:  'https://linkedin.com/in/ayushman-chakraborty',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    value: '@ayushman_dev',
    href:  'https://twitter.com/ayushman_dev',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
]

function InputField({ id, label, type = 'text', name, value, onChange, required, placeholder, as: Tag = 'input', rows }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
        {label}
        {required && <span className="text-zinc-400 ml-0.5" aria-hidden="true"> *</span>}
      </label>
      <Tag
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="input"
        aria-required={required}
      />
    </div>
  )
}

export default function Contact() {
  const [form,    setForm]    = useState(INITIAL_FORM)
  const [status,  setStatus]  = useState('idle')
  const [message, setMessage] = useState('')
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      await axios.post('/api/contact', form)
      setStatus('success')
      setMessage("Message sent! I'll get back to you within 24 hours.")
      setForm(INITIAL_FORM)
    } catch (err) {
      setStatus('error')
      const msg = err.response?.data?.errors?.[0]?.msg
        ?? err.response?.data?.error
        ?? 'Something went wrong. Please try again.'
      setMessage(msg)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="section bg-zinc-50 dark:bg-zinc-950/50">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left — Contact info */}
          <div className="space-y-8">
            <div className="contact-reveal">
              <SectionHeading
                label="Say hello"
                title="Get In Touch"
                subtitle="I'm always open to discussing new opportunities, projects, and ideas. Don't hesitate to reach out."
              />
            </div>

            <div className="contact-reveal space-y-3">
              {CONTACT_LINKS.map(({ label, value, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-4 card-hover group"
                  aria-label={`${label}: ${value}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 uppercase font-mono tracking-wider">{label}</p>
                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                      {value}
                    </p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Right — Contact form */}
          <div className="contact-reveal">
            <div className="card p-8">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-6">Send a message</h3>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <InputField
                  id="contact-name"
                  label="Name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ayushman Chakraborty"
                />
                <InputField
                  id="contact-email"
                  label="Email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
                <InputField
                  id="contact-message"
                  label="Message"
                  name="message"
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity…"
                  as="textarea"
                  rows={5}
                />

                {/* Status message */}
                {message && (
                  <div
                    role="alert"
                    className={`text-sm rounded-xl px-4 py-3 ${
                      status === 'success'
                        ? 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                    }`}
                  >
                    {message}
                  </div>
                )}

                <MagneticButton className="w-full">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn btn-primary btn-lg w-full justify-center"
                    aria-live="polite"
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M21 12a9 9 0 11-6.219-8.56" strokeLinecap="round"/>
                        </svg>
                        Sending…
                      </>
                    ) : status === 'success' ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        Sent!
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </MagneticButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
