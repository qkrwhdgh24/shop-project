import React, { useContext, useRef, useState } from 'react'
import { upLoadImg } from '../api/imgupload';
import { addProducts } from '../api/firebase';
import { styled } from 'styled-components'
import { CategoryContext } from '../context/CategoryContext';

function UploadProduct() {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const fileRef = useRef();
    const {categoryList} = useContext(CategoryContext);
    console.log(categoryList)

    const colors = [
        '#f6d365', '#000000', '#a1c4fd', '#dddddd', '#4facfe',
        '#30cfd0', '#764ba2', '#c471f5', '#3cba92', '#ffb199'
    ]


    const [product, setProduct] = useState({
        title: '',
        price: '',
        option: '',
        category: '',
        description: '',
        colors: [],
    })//모든 상품의 상태를 빈 문자열로 초기화 

    const poductInfoChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file' && files && files[0]) {
            setFile(files[0])
        } else {
            setProduct((prev) => ({ ...prev, [name]: value }))
        }
    }

    const colorPicker = (color) => {
        setProduct((prev) => ({
            ...prev, colors: prev.colors.includes(color) ?
                prev.colors : [...prev.colors, color]
        }))
    }
    const removeColor = (colorRemove)=>{
        setProduct((prev)=>
        ({...prev, colors : prev.colors.filter(color => color !== colorRemove)}))
    }

    const uploadSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = await upLoadImg(file);
            await addProducts(product, url)
            setSuccess('업로드가 완료되었습니다.');
            setTimeout(() => {
                setSuccess(null);
            }, 2000);
            setFile(null)
            setProduct({
                title: '',
                price: '',
                option: '',
                category: '',
                description: '',
                colors: [],
            })

            if (fileRef.current) {
                fileRef.current.value = '';
            }


        } catch (error) {
            console.error(error)
            setError('업로드에 실패했습니다.')
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className='container'>
            <FormContainer>
                <div className='imgUploadWrap'>
                    {file && (
                        <img src={URL.createObjectURL(file)} />
                        //createObjectURL = url주소를 string형태로 변환
                    )}
                </div>
                <form onSubmit={uploadSubmit}>
                    <input
                        type='file'
                        name='file'
                        accept='image/*'
                        onChange={poductInfoChange}
                        ref={fileRef}

                    />
                    {/* 이미지 업로드 */}

                    <input
                        type='text'
                        name='title'
                        placeholder='상품명을 입력하세요'
                        value={product.title}
                        onChange={poductInfoChange}
                    />
                    {/* 상품 제목 */}

                    <input
                        type='text'
                        name='price'
                        placeholder='상품 가격을 입력하세요'
                        value={product.price}
                        onChange={poductInfoChange}
                    />
                    {/* 상품 가격 */}

                    {/* <input
                        type='text'
                        name='category'
                        placeholder='상품 분류를 입력하세요'
                        value={product.category}
                        onChange={poductInfoChange}
                    /> */}
                    {/* <select name='category' value={product.category} onChange={poductInfoChange}>
                        <option value=''>분류 선택</option>
                        <option value='top'>상의</option>
                        <option value='bottom'>하의</option>
                        <option value='outer'>아우터</option>
                        <option value='accessory'>악세사리</option>
                        <option value='etc'>기타</option>

                    </select> */}
                    <select name='category' value={product.category} onChange={poductInfoChange}>
                        <option value=''>분류선택</option>
                        {categoryList.map((el,index)=>(
                            <option key={index} value={el}>{el}</option>
                        ))}
                    </select>
                    {/* 상품 분류 */}

                    <input
                        type='text'
                        name='option'
                        placeholder='상품 옵션을 ,로 구분해서 입력해주세요'
                        value={product.option}
                        onChange={poductInfoChange}
                    />
                    {/* 상품 옵션  */}
                    <ColorChip>
                        {colors.map((color, index) => (
                            <div className='colorChipItem'
                                key={index}
                                style={{ backgroundColor: color }}
                                onClick={() => colorPicker(color)}
                            />
                        ))}
                    </ColorChip>

                    <ColorSelect>
                        {product.colors.map((color, index) => (
                            <div key={index}
                                style={{ backgroundColor: color }}>
                                {color}
                                <button onClick={()=>removeColor(color)}>x</button>

                            </div>
                        ))}
                    </ColorSelect>

                    <input
                        type='text'
                        name='description'
                        placeholder='상품 설명을 입력하세요'
                        value={product.description}
                        onChange={poductInfoChange}
                    />

                    <button disabled={isLoading}>
                        {isLoading ? '업로드 중' : '제품 등록하기'}
                    </button>
                    {success && (
                        <p>{success}</p>
                    )}
                    {error && (
                        <p>{error}</p>
                    )}
                </form>
            </FormContainer>
        </div>
    )
}

export default UploadProduct

const FormContainer = styled.div`
    max-width : 1200px;
    padding: 30px 0px;
    margin: 0px auto;
    display: flex;
    gap: 40px;
    .imgUploadWrap{
        max-width: 500px;
        height: auto;
        img{
            display: block;
            height: 100%;
        }
    }
    form{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
        input{
            width: 100%;
            box-sizing: border-box;
            height: 40px;
            border-radius: 4px;
            border-color: rgba(0,0,0,0.2);
            padding: 6px 12px;
        }
        button{
            /* margin-top: 48px; */
            margin-top: auto;
            height: 50px;
            border-radius: 4px;
            background: rgba(255,183,245,0.5);
            border: none;
            transition: 500ms;
            &:hover{
                background:rgba(255,183,245,1);
            }
        }

        
    }
`
const ColorChip = styled.div`
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .colorChipItem{
        width: 20px;
        height: 20px;
        cursor: pointer;
        
    }

`
const ColorSelect = styled.div`
    display: flex ;
    gap : 4px;
    flex-wrap: wrap;
    div{
        width: 100px;
        height: 30px;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`