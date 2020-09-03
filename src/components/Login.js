import React from 'react';
import { Button } from '@material-ui/core';
import "../Login.css";
import { auth, provider } from '../firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './Reducer';

function Login() { 
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider).then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        }).catch((error) => alert(error.msg));
    };
    return (
        <div className="login">
            <div className="login_container">
                <div className="login_inner">
                    <div className="login_front">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/100px-WhatsApp.svg.png" alt="whatsapp icon"/>
                        <div className="login_text">
                            <h1>Sign in to Whatsapp</h1>
                        </div>
                    </div>
                    <div className="login_back">
                        <Button onClick = {signIn}>Sign in with Google</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;