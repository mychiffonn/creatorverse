import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      backgroundColor: 'var(--card-background-color)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      zIndex: 1000,
      borderBottom: '1px solid var(--muted-border-color)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      padding: '0.5rem 0',
      margin: 0,
      width: '100vw',
      left: 0,
      right: 0
    }}>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <strong style={{ fontSize: '1.5rem' }}>Creatorverse</strong>
        </Link>

        <Link
          to="/new"
          role="button"
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.9rem',
            textDecoration: 'none'
          }}
        >
          Add Creator
        </Link>
      </nav>
    </header>
  )
}
