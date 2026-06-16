import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Partner from './pages/Partners'
import PartnerIssue from './pages/PartnerIssue'
import Care from './pages/Care'
import Review from './pages/Review'
import Contact from './pages/Contact'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/partners" element={<Partner />} />
        <Route path="/partners/:id" element={<Partner />} />
        <Route path="/partner-issue" element={<PartnerIssue />} />
        <Route path="/care/:id" element={<Care />} />
        <Route path="/review" element={<Review />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App