// #genai

export async function registerEntry({ email, phone, name, idea }) {
  const response = await fetch('/.netlify/functions/register-entry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      phone,
      name,
      idea,
      pageUrl: window.location.href,
    }),
  })

  let result = {}
  try {
    result = await response.json()
  } catch {
    result = { message: 'The email service returned an invalid response.' }
  }

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'We could not submit your entry right now.')
  }

  return result
}
