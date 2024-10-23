import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Search } from './page/searchPage/search.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    
      </StrictMode>,
)
