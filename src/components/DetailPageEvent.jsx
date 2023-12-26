import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { formatCurrency } from '../api/firebase';

function DetailPageEvent({ product }) {

    const colorItem = product.colors;

    /*
    값을 변수에 담아서 사용했을때와 아닐 때 차이

    장점 : 가독성 차이 , 재사용성에도 장점

    주의점 : 변수에 담긴 값은 변수에 저장이 되버린다.
    product.colors의 값이 달라진다면
    colorItem의 값은 변동이 없다.

    */

    /*
    단순한 페이지의 이동이 목적이라면 Link를 사용하면 되지만
    페이지를 이동하면서 데이터의 이동도 포함해야 한다면 Link 대신 useNavigate를 사용해야 한다.
    */

    const navigate = useNavigate();
    const detailNavigate = ()=>{
        navigate(`/products/deatil/${product.id}`,{
            state : {
                title : product.title,
                id : product.id,
                image : product.image,
                price : product.price,
                option : product.option,
                category : product.category,
                colors : product.colors,
                description : product.description
            }
        })
    }

    return (
        <DetailItem onClick={detailNavigate}>
            
                <img src={product.image} />
                <div className='textWrap'>
                    <h3 className='itemTitle'>{product.title}</h3>
                    <div className="itemFlex">
                        <p className='itemPrice'>{formatCurrency(product.price)}</p>
                        <p className='itemOpt'>{product.option}</p>
                    </div>
                    <div className='itemColor'>
                        {/* {product.colors} */}
                        {/* 컬러 배열로 출력 */}
                        {/* {product.colors && product.colors.map((color,index)=>(
                        <div key={index} style={{backgroundColor : color}}/>
                    ))} */}
                        {colorItem && colorItem.map((color, index) => (
                            <div key={index} style={{ backgroundColor: color }} />
                        ))}
                    </div>
                </div>
            
        </DetailItem>
    )
}

export default DetailPageEvent

const DetailItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    .textWrap{
        display: flex;
        flex-direction: column;
        gap: 10px;
        .itemTitle{
            font-size: 20px;
            font-weight : normal;
            transition: 500ms;
            color: rgba(0,0,0,0.5);
            &:hover{
                color: rgba(0,0,0,1);
            }
        }
        .itemFlex{
            display: flex;
            justify-content: space-between;
        }
        .itemColor{
            display: flex;
            height: 20px;
            gap: 2px;
            div{
                width: 20px;
                height: 20px;
            }
        }
    }


`
