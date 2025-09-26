import { useState, useEffect} from 'react'
import './App.css'
import type { ProductOverview } from "./types/Product";

type TShirt = {
  id : number;
  name : string;
  price : number;
}
function App() {
  
  const [tshirts, setTShirts] = useState<TShirt[]>([])
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
    async function fetchTShirts() {
      try {
        const res = await fetch("https://localhost:7297/store/tshirts?genders=Men", {
          method: "GET",
          headers: {
            "accept": "application/json",
            "ApiKey": "ApiKey123"
          }
        });

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const data: ProductOverview[] = await res.json();
        setTShirts(data);
      } catch (err: any) {
        setError(err.message);
        console.error("Failed to fetch T-shirts:", err);
      }
    }
    fetchTShirts();
  }, []);

  return (
    <>
    <h1>BMTH Shirt Collection</h1>

      {tshirts.length === 0 && 
      (
      <p>The API is currently not working correctly, no shirts available</p>
      )}


      <p> TEST 5 </p>


      <ul>
        {tshirts.map((shirt) => (
          <li key={shirt.id}>
            {shirt.name} - {shirt.price}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
