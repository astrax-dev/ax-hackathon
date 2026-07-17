// #genai
export const SITE = {
  name: 'Hackathon 2026',
  parentName: 'AstraX',
  publicEmail: 'hello@astrax.dev',
  baseUrl: 'https://hackathon.1ax.in',
  astraxAboutUrl: 'https://astrax.dev/about',
  astraxHackathonUrl: 'https://astrax.dev/hackathon',
}

export const COMMUNITY = {
  discordUrl: 'https://1ax.in/Join-AstraX-Community',
}

export const HACKATHON = {
  label: 'AstraX Hackathon 2026',
  headline: "India's 1st Hackathon",
  intro:
    "A community-run hackathon for builders across India—ship a game, app, or website, get mentored by experienced engineers, and compete for a growing prize pool.",
  registerCta: 'Register',
}

export const SPONSORS = {
  label: 'Sponsors',
  headline: 'Back the builders',
  intro:
    "AstraX Hackathon 2026 is community-run and growing. Sponsors fund the prize pool, mentorship, and swag for builders across India.",
  tiers: [
    {
      name: 'Title Sponsor',
      description: 'Top billing across the event, stage time, and first pick of the prize pool branding.',
    },
    {
      name: 'Gold Sponsor',
      description: 'Prominent logo placement, mentor slots, and dedicated shoutouts to the community.',
    },
    {
      name: 'Silver Sponsor',
      description: 'Logo placement and recognition across event pages and Discord announcements.',
    },
    {
      name: 'Community Sponsor',
      description: 'Support goodies, swag, or infrastructure credits for participating teams.',
    },
  ],
  ctaLabel: 'Become a sponsor',
}

export const EMAIL_FUNCTION_CONFIG = {
  smtpHost: 'smtp.hostinger.com',
  smtpPort: 465,
  smtpSecure: true,
  smtpUser: 'contact@astrax.dev',
  smtpFromEmail: 'noreply@astrax.dev',
  smtpFromName: 'AstraX Mailer',
  sendToEmail: 'contact@astrax.dev',
  requiredEnvVars: ['SMTP_PASS'],
}
