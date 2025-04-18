import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'; 
import 'boxicons/css/boxicons.min.css';
function App() {
  const [count, setCount] = useState(0)
 

  
  
  return (
    <>
    <Navbar /> 
    
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Your Ultimate Destination for Books, Coffee, and Community</h1>
      <div className="card">
        <p>
        Welcome to an online store that brings together book lovers and coffee enthusiasts in one unique space. Here, you can purchase your favorite books, discover new coffee blends, engage in meaningful discussions with like-minded individuals, and even contribute to a sustainable lifestyle by selling pre-loved items.
        </p>
      </div>
      <p className="read-the-docs">
      Mateusz Jędrkowiak, Karolina Kulas & Mateusz Markiewicz

      Jagiellonian University, 2025
      </p>

    </>

  )
}

export default App
