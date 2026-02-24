
import { useEffect, useState } from 'react';
import './App.css'
import ProductList from './components/ProductList';
import { Button, ProductForm } from './components/ProductItem';
import { ErrorMessage, Loader, Main, NavBar, Search } from './components/Navigation';



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

  //handlers
  function handleAddProduct(product){
    setProducts((products)=>[...products, product])
    setShowAddForm(false)
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
      
       {!isLoading && !error && <ProductList products={filteredProducts} onDeleteProduct={handleDeleteProduct} onEditProduct=             {handleEditProduct} disableEdit={isAdding}/>}

       {isLoading && <Loader/>}
       {error && <ErrorMessage message={error}/>}

        {showAddForm && <ProductForm initialProduct={editingProduct} onSubmitProduct={editingProduct ? handleUpdateProduct : handleAddProduct}/>}
        {!showAddForm &&<Button onClick={()=>setShowAddForm((show)=> !show)} label={"Add a product"}/>}
        
        {editingProduct && <ProductForm initialProduct={editingProduct} onSubmitProduct={handleUpdateProduct} onCancel={()=> setEditingProduct(null)}/>}
      </Main>

    </>)
}

export default App
