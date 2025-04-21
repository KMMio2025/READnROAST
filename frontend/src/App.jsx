import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'; 
import 'boxicons/css/boxicons.min.css';
function App() {
  const [count, setCount] = useState(0)
 

  
  
  return (
    <>
    <Navbar /> 
    
      <div>
        <a href="#" target="_blank"> 
          <img src="/images/read.png" className="logo" id="read" alt="READ - go to the books section" />
        </a>
        <a href="#" target="_blank"> 
          <img src="/images/roast.png" className="logo react" id="roast" alt="ROAST - go to the coffee section" />
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
