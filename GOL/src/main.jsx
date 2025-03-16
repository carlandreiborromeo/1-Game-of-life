import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GameOfLife from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GameOfLife></GameOfLife>
  </StrictMode>,
)
