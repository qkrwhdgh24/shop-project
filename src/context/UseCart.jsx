import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "./AuthContext";
import { deleteCart, getCart, updateCart } from "../api/firebase";

export default function useCart(){
    const {uid} = useAuthContext();
    console.log(uid)
    //useQueryClient = 리액트에서 데이터를 가져오고 업데이트 하는 라이브러리
    //설치 yarn add @tanstack/react-query
    const queryClient = useQueryClient()

    // const cartInfo = useQuery(['cart', uid || ''], ()=> getCart(uid),{
    //     enabled : !!uid
    // })
    const cartInfo = useQuery({ //cart의 데이터를 가져오는 비동기 쿼리 설정
        queryKey : ['cart', uid || ''], //쿼리를 식별하는 키
        queryFn : ()=>getCart(uid), //데이터를 가져오는 함수
        enabled : !!uid //쿼리가 활성화 되어야 하는지의 여부 (!!uid는 uid가 있는 경우에만 활성화)
    })

    // const addItemCart = useMutation(
    //     //mutation : 정보를 업데이트할때 사용하는 구문
    //     (product)=>updateCart(uid, product),{
    //         onSuccess : ()=>{
    //             queryClient.invalidateQueries(['cart',uid])
    //         }
    //     }
    // )

    const addItemCart = useMutation({//useMutation 장바구니에 상품을 추가하는 업데이트 작업
        mutationFn :(product)=>updateCart(uid, product), // 데이터를 업데이트 하는 함수
        onSuccess : ()=>{//onSuccess 완료가 되고 난 후 실행
            queryClient.invalidateQueries(['cart',uid])
            //최신상태로 업데이트(쿠키값을 무효화 시켜 상품의 정보를 최신으로 업데이트)
        }
    })

    const removeCart = useMutation({
        mutationFn : (id) => deleteCart(uid, id),
        onSuccess:()=>{
            queryClient.invalidateQueries(['cart', uid])
        }
    })

    return {cartInfo, addItemCart, removeCart}
     
}