import React from 'react'
import styled from 'styled-components'

function UserData({user}) {
    return (
        <UserInfo>
            <img src={user.photoURL} alt={user.displayName}/>
            <span>{user.displayName}</span>
        </UserInfo>
    )
}

export default UserData

const UserInfo = styled.div`
        display: flex;
        align-items: center;
        gap: 6px;
        img{
            width: 36px;
            border-radius: 100%;
        }
`
