import React, { useEffect, useState } from 'react'
import { getProducts } from '../api/firebase';

function AllProduct() {
    const [product, setProduct] = useState([]);
    
    useEffect(()=>{
        const fetchProducts = async()=>{
            try{
                const products = await getProducts();
                setProduct(products)
            }catch(error){
                console.error(error)
            }
        }
        fetchProducts()
    },[])
    return (
        <div>
            {product && product.map(el=>(
                <div key={el.id}>
                    {/* <img src={el.image}/> */}
                    <p>{el.title}</p>
                </div>
            ))}
        </div>
    )
}

export default AllProduct
