// #genai
import { useEffect, useState } from 'react'

export default function LazyThreeBackground() {
  const [Background, setBackground] = useState(null)

  useEffect(() => {
    let canceled = false

    const load = () => {
      import('./ThreeBackground').then((mod) => {
        if (!canceled) setBackground(() => mod.default)
      })
    }

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(load, { timeout: 2000 })
      return () => {
        canceled = true
        window.cancelIdleCallback(idleId)
      }
    }

    const timeoutId = setTimeout(load, 200)
    return () => {
      canceled = true
      clearTimeout(timeoutId)
    }
  }, [])

  if (!Background) {
    return <div className="three-background" aria-hidden="true" />
  }

  return <Background />
}

