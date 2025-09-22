import { useState } from 'react'
import './App.css'

type TShirt = {
  id : number;
  name : string;
}

function App() {
  const [tshirt, setTShirt] = useState<TShirt[]>([])

  return (
    <>
    <h1>BMTH Shirt Collection</h1>
      {tshirt.length === 0 && 
      (<p>The API is currently not working correctly, no shirts available</p>)}
    </>
  )
}

export default App