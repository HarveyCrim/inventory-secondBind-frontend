import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import AuthCallback from './components/AuthCallback'
import AuthProvider from './auth/AuthProvider'
import Search from './pages/Search'

function App() {

  //react-router-dom package to handle all routing
  return (
    <BrowserRouter>
       <AuthProvider>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/authCallback" element = {<AuthCallback />} />
        <Route path = "/search" element = {<Search />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
    
  )
}

export default App
