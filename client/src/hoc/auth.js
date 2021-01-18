import Axios from "axios";
import { useEffect } from "react";
import React from 'react';
import axios from 'axios';
//useDispatch라는 리덕스훅
import { useDispatch } from  'react-redux';
import {auth} from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {

    function AuthenticationCheck(props){

        const dispatch = useDispatch();
        
        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response)
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('/');
                    }
                }else{
                    /*
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/todolist')
                    }else{
                        if(option === false)
                        props.history.push('/')
                    }
                    */
                    if (!option) {
                        props.history.push('todolist');
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

