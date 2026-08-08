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

      <a   
        href="http://pf.kakao.com/_xlxdpBX"
        target="_blank"
        rel="noreferrer"
        style={{
          background: 'transparent', 
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          textDecoration: 'none',
        }}
      >
        <div style={{
          background: '#FEE500',
          borderRadius: '50%',
          width: 56,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          fontSize: '1.6rem',
          animation: 'float 2.5s ease-in-out infinite',
        }}>
          💬
        </div>
        <span style={{
          background: '#FEE500',
          color: '#3A1D1D',
          fontSize: '0.7rem',
          fontWeight: 700,
          padding: '4px 10px',
          borderRadius: 20,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          whiteSpace: 'nowrap',
          fontFamily: "'Noto Serif KR', serif",
          textAlign: 'center',
          lineHeight: 1.5,
        }}>
          우리 집 필요한 시공,<br/>견적이 궁금하다면?
        </span>
      </a>

    </BrowserRouter>
  )
}

export default App