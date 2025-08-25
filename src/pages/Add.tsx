import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addCreator } from '../services'

export default function Add() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const success = await addCreator({
      name: formData.name,
      url: formData.url,
      description: formData.description,
      imageURL: formData.imageURL
    })

    if (success) {
      navigate('/')
    }
    
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '2rem' }}>Add New Creator</h1>
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

        <div style={{ textAlign: 'center' }}>
          <button type="submit" disabled={loading} style={{ marginRight: '1rem' }}>
            {loading ? 'Adding...' : 'Add Creator'}
          </button>
          <a href="/" role="button" className="secondary">Cancel</a>
        </div>
      </form>
    </div>
  )
}