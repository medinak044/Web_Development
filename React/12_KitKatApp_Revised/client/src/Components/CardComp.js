import { Card } from "react-bootstrap"

const CardComp = (props) => {
    const { image, flavor } = props.data

    return (
        <Card>
            <img src={image} alt={flavor} />
            <h1>{flavor}</h1>
        </Card>
    )
}

export default CardComp