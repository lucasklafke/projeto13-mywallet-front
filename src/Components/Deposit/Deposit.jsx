import styled from "styled-components"
import { useState } from "react"
export default function Deposit(){
    const [amount,setAmount] = useState(null)
    const [description, setDescription] = useState(null)

    function handleSubmit(e){

    }
    return (
        <TransactionPage>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" />
                <input type="text" />
                <button></button>
            </form>
        </TransactionPage>
    )
}

const TransactionPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #8B2BBE;
`