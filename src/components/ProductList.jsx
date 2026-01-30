import ProductItem from "./ProductItem";


function ProductList ({Products}){
        
    return(
        <ul>
            {Products.map((product)=> <ProductItem product={product} key={product.id}/>)}
        </ul>
    )
}

export default ProductList;