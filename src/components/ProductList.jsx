import ProductItem from "./ProductItem";

function ProductList ({products, onDeleteProduct, onEditProduct}){
        
    return(
        <ul>
            {products.map((product)=> <ProductItem product={product} key={product.id} onDeleteProduct={onDeleteProduct} onEditProduct={onEditProduct}/>)}
        </ul>
    )
}

export default ProductList;