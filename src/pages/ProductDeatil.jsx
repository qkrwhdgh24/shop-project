import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components';
import UseCart from '../context/UseCart';
import ProductReview from '../components/ProductReview';
import { formatCurrency } from '../api/firebase';


function ProductDetail() {
    const {addItemCart} = UseCart();
    const state = useLocation().state;
    console.log(state)
     const { id, image, price, option, colors, title, description,category } = state;
     //console.log(option)
     const setOpt = option.split(',').map((option)=>option.trim())
     const [selected , setSelected] = useState(setOpt && setOpt[0])
     const [success, setSuccess] = useState();//장바구니 아이템 전송 여부 값
     console.log(selected)
     const selectOpt = (e) =>{
        console.log(selected)
        setSelected(e.target.value)
     }

     const cartItem = ()=>{
        const product = {id, image, title, price, option:selected, quantity : 1}
        //quantity : 1 수량

        addItemCart.mutate(product,{
            onSuccess : ()=>{
                setSuccess('장바구니에 아이템이 추가되었습니다.')
            }
        })
     }
     
    return (
        <div className='container'>
            <DetailPage>
                <div className='detailImg'>
                    <img src={image} alt={title}/>
                </div>
                <div className='detailText'>
                    <h3>{title}</h3>
                    <p className='price'>가격 <span>{formatCurrency(price)}</span></p>
                    <p className='description'>{description}</p>

                    <div className='detailOpt'>
                        {/* 리액트에서는 label의 for대신에 htmlFor로 변경하여 사용 */}
                        <label className='labelText' htmlFor='optSelect'>옵션</label>
                        <select id="optSelect" onChange={selectOpt} value={selected}>
                            {setOpt && setOpt.map((option,index)=>(
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='detailBTns'>
                    <button className='cartBtn' onClick={cartItem}>장바구니 담기</button>
                    <button className='buyBtn'>구매하기</button>
                </div>
                {success &&<p>{success}</p>}
            </DetailPage>
            <ProductReview productId={id}/>
        </div>
    )
}

export default ProductDetail

const DetailPage = styled.div`
    width: 100%;
    display: flex;
    gap: 40px;
    .detailImg{
        max-width: 400px;
        img{
            width: 100%;
            display: block;
        }
    }
    .detailText{
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
        h3{
            font-size: 24px;
            width: 100%;
            font-weight: noraml;
            border-bottom: solid 1px rgba(0,0,0,0.1);
            padding-bottom: 20px;
        }
        .price{
            display: flex;
            align-items: center;
            gap: 30px;
        }
    }


`
