import React, { useEffect, useState } from 'react';

function ProductItem({ product, onDeleteProduct, onEditProduct, disableEdit }) {
    return (
        <li className= "bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-lg flexflex-col items-center text-center ">
            {/* The API uses 'thumbnail' or 'images' array */}
            <img src={product.thumbnail} alt={product.title} className='w-full h-60 object-cover rounded-xl mb-4' />
            <p className='font-bold text-lg mb-1'> Product's infos : </p>
            <p className='text-gray-400 text-xl mb-4 italic'> {product.title}</p>
            <p className='text-gray-400 text-sm mb-4 italic'> {product.brand} - {product.category} </p>
            <p className='text-xl font-semibold mb-6 text-green-400'> Price: {product.price} $</p>

            <div className='flex gap-3 w-full justify-center'>
                <button className=" bg-green-700 hover:bg-green-600  px-2 py-1 rounded-md flex-1 transition delay-150 " onClick={() => onEditProduct(product)} disabled={disableEdit}> Edit</button>
                <button className="bg-[#790b0b] hover:bg-[#db1a17] px-2 py-1 rounded-md flex-1 transition delay-150  " onClick={() => onDeleteProduct(product)}> Delete </button>
            </div>
        </li>
    );
}

export function ProductForm({ initialProduct, onSubmitProduct, onCancel }) {
    
    const emptyProduct = {
        id: crypto.randomUUID(),
        title: '',
        brand: '',
        category: '',
        price: '',
        thumbnail: ''
    };

    const [draftProduct, setDraftProduct] = useState(initialProduct ?? emptyProduct);
    const [errors, setErrors] = useState({});

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
                required
                value={draftProduct.title} 
                onChange={(e) => setDraftProduct({ ...draftProduct, title: e.target.value })} 
            />
              {errors.title && <p className="error">{errors.title}</p>}
            <label>Brand</label>
            <input 
                type='text' 
                required
                value={draftProduct.brand} 
                onChange={(e) => setDraftProduct({ ...draftProduct, brand: e.target.value })} 
            />

            <label>Category</label>
            <input 
                type='text' 
                required
                value={draftProduct.category} 
                onChange={(e) => setDraftProduct({ ...draftProduct, category: e.target.value })} 
            />

            <label>Price</label>
            <input 
                type='number' 
                required
                value={draftProduct.price} 
                onChange={(e) => setDraftProduct({ ...draftProduct, price: Number(e.target.value) })} 
            />
              {errors.title && <p className="error">{errors.title}</p>}
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