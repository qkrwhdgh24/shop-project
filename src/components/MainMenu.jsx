import React, { useContext } from 'react'
import { CategoryContext } from '../context/CategoryContext'
import { Link } from 'react-router-dom';

function MainMenu() {
    const {categoryList} = useContext(CategoryContext);
    return (
        <nav>
            <ul>
                {categoryList.map((el,index)=>(
                    <li key={index}>
                        <Link to={`/products/${el}`}>{el}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default MainMenu
