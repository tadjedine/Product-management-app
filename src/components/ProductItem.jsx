import React, { useEffect, useState } from 'react';

function ProductItem({ product, onDeleteProduct, onEditProduct, disableEdit }) {
    return (
        <li className='product-item'>
            {/* The API uses 'thumbnail' or 'images' array */}
            <img src={product.thumbnail} alt={product.title} />
            <p> Product's infos : </p>
            <p>- Title: {product.title}</p>
            <p>- Brand: {product.brand}</p>
            <p>- Category: {product.category}</p>
            <p>- Price: {product.price} $</p>

            <button className='btn-edit' onClick={() => onEditProduct(product)} disabled={disableEdit}> Edit</button>
            <button className='btn-delete' onClick={() => onDeleteProduct(product.id)}> Delete </button>
        </li>
    );
}

export function ProductForm({ initialProduct, onSubmitProduct, onCancel }) {
    // 2. Updated initial state keys to match API (title, brand, thumbnail)
    const emptyProduct = {
        id: crypto.randomUUID(),
        title: '',
        brand: '',
        category: '',
        price: '',
        thumbnail: ''
    };

    const [draftProduct, setDraftProduct] = useState(initialProduct ?? emptyProduct);
    

    const isEditMode = Boolean(initialProduct);

    // Sync state if the initialProduct prop changes
    useEffect(() => {
        setDraftProduct(initialProduct ?? emptyProduct);
    }, [initialProduct]);

    function handleSubmit(e) {
        e.preventDefault();
        //  if(!draftProduct.title || !draftProduct.category || !draftProduct.price || !draftProduct.image) return;
        const newErrors = {};
        
        if (!draftProduct.title.trim()) newErrors.title = "Title required"
        if(!draftProduct.price || draftProduct.price <= 0) newErrors.price = "Invalid price"

        setErrors(newErrors);
        if((Object.keys(newErrors)).length > 0 ) return;

        onSubmitProduct(draftProduct);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Product's Title</label>
            <input 
                type='text' 
                value={draftProduct.title} 
                onChange={(e) => setDraftProduct({ ...draftProduct, title: e.target.value })} 
            />

            <label>Brand</label>
            <input 
                type='text' 
                value={draftProduct.brand} 
                onChange={(e) => setDraftProduct({ ...draftProduct, brand: e.target.value })} 
            />

            <label>Category</label>
            <input 
                type='text' 
                value={draftProduct.category} 
                onChange={(e) => setDraftProduct({ ...draftProduct, category: e.target.value })} 
            />

            <label>Price</label>
            <input 
                type='number' 
                value={draftProduct.price} 
                onChange={(e) => setDraftProduct({ ...draftProduct, price: Number(e.target.value) })} 
            />

            <label>Thumbnail URL</label>
            <input 
                type="text" 
                value={draftProduct.thumbnail} 
                onChange={(e) => setDraftProduct({ ...draftProduct, thumbnail: e.target.value })} 
            />

            <button type="submit">{isEditMode ? 'Save changes' : 'Add'}</button>
            {isEditMode && <button type='button' className='btn-delete' onClick={onCancel}>Cancel</button>}
        </form>
    );
}

export function Button({ onClick, label, className }) {
    return <button className={className} onClick={onClick}>{label}</button>;
}

export default ProductItem;