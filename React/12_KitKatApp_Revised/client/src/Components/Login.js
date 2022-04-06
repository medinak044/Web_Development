import { Form, Button, Container, Row, Col } from 'react-bootstrap';


const Login = () => {
    return(

        <div>

            <Container fluid>
            <Row className="row1">
                <Col id="login-banner">
                    <span>
                <img id="kitcat" src="Assets/kitcat.png" alt="Kit Cat Logo"/>  
                </span>
                <span>          
                <h1>Kit Kat Corner - Welcome Back!</h1>
                </span>    
                </Col>
            </Row>

        <Row>
            <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Username</Form.Label>
    <Form.Control type="email" placeholder="Enter Username" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Enter Password" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Login
  </Button>
</Form>
</Row>

<Row>
    <p>Don't have an account yet? <a href="/Register">Register here</a></p> 
</Row>
</Container>
        </div>
    )
}

export default Login;