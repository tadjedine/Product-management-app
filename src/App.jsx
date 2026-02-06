
import { useState } from 'react';
import './App.css'
import ProductList from './components/ProductList';
import { Button, FormAddProduct, FormEditProduct } from './components/ProductItem';


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
  
  const [products, setProducts] = useState(InitialProducts);
  const[editingProduct, setEditingProduct] = useState(null);
  const[showAddForm, setShowAddForm] = useState(false);

  function addProduct(product){
    setProducts((products)=>[...products, product])
  }

  function handleDeleteProduct(id){ 
    setProducts(products.filter((product)=> product.id !== id))
  }

  function handleEditProduct(product){
    setEditingProduct(product);
  }

  function handleUpdateProduct(e){
     e.preventDefault();
    setProducts((products)=> products.map(p => (p.id === editingProduct.id ? editingProduct : p)))

    setEditingProduct(null);
  }

  return (
    <div className='main'>
      {showAddForm && <FormAddProduct onAddProduct={addProduct}/>}
       <Button onClick={()=>setShowAddForm((show)=> !show)} label={showAddForm ? "Close" : "Add"}/>
      <ProductList products={products} onDeleteProduct={handleDeleteProduct} onEditProduct={handleEditProduct}/>
      {editingProduct && <FormEditProduct EditedProduct={editingProduct} onUpdateProduct={handleUpdateProduct} onEditedProduct={handleEditProduct} onCancelEdit={()=>setEditingProduct(null)}/>}

    </div>)
}

export default App
