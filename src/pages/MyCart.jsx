import React from 'react'
import UseCart from '../context/UseCart';
import CartItem from '../components/CartItem';
import styled from 'styled-components';

function MyCart() {
    const {cartInfo : {data : products}} = UseCart();
    const isItem = products && products.length > 0;
    return (
        <div className='container'>
            <h2 className='itemTitle'>장바구니 리스트</h2>
            {!isItem &&<p>장바구니에 상품이 없습니다.</p>}

            {isItem &&(
                <CartList className='cartList'>
                    {products && products.map((el,index)=>(
                        <CartItem key={el.id} product={el} index={index}/>
                    ))}
                </CartList>
            )}
            
        </div>
    )
}

export default MyCart

const CartList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 30px;
    border-top: solid 1px rgba(0,0,0,0.2);
    padding: 24px 0px;
    li{
        display: flex;
        align-items: center;
        border-bottom: solid 1px rgba(0,0,0,0.2);
        padding: 12px 0px;
        gap: 12px;
        img{
            width: 100px;
            display: block;
        }
        .quantityWrap{
            display: flex;
            gap:10px;
        }

    }


`
