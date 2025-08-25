import { useState, useEffect } from 'react'
import Card from '../components/Card'
import type { Creator } from '../types'
import { fetchCreators, deleteCreator } from '../services'

export default function ShowAll() {
  const [creators, setCreators] = useState<Creator[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCreators()
  }, [])

  async function loadCreators() {
    console.log('Fetching creators...')
    const data = await fetchCreators()
    console.log('Setting creators:', data)
    setCreators(data)
    setLoading(false)
  }

  async function handleDeleteCreator(id: string) {
    const success = await deleteCreator(id)
    if (success) {
      setCreators(creators.filter(creator => creator.id !== id))
    }
  }

  console.log('ShowAll render - loading:', loading, 'creators:', creators)

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>All Creators</h1>
      <p style={{ color: 'var(--muted-color)', marginBottom: '3rem' }}>
        Showing {creators.length} creators • Sorted alphabetically
      </p>
      {creators.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ marginBottom: '1rem' }}>No creators found.</p>
          <a href="/add" role="button">Add the first one!</a>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2rem',
          textAlign: 'left'
        }}>
          {creators.map(creator => (
            <Card
              key={creator.id}
              creator={creator}
              onDelete={handleDeleteCreator}
            />
          ))}
        </div>
      )}
    </div>
  )
}
