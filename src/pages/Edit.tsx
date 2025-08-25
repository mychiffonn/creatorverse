import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchCreator, updateCreator } from '../services'

export default function Edit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (id) {
      loadCreator(id)
    }
  }, [id])

  async function loadCreator(creatorId: string) {
    const data = await fetchCreator(creatorId)
    if (data) {
      setFormData({
        name: data.name || '',
        url: data.url || '',
        description: data.description || '',
        imageURL: data.imageURL || ''
      })
    }
    setFetching(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return
    
    setLoading(true)

    const success = await updateCreator(id, {
      name: formData.name,
      url: formData.url,
      description: formData.description,
      imageURL: formData.imageURL
    })

    if (success) {
      navigate(`/creator/${id}`)
    }
    
    setLoading(false)
  }

  if (fetching) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '2rem' }}>Edit Creator</h1>
      <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
        <label>
          Name *
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ marginBottom: '1rem' }}
          />
        </label>

        <label>
          URL *
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
            style={{ marginBottom: '1rem' }}
          />
        </label>

        <label>
          Description *
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{ marginBottom: '1rem', minHeight: '120px' }}
          />
        </label>

        <label>
          Image URL
          <input
            type="url"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            style={{ marginBottom: '2rem' }}
          />
        </label>

        <div style={{ 
          display: 'flex', 
          gap: '0.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Creator'}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/creator/${id}`)}
            className="secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
