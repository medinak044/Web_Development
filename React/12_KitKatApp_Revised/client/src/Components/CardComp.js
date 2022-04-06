import { Card } from "react-bootstrap"

const CardComp = (props) => { 
    return(
   <Card>
   <img src = {props.data.image} alt={props.data.flavor}/>
   <h1>{props.data.flavor}</h1>
   </Card>
    )
}

export default CardComp;