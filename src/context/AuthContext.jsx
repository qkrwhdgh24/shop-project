import {createContext, useContext, useEffect, useState} from 'react';
import { onUserState,googleLogOut,googleLogin } from '../api/firebase';


const AuthContext = createContext()
//context 컴포넌트 간에 어떠한 값들을 공유할 수 있게 해주는 hook
//변수에 새로운 context를 생성해서 초기화
//createContext() = 컨텍스트를 사용하기 위해서 생성
export function AuthContextProvider({children}){
    const [user, setUser] = useState();
    const [unSubScribe, setUnSubScribe] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        /*
        페이지를 새로고침하는 경우 페이지에서 사용자의 정보를 넘어오기 전에 사용자 인증을 
        끝내기 때문에 protectRouter로 인해 홈으로 이동되는 경우가 생긴다.
        사용자 정보를 모두 받아오기 전까지 protectRouter를 실행못하게 지연시키는 방법으로 
        해결할 수 있다.
        */

        const storeUser = sessionStorage.getItem('user');
        if(storeUser){
            setUser(JSON.parse(storeUser))
        }
        const userChange = (newUser)=>{
            setUser(newUser)
            setIsLoading(false)

            if(newUser){
                sessionStorage.setItem('user', JSON.stringify(newUser));
                //사용자가 로그인을 하면 세션스토리지 안에 정보를 저장
            }else{
                sessionStorage.removeItem('user');
                //사용자가 로그아웃 하면 세션 스트로지에 있는 모든 정보를 삭제
            }
        }
        const unSubScribeFunc = onUserState(userChange);
        //위에서 업데이트 된 사용자를 onuserState에 넘김
        setUnSubScribe(()=>unSubScribeFunc);
        return ()=>{
            if(unSubScribeFunc){
                unSubScribeFunc()
            }
        }
    },[])
    

    return(
        <AuthContext.Provider value={{user, googleLogin, googleLogOut, uid:user && user.uid, isLoading}}>
            {children}

        </AuthContext.Provider>

        
    )
}
export function useAuthContext(){
    return useContext(AuthContext)
}
//위의 함수들을 단순화 시켜서 다른 곳에서 참조할 수 있도록 context를 export함