import type { ComponentType } from 'react'
import type { ArtKey } from '../types/content'

function AtlasArt() {
  return <div className="atlas-art" aria-hidden="true"><div className="atlas-window atlas-window-back"><div className="window-top"><i /><i /><i /></div><div className="tokens"><b /><b /><b /><b /><b /></div><div className="token-lines"><span /><span /><span /></div></div><div className="atlas-window atlas-window-front"><div className="window-top"><i /><i /><i /></div><div className="window-layout"><div className="side-lines"><span /><span /><span /><span /></div><div className="dashboard"><small>Overview</small><strong>Good morning, Ada.</strong><div className="chart"><i /><i /><i /><i /><i /><i /></div><div className="mini-cards"><b /><b /><b /></div></div></div></div></div>
}

function NorthstarArt() {
  return <div className="northstar-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="phone phone-left"><div className="notch" /><span>Balance</span><strong>$24,860</strong><div className="wave" /><div className="phone-row" /><div className="phone-row short" /></div><div className="phone phone-center"><div className="notch" /><span>Send money</span><div className="avatar">AO</div><strong>Almost there</strong><div className="field" /><div className="field" /><button>Continue</button></div><div className="phone phone-right"><div className="notch" /><span>Activity</span><div className="activity-row" /><div className="activity-row" /><div className="activity-row" /></div></div>
}

export const artRegistry: Record<ArtKey, ComponentType> = {
  atlas: AtlasArt,
  northstar: NorthstarArt,
}
