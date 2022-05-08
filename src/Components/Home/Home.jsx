import {useState, useEffect} from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import axios from "axios"

import { IoLogOutOutline, IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

import { useToken, useName} from "../Contexts/userContext";
import Transaction from "./Transaction"

export default function Home(){

    const [transactions, setTransactions] = useState([])
    const navigate = useNavigate()
    const { token } = useToken()
    const {name, setName} = useName()
    console.log(token)

    function getTransactions(config) {
        const promise = axios.get("http://localhost:5000/transactions", config)

        promise.then(response => {
            console.log(response.data)
            setTransactions(response.data)
        })
        promise.catch(response => {
            console.log(response.response)
        })
    }
    function getUser(config){
        const promise = axios.get("http://localhost:5000/user",config)
        promise.then(response =>{
            setName(response.data)
        })
        promise.catch(response => console.log(response.data))
    }
    useEffect(() =>{
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        getTransactions(config)

        getUser(config)
    },[])

    
    function logOut(){
        const answer = window.confirm("do you want to log out?")
        if(answer){
            navigate("/")
        }
    }

    function newTransaction(type){
        navigate(`/${type}`)
    }
    return (
        <PageContainer>
            <header>
                <h1>Olá,{name}</h1>
                <IoLogOutOutline color="fff" fontSize="30" fontWeight="700" onClick={() => logOut()}/>
            </header>
            <main>
                {transactions ?
                transactions.map(t => <Transaction date={t.date} amount={t.amount} type={t.type}/>) 
                : <span>There are no transactions</span>}
            </main>
            <div className="transactions">
                <button onClick={() => newTransaction("deposit")}><IoAddCircleOutline color="fff" fontSize="25"/><span>Nova entrada</span></button>
                <button onClick={() => newTransaction("withdraw")}><IoRemoveCircleOutline color="fff" fontSize="25"/><span>Nova saída</span></button>
            </div>
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

    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        top: 0;
        width: 325px;
        height: 80px;
        
        h1{
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 700;
            font-size: 26px;
            color: #fff;
        }
    }
    main{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 325px;
        height: 450px;
        background-color: #fff;
        border-radius: 5px;
    }
    .transactions{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 325px;
        margin-top: 15px;

        position: relative;
        button{
            display: inline-flex;
            flex-direction: column;
            justify-content: space-around;
            border: none;
            width: 155px;
            height: 114px;
            left: 25px;
            top: 537px;
            
            background: #A328D6;
            border-radius: 5px;
            
            svg{
                position: absolute;
                top: 10px;
            }

            span{
                width: 64px;
                height: 40px;

                font-family: 'Raleway';
                font-style: normal;
                font-weight: 700;
                font-size: 17px;

                color: #FFFFFF;
                text-align: left;

                margin-top: 60px;
            }
        }
        
    }
`