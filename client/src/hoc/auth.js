import Axios from "axios";
import { useEffect } from "react";
import React from 'react';
import axios from 'axios';
//useDispatch라는 리덕스훅
import { useDispatch } from  'react-redux';
import {auth} from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {

    //option에 위치하는 애들
    //null    =>  아무나 출입이 가능한 페이지
    //true    =>  로그인한 유저만 출입이 가능한 페이지
    //false   =>  로그인한 유저는 출입 불가능한 페이지

    //adiminRoute 는 아무것도 안넣으면 null이 기본값

    function AuthenticationCheck(props){

        const dispatch = useDispatch();
        
        //페이지 이동할 때마다 dispatch가 실행된다. 계속 유저 정보를 받아오고있다.
        //먼저 auth에서 backend에 request날려서 서버에서 현재 상태정보 가져오는 일
        useEffect(() => {
            
            //action이름을 auth라고
            dispatch(auth()).then(response => {
                console.log(response)

                //로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('/login')
                    }
                }else{
                    //로그인 한 상태
                    //admin만 들어갈 수 있는 페이지인데 isAdmin이 false일 때
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/')
                    }else{
                        if(option === false)
                        props.history.push('/')
                    }
                }
            })

            //middleware auth에 이미 정보를 받아놨다. 로그인 한 유저인지 아닌 유저인지
            //그래서 앞의 auth에 request보내서 유저 상태 받아온다.
            axios.get('/api/users/auth')
        }, [])

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}

