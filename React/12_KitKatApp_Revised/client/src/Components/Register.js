import axios from "axios";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';


const Register = () => {
  const initialState = {
    username: "",
    password: ""
  }

  const [formData, setFormData] = useState(initialState)

  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    //enter if else statement for confirmpassword to work
    //if not the same, write "return" - will exit the function/stop it from running & also return error message?
    //if the same, then run function
    axios.post('http://localhost:8080/newUsers', formData)
      .then(response => {
        // console.log(`Response data: ${response.data}`)
        navigate('/Dashboard')
      })
      .catch(error => console.log(`Error: ${error}`))
  }

  return (
    <div>
      <Container fluid>
        <Row className="row1">
          <Col id="login-banner">
            <span>
              <img id="kitcat" src="Assets/kitcat.png" alt="Kit Cat Logo" />
            </span>
            <span>
              <h1>Kit Kat Corner - Sign Up!</h1>
            </span>
          </Col>
        </Row>

        <Row>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="text">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                onChange={handleChange}
                placeholder="Create Username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Create Password" />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" name="confirmPassword" placeholder="Repeat Password" />
            </Form.Group> */}

            <Button variant="primary" type="submit">Sign Up</Button>
          </Form>
        </Row>

        <Row>
          <p>Already have an account? <a href="/Login">Login</a></p>
        </Row>
      </Container>
    </div>
  )
}

export default Register