import Axios from "axios";
import { useEffect } from "react";
import React from 'react';
import axios from 'axios';
import { useDispatch } from  'react-redux';
//useDispatch라는 리덕스훅
import {auth} from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {

    //option에 위치하는 애들
    //null    =>  아무나 출입이 가능한 페이지
    //true    =>  로그인한 유저만 출입이 가능한 페이지
    //false   =>  로그인한 유저는 출입 불가능한 페이지

    //adiminRoute 는 아무것도 안넣으면 null이 기본값

    function AuthenticationCheck(props){

        const dispatch = useDispatch();
        
        //backend에 request날려서 서버에서 현재 상태정보 가져오는 일
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
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/')
                    }else{
                        if(option === false)
                        props.history.push('/')
                    }
                }
            })

            axios.get('/api/users/auth')
        }, [])

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}

