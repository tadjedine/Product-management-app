import React, { useEffect, useState } from  'react'; 

function ProductItem ({product, onDeleteProduct, onEditProduct, disableEdit}){
        
    return (
        <li className='product-item'>
            <img src={product.image_url} alt="Product's image"/>
            <p> Product's infos : </p>
            <p>- title : {product.title}</p>
            <p>- Category : {product.category}</p>
            <p>- Price : {product.price} $</p>

            <button className='btn-edit' onClick={()=>onEditProduct(product)} disabled={disableEdit}> Edit</button>
            <button className='btn-delete' onClick={()=>onDeleteProduct(product.id)}> Delete </button>
        </li>)
}


export function FormAddProduct ({onAddProduct}){
    const [name, setName]= useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");


    function handleAddProduct(e){
        e.preventDefault();
        if(!name || !category || !price || !image) return;

        const newProduct = {id : crypto.randomUUID(), name, category, price: Number(price), currency: "USD",
                stock_status: "in_stock", image}

        onAddProduct(newProduct);

        setName(""); setImage(""); setCategory(""); setPrice("");
    }

    return(
        <form className='form-add-product' onSubmit={handleAddProduct}>

            <label>Product's name</label>
            <input type='text' value={name} onChange={(e)=>setName(e.target.value)}/>

            <label>Product's category</label>
            <input type='text' value={category} onChange={(e)=>setCategory(e.target.value)}/>

            <label>Product's price</label>
            <input type='text' value={price} onChange={(e)=>setPrice((e.target.value))}/>

            <label> Product's image URL</label>
            <input type="text" value={image} onChange={(e)=>setImage(e.target.value)} />

            <button type="submit">Add product</button>

        </form>
    )
}

export function FormEditProduct({EditedProduct, onUpdateProduct, onEditedProduct, onCancelEdit}){

    return(
        <form onSubmit={onUpdateProduct}>
        
        <input value={EditedProduct.name} onChange={(e)=>onEditedProduct({...EditedProduct, name: (e.target.value)})}/>
        <input  value={EditedProduct.category} onChange={(e)=>onEditedProduct({...EditedProduct, category: (e.target.value)})}/>
        <input value={EditedProduct.price} onChange={(e)=>onEditedProduct({...EditedProduct, price: (e.target.value)})}/>
        <input value={EditedProduct.image_url} onChange={(e)=>onEditedProduct({...EditedProduct, image_url: (e.target.value)})}/>
            <button type='submit' className='btn-edit'>Edit product</button>
            <button type='button'className='btn-delete' onClick={onCancelEdit}>Cancel</button>
        </form>
    )
}

export function ProductForm({initialProduct, onSubmitProduct, onCancel}){

    const emptyProduct = {id : crypto.randomUUID(), name : '', category : '', price:'', currency: "USD",
                        stock_status: "in_stock", image:''}
    const [draftProduct, setDraftProduct] = useState(initialProduct ?? emptyProduct);

    const isEditMode = Boolean(initialProduct);

    useEffect(()=>{
        setDraftProduct(initialProduct ?? emptyProduct)
    }, [initialProduct])

    function handleSubmit(e){
        e.preventDefault();
        onSubmitProduct(draftProduct);
    }
    return(
        <form onSubmit={handleSubmit}>

            <label>Product's name</label>
            <input type='text' value={draftProduct.name} onChange={(e)=>setDraftProduct({...draftProduct, name: (e.target.value)})}/>

            <label>Product's category</label>
            <input type='text' value={draftProduct.category} onChange={(e)=>setDraftProduct({...draftProduct, category:(e.target.value)})}/>

            <label>Product's price</label>
            <input type='text' value={draftProduct.price} onChange={(e)=>setDraftProduct({...draftProduct, price: (e.target.value)})}/>

            <label> Product's image URL</label>
            <input type="text" value={draftProduct.image} onChange={(e)=>setDraftProduct({...draftProduct, image: (e.target.value)})}/>

            <button type="submit">{isEditMode ? 'Save changes' :'Add product'  }</button>
           {isEditMode && <button type='button'className='btn-delete' onClick={onCancel}>Cancel</button>}
        </form>
    )
}

    export function Button({onClick, label, className}){
        return <button className= {className} onClick={onClick}>{label}</button>
    }


export default ProductItem;