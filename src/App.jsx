
import { useEffect, useState } from 'react';
import './App.css'
import ProductList from './components/ProductList';
import { Button, FormAddProduct, FormEditProduct, ProductForm } from './components/ProductItem';
import { ErrorMessage, Loader, Main, NavBar, Search } from './components/Navigation';


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
  
  const [products, setProducts] = useState([]);
  const[editingProduct, setEditingProduct] = useState(null);   // a state to store the product being edited
  const[showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsloading]= useState(false);
  const [error, setError] = useState("");


  // Derived states
  const  isAdding = (showAddForm === true);
  const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()));

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

 useEffect(()=>{
  const controller = new AbortController();

  async function fetchingProduct() {
    try {
      setIsloading(true);

      const res = await fetch("https://dummyjson.com/products", {signal: controller.signal})
      if(!res.ok) throw new Error("Something went wrong with fetching products")
      
      const data = await res.json();
      // if( data.Response === 'False') throw new Error("Product not found")

      setProducts(data.products);
      console.log(data.products)

    } catch (error) {
      if (error.name !== "AbortError")
        setError(error.message);
    } finally{ 
        setIsloading(false)
      }
  }

    fetchingProduct();
    return ()=>{ controller.abort()}
 }, [])

  return (
    <>
      <NavBar>
        <Search query={searchTerm} setQuery={setSearchTerm}/>
      </NavBar>

      <Main>
        {showAddForm && <ProductForm initialProduct={editingProduct} onSubmitProduct={editingProduct ? handleUpdateProduct : handleAddProduct}/>}
        <Button onClick={()=>setShowAddForm((show)=> !show)} label={showAddForm ? "Close" : "Add"}/>
      
       {!isLoading && !error && <ProductList products={filteredProducts} onDeleteProduct={handleDeleteProduct} onEditProduct=             {handleEditProduct} disableEdit={isAdding}/>}

       {isLoading && <Loader/>}
       {error && <ErrorMessage message={error}/>}

        
        {editingProduct && <ProductForm initialProduct={editingProduct} onSubmitProduct={handleUpdateProduct} onCancel={()=> setEditingProduct(null)}/>}
      </Main>

    </>)
}

export default App
