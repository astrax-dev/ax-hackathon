// #genai
import { SITE } from '../config/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-astrax-border/50 to-transparent" />
      <div className="section-container relative py-10 text-center">
        <a
          href={`mailto:${SITE.publicEmail}`}
          className="text-sm font-body font-medium text-astrax-light transition-colors hover:text-astrax-accent-light"
        >
          {SITE.publicEmail}
        </a>
        <p className="mt-4 text-xs font-body text-astrax-muted/60">
          © {currentYear} {SITE.parentName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
