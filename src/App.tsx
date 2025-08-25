import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ShowAll from './pages/ShowAll'
import Show from './pages/Show'
import Add from './pages/Add'
import Edit from './pages/Edit'

function App() {
  return (
    <Router>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Header />
        <main style={{
          maxWidth: '1200px',
          margin: '1rem auto',
          padding: '0 1rem',
          marginTop: '4rem',
          flex: 1,
          width: '100%'
        }}>
          <Routes>
            <Route path="/" element={<ShowAll />} />
            <Route path="/creator/:id" element={<Show />} />
            <Route path="/add" element={<Add />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
