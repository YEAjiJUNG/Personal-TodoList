import { useEffect } from "react";
import React from 'react';
import axios from 'axios';
import { useDispatch } from  'react-redux';
import {auth} from '../_actions/user_action';

export default function HOC(SpecificComponent, option) {

    function AuthenticationCheck(props){

        const dispatch = useDispatch();
        
        useEffect(() => {
            dispatch(auth()).then(response => {
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('/');
                    }
                } else {
                    if (!option) {
                        props.history.push('/todolist');
                    }
                }
            })
            axios.get('/api/users/auth')
        }, [dispatch, props.history])

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}

