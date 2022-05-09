import {useState, useEffect} from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import axios from "axios"

import { IoLogOutOutline, IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

import { useToken, useName} from "../Contexts/userContext";
import Transaction from "./Transaction"
import SignUp from "../SignUp/SignUp";

export default function Home(){

    const [transactions, setTransactions] = useState([])
    const  [total,setTotal] = useState(0)
    const navigate = useNavigate()
    const { token } = useToken()
    const {name, setName} = useName()
    function getTransactions(config) {
        const promise = axios.get("https://mywalletklafke.herokuapp.com/transactions", config)

        promise.then(response => {
            setTransactions(response.data)
            calculateTotal(response.data)
        })
        promise.catch(response => {
            window.alert(response.response.data)
        })
    }
    function getUser(config){
        const promise = axios.get("https://mywalletklafke.herokuapp.com/user",config)
        promise.then(response =>{
            setName(response.data)
        })
        promise.catch(response => window.alert(response.response.data))
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
    function calculateTotal(transaction){
        let sum = 0
        transaction.forEach(t => {
            console.log(total)
            console.log(t.type)
            console.log(typeof( t.amount))
            if(t.type === "deposit"){
                sum += Number(t.amount)
            } else{
                sum -= Number(t.amount)
            }
        })
        setTotal(sum)
    }
    return (
        <PageContainer>
            <header>
                <h1>Hello,{name}</h1>
                <IoLogOutOutline color="fff" fontSize="30" fontWeight="700" onClick={() => logOut()}/>
            </header>
            <main>
                {transactions ?
                transactions.map(t => <Transaction date={t.date} amount={t.amount} type={t.type} description={t.description}/>) 
                : <span>There are no transactions</span>}
                <div className="total">
                    <span className="totalText">Total</span>
                    {Number(total) > 0 ?
                    
                        <Total color="green">{total.toFixed(2)}</Total>
                    :
                        <Total color="red">{total.toFixed(2)}</Total>
                    }
                    </div>
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
        position: relative;

        .total{
            position: absolute;
            bottom: 20px;

            font-family: 'Raleway';
            font-size: 17px;

            display: flex;
            justify-content: space-between;
            width: 300px;

            .totalText{
                font-family: 'Raleway';
                font-style: normal;
                font-weight: 700;
                font-size: 17px;

                color: #000000;
            }
        }
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

const Total = styled.span`
    color: ${props => props.color};
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
`