import React, { useState } from 'react'
import { joinEmail } from '../api/firebase';
import { useNavigate } from 'react-router-dom';

function Join() {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const [psError, setPsError] = useState('')//패스워드 에러
    const [nameError, setNameError] = useState('')//이름 에러
    const [emailError, setEmailError] = useState('')//이메일 에러
    const navigate = useNavigate()

    //이름 유효성 검사
    const validatorName = (userName) => {
        if (!userName) {
            setNameError('이름을 입력해주세요')
            return false
        }  //이름을 생략하거나 공백으로 넣는 경우
        if (userName.length <= 2 || userName > 10) {
            setNameError('이름은 2글자 이상 10글자 이하로 해주세요')
            return false
        }
        if (!/^[A-Za-z가-힣\s'-]+$/.test(userName)) {
            setNameError('유효하지 않은 문자가 포함되어 있습니다.')
            return false
        }
        return true
    }

    const onSignUpEvent = async (e) => {
        e.preventDefault();
        setPsError('');
        setNameError('');
        setEmailError('');

        // if(nameValidatorResult){
        //     setNameError(nameValidatorResult)
        //     return
        // }
        if (!validatorName(userName)) {
            return
        }

        if (userPassword.length < 6) {
            setPsError('비밀번호는 6글자 이상이어야 합니다')
            return
        }
        try {
            const result = await joinEmail(userEmail, userPassword, userName)
            if (result.error) {
                if (result.error === 'auth/email-already-in-use'){
                    setEmailError('이메일은 현재 사용중입니다.')
                }
                return
            }else{
                navigate('/login')
            }
            

        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className='container'>
            <h2>회원가입</h2>
            <form onSubmit={onSignUpEvent}>
                <div>
                    <input
                        type='text'
                        placeholder='이름을 입력하세요'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    {nameError && <span className='errorText'>{nameError}</span>}
                </div>

                <div>
                    <input
                        type='email'
                        placeholder='이메일을 입력하세요'
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                    {emailError &&<span className='errorText'>{emailError}</span> }
                </div>

                <div>
                    <input
                        type='password'
                        placeholder='비밀번호를 입력하세요'
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                    />
                    {psError && <span className='errorText'>{psError}</span>}
                </div>

                <button type='submit'>회원가입</button>
            </form>
        </div>
    )
}

export default Join
