import React from 'react'
import DetailPageEvent from './DetailPageEvent'
import styled from 'styled-components'

function Products({products}) {
    return (
        <>
            <ProductList className='productList'>
                {products && products.map((product)=>(
                    <li key={product.id} >
                        <DetailPageEvent product={product}/>
                    </li>
                ))}
            </ProductList>
        
        </>
    )
}

export default Products

const ProductList = styled.ul`
    display: flex;
    gap: 20px 5%;
    flex-wrap: wrap;
    li{
        flex-shrink: 0;
        flex-basis: 30%;
    }
`
