
import { useEffect, useState } from 'react';
import './App.css'
import ProductList from './components/ProductList';
import { Button, ProductForm } from './components/ProductItem';
import { ErrorMessage, Loader, Main, NavBar, Search } from './components/Navigation';
import usePersistedState from '../utils/hooks/usePersistedState';



function App() {
  
  const [products, setProducts] = usePersistedState("products", [])
  const[editingProduct, setEditingProduct] = useState(null);   // a state to store the product being edited
  const[showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsloading]= useState(false);
  const [fetchError, setFetchError] = useState("");
  const [productToDelete, setProductToDelete] = useState(null);


  // Derived states
  const  isAdding = (showAddForm === true);
  const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()));

  //handlers
  function handleAddProduct(product){
    setProducts((products)=>[...products, product])
    setShowAddForm(false)
  }

  function handleDeleteClick(product){
    setProductToDelete(product)
  }
  function confirmDeleteProduct(){ 
    setProducts(products.filter((product)=> product.id !== productToDelete.id))
    setProductToDelete(null)
  }
  function cancelDeleteProduct(){
    setProductToDelete(null)
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
        setFetchError(fetchError.message);
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
       {productToDelete && (
          <div className="modal">
            <p>Delete "{productToDelete.title}" ?</p>
            <button onClick={confirmDeleteProduct}>Yes</button>
            <button onClick={cancelDeleteProduct}>No</button>
          </div>)
        }
       {!isLoading && !fetchError && <ProductList products={filteredProducts} onDeleteProduct={handleDeleteClick} onEditProduct= {handleEditProduct} disableEdit={isAdding}/>}

       {isLoading && <Loader/>}
       {fetchError && <ErrorMessage message={fetchError}/>}

        {showAddForm && <ProductForm initialProduct={editingProduct} onSubmitProduct={editingProduct ? handleUpdateProduct : handleAddProduct}/>}
        {!showAddForm &&<Button onClick={()=>setShowAddForm((show)=> !show)} label={"Add a product"}/>}
        
        {editingProduct && <ProductForm initialProduct={editingProduct} onSubmitProduct={handleUpdateProduct} onCancel={()=> setEditingProduct(null)}/>}
      </Main>

    </>)
}

export default App
