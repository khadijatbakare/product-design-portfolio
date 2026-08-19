import React, { useEffect, useState } from 'react'
import content from './data/content.json'
import { useRoute } from './hooks/useRoute'
import { projectSummaries, caseStudies } from './data/projects'
import { artRegistry } from './components/artRegistry'
import { ProjectCard } from './components/ProjectCard'
import { CaseStudyBody } from './components/CaseStudyBody'
import { BookshelfWidget } from './components/BookshelfWidget'

const Arrow = ({ diagonal = false }) => <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>

function Header({ page, navigate }) {
  const [open, setOpen] = useState(false)
  const go = (target) => { setOpen(false); navigate(target) }
  return (
    <header className="site-header">
      <button className="wordmark" onClick={() => go('home')} aria-label="Go home">{content.site.initials}<span>.</span></button>
      <button className="menu-button" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
      <nav className={open ? 'nav-open' : ''} aria-label="Main navigation">
        <button className={page === 'home' ? 'active' : ''} onClick={() => go('home')}>Work</button>
        <button className={page === 'about' ? 'active' : ''} onClick={() => go('about')}>About</button>
        <a href={content.site.resumePath}>Résumé <Arrow diagonal /></a>
        <a className="nav-cta" href={`mailto:${content.site.email}`}>Let’s talk <Arrow /></a>
      </nav>
    </header>
  )
}

function Home({ navigate }) {
  return <>
    <main>
      <section className="hero section-wrap">
        <div className="eyebrow"><span className="status-dot" /> {content.site.availability}</div>
        <h1>I design clear,<br />coherent products<br />from <em>complex ideas.</em></h1>
        <div className="hero-bottom">
          <p>{content.hero.intro}</p>
          <button className="circle-link" onClick={() => document.querySelector('#work').scrollIntoView({ behavior: 'smooth' })} aria-label="View selected work"><Arrow /></button>
        </div>
      </section>

      <section className="work-section section-wrap" id="work">
        <div className="section-heading"><div><span>01 / SELECTED WORK</span><h2>A closer look<br />at how I work.</h2></div><p>Projects spanning foundational product decisions, complex user flows, and systems designed to scale.</p></div>
        <div className="project-list">
          {projectSummaries.map(project => <ProjectCard project={project} onOpen={navigate} key={project.slug} />)}
        </div>
      </section>

      <section className="messy-section section-wrap">
        <div className="messy-mark">✳</div>
        <h2>I’m most useful when the problem is still <em>a little messy.</em></h2>
        <div className="messy-copy">{content.positioning.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
      </section>

      <section className="about-preview section-wrap">
        <div className="portrait-placeholder"><span>YOUR<br />PORTRAIT</span><small>Replace with a candid photo</small></div>
        <div className="about-preview-copy"><span className="kicker">02 / ABOUT</span><h2>I started out in<br /><em>mechanical engineering.</em></h2><p>It taught me to break large problems into understandable parts, work within real constraints, and think carefully about how systems behave. Product design gave me a more human place to apply that way of thinking.</p><button className="text-link" onClick={() => navigate('about')}>More about me <Arrow /></button></div>
      </section>
    </main>
    <Footer />
  </>
}

function About() {
  const personal = content.personal.map(item => [item.id, item.label, item.title, item.caption])
  return <><main>
    <section className="about-hero section-wrap">
      <span className="kicker">ABOUT ME</span>
      <h1>Curious by nature.<br /><em>Structured by training.</em></h1>
      <div className="about-intro"><p>I’m a product designer who enjoys making sense of complicated things—especially when a product has many moving parts, unclear flows, or needs a stronger foundation before it can grow.</p></div>
    </section>
    <section className="story section-wrap">
      <div className="story-photo"><span>ADD YOUR PHOTO</span></div>
      <div className="story-copy">
        <p>I originally studied mechanical engineering. I was drawn to the logic of it: understanding how different parts affect one another, working through constraints, and finding practical ways to solve difficult problems.</p>
        <p>Over time, I became more interested in the experiences around the systems than the machines themselves. That curiosity led me to product design.</p>
        <p>The medium changed, but parts of my approach stayed with me. I still like to understand how things fit together before deciding what they should look like. I ask a lot of questions, map the underlying structure, and work from the whole experience down to the smallest interaction.</p>
      </div>
    </section>
    <section className="principles section-wrap">
      <div className="section-heading"><div><span>HOW I WORK</span><h2>Principles, not<br />a fixed process.</h2></div><p>Every project is different. These are the ideas I return to.</p></div>
      <div className="principle-grid">
        {content.principles.map(item => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}
      </div>
    </section>
    <section className="off-clock section-wrap">
      <div className="off-heading"><span className="kicker">OFF THE CLOCK</span><h2>Away from work,<br />life looks <em>like this.</em></h2></div>
      <div className="personal-grid">{personal.map(([cls,label,title,caption]) => <article className={`personal-card ${cls}`} key={cls}><div className="personal-image">{cls === 'books' ? <BookshelfWidget books={[{ title: 'The Design of Everyday Things', spineColor: '#e9b949' }, { title: 'Ways of Seeing', spineColor: '#cf6848' }, { title: 'The Creative Act', spineColor: '#ddd4bd' }, { title: 'Thinking in Systems', spineColor: '#677d6a' }, { title: 'Tomorrow, and Tomorrow, and Tomorrow', spineColor: '#8296b8' }]} /> : <span>ADD {cls.toUpperCase()} PHOTO</span>}</div><div className="personal-caption"><span>{label}</span><h3>{title}</h3><p>{caption}</p></div></article>)}</div>
    </section>
  </main><Footer /></>
}

function CaseStudy({ project, navigate }) {
  useEffect(() => window.scrollTo(0, 0), [])
  const CoverArt = artRegistry[project.coverArtKey]
  const currentIndex = caseStudies.findIndex(item => item.slug === project.slug)
  const nextProject = caseStudies[(currentIndex + 1) % caseStudies.length]
  return <><main className="case-study">
    <section className="case-hero section-wrap"><button className="back-link" onClick={() => navigate('home')}>← Back to work</button><p className="project-type">{project.type}</p><h1>{project.title}</h1><p className="case-deck">{project.deck}</p><div className="case-meta">{Object.entries(project.meta).map(([label,item]) => <div key={label}><span>{label.toUpperCase()}</span><strong>{item}</strong></div>)}</div></section>
    <div className={`case-cover project-${project.coverArtKey}`}><CoverArt /></div>
    <CaseStudyBody blocks={project.body} />
    <div className="next-project section-wrap"><span>NEXT PROJECT</span><button onClick={() => navigate(nextProject.slug)}>{nextProject.title} <Arrow /></button></div>
  </main><Footer /></>
}

function Footer() {
  return <footer className="footer"><div className="section-wrap"><span className="kicker">{content.footer.eyebrow}</span><h2>Let’s make sense<br />of it <em>together.</em></h2><a href={`mailto:${content.site.email}`}>{content.site.email} <Arrow /></a><div className="footer-bottom"><span>© 2026 {content.site.name}</span><div><a href={content.site.linkedinUrl}>LINKEDIN ↗</a><a href={content.site.resumePath}>RÉSUMÉ ↗</a></div><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>BACK TO TOP ↑</button></div></div></footer>
}

export default function App() {
  const { route: page, navigate } = useRoute()
  const project = caseStudies.find(project => project.slug === page)
  return <div className="app"><Header page={page} navigate={navigate} />{project ? <CaseStudy project={project} navigate={navigate} /> : page === 'about' ? <About /> : <Home navigate={navigate} />}</div>
}
