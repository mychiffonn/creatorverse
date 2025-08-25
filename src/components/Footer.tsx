export default function Footer() {
  return (
    <footer style={{
      top: '100vh',
      backgroundColor: 'var(--card-background-color)',
      borderTop: '1px solid var(--muted-border-color)',
      padding: '2rem 0',
      marginTop: 'auto',
      textAlign: 'center',
      fontSize: '0.875rem',
      color: 'var(--muted-color)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <p style={{ margin: '0 0 0.5rem 0' }}>
          © 2025 Creatorverse. All rights reserved.
        </p>
        <p style={{ margin: 0 }}>
          Photos, names, and content displayed on this page are the property of their respective creators and are used for informational purposes only. All trademarks, logos, and brand names are the property of their respective owners.
        </p>
      </div>
    </footer>
  )
}
