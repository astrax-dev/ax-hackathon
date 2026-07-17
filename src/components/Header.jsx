// #genai
import astraxLogo from '../assets/AstraX-logo.png'
import { COMMUNITY, SITE } from '../config/constants'
import DiscordIcon from './DiscordIcon'

const navLinkClass =
  'inline-flex items-center justify-center rounded-lg border border-astrax-border/50 bg-white/[0.02] px-3 py-2.5 text-sm font-medium text-astrax-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-astrax-accent/50 hover:bg-astrax-accent/5'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-astrax-black/60 backdrop-blur-xl border-b border-astrax-border/20">
      <nav className="section-container">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          <div className="flex min-w-0 items-center gap-3">
            <img src={astraxLogo} alt="AstraX logo" className="h-8 w-auto flex-shrink-0" />
            <span className="brand-wordmark truncate text-sm text-astrax-white sm:text-base">
              {SITE.name}
            </span>
          </div>

          <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
            <a href="#sponsors" className={`hidden md:inline-flex ${navLinkClass}`}>
              Sponsors
            </a>
            <a
              href={SITE.astraxHackathonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:inline-flex ${navLinkClass}`}
            >
              Hackathon
            </a>
            <a
              href={SITE.astraxAboutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:inline-flex ${navLinkClass}`}
            >
              About
            </a>
            <a
              href={COMMUNITY.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#5865F2] px-3 py-2.5 text-sm font-medium text-white shadow-lg shadow-[#5865F2]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4752C4] sm:px-4"
            >
              <DiscordIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Discord</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}
