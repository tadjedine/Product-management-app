
import { useEffect, useState } from 'react';
// import './App.css'
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

  // function responsible for updating a product --once edited-- inside products array 
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
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <NavBar>
        <Search query={searchTerm} setQuery={setSearchTerm}/>
      </NavBar>

      <Main>
        
            {productToDelete && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="bg-gray-800 p-6  rounded-xl shadow-xl w-80 text-center">

                  <p className='mb-6'>
                      Delete "{productToDelete.title}" ?
                  </p>
                  <div className="flex justify-center gap-4">

                    <button 
                      onClick={cancelDeleteProduct}
                      className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-lg transition delay-150 duration-300 hover:-translate-y-1 hover:scale-110 " > Cancel
                    </button>
                    <button 
                      onClick={confirmDeleteProduct} 
                      className="bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded-lg transition delay-150 duration-300 hover:-translate-y-1 hover:scale-110"> Confirm
                    </button>

                  </div>

                </div>
              </div>)
            }
          
        
       {!isLoading && !fetchError && <ProductList products={filteredProducts} onDeleteProduct={handleDeleteClick} onEditProduct= {handleEditProduct} disableEdit={isAdding}/>}

       {isLoading && <Loader/>}
       {fetchError && <ErrorMessage message={fetchError}/>}

        {showAddForm && <ProductForm initialProduct={editingProduct} onSubmitProduct={editingProduct ? handleUpdateProduct : handleAddProduct}/>}
        {!showAddForm &&<Button onClick={()=>setShowAddForm((show)=> !show)} label={"Add a product"}/>}
        
        {editingProduct && <ProductForm initialProduct={editingProduct} onSubmitProduct={handleUpdateProduct} onCancel={()=> setEditingProduct(null)}/>}
      </Main>

    </div>)
}

export default App
