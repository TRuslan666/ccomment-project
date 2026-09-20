import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import HomePage from './pages/HomePage'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
