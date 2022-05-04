import {useState} from "react"
import styled from "styled-components"

import { IoLogOutOutline, IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

export default function Home(){
    return (
        <PageContainer>
            <header>
                <h1>Olá {}</h1>
                <IoLogOutOutline color="fff" fontSize="30" fontWeight="700"/>
            </header>
            <main>

            </main>
            <div className="transactions">
                <button><IoAddCircleOutline color="fff" fontSize="25"/></button>
                <button><IoRemoveCircleOutline color="fff" fontSize="25"/></button>
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
        justify-content: center;
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
        button{
            display: flex;
            border: none;
            width: 155px;
            height: 114px;
            left: 25px;
            top: 537px;

            background: #A328D6;
            border-radius: 5px;
            
            svg{
                margin-top: 5px;
            }
        }
        
    }
`