import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { googleLogOut, googleLogin, onUserState } from '../api/firebase';
import UserData from './UserData';
import { LuPencil } from "react-icons/lu";
import { FaPen } from "react-icons/fa6";

function Nav() {
    const [user, setUser] = useState()

    const login = () => {
        googleLogin().then(setUser);

    }
    const logOut = () => {
        googleLogOut().then(setUser);
    }

    useEffect(() => {
        onUserState((user) => {
            setUser(user);
        })
    }, [])
    console.log(user)
    return (
        <HeaderContainer>
            <h1><Link to='/'>shop</Link></h1>

            <div className='userWrap'>


                {user && user.isAdmin &&
                    <Link to='/product/upload' className='uploadBtn'>업로드</Link>
                }
                {user ? (
                    <>
                        <UserData user={user} />
                        <button className='logOutBtn' onClick={logOut}>logout</button>
                    </>
                ) : (
                    <button className='loginBtn' onClick={login}>login</button>
                )}
                {/* // {user && <UserData user={user} />}
                // {!user && <button className='loginBtn' onClick={login}>login</button>}
                // {user && <button className='logOutBtn' onClick={logOut}>logout</button>} */}
            </div>
        </HeaderContainer>
    )
}

export default Nav
const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    padding: 12px;
    gap: 24px;
    border-bottom: solid 1px rgba(0,0,0,0.1);
    
    .userWrap{
        display: flex;
        margin-left: auto;
        align-items: center;
        gap : 12px;
        button{
            padding: 6px 12px;
            border-radius: 6px;
            &.loginBtn{
                background: pink;
            }
            &.logOutBtn{
                background: gray;
            } 
        }
        .uploadBtn{

        }
    }
`
