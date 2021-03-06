import { useState } from "react"
import styled from 'styled-components';
import { Link, useNavigate} from 'react-router-dom';
import axios from "axios"

import {useToken} from "../Contexts/userContext"

export default function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {setToken} = useToken()

    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        const data = {email,password}
        const promise = axios.post("https://mywalletklafke.herokuapp.com/sign-in",  data)
        promise.then(response =>{
            setToken(response.data)
            navigate("/home")
        })
        promise.catch(e =>{
            window.alert(e.response.data)
        })
    }
    return (
        <PageContainer>
            <h1>MyWallet</h1>
            <FormContainer>
                <form onSubmit={e => handleSubmit(e)}>
                    <input type="text" placeholder="E-mail" value={email} onChange={e => { setEmail(e.target.value) }}/>
                    <input type="Password" placeholder="Password" value={password} onChange={e => { setPassword(e.target.value) }}/>
                    <button>Enter</button>
                </form>
            </FormContainer>
            <Link to="/sign-up">
                <span className="register">First time? Sign up!</span>
            </Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #8B2BBE;

    h1{
        font-family: 'Saira Stencil One', cursive;
        font-size: 32px;
        margin-bottom: 25px;
        color: #fff;
    }
    a{
        color: #fff;
        text-decoration: none;
        font-family: 'Raleway', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        margin-top: 35px;
    }
    span .register{
        text-decoration: none;
        color: #fff;
    }
`

const FormContainer = styled.div`
    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #8B2BBE;
    }

    input{
        width: 326px;
        height: 58px;
        background: #FFFFFF;
        border-radius: 5px;
        margin-bottom: 13px;
        border: none;
    }
    button{
        background-color:#A231D6;
        width: 326px;
        height: 46px;
        background: #A328D6;
        color: #fff;
        border-radius: 5px;
        border: none;

        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
    }
`