
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';


const Dashboard = () => {

    const navigate = useNavigate();
    
      const handleSubmit = (event) => {
        navigate('/')
      }

    return(
        <div>

            <Container fluid>
            <Row className="row1">
                <Col id="intro">
                    <span>
                <img id="kitcat" src="Assets/kitcat.png" alt="Kit Cat Logo"/>  
                </span>
                <span>          
                <h1>Kit Kat Dashboard</h1>
                </span>    
                </Col>
            </Row>
            
            <Row className="row2">
                <span id="dash-welcome">
                <h1>Welcome to your Kit Kat Dashboard! 
                    This is where your favorited Kit Kat flavors will appear. 
                    Let's get started building your favorites list!</h1>
                </span>
                <Button onClick={handleSubmit} size="lg" variant="primary">Find Kit Kats</Button>
              </Row>
            </Container>
        </div>
    )
}

export default Dashboard;