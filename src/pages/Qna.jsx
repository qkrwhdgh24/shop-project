import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBoard, onUserState } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import BoardListItem from '../components/BoardListItem';

function Qna() {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        onUserState((user) => {
            setUser(user);
        })
    }, [])
    const onWriteEvent = () => {
        navigate(`/board/write`, { state: { email: user.email } })
    }

    const { data: board, isLoading, isError } = useQuery({
        queryKey: 'board',
        queryFn: getBoard
    })
    return (
        <div className='container'>
            <div className='board-top'>
                <h2>QnA 게시판</h2>
                {user && user.isAdmin &&
                    <button className='writeBtn' onClick={onWriteEvent}>작성하기</button>
                }

            </div>

            <ul className='boardList'>

                {board && board.map((el) => (
                    <BoardListItem key={el.id} post={el} />
                ))}
            </ul>


        </div>
    )
}

export default Qna
