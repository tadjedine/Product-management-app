import ProductItem from "./ProductItem";

function ProductList ({products, onDeleteProduct, onEditProduct, disableEdit}){
        
    return(
        
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product)=> <ProductItem product={product} key={product.id} onDeleteProduct={onDeleteProduct} onEditProduct={onEditProduct} disableEdit={disableEdit}/>)}
            </ul>
    )
}

export default ProductList;