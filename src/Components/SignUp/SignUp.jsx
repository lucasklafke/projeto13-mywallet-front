import { useState } from "react"
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from "axios"
export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeat_password, setRepeat_password] = useState('');
    console.log("email: ", email);
    console.log("password: ", password);

    function handleSubmit(e){
        e.preventDefault()
        const data = {
            name,
            email,
            password,
            repeat_password
        }
        const promise = axios.post("http://localhost:5000/sign-up", data)

        promise.then(response => {
            window.alert("user created!")
        })
        promise.catch(response => {
            console.log(response.response)
            window.alert(response.response.data)
        })
    }
    return (
        <PageContainer>
            <h1>MyWallet</h1>
            <FormContainer>
                <form onSubmit={e => handleSubmit(e) }>
                    <input type="text" placeholder="Name" value={name} onChange={e => { setName(e.target.value) }} />
                    <input type="text" placeholder="E-mail" value={email} onChange={e => { setEmail(e.target.value) }} />
                    <input type="text" placeholder="Password" value={password} onChange={e => { setPassword(e.target.value) }} />
                    <input type="text" placeholder="Confirm password" value={repeat_password} onChange={e => { setRepeat_password(e.target.value) }} />
                    <button>Register</button>
                </form>
            </FormContainer>
            <Link to="/">
                <span className="register">Already registered? Sign in!</span>
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