import { Link } from 'react-router-dom'
import type { Creator } from '../types'

interface CardProps {
  creator: Creator
  onDelete?: (id: string) => void
}

export default function Card({ creator, onDelete }: CardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on buttons or links
    if ((e.target as HTMLElement).closest('button, a')) {
      return
    }
    window.location.href = `/creator/${creator.id}`
  }

  const cardStyle: React.CSSProperties = {
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    overflow: 'hidden'
  }

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    transition: 'transform 0.3s ease'
  }

  const descriptionStyle: React.CSSProperties = {
    lineHeight: '1.4',
    marginBottom: '1rem'
  }

  const contentStyle: React.CSSProperties = {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100% - 180px)'
  }

  return (
    <article
      onClick={handleCardClick}
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'

        const img = e.currentTarget.querySelector('img')
        if (img) {
          img.style.transform = 'scale(1.05)'
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = ''

        const img = e.currentTarget.querySelector('img')
        if (img) {
          img.style.transform = 'scale(1)'
        }
      }}
    >
      {creator.imageURL && (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src={creator.imageURL}
            alt={creator.name}
            style={imageStyle}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
            height: '60px',
            pointerEvents: 'none'
          }} />
        </div>
      )}

      <div style={contentStyle}>
        <header style={{ marginBottom: '0.5rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>{creator.name}</h3>
        </header>

        <p style={descriptionStyle}>{creator.description}</p>

        <footer style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {creator.url && (
              <a href={creator.url} target="_blank" rel="noopener noreferrer" role="button" className="secondary">
                Visit URL
              </a>
            )}
            <Link to={`/edit/${creator.id}`} role="button" className="contrast">
              Edit
            </Link>
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(creator.id)
                }}
                style={{ backgroundColor: '#dc3545' }}
              >
                Delete
              </button>
            )}
          </div>
        </footer>
      </div>
    </article>
  )
}
