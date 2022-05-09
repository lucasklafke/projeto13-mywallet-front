import styled from "styled-components"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useToken } from "../Contexts/userContext"

export default function Deposit() {
    const [amount, setAmount] = useState(null)
    const [description, setDescription] = useState(null)
    const { token } = useToken()
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        const data = { amount, description }
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const promise = axios.post("https://mywalletklafke.herokuapp.com/withdraw", data, config)
        promise.then(response => {
            window.alert(`withdraw made,R$${Number(amount).toFixed(2)}`)
            navigate("/home")
        })
        promise.catch(response => {
            window.alert("something went wrong! ", response.data)
            navigate("/home")
        })
    }
    return (
        <TransactionPage>
            <h1>New withdraw</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" placeholder="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <input type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button>Save withdraw</button>
            </form>
        </TransactionPage>
    )
}

const TransactionPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background-color: #8B2BBE;


    h1{
        position: absolute;
        left: 24px;
        top: 25px;

        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
    }

    form{
        margin-top: 100px;
        display: flex;
        flex-direction: column;

        input{
            width: 326px;
            height: 58px;
            background: #FFFFFF;
            border-radius: 5px;
            margin-top: 15px;
            border: none;
        }

        button{
            width: 326px;
            height: 46px;
            color: #fff;
            background: #A328D6;
            border-radius: 5px;
            margin-top: 15px;

            border: none;
        }
    }
`