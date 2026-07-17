// #genai
import { SITE, SPONSORS } from '../config/constants'

export default function Sponsors() {
  return (
    <section id="sponsors" className="section-container relative mt-20 lg:mt-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-gradient-to-r from-transparent via-astrax-accent to-transparent" />
          <span className="label-text">{SPONSORS.label}</span>
          <div className="h-px w-8 bg-gradient-to-r from-transparent via-astrax-accent to-transparent" />
        </div>
        <h2 className="heading-2 mb-4">
          <span className="text-white">Back the </span>
          <span className="gradient-text-accent">builders</span>
        </h2>
        <p className="body-large">{SPONSORS.intro}</p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
        {SPONSORS.tiers.map((tier) => (
          <div
            key={tier.name}
            className="rounded-lg border border-astrax-border/20 bg-astrax-card/20 p-5 text-left"
          >
            <h3 className="font-heading text-base font-medium text-white">{tier.name}</h3>
            <p className="mt-2 text-sm font-body leading-relaxed text-astrax-light/90">
              {tier.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a href={`mailto:${SITE.publicEmail}`} className="btn-primary">
          {SPONSORS.ctaLabel}
        </a>
      </div>
    </section>
  )
}
