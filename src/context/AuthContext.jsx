import {createContext, useContext, useEffect, useState} from 'react';
import { onUserState,googleLogOut,googleLogin } from '../api/firebase';


const AuthContext = createContext()
//context 컴포넌트 간에 어떠한 값들을 공유할 수 있게 해주는 hook
//변수에 새로운 context를 생성해서 초기화
//createContext() = 컨텍스트를 사용하기 위해서 생성
export function AuthContextProvider({children}){
    const [user, setUser] = useState();
    const [unSubScribe, setUnSubScribe] = useState();

    useEffect(()=>{
        const userChange = (newUser)=>{
            setUser(newUser)
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
        <AuthContext.Provider value={{user, googleLogin, googleLogOut}}>
            {children}

        </AuthContext.Provider>
    )
}
export function useAuthContext(){
    return useContext(AuthContext)
}
//위의 함수들을 단순화 시켜서 다른 곳에서 참조할 수 있도록 context를 export함