 import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import EmojiLogin from './EmojiLogin'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EmojiLogin />
  </StrictMode>,
)