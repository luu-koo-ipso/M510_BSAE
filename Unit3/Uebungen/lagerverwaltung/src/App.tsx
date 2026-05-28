import { produkte } from './data/mockData'
import Produkttabelle from './components/Produkttabelle'

export default function App() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 2rem' }}>
      <header
        style={{
          marginBottom: '2rem',
          padding: '1.75rem 2rem',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          borderRadius: 16,
          color: '#fff',
          boxShadow: '0 10px 25px -5px rgb(99 102 241 / 0.4)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.75rem' }}>📦</span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Lagerverwaltung
          </h1>
        </div>
        <p style={{ marginTop: '0.5rem', opacity: 0.9, fontSize: '0.95rem' }}>
          {produkte.length} Produkte geladen · Übung: Tabelle mit Paginierung
        </p>
      </header>

      <main>
        <Produkttabelle />
      </main>
    </div>
  )
}