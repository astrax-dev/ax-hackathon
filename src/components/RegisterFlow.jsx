// #genai
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { COMMUNITY, HACKATHON, SITE } from '../config/constants'
import { registerEntry } from '../lib/registerEmail'
import DiscordIcon from './DiscordIcon'

const fadeStep = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: 'easeOut' },
}

function IntroStep({ onRegister }) {
  return (
    <motion.div key="intro" {...fadeStep} className="max-w-2xl text-center mx-auto">
      <div className="mb-6 flex items-center justify-center gap-3">
        <div className="h-px w-8 bg-gradient-to-r from-transparent via-astrax-accent to-transparent" />
        <span className="label-text">{HACKATHON.label}</span>
        <div className="h-px w-8 bg-gradient-to-r from-transparent via-astrax-accent to-transparent" />
      </div>
      <h1 className="heading-1">
        <span className="gradient-text-accent">{HACKATHON.headline}</span>
      </h1>
      <p className="body-large mt-6">{HACKATHON.intro}</p>

      <a
        href={SITE.astraxHackathonUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex text-sm font-body font-semibold text-astrax-light transition-colors hover:text-astrax-accent-light"
      >
        Learn more about the hackathon →
      </a>

      <div>
        <button type="button" onClick={onRegister} className="btn-primary mt-10">
          {HACKATHON.registerCta}
        </button>
      </div>
    </motion.div>
  )
}

function FormStep({ onSubmitted, onBack }) {
  const [values, setValues] = useState({ email: '', phone: '', name: '', idea: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      await registerEntry(values)
      onSubmitted(values)
    } catch (submitError) {
      setError(submitError.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div key="form" {...fadeStep} className="max-w-xl mx-auto">
      <div className="rounded-2xl border border-astrax-border/30 bg-gradient-to-br from-astrax-card/80 to-astrax-card/40 p-8 shadow-2xl shadow-astrax-accent/5 backdrop-blur-sm md:p-10">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-8 bg-gradient-to-r from-astrax-accent to-astrax-violet" />
          <span className="label-text">Hackathon Entry</span>
        </div>
        <h2 className="heading-2 mb-2">
          <span className="text-white">Register your </span>
          <span className="gradient-text-accent">entry</span>
        </h2>
        <p className="body-large mb-8 text-base">
          Tell us who you are and what you're building. We'll get back to you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-xs font-body font-medium uppercase tracking-wide text-astrax-muted">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={values.name}
              onChange={handleChange('name')}
              placeholder="Your full name"
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-body font-medium uppercase tracking-wide text-astrax-muted">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={values.email}
              onChange={handleChange('email')}
              placeholder="you@example.com"
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-1.5 block text-xs font-body font-medium uppercase tracking-wide text-astrax-muted">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={values.phone}
              onChange={handleChange('phone')}
              placeholder="+91 90000 00000"
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="idea" className="mb-1.5 block text-xs font-body font-medium uppercase tracking-wide text-astrax-muted">
              Your idea
            </label>
            <textarea
              id="idea"
              required
              rows={4}
              value={values.idea}
              onChange={handleChange('idea')}
              placeholder="What do you want to build?"
              className="input-field resize-none"
            />
          </div>

          {error ? <p className="text-sm font-body text-astrax-rose">{error}</p> : null}

          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? 'Submitting…' : 'Submit entry'}
            </button>
            <button type="button" onClick={onBack} className="btn-secondary">
              Back
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

function SuccessStep({ name }) {
  return (
    <motion.div key="success" {...fadeStep} className="max-w-lg mx-auto text-center">
      <div className="mb-6 flex items-center justify-center gap-3">
        <div className="h-px w-8 bg-gradient-to-r from-transparent via-astrax-accent to-transparent" />
        <span className="label-text">Entry received</span>
        <div className="h-px w-8 bg-gradient-to-r from-transparent via-astrax-accent to-transparent" />
      </div>
      <h2 className="heading-2 mb-4">
        <span className="text-white">Thanks{name ? `, ${name}` : ''}. </span>
        <span className="gradient-text-accent">We'll get back to you.</span>
      </h2>
      <p className="body-large">
        Keep an eye on your inbox — while you wait, join the community and meet other builders.
      </p>

      <a
        href={COMMUNITY.discordUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-3 rounded-lg bg-[#5865F2] px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#5865F2]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4752C4] hover:shadow-[#5865F2]/35"
      >
        <DiscordIcon className="h-5 w-5" />
        <span>Join Discord community</span>
      </a>
    </motion.div>
  )
}

export default function RegisterFlow() {
  const [step, setStep] = useState('intro')
  const [name, setName] = useState('')

  return (
    <div className="section-container relative">
      <div aria-hidden="true" className="h-16 sm:h-24" />
      <AnimatePresence mode="wait">
        {step === 'intro' ? <IntroStep key="intro" onRegister={() => setStep('form')} /> : null}
        {step === 'form' ? (
          <FormStep
            key="form"
            onBack={() => setStep('intro')}
            onSubmitted={(values) => {
              setName(values.name)
              setStep('success')
            }}
          />
        ) : null}
        {step === 'success' ? <SuccessStep key="success" name={name} /> : null}
      </AnimatePresence>
    </div>
  )
}
