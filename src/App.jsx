import React from 'react'
import { SiteHeader } from './layout/SiteHeader'
import { SiteFooter } from './layout/SiteFooter'
import { RouteOutlet } from './RouteOutlet'
import { useRoute } from './hooks/useRoute'

export default function App() {
  const { route, navigate } = useRoute()
  return <div className="app">
    <SiteHeader route={route} navigate={navigate} />
    <RouteOutlet route={route} navigate={navigate} />
    <SiteFooter />
  </div>
}
