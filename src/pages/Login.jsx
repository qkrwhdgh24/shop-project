import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { loginEmail, googleLogin } from '../api/firebase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate();


    const googleLoginEvent = async()=>{
        const user = await googleLogin();
        navigate('/')
    }


    const onLoginEvent = async(e)=>{
        e.preventDefault();
        setErrorMsg('')
        try{
            const user = await loginEmail(email, password);
            if(user){
                navigate('/')
            }else{
                setErrorMsg('이메일이나 비밀번호가 일치하지 않습니다.')
            }
        }catch(error){
            console.error(error)
        }
    }
    return (
        <div className='container'>
            <h2>로그인</h2>
            <form onSubmit={onLoginEvent}>
                <input
                    type='email'
                    placeholder='이메일을 입력하세요'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                type='password'
                placeholder='비밀번호를 입력하세요'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button type='submit'>로그인</button>
                <button onClick={googleLoginEvent}>구글아이디로 로그인</button>
            </form>
            {errorMsg && <span className='errorText'>{errorMsg}</span>}

            <Link to='/join'>회원가입</Link>
        </div>
    )
}

export default Login
