import React from  'react'; 

function ProductItem ({product}){
        
    return (<div className='product-item'>
        <img src={product.img} alt="Product's image"/>
        <p> Product's infos </p>
        <p>name : {product.name}</p>
        <p> category : {product.category}</p>
        <p> Price : {product.price}</p>
     </div>)
}

export default ProductItem;