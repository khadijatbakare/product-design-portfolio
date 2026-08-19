import { useCallback, useEffect, useState } from 'react'

const getRoute = () => window.location.hash.slice(1) || 'home'

export function useRoute() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const handleHashChange = () => setRoute(getRoute())

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = useCallback((target: string) => {
    const nextHash = target === 'home' ? '' : target

    if (getRoute() === target) {
      window.scrollTo(0, 0)
      return
    }

    window.location.hash = nextHash
    window.scrollTo(0, 0)
  }, [])

  return { route, navigate }
}
