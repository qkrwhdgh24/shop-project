import React, { useEffect, useState } from 'react'
import { addReview, getReview } from '../api/firebase';

function ProductReview({ productId }) {
    const [review, setReview] = useState([]);
    const [newReview, setNewReview] = useState('');

    useEffect(() => {
        getReview(productId)
            .then((review) => {
                setReview(review)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [productId])

    const onSubmitReview = async () => {
        try {
            const user = 'user';
            await addReview(productId, user, newReview);
            setNewReview('');
            getReview(productId)
                .then(setReview);
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <div>
            <h3>후기</h3>
            <ul>
                {review && review.map((el, index) => (
                    <li>
                        <p>{el.text}</p>
                    </li>
                ))}
            </ul>
            <input
                type='text'
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
            />
            <button onClick={onSubmitReview}>작성하기</button>
        </div>
    )
}

export default ProductReview
