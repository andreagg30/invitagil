import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './modules/sign-up'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Inicio</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App