import { useState, useEffect} from 'react'
import { Routes, Route, Link } from "react-router-dom";
import './App.css'
import type { ProductOverview } from "./types/Product";
import { apiFetch } from "./services/api/helper";
import ShirtDetail from './pages/ShopDetail/ShirtDetail';


type TShirt = {
  id : number;
  name : string;
  price : number;
}


function App() {
  
  const [tshirts, setTShirts] = useState<TShirt[]>([])
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<ProductOverview[]>("/store/tshirts?genders=Men")
      .then(setTShirts)
      .catch((err: unknown) => console.error("API error:", err));
  }, []);


  return (
    <>
      <h1>BMTH Shirt Collection</h1>

      <Routes>
        {/* Overview page */}
        <Route
          path="/"
          element={
            <>
              {tshirts.length === 0 ? (
                <p>No shirts available</p>
              ) : (
                <ul>
                  {tshirts.map((shirt) => (
                    <li key={shirt.id}>
                      {/* Link to detail page */}
                      <Link to={`/tshirts/${shirt.id}`}>
                        {shirt.name} - €{shirt.price}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          }
        />

        {/*  Detail page */}
        <Route path="/tshirts/:id" element={<ShirtDetail />} />
      </Routes>
    </>
  );
}

export default App;
