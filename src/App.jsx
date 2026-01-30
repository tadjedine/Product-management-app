
import './App.css'
import ProductList from './components/ProductList'


const InitialProducts = [
  {
      "id": 101,
      "name": "Minimalist Desk Lamp",
      "category": "Home Decor",
      "price": 45.00,
      "currency": "USD",
      "stock_status": "in_stock",
      "rating": 4.8,
      "image_url": "https://example.com/images/lamp.jpg"
    },
    {
      "id": 102,
      "name": "Wireless Noise-Cancelling Headphones",
      "category": "Electronics",
      "price": 199.99,
      "currency": "USD",
      "stock_status": "low_stock",
      "rating": 4.5,
      "image_url": "https://example.com/images/headphones.jpg"
    },
    {
      "id": 103,
      "name": "Leather Journal Notebook",
      "category": "Stationery",
      "price": 24.50,
      "currency": "USD",
      "stock_status": "out_of_stock",
      "rating": 4.9,
      "image_url": "https://example.com/images/journal.jpg"
    }
]
function App() {
  const products = InitialProducts; 

  return (<div className='main'>
      <ProductList Products={products} />
  </div>)
}

export default App
