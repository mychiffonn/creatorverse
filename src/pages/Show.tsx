import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import type { Creator } from '../types'
import { fetchCreator, deleteCreator } from '../services'

export default function Show() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [creator, setCreator] = useState<Creator | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      loadCreator(id)
    }
  }, [id])

  async function loadCreator(creatorId: string) {
    const data = await fetchCreator(creatorId)
    setCreator(data)
    setLoading(false)
  }

  async function handleDeleteCreator() {
    if (!id || !creator) return
    
    const confirmed = window.confirm(`Are you sure you want to delete ${creator.name}?`)
    if (!confirmed) return

    const success = await deleteCreator(id)
    if (success) {
      navigate('/')
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!creator) {
    return <div>Creator not found</div>
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <article style={{ padding: '2rem', margin: '1rem 0' }}>
        {creator.imageURL && (
          <img 
            src={creator.imageURL} 
            alt={creator.name} 
            style={{ 
              width: '100%', 
              height: '400px', 
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '2rem'
            }} 
          />
        )}
        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ marginBottom: '0.5rem' }}>{creator.name}</h1>
        </header>
        <p style={{ 
          fontSize: '1.1rem', 
          lineHeight: '1.6', 
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          {creator.description}
        </p>
        
        <footer>
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {creator.url && (
              <a href={creator.url} target="_blank" rel="noopener noreferrer" role="button" className="secondary">
                Visit URL
              </a>
            )}
            <Link to={`/edit/${creator.id}`} role="button" className="contrast">
              Edit
            </Link>
            <button
              onClick={handleDeleteCreator}
              style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
            >
              Delete
            </button>
            <Link to="/" role="button" className="secondary">
              Back to All
            </Link>
          </div>
        </footer>
      </article>
    </div>
  )
}