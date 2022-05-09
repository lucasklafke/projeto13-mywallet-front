import styled from "styled-components"

export default function Transaction(props){
    const {type,date,amount,description} = props
    
    const splitedDate = date.split("/")
    const formatedDate = (("0" + splitedDate[0]).slice(-2) +"/"+ ("0" + splitedDate[1]).slice(-2))
    return (
        <TransactionContainer>

            <span className="date">{formatedDate}</span>
            <span className="description">{description}</span>
            {
            type === "deposit"?
            <Amount color="green">{Number(amount).toFixed(2)}</Amount>
            : 
            <Amount color="red">{Number(amount).toFixed(2) }</Amount>
            }
        </TransactionContainer>
    )
}

const TransactionContainer = styled.div`
    display: flex;
    width: 95%;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    position: relative;

    span{
        font-family: 'Raleway';
        font-weight: 400;
        font-size: 16px;
        color: #000000;
    }
    .date{
           color: #C6C6C6;
    }
    .description{
        position: absolute;
        left: 60px;
    }
    
`

const Amount = styled.h2`
    color: ${props => props.color};
`