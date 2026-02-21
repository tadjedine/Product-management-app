
import { useState } from 'react';
import './App.css'
import ProductList from './components/ProductList';
import { Button, FormAddProduct, FormEditProduct, ProductForm } from './components/ProductItem';
import { Search } from './components/Navigation';


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
  const[editingProduct, setEditingProduct] = useState(null);   // a state to store the product being edited
  const[showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setsearchTerm] = useState("");

  // Derived states
  const  isAdding = (showAddForm === true);
  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

  function handleAddProduct(product){
    setProducts((products)=>[...products, product])
  }

  function handleDeleteProduct(id){ 
    setProducts(products.filter((product)=> product.id !== id))
  }

  function handleEditProduct(product){
    setEditingProduct(product);
  }

  // function responsible for updating a product, once edited, inside products array 
  function handleUpdateProduct(updatedProduct){

    setProducts((products)=> products.map(p => (p.id === updatedProduct.id ? updatedProduct : p)))
    setEditingProduct(null);
  }

 

  return (
    <div className='main'>
      <Search query={searchTerm} setQuery={setsearchTerm}/>

      {showAddForm && <ProductForm initialProduct={editingProduct} onSubmitProduct={editingProduct ? handleUpdateProduct : handleAddProduct}/>}
      <Button onClick={()=>setShowAddForm((show)=> !show)} label={showAddForm ? "Close" : "Add"}/>
    
      <ProductList products={filteredProducts} onDeleteProduct={handleDeleteProduct} onEditProduct={handleEditProduct} disableEdit={isAdding}/>
      
      {editingProduct && <ProductForm initialProduct={editingProduct} onSubmitProduct={handleUpdateProduct} onCancel={()=> setEditingProduct(null)}/>}

    </div>)
}

export default App
