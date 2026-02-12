import ProductItem from "./ProductItem";

function ProductList ({products, onDeleteProduct, onEditProduct, disableEdit}){
        
    return(
        <ul>
            {products.map((product)=> <ProductItem product={product} key={product.id} onDeleteProduct={onDeleteProduct} onEditProduct={onEditProduct} disableEdit={disableEdit}/>)}
        </ul>
    )
}

export default ProductList;